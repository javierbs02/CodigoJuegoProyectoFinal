import Posicionable from "./posicionable";

export default class Muro extends Posicionable{

    constructor(config: any){
        super(config);
        this.esConstructor = true;
    }
}