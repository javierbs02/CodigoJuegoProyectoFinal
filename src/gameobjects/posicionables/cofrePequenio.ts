import Constantes from "../../constantes";
import Tronco from "../objetos/tronco";
import Cofre from "./cofre";

export default class CofrePequenio extends Cofre{
    
    constructor(config: any){
        super(config);
        this.slots = 6;
        this.textura = Constantes.POSICIONABLES.COFRE.PEQUENIO.CERRADO;
        this.texturaAbierto = Constantes.POSICIONABLES.COFRE.PEQUENIO.ABIERTO;
        this.puntuacionObjeto = 12;
        this.filas = 1;
        this.columnas = 6;

        for (let i = 0; i < this.slots; i++) {
            this.objetos[i] = new Array();
            this.objetos[i][1] = 0;
        }
    }
}