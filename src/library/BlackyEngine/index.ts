import GameObject from "./GameObject";
import { IEvents } from "./common/interface";
import Renderer from "./Inspector/Renderer";
import { InspectorType } from "./common/enum";
import { Resource, Vector2 } from "./common/module";
import { Util } from "./common/util";
import { Animation } from "./Inspector";

import VC_SPRITE_DEFAULT from "../../assets/vc/vc_sprite_default.png";

class TestObj extends GameObject {
  async init() {
    const spriteImage = await Util.loadedImage(VC_SPRITE_DEFAULT);
    const sprite = new Resource.Sprite(spriteImage, {
      sx: 0,
      sy: 0,
      sw: 256,
      sh: 256,
    });
    sprite.setFlip({ x: false });

    // Animation Setting
    const defaultAnimation = new Animation(this, "DEFAULT_ANI", spriteImage, [
      {
        spritePosition: { sx: 0, sy: 0, sw: 256, sh: 256 },
        frame: 1,
      },
      {
        spritePosition: { sx: 256, sy: 0, sw: 256, sh: 256 },
        frame: 1,
      },
    ]);
    this.addInspector(defaultAnimation);

    // Renderer Setting
    const spriteRenderer = new Renderer.SpriteRenderer(this).setResource(
      sprite
    );
    spriteRenderer.setDefaultAnimation(defaultAnimation);
    //spriteRenderer.setNowAnimation(defaultAnimation);
    //spriteRenderer.startAnimation();
    this.addInspector(spriteRenderer);

    // Transform Setting
    const transform = this.getInspector(InspectorType.TRANSFORM);
    if (transform !== undefined) {
      transform.setOffset(new Vector2(-0.5, -1));
      transform.setScale(new Vector2(0.2, 0.2));
      transform.setPosition(new Vector2(700, 200));
    }
  }
  event(event: IEvents): void {}
  update(): void {}
  render(ctx: CanvasRenderingContext2D): void {
    // const image = new Image();
    // image.src = VC01;
    // image.onload = () => {
    //   ctx.save();
    //   ctx.scale(1, 1);
    //   ctx.fillRect(700, 200, 128, 128);
    //   ctx.drawImage(image, 500, 200, image.width, image.height, 0, 0, 0, 0);
    //   ctx.restore();
    // };
  }
}

class BlackyEngine {
  private c: HTMLCanvasElement; // Canvas Element
  private ctx: CanvasRenderingContext2D; // WebGL2 Rendering Context
  private fps: number; // FPS
  private state: "PAUSE" | "RUNNING" | "STOP";
  private gameObjects: GameObject[];

  private animateFrame?: number;
  private beforeTime: number;

  constructor(canvasId: string, fps: number) {
    this.c = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.c.getContext("2d")!;
    this.fps = fps;
    this.state = "STOP";
    this.gameObjects = [];
    this.beforeTime = window.performance.now();

    // 브라우저가 WebGL을 지원하지 않을 경우
    // if (!this.gl) {
    //   alert("Your browser may not support WebGL");
    // }
  }

  public start() {
    switch (this.state) {
      case "STOP":
        this.state = "RUNNING";
        this.init();
        this.loop();
      case "PAUSE":
        this.state = "RUNNING";
        break;
      case "RUNNING":
        console.log("Blacky is already running");
        break;
    }
  }
  public stop() {
    if (this.animateFrame !== undefined) {
      this.state = "STOP";
      window.cancelAnimationFrame(this.animateFrame);
      this.destroy();
    }
  }
  public pause() {
    this.state = "PAUSE";
  }
  public setFPS(fps: number) {
    this.fps = fps;
  }

  public addGameObject(gameObject: GameObject) {
    this.gameObjects.push(gameObject);
  }
  public getGameObject(name: string) {
    const idx = this.gameObjects.findIndex(
      (gameObject) => gameObject.getName() === name
    );
    if (idx !== -1) {
      return this.gameObjects[idx];
    }
    return undefined;
  }
  public getGameObjects() {
    return this.gameObjects;
  }

  private init() {
    console.log("Blacky is start");
    this.gameObjects.push(new TestObj());

    // const image = new Image(100, 100);
    // image.src = VC01;
    // image.onload = () => {
    //   this.ctx.clearRect(0, 0, this.c.width, this.c.height); // Clear Canvas
    //   this.ctx.drawImage(image, 100, 100, 100, 100);
    // };

    // console.log("Draw");
  }
  private destroy() {
    alert("Blacky is stop");
  }
  private async loop() {
    this.animateFrame = window.requestAnimationFrame(this.loop.bind(this));

    const now = window.performance.now();
    if (this.state !== "RUNNING") return;
    else if (this.beforeTime + 1000 / this.fps > now) return;
    else {
      this.beforeTime = now;
      await this.handleEvent();
      await this.handleUpdate();
      await this.handleRender();
    }
  }
  private async handleEvent() {
    const events: IEvents = {
      key: {},
      mouse: { left: false, right: false },
    };

    await Promise.all(
      this.gameObjects.map(async (gameObject) => {
        return new Promise(async (resolve) => {
          await Promise.all(
            gameObject.getInspectors().map((inspector) => {
              return new Promise((resolve) => {
                inspector.event(events);
                resolve(true);
              });
            })
          );
          gameObject.event(events);
          resolve(true);
        });
      })
    );
  }
  private async handleUpdate() {
    await Promise.all(
      this.gameObjects.map(async (gameObject) => {
        return new Promise(async (resolve) => {
          await Promise.all(
            gameObject.getInspectors().map((inspector) => {
              return new Promise((resolve) => {
                inspector.update();
                resolve(true);
              });
            })
          );
          gameObject.update();
          resolve(true);
        });
      })
    );
  }
  private async handleRender() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    await Promise.all(
      this.gameObjects.map(async (gameObject) => {
        return new Promise(async (resolve) => {
          await Promise.all(
            gameObject.getInspectors().map((inspector) => {
              return new Promise((resolve) => {
                inspector.render(this.ctx);
                resolve(true);
              });
            })
          );
          gameObject.render(this.ctx);
          resolve(true);
        });
      })
    );
  }
}

namespace BlackyEngine {}

export default BlackyEngine;
