import Recolectable from "./recolectable";

export default class OrbeRojo extends Recolectable{

    constructor(config: any){
        super(config);
        this.puntuacionObjeto = 7;
        this.fuerza = 3;
    }
}