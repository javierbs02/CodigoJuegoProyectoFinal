import Constantes from "../../constantes";
import Semilla from "./semilla";
import TomateCultivo from "./tomateCultivo";

export default class TomateSemilla extends Semilla{
    constructor(config: any){
        super(config);
        this.cultivoSemilla = TomateCultivo;
        this.texturaCultivo = Constantes.CULTIVOS.PATATA.ETAPAS.ETAPA1;
        this.puntuacionObjeto = 8;
    }
}