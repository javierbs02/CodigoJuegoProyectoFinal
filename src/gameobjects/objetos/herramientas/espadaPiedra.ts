import Constantes from "../../../constantes";
import Herramienta from "./herramienta";

export default class EspadaPiedra extends Herramienta{

    constructor(config: any){
        super(config);
        this.puntuacionObjeto = 5;
        this.fuerza = 2;
        this.resistencia = 1;
        this.tipoHerramienta = Constantes.HERRAMIENTAS.TIPOS.ESPADAS;
        this.setSize(17, 17);
        this.setOffset(0, 0);
    }
}