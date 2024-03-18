import Recolectable from "./recolectable";

export default class Flecha extends Recolectable{
    constructor(config: any){
        super(config);
        this.setDepth(1);
        this.puntuacionObjeto = 5;
        this.fuerza = 1;
    }
}