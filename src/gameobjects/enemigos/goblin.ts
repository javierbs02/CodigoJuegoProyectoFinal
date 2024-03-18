import Constantes from "../../constantes";
import Enemigo from "../enemigo";
import Jugador from "../jugador";
import Carbon from "../objetos/carbon";
import CarneCruda from "../objetos/consumibles/carneCruda";
import MenaHierro from "../objetos/menaHierro";
import MenaOro from "../objetos/menaOro";
import Oro from "../objetos/oro";
import PiedraForest from "../objetos/piedraforest";
import Tronco from "../objetos/tronco";

export default class Goblin extends Enemigo {
    public pacifico: boolean;
    private distanciaAtaque: number;
    private anchoHitbox: number;
    private alturaHitbox: number;
    private recompensas: any[];
    private recompnesasTextura: any[];
    private contador: number;
    private puedeRegalar: boolean;
    private maxRegalos: number;
    private regalos: number;
    private oroVisto: boolean;
    constructor(config: any) {
        super(config);
        this.fuerza = 3;
        this.velocidad = 60;
        this.vida = 8;
        this.puntuacion = 15;
        this.distanciaAgresivo = 90;
        this.numMonedas = 40;
        this.numRecursos = 2;
        this.pacifico = false;
        this.distanciaAtaque = 30;
        this.anchoHitbox = this.body.width;
        this.alturaHitbox = this.body.height;
        this.recompensas = [PiedraForest, Tronco, MenaHierro, CarneCruda, Carbon];
        this.recompnesasTextura = [Constantes.OBJETOS.PIEDRAFOREST, Constantes.OBJETOS.TRONCOPEQUENIO, Constantes.OBJETOS.MENAHIERRO, Constantes.COMIDA.NOCOCINADA.CARNE, Constantes.OBJETOS.CARBON];
        this.contador = 0;
        this.puedeRegalar = true;
        this.maxRegalos = 3;
        this.regalos = 0;
        this.oroVisto = false;

        this.animacionCorrer = Constantes.ENEMIGOS.GOBLIN.ANIMACION.CORRER;
        this.animacionEspera = Constantes.ENEMIGOS.GOBLIN.ANIMACION.ESPERA;
        this.direccion = "idle";
        this.anims.play(this.animacionEspera, true);
    }


    atacar(): void {
        let jugador = this.escena.jugador;
        let distanciaJugador = Phaser.Math.Distance.Between(this.body.x, this.body.y, jugador.body.x, jugador.body.y);

        if (distanciaJugador <= this.distanciaAgresivo && distanciaJugador >= this.distanciaAtaque && !this.pacifico && !this.agresivo && !this.oroVisto) {
            this.anims.stop();
            this.anims.play(this.animacionCorrer, true);
            this.agresivo = true;
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

    }

    accion1(): void {
        this.escena.arrayObjetos.forEach(objeto => {
            if (objeto instanceof Oro) {
                let distanciaOro = Phaser.Math.Distance.Between(this.body.x, this.body.y, objeto.body.x, objeto.body.y);
                if (distanciaOro <= 200) {
                    this.oroVisto = true;
                    const playerPosition = {
                        x: objeto.body.x,
                        y: objeto.body.y
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
                if (this.oroVisto && distanciaOro > 200) {
                    this.escena.time.addEvent({
                        //Tiempo q  ue hay que esperar
                        delay: 500, //3000 milisegundos
                        //Lo que pasa cuando se agota el tiempo
                        callback: () => {
                            this.oroVisto = false;
                        }
                    });
                }
            }
        });
        this.escena.physics.overlap(this, this.escena.grupoObjetos, (goblin, objeto) => {
            if (objeto instanceof Oro) {
                let indice = this.escena.arrayObjetos.indexOf(objeto);
                this.escena.arrayObjetos.splice(indice, 1);
                objeto.destroy();
                this.pacifico = true;
                this.puedeRegalar = true;
            }
        });

        if (this.pacifico) {
            this.agresivo = false;
            this.contador++;
            if (this.contador >= 200 && this.regalos < this.maxRegalos && this.puedeRegalar) {
                let numero = Phaser.Math.Between(0, this.recompensas.length - 1);
                let objeto = new this.recompensas[numero]({
                    escena: this.escena,
                    x: this.body.x,
                    y: this.body.y,
                    textura: this.recompnesasTextura[numero]
                });
                this.escena.arrayObjetos.push(objeto);
                this.escena.grupoObjetos = this.escena.physics.add.group(this.escena.arrayObjetos);

                for (let i = 0; i < this.escena.arrayObjetos.length; i++) {
                    this.escena.physics.add.overlap(this.escena.jugador, this.escena.arrayObjetos[i], this.escena.jugador.recolecta, null, this);
                    this.escena.physics.add.collider(this.escena.arrayObjetos[i], this.escena.grupoObjetos);
                }
                this.contador = 0;
                this.regalos++;
                this.puedeRegalar = false;
            }
        }
    }

    atacar2(): void {
        let jugador = this.escena.jugador;
        let distanciaJugador = Phaser.Math.Distance.Between(this.body.x, this.body.y, jugador.body.x, jugador.body.y);
        if (distanciaJugador <= this.distanciaAgresivo && distanciaJugador >= this.distanciaAtaque && !this.pacifico && !this.agresivo && !this.atacando) {
            //this.atacando = false;
            this.anims.stop();
            this.anims.play(this.animacionCorrer, true);
            this.agresivo = true;
        }
        if (distanciaJugador <= this.distanciaAtaque && !this.pacifico && !this.atacando) {
            this.agresivo = false;
            this.anims.stop();
            this.anims.play(this.animacionAtacar, true);
            this.atacando = true;
            this.ataque1();
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

        if (distanciaJugador >= this.distanciaAtaque + 50 && this.atacando) {
            this.escena.time.addEvent({
                //Tiempo q  ue hay que esperar
                delay: 500, //3000 milisegundos
                //Lo que pasa cuando se agota el tiempo
                callback: () => {
                    this.atacando = false;
                    this.setSize(this.anchoHitbox, this.alturaHitbox);
                    this.setOffset(0, 0);
                }
            });
        }
    }

    ataque1(): void {
        let jugador = this.escena.jugador;
        this.setVelocity(0, 0);
        this.setSize(80, 80);

        if (this.atacando) {
            if (jugador.body.x < this.body.x) {
                this.flipX = true;
            }
            else {
                this.flipX = false;
            }
            this.once("animationcomplete", () => {
                this.atacando = false;
                this.setSize(this.anchoHitbox, this.alturaHitbox);
                this.setOffset(0, 0);
            });
        }
    }

    herido(): void {
        if (this.estaHerido) {
            let jugador: Jugador = this.escena.jugador;
            if (jugador.objetoEquipado && jugador.objetoEquipado.poder == Constantes.LIBROS.VENENO && !this.estaEnvenenado) {
                this.estaEnvenenado = true;
            }
            this.pacifico = false;
            this.disableInteractive();
            this.setTint(0xC86363, 0.9);
        }
    }

}