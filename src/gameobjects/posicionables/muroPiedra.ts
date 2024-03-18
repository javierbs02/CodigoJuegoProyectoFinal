import Constantes from "../../constantes";
import Muro from "./muro";

export default class MuroPiedra extends Muro{

    constructor(config: any){
        super(config);
        this.puntuacionObjeto = 3;
        this.vida = 30;
        this.textura = Constantes.POSICIONABLES.CONSTRUCTOR.MUROS.MUROPIEDRA;
        this.setSize(6, 6);
        this.setOffset(2, 1);
    }
}