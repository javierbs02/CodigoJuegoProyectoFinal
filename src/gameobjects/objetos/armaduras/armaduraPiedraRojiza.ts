import Armadura from "./armadura";

export default class ArmaduraPiedraRojiza extends Armadura{
    constructor(config: any){
        super(config);
        this.puntuacionObjeto = 50;
        this.fuerza = 6;
    }
}