import Recolectable from "./recolectable";

export default class Regadera extends Recolectable{
    public cantidadAgua: number;
    public maxCantidadAgua: number;

    constructor(config: any){
        super(config);
        this.setDepth(1);
        this.puntuacionObjeto = 12;
        this.cantidadAgua = 0;
        this.maxCantidadAgua = 6;
    }

}