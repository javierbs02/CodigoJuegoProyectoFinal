import Constantes from "../../constantes";
import Nivel from "../../escenas/nivel";

export default class Objeto extends Phaser.Physics.Arcade.Sprite{
    protected escena: Nivel;
    public puntuacionObjeto: number;
    public tipoObjeto: string;
    public usable: boolean;
    public tipoHerramienta: string;
    public fuerza: number;
    public cocinable: boolean;
    public resultadoAlCocinar: any;
    public texturaAlCocinar: string;
    public esCombustible: boolean;
    public poder: string;

    constructor(config: any){
        super(config.escena, config.x, config.y, config.textura);
        this.escena = config.escena;
        this.escena.physics.world.enable(this);
        this.escena.add.existing(this);
        this.setDepth(this.body.y);
    }

    update(): void {
        if(this.poder == Constantes.LIBROS.FUERZA){
            this.fuerza == this.fuerza + 3;
        }
    }

    destruirObjetoBarra(): void{
        let barra = this.escena.jugador.arrayBarra;
        for(let i = 0; i < barra.length; i++){
            if(barra[i][0] && barra[i][0].texture.key == this.texture.key && i == this.escena.jugador.indiceObjetoEquipado){
                barra[i][1] -= 1;
                if(barra[i][1] <= 0){
                    barra[i][0] = null;
                    barra[i][1] = 0;
                }
            }
        }
    }

}