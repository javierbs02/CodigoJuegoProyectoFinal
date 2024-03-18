import Constantes from "../../../constantes";
import Libro from "./libro";

export default class Fuerza extends Libro{
    constructor(config: any){
        super(config);
        this.nombre = Constantes.LIBROS.FUERZA;
        this.puntuacionObjeto = 50;
    }
}