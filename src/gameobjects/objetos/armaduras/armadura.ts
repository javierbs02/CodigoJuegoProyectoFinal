import Constantes from "../../../constantes";
import Objeto from "../objeto";

export default class Armadura extends Objeto{

    constructor(config: any){
        super(config);
        this.tipoObjeto = Constantes.OBJETOS.TIPOS.ARMADURAS;
    }
}