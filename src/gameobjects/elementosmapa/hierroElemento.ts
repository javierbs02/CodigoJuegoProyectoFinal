import Constantes from "../../constantes";
import Carbon from "../objetos/carbon";
import Hierro from "../objetos/hierro";
import MenaHierro from "../objetos/menaHierro";
import PiedraForest from "../objetos/piedraforest";
import ElementoMapa from "./elementomapa";

export default class HierroElemento extends ElementoMapa{

    constructor(config: any){
        super(config);
        this.vida = 25;
        this.resistencia = 1;
        this.herramientaNecesaria = Constantes.HERRAMIENTAS.TIPOS.PICOS;
        this.puntuacion = 15;
        this.numRecursos = 3;
        this.tipo = Constantes.ELEMENTOSMAPA.TIPOS.ROCA;
    }

    soltarRecursos(): void {
        let numeroRecursos: number = Phaser.Math.Between(0, this.numRecursos - 1);
        for (let i = 0; i < numeroRecursos; i++) {
            let posX = Phaser.Math.Between(this.body.x - 5, this.body.x + 5);
            let posY = Phaser.Math.Between(this.body.y - 5, this.body.y + 5);
 
            let recurso = new PiedraForest({
                escena: this.escena,
                x: posX,
                y: posY,
                textura: Constantes.OBJETOS.PIEDRAFOREST
            });
            this.escena.arrayObjetos.push(recurso);
        }

        numeroRecursos = Phaser.Math.Between(1, this.numRecursos);
        for (let i = 0; i < numeroRecursos; i++) {
            let posX = Phaser.Math.Between(this.body.x - 5, this.body.x + 5);
            let posY = Phaser.Math.Between(this.body.y - 5, this.body.y + 5);
 
            let recurso = new MenaHierro({
                escena: this.escena,
                x: posX,
                y: posY,
                textura: Constantes.OBJETOS.MENAHIERRO
            });
            this.escena.arrayObjetos.push(recurso);
        }
    }
}