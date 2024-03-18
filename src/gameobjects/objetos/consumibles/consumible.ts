import Constantes from "../../../constantes";
import Objeto from "../objeto";

export default class Consumible extends Objeto{

    protected salud: number;

    constructor(config: any){
        super(config);
        this.setDepth(1);
        this.tipoObjeto = Constantes.OBJETOS.TIPOS.CONSUMIBLES;
        this.usable = false;
    }

    consumir(): void{

    }

    consumida(): void{
        let barra = this.escena.jugador.arrayBarra;
        for(let i = 0; i < barra.length; i++){
            if(barra[i][0] && barra[i][0].texture.key == this.texture.key){
                barra[i][1] -= 1;
                if(barra[i][1] <= 0){
                    barra[i][0] = null;
                    barra[i][1] = 0;
                }
            }
        }
    }

}