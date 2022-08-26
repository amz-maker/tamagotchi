import GameObject from "../../GameObject";
import { InspectorType } from "../../common/enum";
import Inspector from "../inspector";

class RigidBody extends Inspector {
  constructor(gameObject: GameObject) {
    super(gameObject, InspectorType.RIGID_BODY);
    this.init();
  }

  public init() {}
}

export default RigidBody;
