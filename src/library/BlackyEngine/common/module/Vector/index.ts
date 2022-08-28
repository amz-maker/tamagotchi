import { IVector2 } from "../../interface";

export class Vector2 {
    public value: IVector2;

    constructor(x: number, y: number) {
        this.value = {
            x,
            y,
        };
    }

    public getX() {
        return this.value.x;
    }
    public setX(x: number) {
        this.value.x = x;
        return this;
    }

    public getY() {
        return this.value.y;
    }
    public setY(y: number) {
        this.value.y = y;
        return this;
    }

    public getValue() {
        return this.value;
    }
    public setValue(value: IVector2) {
        this.value = value;
        return this;
    }
}

const Vec2 = Vector2;

export { Vec2 };
export default Vector2;