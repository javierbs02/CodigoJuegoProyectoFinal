import Constantes from "../../constantes";
import Enemigo from "../enemigo";
import CueroTroll from "../objetos/cueroTroll";

export default class Troll extends Enemigo {

    constructor(config: any) {
        super(config);

        this.fuerza = 10;
        this.velocidad = 20;
        this.vida = 30;
        this.puntuacion = 20;
        this.distanciaAgresivo = 180;
        this.numMonedas = 8;
        this.numRecursos = 3;

        this.animacionCorrer = Constantes.ENEMIGOS.TROLL.ANIMACION.CORRER;
        this.animacionEspera = Constantes.ENEMIGOS.TROLL.ANIMACION.ESPERA;
        this.direccion = "idle";
        this.anims.play(this.animacionEspera, true);
    }

    atacar(): void {
        let jugador = this.escena.jugador;
        let distanciaJugador = Phaser.Math.Distance.Between(this.body.x, this.body.y, jugador.body.x, jugador.body.y);
        if (distanciaJugador <= this.distanciaAgresivo || this.estaHerido) {
            this.agresivo = true;

            const playerPosition = {
                x: jugador.body.x,
                y: jugador.body.y
            };
            const enemyPosition = {
                x: this.body.x,
                y: this.body.y
            };

            const direction = {
                x: playerPosition.x - enemyPosition.x,
                y: playerPosition.y - enemyPosition.y
            };

            const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y);

            const normalizedDirection = {
                x: direction.x / magnitude,
                y: direction.y / magnitude
            };
            const speed = this.velocidad; // ajusta la velocidad según tus necesidades
            const velocity = {
                x: normalizedDirection.x * speed,
                y: normalizedDirection.y * speed
            };

            this.setVelocity(velocity.x, velocity.y);
            if (velocity.x < 0) {
                this.flipX = true;
            }
            else {
                this.flipX = false;
            }
            if (this.direccion == "idle") {
                this.direccion = this.arrayDirecciones[Phaser.Math.Between(0, 3)];
            }
        }
        if (distanciaJugador >= this.distanciaAgresivo && this.agresivo) {
            this.escena.time.addEvent({
                //Tiempo q  ue hay que esperar
                delay: 3000, //3000 milisegundos
                //Lo que pasa cuando se agota el tiempo
                callback: () => {
                    this.agresivo = false;
                }
            });
        }
    }

    soltarRecursos(): void {
        let numero = Phaser.Math.Between(1, this.numRecursos);

        for (let i = 0; i < numero; i++) {
            let posX = Phaser.Math.Between(this.body.x - 5, this.body.x + 5);
            let posY = Phaser.Math.Between(this.body.y - 5, this.body.y + 5);

            let recurso = new CueroTroll({
                escena: this.escena,
                x: posX,
                y: posY,
                textura: Constantes.OBJETOS.CUEROTROLL
            });
            this.escena.arrayObjetos.push(recurso);
        }
    }

}