class BlackyEngine {
  c: HTMLCanvasElement; // Canvas Element
  gl: RenderingContext; // WebGL2 Rendering Context
  fps: number; // FPS
  state: "PAUSE" | "RUNNING" | "STOP";

  constructor(canvas_id: string, fps: number) {
    this.c = document.getElementById(canvas_id) as HTMLCanvasElement;
    this.gl = this.c.getContext("experimental-webgl");
    this.fps = fps;
    this.state = "STOP";

    // 브라우저가 WebGL을 지원하지 않을 경우
    if (!this.gl) {
      alert("Your browser may not support WebGL");
    }
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
        console.log("This Game is already running");
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
    console.log("Game is start");
  }
  private destroy() {
    alert("Game is stop");
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
