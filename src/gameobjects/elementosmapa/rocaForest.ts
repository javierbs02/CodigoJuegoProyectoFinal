import Constantes from "../../constantes";
import PiedraForest from "../objetos/piedraforest";
import ElementoMapa from "./elementomapa";

export default class RocaForest extends ElementoMapa{

    constructor(config: any){
        super(config);
        this.vida = 15;
        this.resistencia = 1;
        this.herramientaNecesaria = Constantes.HERRAMIENTAS.TIPOS.PICOS;
        this.puntuacion = 7;
        this.numRecursos = 5;
        this.tipo = Constantes.ELEMENTOSMAPA.TIPOS.ROCA;

    }

    soltarRecursos(): void {
        let numeroRecursos: number = Phaser.Math.Between(1, this.numRecursos);


        for (let i = 0; i < numeroRecursos; i++) {
            let posX = Phaser.Math.Between(this.body.x - 5, this.body.x + 5);
            let posY = Phaser.Math.Between(this.body.y - 5, this.body.y + 5);
 
            let recurso = new PiedraForest({
                escena: this.escena,
                x: posX,
                y: posY,
                texture: Constantes.OBJETOS.PIEDRAFOREST
            });
            recurso.setTexture(Constantes.OBJETOS.PIEDRAFOREST);
            this.escena.arrayObjetos.push(recurso);
        }
    }
}