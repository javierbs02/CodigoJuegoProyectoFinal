import Constantes from "../../../constantes";
import Herramienta from "./herramienta";

export default class EspadaHierro extends Herramienta{
    constructor(config: any){
        super(config);
        this.puntuacionObjeto = 10;
        this.fuerza = 4;
        this.resistencia = 2;
        this.tipoHerramienta = Constantes.HERRAMIENTAS.TIPOS.ESPADAS;
    }
}