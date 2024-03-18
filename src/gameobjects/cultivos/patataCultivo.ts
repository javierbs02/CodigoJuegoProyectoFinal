import Constantes from "../../constantes";
import Patata from "../objetos/consumibles/patata";
import Cultivo from "./cultivo";
import PatataSemilla from "./patataSemilla";

export default class PatataCultivo extends Cultivo {
    constructor(config: any) {
        super(config);
        this.etapa = 1;
        this.numEtapas = 5;

        for (let i = 0; i < this.numEtapas; i++) {
            this.texturaEtapas[i] = Constantes.CULTIVOS.PATATA.ETAPAS[`ETAPA${i + 1}`];
        }
        this.setSize(16, 16);
        this.setOffset(0, 0);

    }

    soltarRecursos(): void {
        if (this.etapa == this.numEtapas) {
            let recurso = new Patata({
                escena: this.escena,
                x: this.body.x,
                y: this.body.y,
                textura: Constantes.CULTIVOS.PATATA.ID
            });
            this.escena.arrayObjetos.push(recurso);
            let numeroRandom = Phaser.Math.Between(1, 3);
            for (let i = 0; i < numeroRandom; i++) {
                let posX = Phaser.Math.Between(this.body.x - 5, this.body.x + 5);
                let posY = Phaser.Math.Between(this.body.y - 5, this.body.y + 5);
                let semilla = new PatataSemilla({
                    escena: this.escena,
                    x: posX,
                    y: posY,
                    textura: Constantes.CULTIVOS.PATATA.SEMILLA
                });
                this.escena.arrayObjetos.push(semilla);
            }
            let indice = this.escena.arrayCultivos.indexOf(this);
            this.escena.arrayCultivos.splice(indice, 1);
            this.escena.grupoCultivos.remove(this, true);
            this.fisicasEnElMapa();
            this.zonaFertil.estaMojada = false;
            this.destroy();
        }
    }
}