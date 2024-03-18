import Constantes from "../../constantes";
import Oro from "./oro";
import Recolectable from "./recolectable";

export default class MenaOro extends Recolectable{
    constructor(config: any){
        super(config);
        this.setDepth(1);
        this.puntuacionObjeto = 7;
        this.cocinable = true;
        this.resultadoAlCocinar = Oro;
        this.texturaAlCocinar = Constantes.OBJETOS.ORO;
    }
}