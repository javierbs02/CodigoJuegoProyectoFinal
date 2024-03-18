import Recolectable from "./recolectable";

export default class BolaDeSlime extends Recolectable{
    constructor(config: any){
        super(config);
        this.puntuacionObjeto = 3;
    }
}