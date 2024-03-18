import Constantes from "../../../constantes";
import Herramienta from "./herramienta";

export default class EspadaPiedraRojiza extends Herramienta{
    constructor(config: any){
        super(config);
        this.puntuacionObjeto = 50;
        this.fuerza = 7;
        this.resistencia = 3;
        this.tipoHerramienta = Constantes.HERRAMIENTAS.TIPOS.ESPADAS;
    }
}