import Nivel from "../../escenas/nivel";

export default class Cultivo extends Phaser.Physics.Arcade.Sprite {
    protected escena: Nivel;
    protected etapa: number;
    protected numEtapas: number;
    protected texturaEtapas: any[];
    public zonaFertil: any;
    public contador: number;

    constructor(config: any) {
        super(config.escena, config.x, config.y, config.textura);
        this.escena = config.escena;
        this.escena.add.existing(this);
        this.escena.physics.world.enable(this);
        this.setInteractive();
        this.texturaEtapas = new Array();
        this.contador = 0;
        this.setDepth(this.body.y);
        this.setInteractive();
        this.on("pointerdown", () => {
            this.soltarRecursos();
            this.zonaFertil.cultivado = false;
        });
    }

    update(): void {
        if (this.etapa < this.numEtapas) {
            this.contador++;

            if (this.contador >= 10000) {
                this.etapa++;
                this.contador = 0;
            }
        }

        for (let i = 0; i < this.texturaEtapas.length; i++) {
            if (this.etapa == i + 1) {
                this.setTexture(this.texturaEtapas[i]);
            }
        }
    }

    soltarRecursos(): void {

    }

    fisicasEnElMapa(): void {
        this.escena.grupoObjetos = this.escena.physics.add.group(this.escena.arrayObjetos);

        for (let i = 0; i < this.escena.arrayObjetos.length; i++) {
            this.escena.physics.add.overlap(this.escena.jugador, this.escena.arrayObjetos[i], this.escena.jugador.recolecta, null, this);
            this.escena.physics.add.collider(this.escena.arrayObjetos[i], this.escena.grupoObjetos);
        }
    }
}