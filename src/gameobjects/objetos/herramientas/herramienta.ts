import Constantes from "../../../constantes";
import Objeto from "../objeto";

export default class Herramienta extends Objeto{

    public resistencia: number;
    
    constructor(config: any){
        super(config);
        this.setDepth(1);
        this.tipoObjeto = Constantes.OBJETOS.TIPOS.HERRAMIENTAS;
        this.usable = false;
    }
}