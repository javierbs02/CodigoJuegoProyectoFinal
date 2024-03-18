import Constantes from "../../constantes";
import Objeto from "../objetos/objeto";

export default class Posicionable extends Objeto {
    public textura: string;
    public esConstructor: boolean;
    public vida: number;

    constructor(config: any) {
        super(config);
        this.tipoObjeto = Constantes.OBJETOS.TIPOS.POSICIONABLES;
        this.esConstructor = false;
        this.setInteractive();

        this.on("pointerdown", () => {
            if (this.escena.jugador.objetoEquipado.tipoHerramienta == Constantes.HERRAMIENTAS.TIPOS.MARTILLO) {
                this.escena.jugador.recolecta(this.escena.jugador, this, false);
                let indice = this.escena.arrayPosicionables.indexOf(this);
                this.escena.arrayPosicionables.splice(indice, 1);
                this.escena.physicsGroup.remove(this, true);
                this.escena.grupoPosicionables.remove(this, true);
                this.escena.puntuacion -= this.puntuacionObjeto;
                this.escena.registry.set(Constantes.REGISTROS.PUNTUACION, this.escena.puntuacion);
                this.destroy();
            }
        });
    }

    update(): void {

    }

    usar(objeto: any): void {
        if (typeof objeto == "function") {
            let mouseX = this.escena.input.mousePointer.worldX;
            let mouseY = this.escena.input.mousePointer.worldY;

            let objetoPosicionable = new objeto({
                escena: this.escena,
                x: this.escena.jugador.datos.objeto.x,
                y: this.escena.jugador.datos.objeto.y,
                textura: this.textura
            });
            objetoPosicionable.setTexture(this.textura);
            this.escena.arrayPosicionables.push(objetoPosicionable);
            this.escena.grupoPosicionables = this.escena.physics.add.group(this.escena.arrayPosicionables);
            //this.escena.physicsGroup = this.escena.physics.add.group(this.escena.arrayPosicionables);

            this.escena.arrayPosicionables.forEach(posicionable => {
                this.escena.physicsGroup.add(posicionable);
            });
            this.escena.arrayPosicionables.forEach(elemento => {
                this.escena.physics.add.collider(elemento, this.escena.grupoElementos);
                this.escena.physics.add.collider(elemento, this.escena.solidGroup);
                this.escena.physics.add.collider(elemento, this.escena.jugador);
                this.escena.physics.add.collider(elemento, this.escena.grupoEnemigos);
                this.escena.physics.add.collider(elemento, this.escena.grupoAnimales);
                this.escena.physics.add.collider(elemento, this.escena.grupoPosicionables);
            });
            this.escena.arrayPosicionables.map((elemento: any) => {
                elemento.body.setImmovable(true);
            });
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
        this.escena.physics.overlap(this, this.escena.grupoPosicionables, () => {
            esPosicionable = false;
        });
        return esPosicionable;
    }

    martilloEquipado(): boolean{
        let comp: boolean = false;
        if(this.escena.jugador.objetoEquipado.tipoHerramienta == Constantes.HERRAMIENTAS.TIPOS.MARTILLO){
            comp = true;
        }
        return comp;
    }
}