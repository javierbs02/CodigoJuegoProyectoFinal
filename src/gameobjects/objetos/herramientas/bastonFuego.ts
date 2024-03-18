import Constantes from "../../../constantes";
import Herramienta from "./herramienta";

export default class BastonFuego extends Herramienta{
    constructor(config: any){
        super(config);
        this.puntuacionObjeto = 20;
        this.fuerza = 3;
        this.resistencia = 2;
        this.tipoHerramienta = Constantes.HERRAMIENTAS.TIPOS.BASTON;
    }
}