import GameObject from "../../GameObject";
import Inspector from "../inspector";
import { Resource } from "../../common/module";
import { InspectorType } from "../../common/enum";
import Animation from "../Animation";
abstract class Renderer<
  TResource extends Resource = Resource
  > extends Inspector {
  protected resource?: TResource;

  protected animationInfo: {
    defaultAnimation?: Animation;
    nowAnimation?: Animation;
  }


  constructor(gameObject: GameObject, resource?: TResource) {
    super(gameObject, InspectorType.RENDERER);

    this.resource = this.setResource(resource).getResource();
    this.animationInfo = {};

    this.init();
  }

  public getResource() {
    return this.resource;
  }
  public setResource(resource: TResource | undefined) {
    if (resource === undefined) return this;

    resource.setGameObject(this.getGameObject());
    this.resource = resource;

    return this;
  }

  protected getDefaultAnimation() {
    return this.animationInfo.defaultAnimation;
  }

  public setDefaultAnimation(animation: Animation) {
    animation.setLoop(true);
    animation.start();
    this.animationInfo.defaultAnimation = animation;
    return this;
  }

  protected getNowAnimation() {
    return this.animationInfo.nowAnimation;
  }
  public setNowAnimation(animation: Animation) {
    this.animationInfo.nowAnimation = animation;
    return this;
  }

  public startAnimation() {
    const nowAnimation = this.getNowAnimation();

    if (nowAnimation !== undefined) {
      nowAnimation.start();
    }
  }
  public stopAnimation() {
    const nowAnimation = this.getNowAnimation();

    if (nowAnimation !== undefined) {
      nowAnimation.stop();
    }
  }

  public init() { }
  public render(ctx: CanvasRenderingContext2D): void {
    const defaultAnimation = this.getDefaultAnimation();
    const nowAnimation = this.getNowAnimation();

    if (nowAnimation !== undefined && nowAnimation.isRun()) {
      nowAnimation.drawNow(ctx);
      return;
    }

    if (defaultAnimation !== undefined && defaultAnimation.isRun()) {
      defaultAnimation.drawNow(ctx);
      return;
    }

    if (!!this.resource) {
      this.resource.draw(ctx);
    }
  }
}

namespace Renderer {
  export class SpriteRenderer extends Renderer<Resource.Sprite> {
    constructor(gameObject: GameObject, resource?: Resource.Sprite) {
      super(gameObject, resource);
    }
  }
}

export default Renderer;
