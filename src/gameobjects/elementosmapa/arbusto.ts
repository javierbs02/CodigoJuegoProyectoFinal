import Constantes from "../../constantes";
import PatataSemilla from "../cultivos/patataSemilla";
import ElementoMapa from "./elementomapa";

export default class Arbusto extends ElementoMapa {
    constructor(config: any) {
        super(config);
        this.vida = 3;
        this.resistencia = 1;
        this.herramientaNecesaria = Constantes.HERRAMIENTAS.TIPOS.ESPADAS;
        this.puntuacion = 3;
        this.numRecursos = 3;
        this.tipo = Constantes.ELEMENTOSMAPA.TIPOS.ARBUSTO;

    }

    soltarRecursos(): void {
        let numeroRecursos: number = Phaser.Math.Between(1, this.numRecursos);


        for (let i = 0; i < numeroRecursos; i++) {
            let posX = Phaser.Math.Between(this.body.x - 5, this.body.x + 5);
            let posY = Phaser.Math.Between(this.body.y - 5, this.body.y + 5);

            let recurso = new PatataSemilla({
                escena: this.escena,
                x: posX,
                y: posY,
                textura: Constantes.CULTIVOS.PATATA.SEMILLA
            });
            this.escena.arrayObjetos.push(recurso);
        }
    }
}