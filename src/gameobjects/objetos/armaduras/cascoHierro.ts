import Armadura from "./armadura";

export default class CascoHierro extends Armadura{
    constructor(config: any){
        super(config);
        this.puntuacionObjeto = 15;
        this.fuerza = 2;
    }
}