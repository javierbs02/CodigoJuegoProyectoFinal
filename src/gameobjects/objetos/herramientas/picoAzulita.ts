import Constantes from "../../../constantes";
import Herramienta from "./herramienta";

export default class PicoAzulita extends Herramienta{
    constructor(config: any){
        super(config);
        this.puntuacionObjeto = 30;
        this.fuerza = 6;
        this.tipoHerramienta = Constantes.HERRAMIENTAS.TIPOS.PICOS;
        this.resistencia = 3;
    }
}