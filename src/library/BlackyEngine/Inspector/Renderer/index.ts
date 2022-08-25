import { InspectorType } from "../../enum";
import Inspector from "../inspector";

class Renderer extends Inspector {
  renderStrategy?: Renderer.RenderStrategy;

  constructor() {
    super(InspectorType.RENDERER);
    this.init();
  }

  public setRenderStrategy(strategy: Renderer.RenderStrategy) {}

  public init() {}
}

namespace Renderer {
  export abstract class RenderStrategy {
    abstract render(): void;
  }
  export namespace RenderStrategy {
    //export class Sprite
  }
}

export default Renderer;
