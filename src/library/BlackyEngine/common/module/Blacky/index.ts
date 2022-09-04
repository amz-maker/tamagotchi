import GameObject from "../../../GameObject";

abstract class Blacky {
    protected gameObject: GameObject;

    constructor(gameObject: GameObject) {
        this.gameObject = gameObject;
    }

    public setGameObject(gameObject: GameObject | undefined) {
        if (gameObject !== undefined) {
            this.gameObject = gameObject;
        }

        return this;
    }
    public getGameObject() {
        return this.gameObject;
    }
}

export default Blacky;