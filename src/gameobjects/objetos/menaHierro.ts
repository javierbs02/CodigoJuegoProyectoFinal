import Constantes from "../../constantes";
import Hierro from "./hierro";
import Recolectable from "./recolectable";

export default class MenaHierro extends Recolectable{

    constructor(config: any){
        super(config);
        this.setDepth(1);
        this.puntuacionObjeto = 4;
        this.cocinable = true;
        this.resultadoAlCocinar = Hierro;
        this.texturaAlCocinar = Constantes.OBJETOS.HIERRO;
    }
}