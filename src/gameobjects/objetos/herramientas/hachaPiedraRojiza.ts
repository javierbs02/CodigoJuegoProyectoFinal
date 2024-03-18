import Constantes from "../../../constantes";
import Herramienta from "./herramienta";

export default class HachaPiedraRojiza extends Herramienta{
    constructor(config: any){
        super(config);

        this.puntuacionObjeto = 50;
        this.fuerza = 7;
        this.tipoHerramienta = Constantes.HERRAMIENTAS.TIPOS.HACHAS;
        this.resistencia = 3;
    }
}