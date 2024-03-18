import Constantes from "../../constantes";
import Nivel from "../../escenas/nivel";

export default class ZonaFertil extends Phaser.Physics.Arcade.Sprite {
    private escena: Nivel;
    public estaMojada: boolean;
    private contador: number;
    public cultivado: boolean;

    constructor(config: any) {
        super(config.escena, config.x, config.y, config.textura);
        this.escena = config.escena;
        this.escena.add.existing(this);
        this.escena.physics.world.enable(this);
        this.setInteractive();

        this.estaMojada = false;
        this.contador = 0;
        this.cultivado = false;

        this.on("pointerdown", () => {
            if (!this.estaMojada) {
                this.escena.jugador.regar(this.escena.jugador, this);
            }
            else if(this.estaMojada){
                this.escena.jugador.cultivar(this.escena.jugador, this);
            }
        });
    }

    update(): void {
        if (this.estaMojada) {
            this.setTexture(Constantes.CULTIVOS.ZONAFERTILMOJADA);
            this.contador = 0;
        }
        else if (!this.estaMojada) {
            this.setTexture(Constantes.CULTIVOS.ZONAFERTIL);
            this.contador++;
        }
        if (this.contador >= 5000) {
            let indice = this.escena.arrayZonaFertil.indexOf(this);
            this.escena.arrayZonaFertil.splice(indice, 1);
            this.escena.grupoZonaFertil.remove(this, true);
            this.destroy();
        }
    }

    esPosicionable(): boolean {
        let esPosicionable: boolean = true;
        this.escena.physics.overlap(this, this.escena.grupoElementos, () => {
            esPosicionable = false;
        });
        this.escena.physics.overlap(this, this.escena.grupoObjetos, () => {
            esPosicionable = false;
        });
        this.escena.physics.overlap(this, this.escena.grupoEnemigos, () => {
            esPosicionable = false;
        });
        this.escena.physics.overlap(this, this.escena.grupoElementos, () => {
            esPosicionable = false;
        });
        this.escena.physics.overlap(this, this.escena.jugador, () => {
            esPosicionable = false;
        });
        this.escena.physics.overlap(this, this.escena.solidGroup, () => {
            esPosicionable = false;
        });
        this.escena.physics.overlap(this, this.escena.grupoAnimales, () => {
            esPosicionable = false;
        });
        this.escena.physics.overlap(this, this.escena.grupoZonaFertil, () => {
            esPosicionable = false;
        });
        return esPosicionable;
    }
}