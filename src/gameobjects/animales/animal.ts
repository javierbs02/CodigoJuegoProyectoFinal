import Constantes from "../../constantes";
import Nivel from "../../escenas/nivel";
import Enemigo from "../enemigo";

export default class Animal extends Phaser.Physics.Arcade.Sprite {
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
    protected tiempoHerido: number;
    protected numRecursos: number;

    constructor(config: any) {
        super(config.escena, config.x, config.y, config.textura);

        this.escena = config.escena;
        this.nombre = config.texture;
        this.estaHerido = false;
        this.estaMuerto = false;

        this.escena.physics.world.enable(this);
        this.escena.add.existing(this);

        this.direccion = "idle";

        this.arrayDirecciones = ["left", "right", "up", "bottom", "idle"];
        this.tiempoMovimiento = 0;
        this.tiempoHerido = 0;

    }

    update(...args: any[]): void {
        //DIRECCIONES

        if (!this.estaMuerto) {
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
        this.setDepth(this.body.y);
        this.muerteAgua();
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
                this.anims.play(this.animacionMorir);
                this.once("animationcomplete", () => {
                    if (!this.escena.jugador.hayAgua(this.body.x, this.body.y)) {
                        this.soltarRecursos();
                        this.fisicasObjetos();
                    }
                    this.disableBody(true, true);
                    this.destroy();
                })
            }
            else {
                this.setAlpha(0);
                let explosion: Phaser.GameObjects.Sprite = this.escena.add.sprite(this.body.x + 10, this.body.y + 10, Constantes.ENEMIGOS.EXPLOSIONGENERICA.ID);
                explosion.play(Constantes.ENEMIGOS.EXPLOSIONGENERICA.ANIMACION.ID);
                explosion.once("animationcomplete", () => {
                    this.estaHerido = false;
                    explosion.destroy();
                    if (!this.escena.jugador.hayAgua(this.body.x, this.body.y)) {
                        this.soltarRecursos();
                        this.fisicasObjetos();
                    }
                    this.disableBody(true, true);
                    this.destroy();
                });
            }
            let indice = this.escena.arrayAnimales.indexOf(this);
            this.escena.arrayAnimales.splice(indice, 1);
            this.escena.physicsGroup.remove(this, true);
            this.escena.grupoAnimales.remove(this, true);
            this.estaMuerto = true;
        }
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
        else if (this.direccion == "idle") {
            this.anims.play(this.animacionEspera, true);
            this.setVelocityX(0);
            this.setVelocityY(0);
            this.flipX = false;
        }
        this.tiempoHerido++;
        if (this.tiempoHerido >= 200) {
            this.clearTint();
            this.tiempoHerido = 0;
            this.estaHerido = false;
            this.setInteractive();
        }
    }

    herido(): void {
        if (this.estaHerido) {
            this.disableInteractive();
            this.setTint(0xC86363, 0.9);
        }
    }

    soltarRecursos(): void {

    }

    muerteAgua(): void {
        if (this.escena.jugador.hayAgua(this.body.x, this.body.y)) {
            this.morir();
        }
    }

    fisicasObjetos(): void {
        this.escena.grupoObjetos = this.escena.physics.add.group(this.escena.arrayObjetos);

        for (let i = 0; i < this.escena.arrayObjetos.length; i++) {
            this.escena.physics.add.overlap(this.escena.jugador, this.escena.arrayObjetos[i], this.escena.jugador.recolecta, null, this);
            this.escena.physics.add.collider(this.escena.arrayObjetos[i], this.escena.grupoObjetos);
        }
    }
}