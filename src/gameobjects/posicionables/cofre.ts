import Constantes from "../../constantes";
import Tronco from "../objetos/tronco";
import Posicionable from "./posicionable";

export default class Cofre extends Posicionable {
    public slots: number;
    public maximosSlots: number;
    public objetos: any[][];
    public abierto: boolean;
    protected texturaAbierto: any;
    public filas: number;
    public columnas: number;
    public indiceInventario: number;
    constructor(config: any) {
        super(config);
        this.objetos = new Array();
        this.abierto = false;
        this.indiceInventario = 0;
        this.maximosSlots = 32;

        this.setInteractive();
        this.on("pointerdown", () => {
            let martilloEquipado = this.martilloEquipado();
            if (!this.abierto && !martilloEquipado) {
                this.abierto = true;
                let datos = {
                    escena: this.escena,
                    cofre: this
                }
                this.escena.scene.launch(Constantes.ESCENAS.HUDCOFRE, datos);
            }
        });
    }

    update(): void {
        if (this.abierto) {
            this.setTexture(this.texturaAbierto);
        }
        else {
            this.setTexture(this.textura);
        }
    }

    actualizarCofre(): void{
        let datos = {
            escena: this.escena,
            cofre: this
        }
        this.escena.scene.stop(Constantes.ESCENAS.HUDCOFRE);
        this.escena.scene.launch(Constantes.ESCENAS.HUDCOFRE, datos);
    }
}