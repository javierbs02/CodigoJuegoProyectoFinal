import Constantes from "../../../constantes";
import Libro from "./libro";

export default class Fortuna extends Libro{

    constructor(config: any){
        super(config);
        this.nombre = Constantes.LIBROS.FORTUNA;
        this.puntuacionObjeto = 50;
    }
}