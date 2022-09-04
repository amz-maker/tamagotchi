import GameObject from "../../GameObject";
import { InspectorType } from "../../common/enum";
import Inspector from "../inspector";
import { Resource } from "../../common/module";

export interface IMotion {
  spritePosition: Resource.ISpritePosition;
  frame: number;
}
class Animation extends Inspector {
  private sprite: Resource.Sprite;
  private motions: IMotion[];
  private loop: boolean = false;

  private callback: () => void = () => { };
  private nowframeCount: number = -1;
  private isRunFlag: boolean = false;

  constructor(gameObject: GameObject, name: string, image: HTMLImageElement, motions: IMotion[] = []) {
    super(gameObject, InspectorType.ANIMATION, name);

    this.motions = motions;
    this.sprite = this.setSprite(new Resource.Sprite(image, {
      sx: 0,
      sy: 0,
      sw: image.width,
      sh: image.height,
    })).getSprite();
    this.init();
  }

  public setMotions(motions: IMotion[]) {
    this.motions = motions;
  }
  public addMotions(motion: IMotion) {
    this.motions.push(motion);
  }

  public getLoop() {
    return this.loop;
  }
  public setLoop(bool: boolean) {
    this.loop = bool;
    return this;
  }

  protected setSprite(sprite: Resource.Sprite) {
    this.sprite = sprite;
    return this;
  }
  protected getSprite() {
    return this.sprite;
  }

  public setCallback(callback: () => void) {
    this.callback = callback;
  }

  public start() {
    this.nowframeCount = -1;
    this.isRunFlag = true;
  }

  public stop() {
    this.isRunFlag = false;
  }

  public isRun() {
    return this.isRunFlag;
  }

  public drawNow(ctx: CanvasRenderingContext2D) {
    if (!this.isRunFlag) return;

    const sumFrame = this.motions.reduce((sum, motion) => sum + motion.frame, 0);
    let count = 0;
    for (let motion of this.motions) {
      if (count <= this.nowframeCount && this.nowframeCount < count + motion.frame) {
        this.sprite.setSpritePosition(motion.spritePosition);
        this.sprite.draw(this.getGameObject(), ctx);

        // 애니메이션 마지막 프레임 draw 시 callback 함수 호출

        if (this.nowframeCount === sumFrame - 1) {
          this.callback();
        }
        break;
      }
      count += motion.frame;
    }
  }

  public init() { }
  public update(): void {
    if (this.isRunFlag) {
      const sumFrame = this.motions.reduce((sum, motion) => sum + motion.frame, 0);

      // 마지막 프레임 직후
      if (this.nowframeCount === sumFrame - 1 && !this.loop) {
        this.stop();
      }

      this.nowframeCount = (this.nowframeCount + 1) % sumFrame;
    }
  }
}

export default Animation;
