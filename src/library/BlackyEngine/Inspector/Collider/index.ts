import GameObject from "../../GameObject";
import { InspectorType } from "../../common/enum";
import Inspector from "../inspector";

class Collider extends Inspector {
  constructor(gameObject: GameObject) {
    super(gameObject, InspectorType.COLLIDER);
    this.init();
  }

  public init() {}
}

export default Collider;
