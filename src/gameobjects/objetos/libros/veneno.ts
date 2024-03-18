import Constantes from "../../../constantes";
import Libro from "./libro";

export default class Veneno extends Libro{
    constructor(config: any){
        super(config);
        this.nombre = Constantes.LIBROS.VENENO;
        this.puntuacionObjeto = 50;
    }
}