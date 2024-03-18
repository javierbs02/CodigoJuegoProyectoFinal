import Constantes from "../constantes";
import Cofre from "../gameobjects/posicionables/cofre";
import Nivel from "./nivel";

export default class HudCofre extends Phaser.Scene {
    private escena: Nivel;
    private cofre: Cofre;
    private teclaCerrarCofre: any;
    private imagenInventario: Phaser.GameObjects.Graphics;
    private ventanaAbierta: boolean;

    constructor() {
        super(Constantes.ESCENAS.HUDCOFRE);
    }

    init(data) {
        this.escena = data.escena;
        this.cofre = data.cofre;
        this.teclaCerrarCofre = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
        this.ventanaAbierta = false;
    }

    create() {
        this.cofre.objetos.sort(this.compare);
        this.escena.jugador.inventario.sort(this.compare);
        this.crearInventario();
        this.crearCofre();
    }

    update(time: number, delta: number): void {
        this.cerrarCofre();
    }

    crearInventario(): void {
        let inventario = this.escena.jugador.inventario;
        this.imagenInventario = this.add.graphics();
        this.imagenInventario.fillStyle(0xEEE8E8, 0.9);
        this.imagenInventario.fillRect(100, 130, 300, 150).setDepth(10);

        //Slots
        const margen = 5; // Margen entre los cuadrados y la ventana del inventario
        const tamanoCuadrado = 30; // Tamaño de los cuadrados del inventario
        const filas = 4; // Cantidad de filas que caben en la ventana del inventario
        const columnas = 8; // Cantidad de columnas que caben en la ventana del inventario
        const slots = filas * columnas; // Cantidad total de cuadrados que caben en el inventario
        for (let i = 0; i < slots; i++) {
            const fila = Math.floor(i / columnas);
            const columna = i % columnas;
            const x = 110 + margen + columna * (tamanoCuadrado + margen);
            const y = 130 + margen + fila * (tamanoCuadrado + margen);
            //Agrega una zona invisible
            const slot = this.add.zone(x, y, tamanoCuadrado, tamanoCuadrado).setOrigin(0).setInteractive();
            slot.on('pointerdown', () => {
                this.mostrarOpcionesDeSlot(x + tamanoCuadrado, y, i, false);
            });
            this.imagenInventario.lineStyle(1, 0x000000);
            this.imagenInventario.strokeRect(x, y, tamanoCuadrado, tamanoCuadrado);
            if (inventario[i][0]) {
                const imagenObjeto = this.add.image(x + 15, y + 15, inventario[i][0].texture);
                imagenObjeto.setDepth(15);
                imagenObjeto.setScale(1);
                let posX: number = 0;
                if (inventario[i][1] > 9) {
                    posX = x + 20;
                }
                else {
                    posX = x + 22;
                }
                const numeroObjetos: Phaser.GameObjects.BitmapText = this.add.bitmapText(posX, y + 21, Constantes.FUENTES.BITMAP, "" + inventario[i][1], 7);
                numeroObjetos.setDepth(16);
            }
        }
    }

    crearCofre(): void {
        let inventarioCofre = this.cofre.objetos;
        this.imagenInventario = this.add.graphics();
        this.imagenInventario.fillStyle(0xEEE8E8, 0.9);
        this.imagenInventario.fillRect(450, 130, 300, 150).setDepth(10);

        //Slots
        const margen = 5; // Margen entre los cuadrados y la ventana del inventario
        const tamanoCuadrado = 30; // Tamaño de los cuadrados del inventario
        const filas = this.cofre.filas; // Cantidad de filas que caben en la ventana del inventario
        const columnas = this.cofre.columnas; // Cantidad de columnas que caben en la ventana del inventario
        const slots = filas * columnas; // Cantidad total de cuadrados que caben en el inventario
        for (let i = 0; i < slots; i++) {
            const fila = Math.floor(i / columnas);
            const columna = i % columnas;
            const x = 460 + margen + columna * (tamanoCuadrado + margen);
            const y = 130 + margen + fila * (tamanoCuadrado + margen);
            //Agrega una zona invisible
            const slot = this.add.zone(x, y, tamanoCuadrado, tamanoCuadrado).setOrigin(0).setInteractive();
            slot.on('pointerdown', () => {
                this.mostrarOpcionesDeSlot(x + tamanoCuadrado, y, i, true);
            });
            this.imagenInventario.lineStyle(1, 0x000000);
            this.imagenInventario.strokeRect(x, y, tamanoCuadrado, tamanoCuadrado);
            if (inventarioCofre[i][0]) {
                const imagenObjeto = this.add.image(x + 15, y + 15, inventarioCofre[i][0].texture);
                imagenObjeto.setDepth(15);
                imagenObjeto.setScale(1);
                let posX: number = 0;
                if (inventarioCofre[i][1] > 9) {
                    posX = x + 20;
                }
                else {
                    posX = x + 22;
                }
                const numeroObjetos: Phaser.GameObjects.BitmapText = this.add.bitmapText(posX, y + 21, Constantes.FUENTES.BITMAP, "" + inventarioCofre[i][1], 7);
                numeroObjetos.setDepth(16);
            }
        }
    }

    cerrarCofre() {
        if (this.teclaCerrarCofre.isDown) {
            this.cofre.abierto = false;
            let inventarioAbiero: boolean = true;
            //this.registry.set(Constantes.REGISTROS.INVENTARIOABIERTO, inventarioAbiero);
            this.scene.stop();
        }
    }

    mostrarOpcionesDeSlot(x: number, y: number, indiceObjeto: number, cofre: boolean): void {
        let inventario = this.escena.jugador.inventario;
        let cofreInventario = this.cofre.objetos;
        if (!this.ventanaAbierta) {
            if (!cofre) {
                if (inventario[indiceObjeto][0]) {
                    this.ventanaAbierta = true;
                    const cuadroInformacion = this.add.graphics();
                    cuadroInformacion.fillStyle(0xEEE8E8, 1);
                    cuadroInformacion.fillRect(x, y, 150, 1 * 20).setDepth(16);

                    const textoEquipar: Phaser.GameObjects.BitmapText = this.add.bitmapText(x + 5, y + 5, Constantes.FUENTES.BITMAP, "ENVIAR OBJETO", 10);
                    textoEquipar.setTint(0x000000);
                    textoEquipar.setInteractive();
                    textoEquipar.setDepth(17);

                    textoEquipar.on("pointerdown", () => {
                        this.pasarObjetos(indiceObjeto, true);
                    });
                }
            }
            else {
                if (cofreInventario[indiceObjeto]) {
                    this.ventanaAbierta = true;
                    const cuadroInformacion = this.add.graphics();
                    cuadroInformacion.fillStyle(0xEEE8E8, 1);
                    cuadroInformacion.fillRect(x, y, 100, 1 * 20).setDepth(16);

                    const textoEquipar: Phaser.GameObjects.BitmapText = this.add.bitmapText(x + 5, y + 5, Constantes.FUENTES.BITMAP, "ENVIAR OBJETO", 10);
                    textoEquipar.setTint(0x000000);
                    textoEquipar.setInteractive();
                    textoEquipar.setDepth(17);

                    textoEquipar.on("pointerdown", () => {
                        this.pasarObjetos(indiceObjeto, false);
                    });
                }
            }
        }
        else {
            this.ventanaAbierta = false;
            this.cofre.actualizarCofre();
        }
    }

    pasarObjetos(indice: number, inventarioACofre: boolean): void {
        if (inventarioACofre) {
            let inventario = this.escena.jugador.inventario;
            let inventarioCofre = this.cofre.objetos;
            let objeto = inventario[indice][0];
            let numeroObjeto = inventario[indice][1];
            this.recolectarObjeto(inventarioCofre, objeto, numeroObjeto, this.cofre.indiceInventario);
            inventario[indice][0] = null;
            inventario[indice][1] = 0;
            this.escena.jugador.indiceInventario--;
            this.ordenarInventario(inventario);
            this.cofre.actualizarCofre();
        }
        else {
            let inventario = this.escena.jugador.inventario;
            let inventarioCofre = this.cofre.objetos;
            let objeto = inventarioCofre[indice][0];
            let numeroObjeto = inventarioCofre[indice][1];
            this.recolectarObjeto(inventario, objeto, numeroObjeto, this.escena.jugador.indiceInventario);
            inventarioCofre[indice][0] = null;
            inventarioCofre[indice][1] = 0;
            this.cofre.indiceInventario--;
            this.ordenarInventario(inventario);
            this.cofre.actualizarCofre();
        }
    }

    recolectarObjeto(arrayObjetos: any[], objeto: any, numeroObjeto: number, contadorIndice: number): void {


        for (let i = 0; i < arrayObjetos.length; i++) {
            if (arrayObjetos[i][1] != 0 && objeto.tipoObjeto != Constantes.OBJETOS.TIPOS.HERRAMIENTAS && objeto.tipoObjeto != Constantes.OBJETOS.TIPOS.ARMADURAS) {
                if (arrayObjetos[i][0].texture.key == objeto.texture.key && arrayObjetos[i][1] < this.cofre.maximosSlots) {
                    if(arrayObjetos[i][1] + numeroObjeto > this.cofre.maximosSlots){
                        arrayObjetos[i][1] = this.cofre.maximosSlots;
                        let numeroRestante = (arrayObjetos[i][1] + numeroObjeto) - 32;
                        this.recolectarObjeto(arrayObjetos, arrayObjetos[i][0], numeroRestante, contadorIndice);
                    }
                    arrayObjetos[i][1]++;
                    this.ordenarInventario(arrayObjetos);
                    this.cofre.actualizarCofre();
                    break;
                }
            }
            else {
                arrayObjetos[contadorIndice][0] = objeto;
                arrayObjetos[contadorIndice][1] = numeroObjeto;
                contadorIndice++;
                this.ordenarInventario(arrayObjetos);
                this.cofre.actualizarCofre();
                break;
            }
        }
        this.confirmarIndices(arrayObjetos, contadorIndice);
    }

    ordenarInventario(inventario: any[]): void {
        inventario.sort((a, b) => {
            // Si ambos elementos son nulos, no cambiamos el orden
            if (a[0] === null && b[0] === null) {
                return 0;
            }
            // Si el primer elemento es nulo, movemos el segundo elemento al comienzo
            if (a[0] === null) {
                return 1;
            }
            // Si el segundo elemento es nulo, movemos el primer elemento al comienzo
            if (b[0] === null) {
                return -1;
            }
            // Si ambos elementos tienen objetos, no cambiamos el orden
            return 0;
        });
    }

    confirmarIndices(arrayObjetos: any[], contadorIndice: number){
        if(arrayObjetos == this.escena.jugador.inventario){
            this.escena.jugador.indiceInventario = contadorIndice;
        }
        else{
            this.cofre.indiceInventario = contadorIndice;
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