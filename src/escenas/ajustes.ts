import Constantes from "../constantes";
import Nivel from "./nivel";

export default class Ajustes extends Phaser.Scene {

    private escena: Nivel;
    private sounds: boolean;
    private effects: boolean;

    constructor() {
        super(Constantes.ESCENAS.AJUSTES);

    }

    init() {
        this.sounds = this.registry.get(Constantes.REGISTROS.SONIDOS);
        this.effects = this.registry.get(Constantes.REGISTROS.EFECTOS);
    }

    create() {
        const textoSonido: Phaser.GameObjects.BitmapText = this.add.bitmapText(100, 100, Constantes.FUENTES.BITMAP, "SONIDO", 10);
        let botonSonido = this.add.image(130, 130, Constantes.UI.ON).setInteractive();
        if (this.registry.get(Constantes.REGISTROS.SONIDOS)) {
            botonSonido.setTexture(Constantes.UI.ON);
        }
        else {
            botonSonido.setTexture(Constantes.UI.OFF);
        }
        botonSonido.on("pointerdown", () => {
            if (this.sounds) {
                this.sounds = false;
                this.registry.set(Constantes.REGISTROS.SONIDOS, this.sounds);
                botonSonido.setTexture(Constantes.UI.OFF);
            }
            else {
                this.sounds = true;
                this.registry.set(Constantes.REGISTROS.SONIDOS, this.sounds);
                botonSonido.setTexture(Constantes.UI.ON);
            }
        });

        const textoEfectos: Phaser.GameObjects.BitmapText = this.add.bitmapText(400, 100, Constantes.FUENTES.BITMAP, "EFECTOS", 10);
        let botonEfectos = this.add.image(430, 130, Constantes.UI.ON).setInteractive();
        if (this.registry.get(Constantes.REGISTROS.EFECTOS)) {
            botonEfectos.setTexture(Constantes.UI.ON);
        }
        else {
            botonEfectos.setTexture(Constantes.UI.OFF);
        }
        botonEfectos.on("pointerdown", () => {
            if (this.effects) {
                this.effects = false;
                this.registry.set(Constantes.REGISTROS.EFECTOS, this.effects);
                botonEfectos.setTexture(Constantes.UI.OFF);
            }
            else {
                this.effects = true;
                this.registry.set(Constantes.REGISTROS.EFECTOS, this.effects);
                botonEfectos.setTexture(Constantes.UI.ON);
            }
        })

        let volver = this.add.image(100, 300, Constantes.UI.BOTONPAGINA).setInteractive();
        volver.on("pointerdown", () => {
            this.enviarDatos();
            this.scene.start(Constantes.ESCENAS.MENU);
        });

    }

    enviarDatos() {
        // Suponiendo que tienes la puntuación en una variable llamada "puntuacion"

        //const csrfToken = document.getElementById('csrf-token').getAttribute('value');
        var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');


        // Crea una nueva instancia de XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // Define la URL de la ruta en tu proyecto Laravel
        var url = '/ProyectoFinal/PaginaWebPF/public/game/recogerAjustes';

        // Crea un objeto de datos con la puntuación que deseas enviar
        var data = {
            csrfToken: $("meta[name='csrf-token']").attr("content"),
            sonidos: this.sounds,
            efectos: this.effects
        };

        // Convierte los datos en formato JSON
        var jsonData = JSON.stringify(data);

        // Configura la solicitud AJAX
        xhr.open('POST', 'game/recogerAjustes', true);
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