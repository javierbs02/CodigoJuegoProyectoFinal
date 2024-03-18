import Constantes from "../../../constantes";
import Herramienta from "./herramienta";

export default class PicoPiedra extends Herramienta{

    constructor(config: any){
        super(config);
        this.puntuacionObjeto = 5;
        this.fuerza = 2;
        this.tipoHerramienta = Constantes.HERRAMIENTAS.TIPOS.PICOS;
        this.resistencia = 1;
    }
}