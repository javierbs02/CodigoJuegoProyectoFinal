import Nivel from "../escenas/nivel";
import Constantes from "../constantes";
import Jugador from "./jugador";
import Moneda from "./objetos/moneda";

export default class Enemigo extends Phaser.Physics.Arcade.Sprite {
    protected escena: Nivel;
    protected velocidad: number;
    public vida: number;
    public fuerza: number;
    protected direccion: string;
    protected nombre: string
    protected arrayDirecciones: string[];
    protected tiempoMovimiento: number;
    public estaHerido: boolean;
    public animacionCorrer: string;
    public animacionEspera: string;
    public animacionMorir: string;
    public animacionHerido: string;
    public animacionAtacar: string
    public estaMuerto: boolean;
    public puntuacion: number;
    public agresivo: boolean;
    protected atacando: boolean;
    protected distanciaAgresivo: number;
    protected tiempoHerido: number;
    protected numMonedas: number;
    protected numRecursos: number;
    public estaEnvenenado: boolean;
    protected contadorVeneno: number;
    protected tiempoTotalVeneno: number;


    constructor(config: any) {
        super(config.escena, config.x, config.y, config.texture); //Lama a la clase padre y permite llamar a sus metodos, también le pasamos variables a esa clase

        this.escena = config.escena;
        this.nombre = config.texture;
        this.estaHerido = false;
        this.estaMuerto = false;
        this.agresivo = false;
        this.atacando = false;
        this.estaEnvenenado = false;
        this.contadorVeneno = 0;
        this.tiempoTotalVeneno = 0;

        this.escena.physics.world.enable(this);
        this.escena.add.existing(this);

        this.direccion = "idle";

        this.arrayDirecciones = ["left", "right", "up", "bottom", "idle"];
        this.tiempoMovimiento = 0;
        this.tiempoHerido = 0;

        this.once("animationcomplete", () => {
            this.estaHerido = false;
            if (!this.estaMuerto) {
                this.caminar();
                this.setInteractive();
            }
        });
    }

    update(): void {
        //DIRECCIONES

        if (!this.estaMuerto && !this.agresivo && !this.atacando) {
            if (this.tiempoMovimiento == 1) {
                this.direccion = this.arrayDirecciones[Phaser.Math.Between(0, 4)];
                this.tiempoMovimiento++;
            }
            if (this.tiempoMovimiento >= 400) {
                this.tiempoMovimiento = 0;
            }
            this.tiempoMovimiento++;
        }
        this.caminar();

        this.atacar();
        this.accion1();
        this.setDepth(this.body.y);
        this.envenenado();
        this.ataque2();
        this.muerteAgua();
    }


    caminar(): void {
        if (!this.estaHerido && !this.atacando) {
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
            else if (this.direccion == "idle") {
                this.anims.play(this.animacionEspera, true);
                this.setVelocityX(0);
                this.setVelocityY(0);
                this.flipX = false;
            }
        }
        this.tiempoHerido++;
        if (this.tiempoHerido >= 200) {
            this.clearTint();
            this.tiempoHerido = 0;
            this.estaHerido = false;
            this.setInteractive();
        }
    }

    morir(): void {
        if (!this.estaMuerto || this.escena.jugador.hayAgua(this.body.x, this.body.y)) {
            if (!this.escena.jugador.hayAgua(this.body.x, this.body.y)) {
                this.escena.puntuacion += this.puntuacion;
                this.escena.registry.set(Constantes.REGISTROS.PUNTUACION, this.escena.puntuacion);
            }
            let jugador = this.escena.jugador;
            if (jugador.objetoEquipado && jugador.objetoEquipado.poder == Constantes.LIBROS.FORTUNA) {
                this.numRecursos = this.numRecursos * 2;
            }
            if (this.animacionMorir) {
                this.setVelocity(0, 0);
                this.anims.play(this.animacionMorir);
                this.once("animationcomplete", () => {
                    if (!this.escena.jugador.hayAgua(this.body.x, this.body.y)) {
                        this.soltarRecursos();
                        this.soltarMonedas();
                        this.fisicasObjetos();
                        this.escena.physicsGroup.remove(this, true);
                        this.escena.grupoEnemigos.remove(this, true);
                    }
                    this.disableBody(true, true);
                    this.off("pointedown", this.escena.jugador.atacar, this);
                    this.destroy();
                })
            }
            else {
                this.disableBody(true, true);
                this.setAlpha(0);
                let explosion: Phaser.GameObjects.Sprite = this.escena.add.sprite(this.body.x + 10, this.body.y + 10, Constantes.ENEMIGOS.EXPLOSION.ID);
                explosion.play(Constantes.ENEMIGOS.EXPLOSION.ANIMACION.ID);
                //Una vez completada la animación hacemos que desaparezca
                explosion.once("animationcomplete", () => {
                    this.agresivo = false;
                    this.estaHerido = false;
                    explosion.destroy();
                    if (!this.escena.jugador.hayAgua(this.body.x, this.body.y)) {
                        this.soltarRecursos();
                        this.soltarMonedas();
                        this.fisicasObjetos();
                        this.escena.physicsGroup.remove(this, true);
                        this.escena.grupoEnemigos.remove(this, true);
                    }
                    this.off("pointedown", this.escena.jugador.atacar, this);
                    this.destroy();
                });
            }
            let indice = this.escena.arrayEnemigos.indexOf(this);
            this.escena.arrayEnemigos.splice(indice, 1);
            this.estaMuerto = true;
        }
    }

    cambiarDireccion(): void {
        this.direccion = this.arrayDirecciones[Phaser.Math.Between(0, 4)];
    }

    muerteAgua(): void {
        if (this.escena.jugador.hayAgua(this.body.x, this.body.y)) {
            this.morir();
        }
    }

    animacionMuerte(): void {

    }

    herido(): void {
        if (this.animacionHerido) {
            let jugador: Jugador = this.escena.jugador;
            if (this.estaHerido) {
                if (jugador.objetoEquipado && jugador.objetoEquipado.poder == Constantes.LIBROS.VENENO && !this.estaEnvenenado) {
                    this.estaEnvenenado = true;
                }
                this.disableInteractive();
                if (jugador.direccion === "left" || jugador.direccion === "up") {
                    this.flipX = false;
                    this.anims.play(this.animacionHerido, true);
                    //this.setVelocity(0, 0);
                }
                else if (jugador.direccion === "right" || jugador.direccion === "bottom") {
                    this.anims.play(this.animacionHerido, true);
                    //this.setVelocity(0, 0);
                    this.flipX = true;
                }
            }
        }
        else {
            if (this.estaHerido) {
                let jugador: Jugador = this.escena.jugador;
                if (jugador.objetoEquipado && jugador.objetoEquipado.poder == Constantes.LIBROS.VENENO && !this.estaEnvenenado) {
                    this.estaEnvenenado = true;
                }
                this.disableInteractive();
                this.setTint(0xC86363, 0.9);
            }
        }
    }

    atacar(): void {

    }

    moverAlHerirse(): void {

    }

    ataque1(): void {

    }

    ataque2(): void {

    }

    accion1(): void {

    }

    soltarRecursos(): void {

    }

    colisionJugador(): void {

    }

    fisicasObjetos(): void {
        this.escena.grupoObjetos = this.escena.physics.add.group(this.escena.arrayObjetos);

        for (let i = 0; i < this.escena.arrayObjetos.length; i++) {
            this.escena.physics.add.overlap(this.escena.jugador, this.escena.arrayObjetos[i], this.escena.jugador.recolecta, null, this);
            this.escena.physics.add.collider(this.escena.arrayObjetos[i], this.escena.grupoObjetos);
        }
    }

    soltarMonedas(): void {
        let numero = Phaser.Math.Between(this.numMonedas - 3, this.numMonedas);

        for (let i = 0; i < numero; i++) {
            let posX = Phaser.Math.Between(this.body.x - 5, this.body.x + 5);
            let posY = Phaser.Math.Between(this.body.y - 5, this.body.y + 5);

            let recurso = new Moneda({
                escena: this.escena,
                x: posX,
                y: posY,
                textura: Constantes.OBJETOS.MONEDA.ID
            });
            this.escena.arrayObjetos.push(recurso);
        }
    }

    envenenado(): void {
        if (this.estaEnvenenado) {
            this.setTint(0x274F22, 0.1);
            this.contadorVeneno++;
            this.tiempoTotalVeneno++;
        }
        if (this.estaEnvenenado && this.contadorVeneno >= 300) {
            this.vida -= 1;
            this.contadorVeneno = 0;
        }
        if (this.estaEnvenenado && this.tiempoTotalVeneno >= 1000) {
            this.clearTint();
            this.estaEnvenenado = false;
            this.tiempoTotalVeneno = 0;
        }

    }

}