import Constantes from "../../constantes";
import PiedraRojiza from "./piedraRojiza";
import Recolectable from "./recolectable";

export default class MenaPiedraRojiza extends Recolectable{
    constructor(config: any){
        super(config);
        this.setDepth(1);
        this.puntuacionObjeto = 40;
        this.cocinable = true;
        this.resultadoAlCocinar = PiedraRojiza;
        this.texturaAlCocinar = Constantes.OBJETOS.PIEDRAROJIZA;
    }
}