import Constantes from "../../../constantes";
import ZonaFertil from "../../cultivos/zonaFertil";
import Herramienta from "./herramienta";

export default class Azada extends Herramienta {
    constructor(config: any) {
        super(config);
        this.puntuacionObjeto = 8;
        this.tipoHerramienta = Constantes.HERRAMIENTAS.TIPOS.AZADA;
    }

    usar(): void {
        let mouseX = this.escena.input.mousePointer.worldX;
        let mouseY = this.escena.input.mousePointer.worldY;

        let cultivo = new ZonaFertil({
            escena: this.escena,
            x: mouseX + 8,
            y: mouseY + 8,
            textura: Constantes.CULTIVOS.ZONAFERTIL
        });
        this.escena.arrayZonaFertil.push(cultivo);
        this.escena.grupoZonaFertil = this.escena.physics.add.group(this.escena.arrayZonaFertil);
    }
}