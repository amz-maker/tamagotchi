import { InspectorType } from "../../common/enum";
import Inspector from "../inspector";

class RigidBody extends Inspector {
  constructor() {
    super(InspectorType.RIGID_BODY);
    this.init();
  }

  public init() { }
}

export default RigidBody;
