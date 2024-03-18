import Recolectable from "./recolectable";

export default class Azulita extends Recolectable{
    constructor(config: any){
        super(config);
        this.setDepth(1);
        this.puntuacionObjeto = 20;
    }
}