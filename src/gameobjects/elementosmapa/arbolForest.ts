import Constantes from "../../constantes";
import Tronco from "../objetos/tronco";
import ElementoMapa from "./elementomapa";

export default class ArbolForest extends ElementoMapa {

    constructor(config: any) {
        super(config);
        this.vida = 15;
        this.resistencia = 1;
        this.herramientaNecesaria = Constantes.HERRAMIENTAS.TIPOS.HACHAS;
        this.puntuacion = 7;
        this.tipo = Constantes.ELEMENTOSMAPA.TIPOS.ARBOL;
        this.numRecursos = 5;

        this.setScale(2);
        this.setSize(10, 12);
        this.setOffset(1, 10);
    }

    soltarRecursos(): void {
        let numeroRecursos: number = Phaser.Math.Between(1, this.numRecursos);


        for (let i = 0; i < numeroRecursos; i++) {
            let posX = Phaser.Math.Between(this.body.x - 5, this.body.x + 5);
            let posY = Phaser.Math.Between(this.body.y - 5, this.body.y + 5);

            let recurso = new Tronco({
                escena: this.escena,
                x: posX,
                y: posY,
                texture: Constantes.OBJETOS.TRONCOPEQUENIO
            });
            recurso.setTexture(Constantes.OBJETOS.TRONCOPEQUENIO);
            this.escena.arrayObjetos.push(recurso);
        }
    }
}

