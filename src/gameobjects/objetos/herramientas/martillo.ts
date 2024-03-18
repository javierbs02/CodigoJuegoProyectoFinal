import Constantes from "../../../constantes";
import Herramienta from "./herramienta";

export default class Martillo extends Herramienta{
     constructor(config: any){
        super(config);
        this.puntuacionObjeto = 5;
        this.fuerza = 0;
        this.resistencia = 1;
        this.tipoHerramienta = Constantes.HERRAMIENTAS.TIPOS.MARTILLO;
     }
}