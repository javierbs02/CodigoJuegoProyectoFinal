import Constantes from "../../constantes";
import Posicionable from "./posicionable";

export default class Horno extends Posicionable {

    public estaEncendido: boolean;
    public cocinando: boolean;
    public objetoCocinando: any;
    private tiempoCocinando: number;
    private contador: number;
    public combustible: number;
    private maxCombustible: number;
    constructor(config: any) {
        super(config);
        this.estaEncendido = false;
        this.cocinando = false;
        this.textura = Constantes.POSICIONABLES.HORNO.HORNOAPAGADO;
        this.puntuacionObjeto = 8;
        this.tiempoCocinando = 5000;
        this.contador = 0;
        this.combustible = 0;
        this.maxCombustible = 5;

        this.setSize(14, 11);
        this.setOffset(0, 0);
        this.setInteractive();
        this.on("pointerdown", () => {
            let martilloEquipado = this.martilloEquipado();
            if (!martilloEquipado) {
                this.cocinar();
            }
        });
    }

    update(): void {
        if (this.estaEncendido) {
            this.anims.play(Constantes.POSICIONABLES.HORNO.HORNOENCENDIDO, true);
            this.setOffset(0, 3);
        }
        else {
            this.anims.stop();
            this.setTexture(Constantes.POSICIONABLES.HORNO.HORNOAPAGADO);
            this.setOffset(0, 0);
        }

        if (this.cocinando) {
            this.contador++;
            if (this.contador >= this.tiempoCocinando) {
                this.crearObjetoCocinado();
                this.contador = 0;
                this.cocinando = false;
            }
        }
        if (this.combustible >= this.maxCombustible) {
            this.combustible = this.maxCombustible;
        }

        this.apagarHoguera();
    }

    cocinar(): void {
        let jugador = this.escena.jugador;
        if (this.estaEncendido && jugador.objetoEquipado.cocinable && !this.cocinando) {
            this.objetoCocinando = jugador.objetoEquipado;
            jugador.objetoEquipado.destruirObjetoBarra();
            this.cocinando = true;
        }
        if (jugador.objetoEquipado.esCombustible && this.combustible < this.maxCombustible) {
            this.combustible += jugador.objetoEquipado.fuerza;
            this.estaEncendido = true;
            jugador.objetoEquipado.destruirObjetoBarra();
        }
        this.escena.jugador.actualizarHUD();
    }

    crearObjetoCocinado(): void {
        let clase = this.objetoCocinando.resultadoAlCocinar;
        let posX = Phaser.Math.Between(this.body.x - 5, this.body.x + 5);
        let posY = Phaser.Math.Between(this.body.y - 5, this.body.y + 5);
        let objetoCocinado = new clase({
            escena: this.escena,
            x: posX,
            y: posY,
            textura: this.objetoCocinando.texturaAlCocinar
        });
        this.escena.arrayObjetos.push(objetoCocinado);
        this.fisicasEnElMapa();
        this.combustible--;
    }

    fisicasEnElMapa(): void {
        this.escena.grupoObjetos = this.escena.physics.add.group(this.escena.arrayObjetos);

        for (let i = 0; i < this.escena.arrayObjetos.length; i++) {
            this.escena.physics.add.overlap(this.escena.jugador, this.escena.arrayObjetos[i], this.escena.jugador.recolecta, null, this);
            this.escena.physics.add.collider(this.escena.arrayObjetos[i], this.escena.grupoObjetos);
        }
    }

    apagarHoguera(): void {
        if (this.combustible <= 0) {
            this.estaEncendido = false;
        }
    }

}