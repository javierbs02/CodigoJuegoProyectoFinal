import Constantes from "../../../constantes";
import Objeto from "../objeto";

export default class Libro extends Objeto{

    public nombre: string;
    constructor(config: any){
        super(config);
        this.tipoObjeto = Constantes.OBJETOS.TIPOS.LIBROS;
    }
}