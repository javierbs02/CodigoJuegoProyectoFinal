import Recolectable from "./recolectable";

export default class PiedraForest extends Recolectable {
    constructor(config: any) {
        super(config);
        this.setSize(10, 7);
        this.setOffset(0, 0);
        this.puntuacionObjeto = 2;
    }
}