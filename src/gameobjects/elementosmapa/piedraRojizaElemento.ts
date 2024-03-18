import Constantes from "../../constantes";
import MenaPiedraRojiza from "../objetos/menaPiedraRojiza";
import PiedraForest from "../objetos/piedraforest";
import ElementoMapa from "./elementomapa";

export default class PiedraRojizaElemento extends ElementoMapa{
    constructor(config: any){
        super(config);
        this.vida = 200;
        this.resistencia = 2;
        this.herramientaNecesaria = Constantes.HERRAMIENTAS.TIPOS.PICOS;
        this.puntuacion = 50;
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
 
            let recurso = new MenaPiedraRojiza({
                escena: this.escena,
                x: posX,
                y: posY,
                textura: Constantes.OBJETOS.MENAPIEDRAROJIZA
            });
            this.escena.arrayObjetos.push(recurso);
        }
    }
}