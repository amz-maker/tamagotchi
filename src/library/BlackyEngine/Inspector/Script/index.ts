import { InspectorType } from "../../enum";
import Inspector from "../inspector";

class Script extends Inspector {
  constructor(name: string) {
    super(InspectorType.SCRIPT, name);
    this.init();
  }

  public init() {}
}

export default Script;
