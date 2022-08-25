import { InspectorType } from "../../enum";
import Inspector from "../inspector";

class Renderer extends Inspector {
  renderStrategy?: Renderer.RenderStrategy;

  constructor() {
    super(InspectorType.RENDERER);
    this.init();
  }

  public getRenderStrategy() {
    return this.renderStrategy;
  }
  public setRenderStrategy(strategy: Renderer.RenderStrategy) {
    this.renderStrategy = strategy;
  }

  public init() {}
}

namespace Renderer {
  export abstract class RenderStrategy {
    abstract render(): void;
  }
  export namespace RenderStrategy {
    export class Sprite extends Renderer.RenderStrategy {
      public render() {}
    }
  }
}

export default Renderer;
