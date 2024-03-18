import Constantes from "../../../constantes";
import Herramienta from "./herramienta";

export default class Arco extends Herramienta{

    constructor(config: any){
        super(config);
        this.puntuacionObjeto = 9;
        this.fuerza = 1;
        this.resistencia = 1;
        this.tipoHerramienta = Constantes.HERRAMIENTAS.TIPOS.ARCO;
    }
}