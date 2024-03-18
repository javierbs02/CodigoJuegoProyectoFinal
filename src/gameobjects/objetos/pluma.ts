import Recolectable from "./recolectable";

export default class Pluma extends Recolectable {
    constructor(config: any) {
        super(config);
        this.puntuacionObjeto = 4;
    }
}