import Constantes from "../constantes";
import Nivel from "./nivel";

export default class Complementos extends Phaser.Scene {

    private escena: Nivel;
    private posX: number;
    private posY: number;
    private tamanio: number;
    public armaduraElegida: any;

    constructor() {
        super(Constantes.ESCENAS.COMPLEMENTOS);
        this.posY = 150;
        this.posX = 70;
        this.tamanio = 50;
    }

    init(data): void {
        this.escena = data.escena;
    }

    update(time: number, delta: number): void {
        
    }

    create(): void {
        let fondoCuadrado = this.add.graphics();
        const cuadrado = this.add.graphics();
        cuadrado.lineStyle(1, 0x000000);
        cuadrado.strokeRect(this.posX, this.posY, this.tamanio, this.tamanio);
        cuadrado.setDepth(10);
        fondoCuadrado.fillStyle(0xEEE8E8, 0.5);
        fondoCuadrado.fillRect(this.posX, this.posY, this.tamanio, this.tamanio).setDepth(9);

        //Crear zona
        const slot = this.add.zone(this.posX, this.posY, this.tamanio, this.tamanio).setOrigin(0).setInteractive();
        slot.on("pointerdown", () => {
            let indice: number = this.registry.get(Constantes.REGISTROS.INDICEINVENTARIO);
            this.escena.jugador.equiparArmadura(indice);
        });

        this.dibujarArmadura();
    }

    dibujarArmadura(): void {
        let armaduraEquipada = this.escena.jugador.armaduraEquipada;
        if (armaduraEquipada) {
            let texturaArmadura = this.add.image(this.posX + 25, this.posY + 25, armaduraEquipada.texture.key).setScale(2).setDepth(11);
        }
    }
}