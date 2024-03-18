import Constantes from "../../constantes";
import Objeto from "./objeto";

export default class Recolectable extends Objeto{

    constructor(config: any){
        super(config);
        this.setDepth(1);
        this.tipoObjeto = Constantes.OBJETOS.TIPOS.RECOLECTABLES;
        this.usable = false;
    }

}