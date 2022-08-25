import VC01 from "../../assets/vc/vc_01.png";
import GameObject from "./GameObject";
import { IEvents } from "./common/interface";
import Renderer, { SpriteRenderer } from "./Inspector/Renderer";
import { InspectorType } from "./common/enum";
import { Vector2 } from "./common/module";
import { Util } from "./common/util";

class TestObj extends GameObject {
  async init() {
    const image = await Util.loadedImage(VC01);
    const resource = new Renderer.Resource.Sprite(image);
    const renderer = new SpriteRenderer(this).setResource(resource);

    this.addInspector(renderer);

    const transform = this.getInspector(InspectorType.TRANSFORM);
    if (transform !== undefined) {
      transform.setPosition(new Vector2(100, 100));
    }

  }
  event(event: IEvents): void { }
  update(): void { }
  render(ctx: CanvasRenderingContext2D): void { }
}

class BlackyEngine {
  private c: HTMLCanvasElement; // Canvas Element
  private ctx: CanvasRenderingContext2D; // WebGL2 Rendering Context
  private fps: number; // FPS
  private state: "PAUSE" | "RUNNING" | "STOP";
  private gameObjects: GameObject[];

  constructor(canvasId: string, fps: number) {
    this.c = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.c.getContext("2d")!;
    this.fps = fps;
    this.state = "STOP";
    this.gameObjects = [];

    // 브라우저가 WebGL을 지원하지 않을 경우
    // if (!this.gl) {
    //   alert("Your browser may not support WebGL");
    // }
  }

  public start() {
    switch (this.state) {
      case "STOP":
        this.init();
      case "PAUSE":
        this.state = "RUNNING";
        this.loop();
        break;
      case "RUNNING":
        console.log("Blacky is already running");
        break;
    }
  }
  public stop() {
    this.state = "STOP";
    this.destroy();
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
  private loop() {
    if (this.state !== "RUNNING") return;

    let that = this;
    setTimeout(async () => {
      await that.handleEvent();
      await that.handleUpdate();
      await that.handleRender();

      that.loop();
    }, 1000 / this.fps);
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

namespace BlackyEngine { }

export default BlackyEngine;
