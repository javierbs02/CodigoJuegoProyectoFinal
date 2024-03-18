import Constantes from "../constantes";

export default class Menu extends Phaser.Scene {

    private width: number;
    private height: number;

    constructor() {
        super(Constantes.ESCENAS.MENU);
    }

    init(): void {
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    create(): void {
        const { width, height } = this.scale;
        const backgroundImage = this.add.image(0, 0, Constantes.UI.FONDO);
        backgroundImage.setOrigin(0, 0); // Establece la esquina superior izquierda como punto de origen
        backgroundImage.setScale(width / backgroundImage.width, height / backgroundImage.height);
        //const logo = this.add.image(400, 70, 'logo');
        const name = this.add.bitmapText(90, 50, Constantes.FUENTES.BITMAP, "CRAFT AND SURVIVE", 40);

        const jugarTxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(50, this.height - 80, Constantes.FUENTES.BITMAP, "JUGAR", 25).setInteractive();

        this.cambiarEscena(jugarTxt, Constantes.ESCENAS.NIVEL);

        let ajustesTxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(380, this.height - 80, Constantes.FUENTES.BITMAP, "AJUSTES", 25).setInteractive();
        this.cambiarEscena(ajustesTxt, Constantes.ESCENAS.AJUSTES);
    }

    cambiarEscena(texto: Phaser.GameObjects.BitmapText, escena: string) {
        texto.on("pointerdown", () => {
            this.cameras.main.fade(700, 0, 0, 0);
            this.cameras.main.on("camerafadeoutcomplete", () => {
                this.sound.stopAll();
                this.scene.start(escena);

            });
        });
    }
}