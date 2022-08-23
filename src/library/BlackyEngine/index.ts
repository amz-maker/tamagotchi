import VC01 from "../../assets/vc/vc_01.png";

class BlackyEngine {
  c: HTMLCanvasElement; // Canvas Element
  ctx: CanvasRenderingContext2D; // WebGL2 Rendering Context
  fps: number; // FPS
  state: "PAUSE" | "RUNNING" | "STOP";

  constructor(canvas_id: string, fps: number) {
    this.c = document.getElementById(canvas_id) as HTMLCanvasElement;
    this.ctx = this.c.getContext("2d");
    this.fps = fps;
    this.state = "STOP";

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

  private init() {
    console.log("Blacky is start");

    const image = new Image(100, 100);
    image.src = VC01;
    image.onload = () => {
      this.ctx.clearRect(0, 0, this.c.width, this.c.height); // Clear Canvas
      this.ctx.drawImage(image, 100, 100, 100, 100);
    };

    console.log("Draw");
  }
  private destroy() {
    alert("Blacky is stop");
  }
  private loop() {
    if (this.state !== "RUNNING") return;

    let that = this;
    setTimeout(function () {
      that.handleEvent();
      that.handleUpdate();
      that.handleRender();

      that.loop();
    }, 1000 / this.fps);
  }
  private handleEvent() {}
  private handleUpdate() {}
  private handleRender() {}
}

namespace BlackyEngine {}

export default BlackyEngine;
