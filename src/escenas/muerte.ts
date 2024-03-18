import Constantes from "../constantes";
import Nivel from "./nivel";

export default class Muerte extends Phaser.Scene {

    private escena: Nivel;
    constructor() {
        super(Constantes.ESCENAS.MUERTE);
    }

    init(data) {
        this.escena = data.escena;
    }

    update(time: number, delta: number): void {

    }

    create() {
        let anchoPantalla = this.cameras.main.width;
        let largoPantalla = this.cameras.main.height;
        const perdiste: Phaser.GameObjects.BitmapText = this.add.bitmapText
            ((anchoPantalla / 2) / 2, (largoPantalla / 2) / 2, Constantes.FUENTES.BITMAP, "PERDISTE", 50);
        const imagenJugador = this.add.image((anchoPantalla / 2), (largoPantalla / 2) + 20, Constantes.UI.JUGADORMUERTO).setDepth(10).setScale(4);
        const puntuacion: Phaser.GameObjects.BitmapText = this.add.bitmapText
            (300, largoPantalla / 2 + 80, Constantes.FUENTES.BITMAP, "PUNTUACION: " + this.escena.puntuacion, 15);
        const menu: Phaser.GameObjects.BitmapText = this.add.bitmapText
            (300, largoPantalla / 2 + 100, Constantes.FUENTES.BITMAP, "VOLVER AL MENU", 15).setInteractive();
        menu.on("pointerdown", () => {
            this.scene.start(Constantes.ESCENAS.NIVEL);
            location.reload();
        });
    }

    enviarPuntuacion(): void {
        // Suponiendo que tienes la puntuación en una variable llamada "puntuacion"

        // Crea una nueva instancia de XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // Define la URL de la ruta en tu proyecto Laravel
        var url = '/ProyectoFinal/PaginaWebPF/public/game/almacenarPuntuacion';

        // Crea un objeto de datos con la puntuación que deseas enviar
        var data = {
            _token: $("meta[name='csrf-token']").attr("content"),
            puntuacion: this.escena.puntuacion
        };

        // Convierte los datos en formato JSON
        var jsonData = JSON.stringify(data);

        // Configura la solicitud AJAX
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        // Define la función de devolución de llamada cuando se complete la solicitud AJAX
        xhr.onload = function () {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                // Puedes realizar acciones adicionales aquí después de enviar la puntuación con éxito
            }
        };

        // Envía la solicitud AJAX con los datos JSON
        xhr.send(jsonData);
    }
}