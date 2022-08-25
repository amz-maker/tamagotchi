import { InspectorType } from "../../common/enum";
import Inspector from "../inspector";

class Collider extends Inspector {
  constructor() {
    super(InspectorType.COLLIDER);
    this.init();
  }

  public init() { }
}

export default Collider;
