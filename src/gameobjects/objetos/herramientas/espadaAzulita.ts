import Constantes from "../../../constantes";
import Herramienta from "./herramienta";

export default class EspadaAzulita extends Herramienta{
    constructor(config: any){
        super(config);
        this.puntuacionObjeto = 30;
        this.fuerza = 6;
        this.resistencia = 3;
        this.tipoHerramienta = Constantes.HERRAMIENTAS.TIPOS.ESPADAS;
    }
}