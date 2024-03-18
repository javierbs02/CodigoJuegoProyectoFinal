import Constantes from "../constantes";
import Nivel from "../escenas/nivel";
import PatataSemilla from "./cultivos/patataSemilla";
import TomateSemilla from "./cultivos/tomateSemilla";
import Azulita from "./objetos/azulita";
import BolaDeSlime from "./objetos/bolaDeSlime";
import Carbon from "./objetos/carbon";
import CarneCruda from "./objetos/consumibles/carneCruda";
import CueroTroll from "./objetos/cueroTroll";
import CueroVaca from "./objetos/cueroVaca";
import InfraEspada from "./objetos/herramientas/infraEspada";
import Hierro from "./objetos/hierro";
import Fortuna from "./objetos/libros/fortuna";
import Fuerza from "./objetos/libros/fuerza";
import Veneno from "./objetos/libros/veneno";
import MenaAzulita from "./objetos/menaAzulita";
import MenaHierro from "./objetos/menaHierro";
import MenaOro from "./objetos/menaOro";
import Oro from "./objetos/oro";
import PiedraForest from "./objetos/piedraforest";
import Tronco from "./objetos/tronco";

export default class Mercader extends Phaser.Physics.Arcade.Sprite {
    private escena: Nivel;
    private direccion: string;
    private animacionCorrer: any;
    private animacionEspera: any;
    private velocidad: number;
    public interactuando: boolean;
    public producto1: any[][];
    public producto2: any[][];
    public producto3: any[][];
    public indices: number[];
    private tiempoMovimiento: number;
    private arrayDirecciones: string[];
    private duracionProductos: number;

    constructor(config: any) {
        super(config.escena, config.x, config.y, config.texture);
        this.escena = config.escena;

        this.escena.physics.world.enable(this);
        this.escena.add.existing(this);
        this.direccion = "idle";
        this.velocidad = 40;
        this.interactuando = false;
        this.animacionEspera = Constantes.ENEMIGOS.MERCADER.ANIMACION.ESPERA;
        this.animacionCorrer = Constantes.ENEMIGOS.MERCADER.ANIMACION.CORRER;
        this.anims.play(this.animacionEspera);
        this.producto1 = [
            [PiedraForest, 10, Constantes.OBJETOS.PIEDRAFOREST],
            [Carbon, 15, Constantes.OBJETOS.CARBON],
            [MenaHierro, 20, Constantes.OBJETOS.MENAHIERRO],
            [Hierro, 30, Constantes.OBJETOS.HIERRO],
            [MenaOro, 40, Constantes.OBJETOS.MENAORO],
            [Oro, 45, Constantes.OBJETOS.ORO],
            [Tronco, 10, Constantes.OBJETOS.TRONCOPEQUENIO]
        ];
        //Productos que solo se pueden encontrar aquí
        this.producto2 = [
            [TomateSemilla, 100, Constantes.CULTIVOS.TOMATE.SEMILLA],
            [MenaAzulita, 120, Constantes.OBJETOS.MENAAZULITA],
            [Azulita, 130, Constantes.OBJETOS.AZULITA],
            [InfraEspada, 800, Constantes.HERRAMIENTAS.ESPADAS.INFRAESPADA]
        ];
        //Libros Mágicos
        this.producto3 = [
            [Fortuna, 500, Constantes.LIBROS.FORTUNA],
            [Fuerza, 500, Constantes.LIBROS.FUERZA],
            [Veneno, 500, Constantes.LIBROS.VENENO]
        ];
        this.indices = new Array();
        this.tiempoMovimiento = 0;
        this.arrayDirecciones = ["left", "right", "up", "bottom", "idle"];
        this.duracionProductos = 2;
        let numero = Phaser.Math.Between(0, this.producto1.length - 1);
        this.indices[0] = numero;

        numero = Phaser.Math.Between(0, this.producto2.length - 1);
        this.indices[1] = numero;

        numero = Phaser.Math.Between(0, this.producto3.length - 1);
        this.indices[2] = numero;
        this.setInteractive();

        this.on("pointerdown", () => {
            if (!this.interactuando) {
                this.interactuando = true;
                let datos = {
                    escena: this.escena,
                    mercader: this
                };
                this.escena.scene.launch(Constantes.ESCENAS.HUDMERCADER, datos);
            }
        });

    }

    update(...args: any[]): void {
        if (!this.interactuando) {
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
        this.actualizarProductos();
    }

    caminar(): void {
        if (!this.interactuando) {
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
        else {
            this.setVelocity(0, 0);
            this.anims.play(this.animacionEspera, true);
        }
    }

    actualizarProductos(): void {
        if (this.escena.dia == this.duracionProductos) {
            let numero = Phaser.Math.Between(0, this.producto1.length - 1);
            this.indices[0] = numero;

            numero = Phaser.Math.Between(0, this.producto2.length - 1);
            this.indices[1] = numero;

            numero = Phaser.Math.Between(0, this.producto3.length - 1);
            this.indices[2] = numero;
            this.duracionProductos += 2;
            this.actualizarMercado();
        }
    }

    actualizarMercado(): void {
        let datos = {
            escena: this.escena,
            mercader: this
        };
        if (this.interactuando) {
            this.escena.scene.stop(Constantes.ESCENAS.HUDMERCADER);
            this.escena.scene.launch(Constantes.ESCENAS.HUDMERCADER, datos);
        }
    }
}