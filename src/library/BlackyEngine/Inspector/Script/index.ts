import GameObject from "../../GameObject";
import { InspectorType } from "../../common/enum";
import Inspector from "../inspector";

class Script extends Inspector {
  constructor(gameObject: GameObject, name: string) {
    super(gameObject, InspectorType.SCRIPT, name);
    this.init();
  }

  public init() {}
}

export default Script;
