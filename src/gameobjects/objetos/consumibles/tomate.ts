import Constantes from "../../../constantes";
import Consumible from "./consumible";

export default class Tomate extends Consumible{
    constructor(config: any){
        super(config);
        this.setDepth(1);
        this.salud = 3;
        this.puntuacionObjeto = 7;
    }

    consumir(): void {
        if (this.escena.jugador.vida < this.escena.jugador.vidaMax) {
            if (this.escena.jugador.vidaMax - this.escena.jugador.vida < this.salud) {
                this.escena.jugador.vida = this.escena.jugador.vidaMax;
            }
            else {
                this.escena.jugador.vida += this.salud;
            }
            let porcentaje = this.escena.jugador.vida / this.escena.jugador.vidaMax;
            this.escena.registry.set(Constantes.REGISTROS.VIDA, porcentaje);
        }
        else {

        }
        this.consumida();
        this.destroy();
    }
}