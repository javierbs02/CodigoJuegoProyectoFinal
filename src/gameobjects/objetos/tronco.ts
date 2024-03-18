import Recolectable from "./recolectable";

export default class Tronco extends Recolectable{

    constructor(config: any){
        super(config);
        this.setSize(15, 15);
        this.setOffset(0, 0);
        this.puntuacionObjeto = 2;
        this.esCombustible = true;
        this.fuerza = 2;
    }
}