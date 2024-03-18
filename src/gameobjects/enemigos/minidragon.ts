import Constantes from "../../constantes";
import Enemigo from "../enemigo";

export default class Minidragon extends Enemigo {

    private distanciaAtaque: number;
    private bolaFuegoAnimada: any;
    private tiempoTotalAtaque: number;
    private tiempoAtque: number;
    constructor(config: any) {
        super(config);

        this.fuerza = 7;
        this.velocidad = 60;
        this.vida = 20;
        this.puntuacion = 20;
        this.distanciaAgresivo = 90;
        this.numMonedas = 30;
        this.numRecursos = 3;
        this.distanciaAtaque = 60;
        this.tiempoTotalAtaque = 700;
        this.tiempoAtque = 0;

        this.animacionCorrer = Constantes.ENEMIGOS.MINIDRAGON.ANIMACION.CORRER;
        this.animacionEspera = Constantes.ENEMIGOS.MINIDRAGON.ANIMACION.ESPERA;
        this.animacionAtacar = Constantes.ENEMIGOS.MINIDRAGON.ANIMACION.ATACAR;
        this.animacionMorir = Constantes.ENEMIGOS.MINIDRAGON.ANIMACION.MORIR;
        this.direccion = "idle";
        this.anims.play(this.animacionEspera, true);
    }

    atacar(): void {
        let jugador = this.escena.jugador;
        let distanciaJugador = Phaser.Math.Distance.Between(this.body.x, this.body.y, jugador.body.x, jugador.body.y);
        if (distanciaJugador <= this.distanciaAgresivo && distanciaJugador >= this.distanciaAtaque && !this.agresivo && !this.atacando) {
            //this.atacando = false;
            this.anims.stop();
            this.anims.play(this.animacionCorrer, true);
            this.agresivo = true;
        }
        if (distanciaJugador <= this.distanciaAtaque && !this.atacando) {
            this.tiempoAtque = 0;
            this.setVelocity(0, 0);
            this.agresivo = false;
            this.anims.stop();
            this.anims.play(this.animacionAtacar, true);
            this.atacando = true;
            this.bolaFuegoAnimada = this.escena.physics.add.sprite(this.body.x, this.body.y, Constantes.ENEMIGOS.BOLAFUEGOANIMADA.ID);
            this.bolaFuegoAnimada.play(Constantes.ENEMIGOS.BOLAFUEGOANIMADA.ANIMACION.ID);
            this.escena.physics.world.enable(this.bolaFuegoAnimada);
            this.escena.add.existing(this.bolaFuegoAnimada);
            this.escena.physics.add.overlap(this.bolaFuegoAnimada, this.escena.jugador, () => {
                this.escena.jugador.herido(this.escena.jugador, this);
                this.bolaFuegoAnimada.destroy();
                this.tiempoAtque = 0;
                this.atacando = false;
            })
            this.escena.physics.add.collider(this.bolaFuegoAnimada, this.escena.physicsGroup, ()=>{
                this.bolaFuegoAnimada.destroy();
                this.tiempoAtque = 0;
                this.atacando = false;
            });
        }
        if (this.agresivo) {
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
        }


        if (this.direccion == "idle" && !this.atacando) {
            this.direccion = this.arrayDirecciones[Phaser.Math.Between(0, 3)];
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

        if (this.tiempoAtque > 0) {
            if (this.tiempoAtque >= this.tiempoTotalAtaque) {
                this.bolaFuegoAnimada.destroy();
                this.tiempoAtque = 0;
                this.atacando = false;
            }
        }
    }

    ataque2(): void {
        if (this.atacando) {
            this.tiempoAtque++;
            let jugador = this.escena.jugador;
            const playerPosition = {
                x: jugador.body.x,
                y: jugador.body.y
            };
            const enemyPosition = {
                x: this.bolaFuegoAnimada.body.x,
                y: this.bolaFuegoAnimada.body.y
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
            const speed = 80; // ajusta la velocidad según tus necesidades
            const velocity = {
                x: normalizedDirection.x * speed,
                y: normalizedDirection.y * speed
            };

            this.bolaFuegoAnimada.setVelocity(velocity.x, velocity.y);

            const dx = playerPosition.x - enemyPosition.x;
            const dy = playerPosition.y - enemyPosition.y;
            const angleToPlayer = Phaser.Math.RadToDeg(Math.atan2(dy, dx));

            const rotateSpeed = 5; // ajusta la velocidad de rotación según tus necesidades
            const currentAngle = Phaser.Math.RadToDeg(this.bolaFuegoAnimada.body.angle);
            const newAngle = Phaser.Math.Angle.RotateTo(currentAngle, angleToPlayer, rotateSpeed);
            this.bolaFuegoAnimada.setRotation(Phaser.Math.DegToRad(newAngle - 90));

            if (this.escena.jugador.body.x < this.body.x) {
                this.flipX = true;
            }
            else {
                this.flipX = false;
            }
        }


    }
}