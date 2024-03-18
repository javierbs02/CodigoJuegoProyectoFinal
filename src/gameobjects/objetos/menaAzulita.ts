import Constantes from "../../constantes";
import Azulita from "./azulita";
import Recolectable from "./recolectable";

export default class MenaAzulita extends Recolectable{
    constructor(config: any){
        super(config);
        this.setDepth(1);
        this.puntuacionObjeto = 15;
        this.cocinable = true;
        this.resultadoAlCocinar = Azulita;
        this.texturaAlCocinar = Constantes.OBJETOS.AZULITA;
    }
}