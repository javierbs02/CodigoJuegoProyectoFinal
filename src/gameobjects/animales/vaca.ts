import Constantes from "../../constantes";
import CarneCruda from "../objetos/consumibles/carneCruda";
import CueroVaca from "../objetos/cueroVaca";
import Animal from "./animal";

export default class Vaca extends Animal {
    
    constructor(config: any) {
        super(config);

        this.vida = 8;
        this.velocidad = 30;
        this.puntuacion = 7;
        this.numRecursos = 2;
        this.direccion = "idle";
        this.animacionEspera = Constantes.ANIMALES.VACA.ANIMACION.ESPERA;
        this.animacionCorrer = Constantes.ANIMALES.VACA.ANIMACION.CORRER;
        this.anims.play(this.animacionEspera, true);
        this.setSize(24, 16);
        this.setOffset(0, 0);
    }

    soltarRecursos(): void{
        let numeroRecursos: number = Phaser.Math.Between(1, this.numRecursos);


        for (let i = 0; i < numeroRecursos; i++) {
            let posX = Phaser.Math.Between(this.body.x - 5, this.body.x + 5);
            let posY = Phaser.Math.Between(this.body.y - 5, this.body.y + 5);

            let recurso = new CarneCruda({
                escena: this.escena,
                x: posX,
                y: posY,
                textura: Constantes.COMIDA.NOCOCINADA.CARNE
            });
            recurso.setTexture(Constantes.COMIDA.NOCOCINADA.CARNE);
            this.escena.arrayObjetos.push(recurso);
        }
        numeroRecursos = Phaser.Math.Between(0, this.numRecursos);
        for (let i = 0; i < numeroRecursos; i++) {
            let posX = Phaser.Math.Between(this.body.x - 5, this.body.x + 5);
            let posY = Phaser.Math.Between(this.body.y - 5, this.body.y + 5);

            let recurso = new CueroVaca({
                escena: this.escena,
                x: posX,
                y: posY,
                textura: Constantes.OBJETOS.CUEROVACA
            });
            this.escena.arrayObjetos.push(recurso);
        }
    }

}