import Constantes from "../../constantes";
import Libro from "../objetos/libros/libro";
import Posicionable from "./posicionable";

export default class EstatuaRitual extends Posicionable{

    private libroPuesto: boolean;
    private nombrePoder: string;
    constructor(config: any){
        super(config);
        this.textura = Constantes.POSICIONABLES.ESTATUARITUAL;
        this.puntuacionObjeto = 8;
        this.libroPuesto = false;
        this.setInteractive();
        this.setSize(31, 24);
        this.setOffset(0, 7);

        this.on("pointerdown", ()=>{
            let jugador = this.escena.jugador;
            if(jugador.objetoEquipado && this.libroPuesto){
                jugador.objetoEquipado.poder = this.nombrePoder;
                this.libroPuesto = false;   
            }
            if(jugador.objetoEquipado && jugador.objetoEquipado.tipoObjeto == Constantes.OBJETOS.TIPOS.LIBROS && !this.libroPuesto){
                let libro = jugador.objetoEquipado as Libro;
                this.nombrePoder = libro.nombre;
                jugador.destruirObjetoEquipado();
                this.libroPuesto = true;
            }
        });

    }
}