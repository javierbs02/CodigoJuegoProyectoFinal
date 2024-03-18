import Constantes from "../../constantes";
import PatataCultivo from "./patataCultivo";
import Semilla from "./semilla";

export default class PatataSemilla extends Semilla{

    constructor(config: any){
        super(config);
        this.cultivoSemilla = PatataCultivo;
        this.texturaCultivo = Constantes.CULTIVOS.PATATA.ETAPAS.ETAPA1;
        this.puntuacionObjeto = 2;
    }
}