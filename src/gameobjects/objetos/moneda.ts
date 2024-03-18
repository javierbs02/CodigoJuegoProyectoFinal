import Constantes from "../../constantes";
import Recolectable from "./recolectable";

export default class Moneda extends Recolectable{
    constructor(config: any){
        super(config);
        this.puntuacionObjeto = 0;
        this.tipoObjeto = Constantes.OBJETOS.TIPOS.MONEDAS;
        this.play(Constantes.OBJETOS.MONEDA.ANIMACION);
    }

}