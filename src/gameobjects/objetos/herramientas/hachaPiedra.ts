import Constantes from "../../../constantes";
import Herramienta from "./herramienta";

export default class HachaPiedra extends Herramienta{

    constructor(config: any){
        super(config);

        this.puntuacionObjeto = 5;
        this.fuerza = 2;
        this.tipoHerramienta = Constantes.HERRAMIENTAS.TIPOS.HACHAS;
        this.resistencia = 1;
    }
}