import Constantes from "../../../constantes";
import Herramienta from "./herramienta";

export default class PicoHierro extends Herramienta{
    constructor(config: any){
        super(config);
        this.puntuacionObjeto = 10;
        this.fuerza = 4;
        this.tipoHerramienta = Constantes.HERRAMIENTAS.TIPOS.PICOS;
        this.resistencia = 2;
    }
}