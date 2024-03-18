import Constantes from "../../constantes";
import Objeto from "../objetos/objeto";
import Recolectable from "../objetos/recolectable";

export default class Semilla extends Recolectable{
    public cultivoSemilla: any;
    public texturaCultivo: any;

    constructor(config: any){
        super(config);
        this.setDepth(1);
        this.tipoObjeto = Constantes.OBJETOS.TIPOS.SEMILLAS;
    }
}