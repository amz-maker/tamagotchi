import GameObject from "../../../GameObject";
import { Blacky, Size, Vector2 } from "..";
import { InspectorType } from "../../enum";
import { Util } from "../../util";

interface IFlip {
    x?: boolean;
    y?: boolean;
}

export abstract class Resource<TObject = HTMLImageElement>{
    private object?: TObject;
    private flip: IFlip;

    constructor(object?: TObject) {
        this.object = this.setObject(object).getObject();
        this.flip = this.setFlip({
            x: false,
            y: false,
        }).getFlip();
    }

    public getObject() {
        return this.object;
    }
    public setObject(object: TObject | undefined) {
        this.object = object;
        return this;
    }

    public getFlip() {
        return this.flip;
    }
    public getVectorFlip() {
        const flip = this.getFlip();
        return new Vector2(flip.x ? -1 : 1, flip.y ? -1 : 1);
    }
    public setFlip(flip: IFlip) {
        const tempFlip = { ...this.getFlip(), ...flip };
        this.flip = tempFlip;
        return this;
    }

    abstract getSize(): Size;
    abstract draw(gameObject: GameObject, ctx: CanvasRenderingContext2D): void;
}
export namespace Resource {
    // Sprite
    export interface ISpritePosition {
        sx: number;
        sy: number;
        sw: number;
        sh: number;
    }
    export class Sprite extends Resource<HTMLImageElement> {
        public spritePosition: ISpritePosition;

        constructor(
            image: HTMLImageElement,
            spritePosition: ISpritePosition = {
                sx: 0,
                sy: 0,
                sw: image.width,
                sh: image.height,
            }
        ) {
            super(image);
            this.spritePosition = spritePosition;
        }

        public getSize(): Size {
            const object = this.getObject();
            return new Size(object?.width ?? 0, object?.height ?? 0);
        }
        public setSize(size: Size) {
            const object = this.getObject();
            if (object !== undefined) {
                object.width = size.getWidth();
                object.height = size.getHeight();
            }
            return this;
        }

        public getSpritePosition() {
            return this.spritePosition;
        }
        public setSpritePosition(spritePosition: ISpritePosition) {
            this.spritePosition = spritePosition;
            return this;
        }

        public draw(gameObject: GameObject, ctx: CanvasRenderingContext2D) {
            const object = this.getObject();
            const transform = gameObject.getInspector(InspectorType.TRANSFORM);

            if (transform !== undefined && object !== undefined) {
                const position = transform.getPosition();
                const offset = transform.getOffset();
                const spritePosition = this.getSpritePosition();
                const rScale = Util.Vector.multiply(
                    transform.getScale(),
                    this.getVectorFlip()
                );
                const unitScale = Util.Vector.toUnit(rScale);

                ctx.save();
                ctx.translate(
                    spritePosition.sw * offset.getX() * Math.abs(rScale.getX()),
                    spritePosition.sh * offset.getY() * Math.abs(rScale.getY())
                );
                ctx.scale(rScale.getX(), rScale.getY());
                ctx.drawImage(
                    object,
                    spritePosition.sx,
                    spritePosition.sy,
                    spritePosition.sw,
                    spritePosition.sh,
                    position.getX() / rScale.getX(),
                    position.getY() / rScale.getY(),
                    spritePosition.sw * unitScale.getX(),
                    spritePosition.sh * unitScale.getY()
                );
                ctx.restore();
            }
        }
    }
    // Simple Image
    export class SimpleImage extends Resource<HTMLImageElement> {
        constructor(src: string) {
            const img = new Image();
            img.src = src;
            super(img);
        }

        public getSize(): Size {
            const object = this.getObject();
            return new Size(object?.width ?? 0, object?.height ?? 0);
        }
        public draw(gameObject: GameObject, ctx: CanvasRenderingContext2D) { }
    }
}

export default Resource;