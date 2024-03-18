import Constantes from "../../constantes";
import Enemigo from "../enemigo";
import Jugador from "../jugador";
import OrbeRojo from "../objetos/orbeRojo";
import Horno from "../posicionables/horno";

export default class Demon extends Enemigo {
    private existeBola: boolean;
    private bolaAudio: Phaser.Sound.BaseSound;
    constructor(config: any) {
        super(config);
        this.fuerza = 3;
        this.velocidad = 50;
        this.vida = 10;
        this.puntuacion = 10;
        this.distanciaAgresivo = 90;
        this.existeBola = false;
        this.numMonedas = 20;
        this.numRecursos = 1;

        this.animacionCorrer = Constantes.ENEMIGOS.DEMON.ANIMACION.CORRER;
        this.animacionEspera = Constantes.ENEMIGOS.DEMON.ANIMACION.ESPERA;
        this.direccion = "idle";
        this.anims.play(this.animacionEspera, true);

        this.bolaAudio = this.escena.sound.add(Constantes.SONIDOS.EFECTOS.DEMONATTACK, {
            volume: 0.3
        });
    }

    atacar(): void {
        let jugador = this.escena.jugador;
        let distanciaJugador = Phaser.Math.Distance.Between(this.body.x, this.body.y, jugador.body.x, jugador.body.y);
        if (distanciaJugador <= this.distanciaAgresivo) {
            if (!this.agresivo) {
                this.direccion == "idle";
                this.agresivo = true;
            }
            this.direccion = "idle";
            const angle = Phaser.Math.Angle.Between(
                this.body.x,
                this.body.y,
                jugador.body.x,
                jugador.body.y
            );

            // Crear un vector que apunte en la dirección del jugador
            const velocity = new Phaser.Math.Vector2(
                Math.cos(angle) * 200,
                Math.sin(angle) * 200
            );

            // Crear un nuevo proyectil y lanzarlo en la dirección del jugador
            if (!this.existeBola) {
                let efectos = this.escena.registry.get(Constantes.REGISTROS.EFECTOS);
                if (efectos) {
                    this.bolaAudio.play();
                }
                this.existeBola = true;
                const bullet = this.escena.physics.add.sprite(this.body.x + 10, this.body.y + 10, Constantes.ENEMIGOS.BOLADEFUEGO.ID);
                bullet.setVelocity(velocity.x, velocity.y);
                bullet.setRotation(angle);
                this.escena.physics.world.enable(bullet);
                this.escena.add.existing(bullet);
                this.escena.physics.add.overlap(bullet, this.escena.grupoPosicionables, (bullet, fogata) => {
                    if (fogata instanceof Horno) {
                        fogata.estaEncendido = true;
                        fogata.combustible = 3;
                    }
                    bullet.destroy();
                });
                this.escena.physics.add.collider(bullet, this.escena.physicsGroup, () => {
                    bullet.destroy();
                });
                this.escena.physics.add.overlap(bullet, this.escena.jugador, () => {
                    this.escena.jugador.herido(this.escena.jugador, this);
                    bullet.destroy();
                });

                this.escena.time.addEvent({
                    //Tiempo q  ue hay que esperar
                    delay: 3000, //3000 milisegundos
                    //Lo que pasa cuando se agota el tiempo
                    callback: () => {
                        this.existeBola = false;
                        bullet.destroy();
                    }
                });
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

            let recurso = new OrbeRojo({
                escena: this.escena,
                x: posX,
                y: posY,
                textura: Constantes.OBJETOS.ORBEROJO
            });
            this.escena.arrayObjetos.push(recurso);
        }
    }
}