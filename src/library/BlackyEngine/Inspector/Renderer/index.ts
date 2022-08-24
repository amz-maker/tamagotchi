import { InspectorType } from "../../enum";
import Inspector from "../inspector";

class Renderer extends Inspector {
  constructor() {
    super(InspectorType.RENDERER);
    this.init();
  }

  public init() {}
}

export default Renderer;
