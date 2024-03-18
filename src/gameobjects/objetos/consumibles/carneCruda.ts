import Constantes from "../../../constantes";
import CarneCocinada from "./carneCocinada";
import Consumible from "./consumible";

export default class CarneCruda extends Consumible {
    constructor(config: any) {
        super(config);
        this.setDepth(1);
        this.salud = 1;
        this.puntuacionObjeto = 2;
        this.cocinable = true;
        this.resultadoAlCocinar = CarneCocinada;
        this.texturaAlCocinar = Constantes.COMIDA.COCINADA.CARNE;

        this.setSize(16, 16);
        this.setOffset(0, 0);
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