import Recolectable from "./recolectable";

export default class PiedraRojiza extends Recolectable{
    constructor(config: any){
        super(config);
        this.setDepth(1);
        this.puntuacionObjeto = 50;
    }
}