import Constantes from "../../constantes";
import Enemigo from "../enemigo";

export default class Esqueleto extends Enemigo{

    constructor(config: any){
        super(config);
        
        this.fuerza = 25;
        this.velocidad = 90;
        this.vida = 2;
        this.puntuacion = 15;
        this.distanciaAgresivo = 180;
        this.numMonedas = 25;
        this.numRecursos = 3;

        this.animacionCorrer = Constantes.ENEMIGOS.ESQUELETO.ANIMACION.CORRER;
        this.animacionEspera = Constantes.ENEMIGOS.ESQUELETO.ANIMACION.ESPERA;
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

    colisionJugador(): void {
        this.morir();
    }
}