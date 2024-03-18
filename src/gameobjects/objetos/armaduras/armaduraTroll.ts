import Armadura from "./armadura";

export default class ArmaduraTroll extends Armadura{
    constructor(config: any){
        super(config);
        this.puntuacionObjeto = 18;
        this.fuerza = 4;
    }
}