import Armadura from "./armadura";

export default class ArmaduraCuero extends Armadura{
    constructor(config: any){
        super(config);
        this.puntuacionObjeto = 10;
        this.fuerza = 1;
    }
}