import Constantes from "../constantes";
import Objeto from "../gameobjects/objetos/objeto";
import Nivel from "./nivel";

export default class Inventario extends Phaser.Scene {

    private escena: Nivel;
    private arrayInventario: any[][];
    private imagenInventario: Phaser.GameObjects.Graphics;
    private abrirInventarioAudio: Phaser.Sound.BaseSound;
    private seleccionarObjetoAudio: Phaser.Sound.BaseSound;

    //Menú de información
    private ventanaAbierta: boolean;
    private eligiendo: boolean;
    private objetoElegido: Objeto;
    private numeroObjeto: number;
    private indiceObjeto: number;

    constructor() {
        super(Constantes.ESCENAS.INVENTARIO);
    }

    init(data) {
        this.escena = data.escena;
        this.arrayInventario = this.escena.jugador.inventario;
        this.eligiendo = false;
        this.abrirInventarioAudio = this.escena.sound.add(Constantes.SONIDOS.EFECTOS.ABRIRINVENTARIO);
        this.seleccionarObjetoAudio = this.escena.sound.add(Constantes.SONIDOS.EFECTOS.SELECCIONAROBJETO);
        this.ventanaAbierta = false;
    }

    create(): void {
        this.arrayInventario.sort(this.compare);
        this.crearInventario();
    }

    update() {

    }

    crearInventario(): void {
        this.imagenInventario = this.add.graphics();
        this.imagenInventario.fillStyle(0xEEE8E8, 0.9);
        this.imagenInventario.fillRect(160, 60, 500, 270).setDepth(10);

        //Slots
        const margen = 10; // Margen entre los cuadrados y la ventana del inventario
        const tamanoCuadrado = 50; // Tamaño de los cuadrados del inventario
        const filas = 4; // Cantidad de filas que caben en la ventana del inventario
        const columnas = 8; // Cantidad de columnas que caben en la ventana del inventario
        const slots = filas * columnas; // Cantidad total de cuadrados que caben en el inventario
        for (let i = 0; i < slots; i++) {
            const fila = Math.floor(i / columnas);
            const columna = i % columnas;
            const x = 165 + margen + columna * (tamanoCuadrado + margen);
            const y = 70 + margen + fila * (tamanoCuadrado + margen);
            //Agrega una zona invisible
            const slot = this.add.zone(x, y, tamanoCuadrado, tamanoCuadrado).setOrigin(0).setInteractive();
            slot.on('pointerdown', () => {
                this.mostrarOpcionesDeSlot(x + tamanoCuadrado, y, this.arrayInventario[i][0], this.arrayInventario[i][1], i);
            });
            this.imagenInventario.lineStyle(1, 0x000000);
            this.imagenInventario.strokeRect(x, y, tamanoCuadrado, tamanoCuadrado);
            if (this.arrayInventario[i][0]) {
                const imagenObjeto = this.add.image(x + 25, y + 25, this.arrayInventario[i][0].texture);
                imagenObjeto.setDepth(15);
                imagenObjeto.setScale(2);
                let posX: number = 0;
                if (this.arrayInventario[i][1] > 9) {
                    posX = x + 30;
                }
                else {
                    posX = x + 40;
                }
                const numeroObjetos: Phaser.GameObjects.BitmapText = this.add.bitmapText(posX, y + 40, Constantes.FUENTES.BITMAP, "" + this.arrayInventario[i][1]);
                numeroObjetos.setDepth(16);
            }
        }
    }

    mostrarOpcionesDeSlot(x: number, y: number, objeto: any, numeroObjeto: number, indiceObjeto: number): void {
        if (!this.ventanaAbierta && objeto) {
            this.ventanaAbierta = true;
            this.seleccionarObjetoAudio.play();

            // Crear un rectángulo al lado del slot de inventario
            const cuadroInformacion = this.add.graphics();
            cuadroInformacion.fillStyle(0xEEE8E8, 1);
            cuadroInformacion.fillRect(x, y, 100, 3 * 20).setDepth(16);

            // Agregar las opciones al menú
            const textoEquipar: Phaser.GameObjects.BitmapText = this.add.bitmapText(x + 5, y + 5, Constantes.FUENTES.BITMAP, "EQUIPAR", 10);
            textoEquipar.setTint(0x000000);
            textoEquipar.setInteractive();
            textoEquipar.setDepth(17);
            y += 20;
            const textoDestruir: Phaser.GameObjects.BitmapText = this.add.bitmapText(x + 5, y + 5, Constantes.FUENTES.BITMAP, "DESTRUIR", 10);
            textoDestruir.setTint(0x000000);
            textoDestruir.setInteractive();
            textoDestruir.setDepth(17);
            y += 20;
            const textoSoltar: Phaser.GameObjects.BitmapText = this.add.bitmapText(x + 5, y + 5, Constantes.FUENTES.BITMAP, "SOLTAR", 10);
            textoSoltar.setTint(0x000000);
            textoSoltar.setInteractive();
            textoSoltar.setDepth(17);

            textoEquipar.on("pointerdown", () => {
                this.eligiendo = true;
                this.indiceObjeto = indiceObjeto;
                this.registry.set(Constantes.REGISTROS.INDICEINVENTARIO, indiceObjeto);
                this.registry.set(Constantes.REGISTROS.ELIGIENDO, this.eligiendo);
            });
            textoDestruir.on("pointerdown", ()=>{
                this.arrayInventario[indiceObjeto][0] = null;
                this.arrayInventario[indiceObjeto][1] = 0;
                this.escena.jugador.indiceInventario--;
                this.escena.jugador.actualizarInventario();
            });
            textoSoltar.on("pointerdown", () => {
                let clase = this.escena.jugador.inventario[indiceObjeto][0].constructor;
                let objeto = new clase.prototype.constructor({
                    escena: this.escena,
                    x: this.escena.jugador.body.x,
                    y: this.escena.jugador.body.y + 25,
                    textura: this.escena.jugador.inventario[indiceObjeto][0].texture.key
                });
                this.escena.arrayObjetos.push(objeto);
                this.escena.grupoObjetos = this.escena.physics.add.group(this.escena.arrayObjetos);

                for (let i = 0; i < this.escena.arrayObjetos.length; i++) {
                    this.escena.physics.add.overlap(this.escena.jugador, this.escena.arrayObjetos[i], this.escena.jugador.recolecta, null, this);
                    this.escena.physics.add.collider(this.escena.arrayObjetos[i], this.escena.grupoObjetos);
                }
                this.escena.jugador.destruirObjetoInventario(indiceObjeto);
            });
        }
        else {
            this.ventanaAbierta = false;
            this.escena.jugador.actualizarInventario();
        }
    }

    compare(a: any[], b: any[]): number {
        // Si a está vacío y b no, colocamos b antes que a
        if (a[0] === null && b[0] !== null) {
            return 1;
        }
        // Si b está vacío y a no, colocamos a antes que b
        if (b[0] === null && a[0] !== null) {
            return -1;
        }
        // Si ambos están vacíos o ambos tienen un valor, los comparamos normalmente
        return 0;
    }
}