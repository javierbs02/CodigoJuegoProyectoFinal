import Recolectable from "./recolectable";

export default class Huevo extends Recolectable{

    constructor(config: any){
        super(config);
        this.puntuacionObjeto = 4;
    }
}