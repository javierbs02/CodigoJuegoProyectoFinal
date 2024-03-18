import Constantes from "../constantes";
import Mercader from "../gameobjects/mercader";
import Nivel from "./nivel";

export default class HudMercader extends Phaser.Scene{
    private escena: Nivel;
    private mercader: Mercader;
    private posX: number;
    private posY: number;
    private ancho: number;
    private alto: number;
    private teclaCerrar: any;

    constructor(){
        super(Constantes.ESCENAS.HUDMERCADER);
    }

    init(data){
        this.escena = data.escena;
        this.mercader = data.mercader;
        this.posX = 300;
        this.posY = 80;
        this.ancho = 250;
        this.alto = 80;
        this.teclaCerrar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
    }

    update(time: number, delta: number): void {
        this.cerrarMercado();
    }

    create(): void{

        this.crearProducto(this.posY, this.mercader.producto1, this.mercader.indices[0]);
        this.posY += 100;

        this.crearProducto(this.posY, this.mercader.producto2, this.mercader.indices[1]);
        this.posY += 100;

        this.crearProducto(this.posY, this.mercader.producto3, this.mercader.indices[2]);
    }

    crearProducto(posY: number, array: any[][], indice: number): void{
        let fondoProducto = this.add.graphics();
        fondoProducto.fillStyle(0xEEE8E8, 1);
        fondoProducto.fillRect(this.posX, posY, this.ancho, this.alto);

        let productoImagen = this.add.image(this.posX + 30, posY + 40, array[indice][2]).setScale(2);
        let monedaImagen = this.add.image(this.posX + 190, posY + 40, Constantes.OBJETOS.MONEDA.ID).setScale(2);
        const precio: Phaser.GameObjects.BitmapText = this.add.bitmapText(this.posX + 210, posY + 35, Constantes.FUENTES.BITMAP, "" + array[indice][1], 10);
        precio.setTint(0x000000);

        const zonaProducto = this.add.zone(this.posX, posY, this.ancho, this.alto).setOrigin(0).setInteractive();

        zonaProducto.on("pointerdown", ()=>{
            this.comprarProducto(indice, array);
        });
    }

    cerrarMercado(): void{
        if (this.teclaCerrar.isDown) {
            this.mercader.interactuando = false;
            this.scene.stop();
        }
    }

    comprarProducto(indice: number, array: any[][]): void{
        if(this.escena.jugador.monedas >= array[indice][1]){
            this.escena.jugador.monedas -= array[indice][1];
            let objeto = new array[indice][0]({
                escena: this.escena,
                x: null,
                y: null,
                textura: array[indice][2]
            });
            this.escena.jugador.recolecta(this.escena.jugador, objeto, false);
        }
    }

}