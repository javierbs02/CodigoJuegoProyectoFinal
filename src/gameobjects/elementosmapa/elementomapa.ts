import Constantes from "../../constantes";
import Nivel from "../../escenas/nivel";

export default class ElementoMapa extends Phaser.Physics.Arcade.Sprite {
    protected escena: Nivel;
    public vida: number;
    public resistencia: number;
    public herramientaNecesaria: string;
    public destruido: boolean;
    protected puntuacion: number;
    public tipo: string;
    public numRecursos: number;

    constructor(config: any) {
        super(config.escena, config.x, config.y, config.texture);
        this.escena = config.escena;
        this.destruido = false;
        this.escena.add.existing(this);
        this.escena.physics.world.enable(this);
        this.setDepth(this.body.y);
    }

    update(): void {
        
    }

    elementoDestruido(): void {
        if (!this.destruido) {
            this.escena.puntuacion += this.puntuacion;
            this.escena.registry.set(Constantes.REGISTROS.PUNTUACION, this.escena.puntuacion);
            let jugador = this.escena.jugador;
            if(jugador.objetoEquipado && jugador.objetoEquipado.poder == Constantes.LIBROS.FORTUNA){
                this.numRecursos = this.numRecursos * 2;
            }
        }

        let indice = this.escena.arrayElementos.indexOf(this);
        this.escena.arrayElementos.splice(indice, 1);
        this.escena.physicsGroup.remove(this, true);
        this.escena.grupoElementos.remove(this, true);
        this.destruido = true;
        
        if (this.destruido) {
            this.soltarRecursos();
            this.fisicasEnElMapa();
            this.off("pointedown", this.escena.jugador.destruirElementos, this);
            this.destroy();
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