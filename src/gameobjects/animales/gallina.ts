import Constantes from "../../constantes";
import Huevo from "../objetos/huevo";
import Pluma from "../objetos/pluma";
import Animal from "./animal";

export default class Gallina extends Animal{
    constructor(config: any) {
        super(config);

        this.vida = 8;
        this.velocidad = 30;
        this.puntuacion = 7;
        this.numRecursos = 3;
        this.direccion = "left";
        this.animacionCorrer = Constantes.ANIMALES.GALLINA.ANIMACION.CORRER;
        this.anims.play(this.animacionCorrer, true);
        this.setSize(16, 16);
        this.setOffset(0, 0);
    }

    caminar(): void {
        if (this.direccion == "left") {
            this.anims.play(this.animacionCorrer, true);
            this.setVelocityX(-this.velocidad);
            this.setVelocityY(0);
            this.flipX = true;
        }
        else if (this.direccion == "right") {
            this.anims.play(this.animacionCorrer, true);
            this.setVelocityX(this.velocidad);
            this.setVelocityY(0);
            this.flipX = false;
        }
        else if (this.direccion == "up") {
            this.anims.play(this.animacionCorrer, true);
            this.setVelocityY(-this.velocidad);
            this.setVelocityX(0);
            this.flipX = false;
        }
        else if (this.direccion == "bottom") {
            this.anims.play(this.animacionCorrer, true);
            this.setVelocityY(this.velocidad);
            this.setVelocityX(0);
            this.flipX = false;
        }

        this.tiempoHerido++;
        if (this.tiempoHerido >= 200) {
            this.clearTint();
            this.tiempoHerido = 0;
            this.estaHerido = false;
            this.setInteractive();
        }

        if(this.direccion == "idle"){
            let indice = Phaser.Math.Between(0, 4);
            this.direccion == this.arrayDirecciones[indice];
        }
    }

    soltarRecursos(): void{
        let numeroRecursos: number = Phaser.Math.Between(1, this.numRecursos);


        for (let i = 0; i < numeroRecursos; i++) {
            let posX = Phaser.Math.Between(this.body.x - 5, this.body.x + 5);
            let posY = Phaser.Math.Between(this.body.y - 5, this.body.y + 5);

            let recurso = new Pluma({
                escena: this.escena,
                x: posX,
                y: posY,
                textura: Constantes.OBJETOS.PLUMA
            });
            this.escena.arrayObjetos.push(recurso);
        }
        numeroRecursos = Phaser.Math.Between(0, this.numRecursos);
        for (let i = 0; i < numeroRecursos; i++) {
            let posX = Phaser.Math.Between(this.body.x - 5, this.body.x + 5);
            let posY = Phaser.Math.Between(this.body.y - 5, this.body.y + 5);

            let recurso = new Huevo({
                escena: this.escena,
                x: posX,
                y: posY,
                textura: Constantes.OBJETOS.HUEVO
            });
            this.escena.arrayObjetos.push(recurso);
        }
    }
}