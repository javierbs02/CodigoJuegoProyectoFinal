import Constantes from "../../../constantes";
import Herramienta from "./herramienta";

export default class InfraEspada extends Herramienta{
    constructor(config: any){
        super(config);
        this.puntuacionObjeto = 70;
        this.fuerza = 9;
        this.resistencia = 3;
        this.tipoHerramienta = Constantes.HERRAMIENTAS.TIPOS.ESPADAS;
    }
}