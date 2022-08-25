import { InspectorType } from "../../enum";
import Inspector from "../inspector";

class Animation extends Inspector {
  constructor(name: string) {
    super(InspectorType.Animation, name);
    this.init();
  }

  public init() {}
}

export default Animation;
