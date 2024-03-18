import Constantes from "../constantes";
import Jugador from "../gameobjects/jugador";
import Objeto from "../gameobjects/objetos/objeto";
import Cofre from "../gameobjects/posicionables/cofre";
import Nivel from "./nivel";

export default class Hud extends Phaser.Scene {

    public escena: Nivel;
    private jugador: Jugador;

    //Barra de la vida del jugador
    private barraVida: Phaser.GameObjects.Graphics;
    private barraVidaAncho = 200;
    private barraVidaAlto = 20;
    private vidaActual: Phaser.GameObjects.Graphics;

    //Puntuacion
    private puntuacionTxt: Phaser.GameObjects.BitmapText;
    private monedasTxt: Phaser.GameObjects.BitmapText;

    //Inventario
    private arrayInventario: any[][];
    private imagenInventario: Phaser.GameObjects.Graphics;
    private teclaInventario: any;
    private inventarioAbierto: boolean;
    private tiempoInventario: number;
    private imagenesInventario: Phaser.GameObjects.Image[] = [];
    private numerosObjetos: Phaser.GameObjects.BitmapText[] = [];
    private indiceInventario: number;
    private abrirInventarioAudio: Phaser.Sound.BaseSound;
    private seleccionarObjetoAudio: Phaser.Sound.BaseSound;

    //Menú de información
    private ventanaAbierta: boolean;
    private arrayVentana: Phaser.GameObjects.Graphics[] = [];
    private arrayTexto: Phaser.GameObjects.BitmapText[] = [];
    private arraySlots: any[] = [];
    private eligiendo: boolean;

    //Barra principal
    private arrayBarra: any[][];
    private objetoElegido: Objeto;
    private numeroObjeto: number;
    private indiceObjeto: number;
    private barraImagen: Phaser.GameObjects.Image[] = [];
    private barraNumeros: Phaser.GameObjects.BitmapText[] = [];
    private marcarElegido: Phaser.GameObjects.Graphics;

    //Recetas
    public cambiando: boolean;


    constructor() {
        super(Constantes.ESCENAS.HUD);
    }

    init(data): void {
        this.escena = data.escena;
        this.arrayBarra = this.escena.jugador.arrayBarra;
        this.inventarioAbierto = this.registry.get(Constantes.REGISTROS.INVENTARIOABIERTO);
        this.tiempoInventario = 0;
        this.teclaInventario = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
        this.ventanaAbierta = false;
        this.eligiendo = false;
        this.marcarElegido = this.add.graphics();
        this.cambiando = false;
        this.registry.set(Constantes.REGISTROS.CAMBIANDO, this.cambiando);
        this.abrirInventarioAudio = this.escena.sound.add(Constantes.SONIDOS.EFECTOS.ABRIRINVENTARIO);
    }

    create(): void {
        // Crear la barra de vida
        this.barraVida = this.add.graphics();
        this.barraVida.fillStyle(0x000000, 0.5);
        this.barraVida.fillRect(25, 25, this.barraVidaAncho + 2, this.barraVidaAlto + 2).setDepth(10);

        // Crear la barra de vida actual
        this.vidaActual = this.add.graphics();
        this.vidaActual.fillStyle(0xff0000, 1);
        this.vidaActual.fillRect(25, 25, this.barraVidaAncho, this.barraVidaAlto).setDepth(11);

        //Crear puntuacion
        this.puntuacionTxt = this.add.bitmapText(this.cameras.main.width - 100, 20, Constantes.FUENTES.BITMAP, "000", 20);
        let imagenMoneda = this.add.image(this.cameras.main.width - 110, 75, Constantes.OBJETOS.MONEDA.ID).setScale(2);
        this.monedasTxt = this.add.bitmapText(this.cameras.main.width - 100, 60, Constantes.FUENTES.BITMAP, "0000", 20);
        //Barra de herraminetas
        this.crearBarraDeHerramientas();
        this.dibujarSlots();

    }

    update(): void {
        // Actualizar la barra de vida actual
        let porcentajeVida: number = this.registry.get(Constantes.REGISTROS.VIDA);
        this.vidaActual.clear();
        this.vidaActual.fillStyle(0x6bd62d, 1);
        this.vidaActual.fillRect(25, 25, porcentajeVida * this.barraVidaAncho, this.barraVidaAlto);

        //Actualizar puntuacion
        this.puntuacionTxt.text = Phaser.Utils.String.Pad(this.registry.get(Constantes.REGISTROS.PUNTUACION), 3, "0", 1);
        this.monedasTxt.text = Phaser.Utils.String.Pad(this.escena.jugador.monedas, 4, "0", 1);
        this.abrirInventario();

        if (this.escena.jugador.recolectando) {
            this.escena.jugador.recolectando = false;
            this.escena.jugador.actualizarHUD();
            if (this.inventarioAbierto) {
                this.escena.jugador.actualizarInventario();
            }
        }
        if (this.escena.jugador.equipando) {
            this.escena.jugador.equipando = false;
            this.escena.jugador.actualizarHUD();
        }

        if (this.escena.jugador.ordenar) {
            this.escena.jugador.ordenar = false;
            if (this.inventarioAbierto) {
                this.escena.jugador.actualizarInventario();
            }
        }
        if (this.registry.get(Constantes.REGISTROS.CAMBIANDO) == true) {
            this.scene.stop(Constantes.ESCENAS.RECETAS);
            const datos = {
                escena: this.escena,
            }
            this.scene.launch(Constantes.ESCENAS.RECETAS, datos);
            this.cambiando = false;
            this.registry.set(Constantes.REGISTROS.CAMBIANDO, this.cambiando);
        }
    }


    abrirInventario(): void {
        this.tiempoInventario++;
        let cofreAbierto = this.cofreAbierto();
        let mercadoAbierto = this.mercadoAbierto();
        if (this.teclaInventario.isDown) {
            if (!this.inventarioAbierto && this.tiempoInventario >= 30 && !cofreAbierto && !mercadoAbierto) {
                this.abrirInventarioAudio.play();
                this.inventarioAbierto = true;
                this.registry.set(Constantes.REGISTROS.INVENTARIOABIERTO, this.inventarioAbierto);
                const datos = {
                    escena: this.escena,
                }
                this.scene.launch(Constantes.ESCENAS.RECETAS, datos);
                this.scene.launch(Constantes.ESCENAS.COMPLEMENTOS, datos);
                this.scene.launch(Constantes.ESCENAS.INVENTARIO, datos);
                this.tiempoInventario = 0;
            }
            else if (this.inventarioAbierto && this.tiempoInventario >= 30) {
                this.inventarioAbierto = false;
                this.registry.set(Constantes.REGISTROS.INVENTARIOABIERTO, this.inventarioAbierto);
                this.scene.stop(Constantes.ESCENAS.RECETAS);
                this.scene.stop(Constantes.ESCENAS.COMPLEMENTOS);
                this.scene.stop(Constantes.ESCENAS.INVENTARIO);
                this.tiempoInventario = 0;
            }
        }
    }

    crearBarraDeHerramientas(): void {

        // Crear cuadrados del inventario
        const tamanoCuadrado = 50;
        const cuadrados = 8;
        let x = 210;
        let y = 400;
        let fondoCuadrado = this.add.graphics();
        for (let i = 0; i < cuadrados; i++) {
            const cuadrado = this.add.graphics();
            cuadrado.lineStyle(1, 0x000000);
            cuadrado.strokeRect(x, y, tamanoCuadrado, tamanoCuadrado);
            cuadrado.setDepth(10);
            fondoCuadrado.fillStyle(0x000000, 0.5);
            fondoCuadrado.fillRect(x, y, tamanoCuadrado, tamanoCuadrado).setDepth(9);
            let indice = i;
            let posX = x;
            let posY = y;
            const slot = this.add.zone(x, y, tamanoCuadrado, tamanoCuadrado).setOrigin(0).setInteractive();
            slot.on('pointerdown', () => {
                let indiceInventario: number = this.registry.get(Constantes.REGISTROS.INDICEINVENTARIO);
                this.escena.jugador.enviarObjetosBarra(indice, indiceInventario);
                this.escena.jugador.actualizarHUD();
            });
            x += tamanoCuadrado;

        }
    }

    dibujarSlots(): void {
        let posX: number = 210;
        let posY: number = 400;
        for (let i = 0; i < this.arrayBarra.length; i++) {
            if (this.arrayBarra[i][0]) {
                const imagenObjeto = this.add.image(posX + 25, posY + 25, this.arrayBarra[i][0].texture.key);
                imagenObjeto.setScale(2);
                imagenObjeto.setDepth(10);
                let x = 0;
                if (this.arrayBarra[i][1] > 9) {
                    x = posX + 30;
                }
                else {
                    x = posX + 40;
                }
                const numeroObjetos: Phaser.GameObjects.BitmapText = this.add.bitmapText(x, posY + 40, Constantes.FUENTES.BITMAP, "" + this.arrayBarra[i][1]);
                if (i == this.escena.jugador.indiceObjetoEquipado && this.escena.jugador.objetoEquipado) {
                    this.marcarElegido.lineStyle(3, 0x000000);
                    this.marcarElegido.strokeRect(posX, posY, 50, 50);
                }
                if (i == this.escena.jugador.indiceObjetoEquipado &&
                    this.escena.jugador.objetoEquipado != this.escena.jugador.arrayBarra[this.escena.jugador.indiceObjetoEquipado][0]) {
                        this.marcarElegido.destroy();
                }
            }
            posX += 50;
        }
    }

    cofreAbierto(): boolean {
        let comp: boolean = false;
        this.escena.arrayPosicionables.forEach(posicionable => {
            if (posicionable instanceof Cofre) {
                let cofre = posicionable as Cofre;
                if (cofre.abierto) {
                    this.tiempoInventario = 0;
                    comp = true;
                }
            }
        });
        return comp;
    }

    mercadoAbierto(): boolean {
        let comp: boolean = false;
        if (this.escena.mercader.interactuando) {
            comp = true;
            this.tiempoInventario = 0;
        }
        return comp;
    }



}