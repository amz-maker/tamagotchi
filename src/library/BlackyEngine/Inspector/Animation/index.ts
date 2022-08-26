import GameObject from "../../GameObject";
import { InspectorType } from "../../common/enum";
import Inspector from "../inspector";

class Animation extends Inspector {
  constructor(gameObject: GameObject, name: string) {
    super(gameObject, InspectorType.Animation, name);
    this.init();
  }

  public init() {}
}

export default Animation;
