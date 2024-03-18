import Recolectable from "./recolectable";

export default class Carbon extends Recolectable{

    constructor(config: any){
        super(config);
        this.esCombustible = true;
        this.fuerza = 2;
        this.puntuacionObjeto = 5;
    }
}