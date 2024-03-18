import Constantes from "../constantes";
import Objeto from "../gameobjects/objetos/objeto";
import ArmaduraCuero from "../gameobjects/objetos/armaduras/ArmaduraCuero";
import CascoHierro from "../gameobjects/objetos/armaduras/cascoHierro";
import EspadaHierro from "../gameobjects/objetos/herramientas/espadaHierro";
import EspadaPiedra from "../gameobjects/objetos/herramientas/espadaPiedra";
import HachaHierro from "../gameobjects/objetos/herramientas/hachaHierro";
import HachaPiedra from "../gameobjects/objetos/herramientas/hachaPiedra";
import PicoHierro from "../gameobjects/objetos/herramientas/picoHierro";
import PicoPiedra from "../gameobjects/objetos/herramientas/picoPiedra";
import Regadera from "../gameobjects/objetos/regadera";
import Horno from "../gameobjects/posicionables/horno";
import Nivel from "./nivel";
import Arco from "../gameobjects/objetos/herramientas/arco";
import Flecha from "../gameobjects/objetos/flecha";
import CofrePequenio from "../gameobjects/posicionables/cofrePequenio";
import MuroPiedra from "../gameobjects/posicionables/muroPiedra";
import ArmaduraTroll from "../gameobjects/objetos/armaduras/armaduraTroll";
import EspadaAzulita from "../gameobjects/objetos/herramientas/espadaAzulita";
import EspadaPiedraRojiza from "../gameobjects/objetos/herramientas/espadaPiedraRojiza";
import PicoAzulita from "../gameobjects/objetos/herramientas/picoAzulita";
import HachaPiedraRojiza from "../gameobjects/objetos/herramientas/hachaPiedraRojiza";
import BastonFuego from "../gameobjects/objetos/herramientas/bastonFuego";
import ArmaduraPiedraRojiza from "../gameobjects/objetos/armaduras/armaduraPiedraRojiza";
import Azada from "../gameobjects/objetos/herramientas/azada";
import EstatuaRitual from "../gameobjects/posicionables/estatuaRitual";

export default class Recetas extends Phaser.Scene {
    private recetas: any[];
    private recetaAncho: number;
    private recetaAlto: number;
    private posX: number;
    private posY: number;
    private escena: Nivel;

    constructor() {
        super(Constantes.ESCENAS.RECETAS);
        this.recetaAncho = 180;
        this.recetaAlto = 70;
        this.posY = 60;
        this.posX = 670;
    }

    init(data): void {
        this.escena = data.escena;
    }

    create(): void {
        let y = this.posY;
        if (this.escena.paginaRecetas == 1) {
            this.espadaPiedra(y);
            y += 80;
            this.hachaPiedra(y);
            y += 80;
            this.picoPiedra(y);
        }
        else if (this.escena.paginaRecetas == 2) {
            this.fogata(y);
            y += 80;
            this.armaduraCuero(y);
            y += 80;
            this.espadaHierro(y);
        }
        else if (this.escena.paginaRecetas == 3) {
            this.picoHierro(y);
            y += 80;
            this.hachaHierro(y);
            y += 80;
            this.cascoHierro(y);
        }
        else if (this.escena.paginaRecetas == 4) {
            this.azada(y);
            y += 80;
            this.regadera(y);
            y += 80;
            this.arco(y);
        }
        else if (this.escena.paginaRecetas == 5) {
            this.flechaPiedra(y);
            y += 80;
            this.cofrePequenio(y);
            y += 80;
            this.martillo(y);
        }
        else if (this.escena.paginaRecetas == 6) {
            this.muroPiedra(y);
            y += 80;
            this.armaduraTroll(y);
            y += 80;
            this.espadaAzulita(y);
        }
        else if (this.escena.paginaRecetas == 7) {
            this.espadaPiedraRojiza(y);
            y += 80;
            this.picoAzulita(y);
            y += 80;
            this.hachaPiedraRojiza(y);
        }
        else if(this.escena.paginaRecetas == 8){
            this.bastonFuego(y);
            y += 80;
            this.armaduraPiedraRojiza(y);
            y += 80;
            this.estatuaRitual(y);
        }
        let botonIzq = this.add.image(this.posX + 40, 315, Constantes.UI.BOTONPAGINA).setInteractive().setScale(2);
        botonIzq.on("pointerdown", () => {
            this.escena.paginaRecetas--;
            if (this.escena.paginaRecetas <= 1) {
                this.escena.paginaRecetas = 1;
            }
            let cambiando: boolean = true;
            this.registry.set(Constantes.REGISTROS.CAMBIANDO, cambiando);
        });
        let botonDch = this.add.image(this.posX + 140, 315, Constantes.UI.BOTONPAGINA).setInteractive().setScale(2);
        botonDch.flipX = true;
        botonDch.on("pointerdown", () => {
            this.escena.paginaRecetas++;
            if (this.escena.paginaRecetas >= 8) {
                this.escena.paginaRecetas = 8;
            }
            let cambiando: boolean = true;
            this.registry.set(Constantes.REGISTROS.CAMBIANDO, cambiando);
        });
    }

    update(): void {

    }

    crearReceta(nombreReceta: string, posY: number, texturaObjetoFinal: any, texturaObjeto1: any, texturaObjeto2: any, texturaObjeto3: any,
        numero1: any, numero2: any, numero3: any): void {
        let fondoReceta = this.add.graphics();
        fondoReceta.fillStyle(0xEEE8E8, 1);
        fondoReceta.fillRect(this.posX, posY, this.recetaAncho, this.recetaAlto);
        posY += 30;

        // Ajustar posiciones Y
        const numeroObjetos: Phaser.GameObjects.BitmapText = this.add.bitmapText(this.posX + 5, posY + 10, Constantes.FUENTES.BITMAP, "" + numero1).setScale(2);
        let textura1 = this.add.image(this.posX + 25, posY - 5, texturaObjeto1).setScale(2);

        if (texturaObjeto2 && numero2) {
            // Ajustar posición X
            const posX2 = this.posX + 50;
            const numeroObjetos2: Phaser.GameObjects.BitmapText = this.add.bitmapText(posX2, posY + 10, Constantes.FUENTES.BITMAP, "" + numero2).setScale(2);
            let textura2 = this.add.image(posX2 + 10, posY - 5, texturaObjeto2).setScale(2);
        }

        if (texturaObjeto3 && numero3) {
            // Ajustar posición X
            const posX3 = this.posX + 90;
            const numeroObjetos3: Phaser.GameObjects.BitmapText = this.add.bitmapText(posX3, posY + 10, Constantes.FUENTES.BITMAP, "" + numero3).setScale(2);
            let textura3 = this.add.image(posX3 + 10, posY - 5, texturaObjeto3).setScale(2);
        }

        const resultado: Phaser.GameObjects.BitmapText = this.add.bitmapText(this.posX + 115, posY - 15, Constantes.FUENTES.BITMAP, ":").setScale(2);
        let texturaFinal = this.add.image(this.posX + 150, posY - 5, texturaObjetoFinal).setScale(2);
    }

    construirReceta(objeto1: string, objeto2: string, objeto3: string, numero1: number, numero2: number, numero3: number): boolean {
        let recopilacion: number = 0;
        let arrayBarra = this.escena.jugador.arrayBarra;
        let arrayInventario = this.escena.jugador.inventario;
        let comp: boolean = false;
        let informacion = new Array();
        for (let i = 0; i < arrayBarra.length; i++) {
            if (arrayBarra[i][1] > 0 && objeto1 == arrayBarra[i][0].texture.key && arrayBarra[i][1] >= numero1) {
                recopilacion++;
                informacion[0] = new Array();
                informacion[0][0] = "barra";
                let indice = i;
                informacion[0][1] = indice;
                informacion[0][2] = numero1;
                objeto1 = " ";
            }
            if (arrayBarra[i][1] > 0 && objeto2 && objeto2 == arrayBarra[i][0].texture.key && arrayBarra[i][1] >= numero2) {
                recopilacion++;
                informacion[1] = new Array();
                informacion[1][0] = "barra";
                let indice = i;
                informacion[1][1] = indice;
                informacion[1][2] = numero2;
                objeto2 = " ";
            }
            if (arrayBarra[i][1] > 0 && objeto3 && objeto3 == arrayBarra[i][0].texture.key && arrayBarra[i][1] >= numero3) {
                recopilacion++;
                informacion[2] = new Array();
                informacion[2][0] = "barra";
                let indice = i;
                informacion[2][1] = indice;
                informacion[2][2] = numero3;
                objeto3 = " ";
            }
            if (!objeto2 && !objeto3 && recopilacion == 1) {
                comp = true;
            }
            if (objeto2 && recopilacion == 2 && !objeto3) {
                comp = true;
            }
            if (objeto3 && recopilacion == 3) {
                comp = true;
            }
        }
        for (let i = 0; i < arrayInventario.length; i++) {
            if (arrayInventario[i][1] > 0 && objeto1 == arrayInventario[i][0].texture.key && arrayInventario[i][1] >= numero1) {
                recopilacion++;
                informacion[0] = new Array();
                informacion[0][0] = "inventario";
                let indice = i;
                informacion[0][1] = indice;
                informacion[0][2] = numero1;
                objeto1 = " ";
            }
            if (arrayInventario[i][1] > 0 && objeto2 && objeto2 == arrayInventario[i][0].texture.key && arrayInventario[i][1] >= numero2) {
                recopilacion++;
                informacion[1] = new Array();
                informacion[1][0] = "inventario";
                let indice = i;
                informacion[1][1] = indice;
                informacion[1][2] = numero2;
                objeto2 = " ";
            }
            if (arrayInventario[i][1] > 0 && objeto3 && objeto3 == arrayInventario[i][0].texture.key && arrayInventario[i][1] >= numero3) {
                recopilacion++;
                informacion[2] = new Array();
                informacion[2][0] = "inventario";
                let indice = i;
                informacion[2][1] = indice;
                informacion[2][2] = numero3;
                objeto3 = " ";
            }
            if (!objeto2 && !objeto3 && recopilacion == 1) {
                comp = true;
            }
            if (objeto2 && recopilacion == 2 && !objeto3) {
                comp = true;
            }
            if (objeto3 && recopilacion == 3) {
                comp = true;
            }
        }
        if (comp) {
            for (let j = 0; j < informacion.length; j++) {
                if (informacion[j][0] == "barra") {
                    let i = informacion[j][1];
                    console.log(i);
                    arrayBarra[i][1] -= informacion[j][2];
                    if (arrayBarra[i][1] <= 0) {
                        arrayBarra[i][0] = null;
                        arrayBarra[i][1] = 0;
                    }
                }
                else {
                    let i = informacion[j][1];
                    arrayInventario[i][1] -= informacion[j][2];
                    if (arrayInventario[i][1] <= 0) {
                        arrayInventario[i][0] = null;
                        arrayInventario[i][1] = 0;
                        this.escena.jugador.indiceInventario--;
                    }
                }
            }
        }
        return comp;
    }

    espadaPiedra(posY: number): void {
        this.crearReceta(Constantes.RECETAS.ESPADAPIEDRA, posY, Constantes.HERRAMIENTAS.ESPADAS.ESPADAPIEDRA,
            Constantes.OBJETOS.TRONCOPEQUENIO, Constantes.OBJETOS.PIEDRAFOREST, null, 2, 2, null);

        const recetaEspadaPiedra = this.add.zone(this.posX, posY, this.recetaAncho, this.recetaAncho).setOrigin(0).setInteractive();
        recetaEspadaPiedra.on("pointerdown", () => {
            let hayMateriales = this.construirReceta(Constantes.OBJETOS.TRONCOPEQUENIO, Constantes.OBJETOS.PIEDRAFOREST, null,
                2, 2, null);
            if (hayMateriales) {
                let espadaPiedra = new EspadaPiedra({
                    escena: this.escena,
                    x: null,
                    y: null,
                    texture: null
                });
                espadaPiedra.setTexture(Constantes.HERRAMIENTAS.ESPADAS.ESPADAPIEDRA);
                this.escena.jugador.recolecta(this.escena.jugador, espadaPiedra, true);
            }
        });
    }

    hachaPiedra(posY: number) {
        this.crearReceta(Constantes.RECETAS.HACHAPIEDRA, posY, Constantes.HERRAMIENTAS.HACHAS.HACHAPIEDRA,
            Constantes.OBJETOS.TRONCOPEQUENIO, Constantes.OBJETOS.PIEDRAFOREST, null, 2, 2, null);

        const recetaEspadaPiedra = this.add.zone(this.posX, posY, this.recetaAncho, this.recetaAncho).setOrigin(0).setInteractive();
        recetaEspadaPiedra.on("pointerdown", () => {
            let hayMateriales = this.construirReceta(Constantes.OBJETOS.TRONCOPEQUENIO, Constantes.OBJETOS.PIEDRAFOREST, null,
                2, 2, null);
            if (hayMateriales) {
                let objeto = new HachaPiedra({
                    escena: this.escena,
                    x: null,
                    y: null,
                    texture: null
                });
                objeto.setTexture(Constantes.HERRAMIENTAS.HACHAS.HACHAPIEDRA);
                this.escena.jugador.recolecta(this.escena.jugador, objeto, true);
            }
        });
    }

    picoPiedra(posY: number) {
        this.crearReceta(Constantes.RECETAS.PICOPIEDRA, posY, Constantes.HERRAMIENTAS.PICOS.PICOPIEDRA,
            Constantes.OBJETOS.TRONCOPEQUENIO, Constantes.OBJETOS.PIEDRAFOREST, null, 2, 2, null);

        const recetaEspadaPiedra = this.add.zone(this.posX, posY, this.recetaAncho, this.recetaAncho).setOrigin(0).setInteractive();
        recetaEspadaPiedra.on("pointerdown", () => {
            let hayMateriales = this.construirReceta(Constantes.OBJETOS.TRONCOPEQUENIO, Constantes.OBJETOS.PIEDRAFOREST, null,
                2, 2, null);
            if (hayMateriales) {
                let objeto = new PicoPiedra({
                    escena: this.escena,
                    x: null,
                    y: null,
                    texture: null
                });
                objeto.setTexture(Constantes.HERRAMIENTAS.PICOS.PICOPIEDRA);
                this.escena.jugador.recolecta(this.escena.jugador, objeto, true);
            }
        });
    }

    fogata(posY: number) {
        this.crearReceta(Constantes.RECETAS.FOGATA, posY, Constantes.POSICIONABLES.HORNO.HORNOAPAGADO,
            Constantes.OBJETOS.TRONCOPEQUENIO, Constantes.OBJETOS.PIEDRAFOREST, null, 5, 2, null);

        const recetaFogata = this.add.zone(this.posX, posY, this.recetaAncho, this.recetaAncho).setOrigin(0).setInteractive();
        recetaFogata.on("pointerdown", () => {
            let hayMateriales = this.construirReceta(Constantes.OBJETOS.TRONCOPEQUENIO, Constantes.OBJETOS.PIEDRAFOREST, null,
                5, 2, null);
            if (hayMateriales) {
                let objeto = new Horno({
                    escena: this.escena,
                    x: null,
                    y: null,
                    texture: Constantes.POSICIONABLES.HORNO.HORNOAPAGADO
                });
                objeto.setTexture(Constantes.POSICIONABLES.HORNO.HORNOAPAGADO);
                this.escena.jugador.recolecta(this.escena.jugador, objeto, true);
            }
        });
    }

    armaduraCuero(posY: number) {
        this.crearReceta(Constantes.ARMADURAS.CUERO, posY, Constantes.ARMADURAS.CUERO,
            Constantes.OBJETOS.CUEROVACA, null, null, 8, null, null);

        const recetaFogata = this.add.zone(this.posX, posY, this.recetaAncho, this.recetaAncho).setOrigin(0).setInteractive();
        recetaFogata.on("pointerdown", () => {
            let hayMateriales = this.construirReceta(Constantes.OBJETOS.CUEROVACA, null, null,
                8, null, null);
            if (hayMateriales) {
                let objeto = new ArmaduraCuero({
                    escena: this.escena,
                    x: null,
                    y: null,
                    textura: Constantes.ARMADURAS.CUERO
                });
                this.escena.jugador.recolecta(this.escena.jugador, objeto, true);
            }
        });
    }

    espadaHierro(posY: number) {
        this.crearReceta(Constantes.HERRAMIENTAS.ESPADAS.ESPADAHIERRO, posY, Constantes.HERRAMIENTAS.ESPADAS.ESPADAHIERRO,
            Constantes.OBJETOS.HIERRO, Constantes.OBJETOS.TRONCOPEQUENIO, null, 3, 2, null);

        const receta = this.add.zone(this.posX, posY, this.recetaAncho, this.recetaAncho).setOrigin(0).setInteractive();
        receta.on("pointerdown", () => {
            let hayMateriales = this.construirReceta(Constantes.OBJETOS.HIERRO, Constantes.OBJETOS.TRONCOPEQUENIO, null,
                3, 2, null);
            if (hayMateriales) {
                let objeto = new EspadaHierro({
                    escena: this.escena,
                    x: null,
                    y: null,
                    textura: Constantes.HERRAMIENTAS.ESPADAS.ESPADAHIERRO
                });
                this.escena.jugador.recolecta(this.escena.jugador, objeto, true);
            }
        });
    }

    picoHierro(posY: number) {
        this.crearReceta(Constantes.HERRAMIENTAS.PICOS.PICOHIERRO, posY, Constantes.HERRAMIENTAS.PICOS.PICOHIERRO,
            Constantes.OBJETOS.HIERRO, Constantes.OBJETOS.TRONCOPEQUENIO, null, 3, 2, null);

        const receta = this.add.zone(this.posX, posY, this.recetaAncho, this.recetaAncho).setOrigin(0).setInteractive();
        receta.on("pointerdown", () => {
            let hayMateriales = this.construirReceta(Constantes.OBJETOS.HIERRO, Constantes.OBJETOS.TRONCOPEQUENIO, null,
                3, 2, null);
            if (hayMateriales) {
                let objeto = new PicoHierro({
                    escena: this.escena,
                    x: null,
                    y: null,
                    textura: Constantes.HERRAMIENTAS.PICOS.PICOHIERRO
                });
                this.escena.jugador.recolecta(this.escena.jugador, objeto, true);
            }
        });
    }

    hachaHierro(posY: number) {
        this.crearReceta(Constantes.HERRAMIENTAS.HACHAS.HACHAHIERRO, posY, Constantes.HERRAMIENTAS.HACHAS.HACHAHIERRO,
            Constantes.OBJETOS.HIERRO, Constantes.OBJETOS.TRONCOPEQUENIO, null, 3, 2, null);

        const receta = this.add.zone(this.posX, posY, this.recetaAncho, this.recetaAncho).setOrigin(0).setInteractive();
        receta.on("pointerdown", () => {
            let hayMateriales = this.construirReceta(Constantes.OBJETOS.HIERRO, Constantes.OBJETOS.TRONCOPEQUENIO, null,
                3, 2, null);
            if (hayMateriales) {
                let objeto = new HachaHierro({
                    escena: this.escena,
                    x: null,
                    y: null,
                    textura: Constantes.HERRAMIENTAS.HACHAS.HACHAHIERRO
                });
                this.escena.jugador.recolecta(this.escena.jugador, objeto, true);
            }
        });
    }

    cascoHierro(posY: number) {
        this.crearReceta(Constantes.ARMADURAS.CASCOHIERRO, posY, Constantes.ARMADURAS.CASCOHIERRO,
            Constantes.OBJETOS.HIERRO, null, null, 6, null, null);

        const recetaFogata = this.add.zone(this.posX, posY, this.recetaAncho, this.recetaAncho).setOrigin(0).setInteractive();
        recetaFogata.on("pointerdown", () => {
            let hayMateriales = this.construirReceta(Constantes.OBJETOS.HIERRO, null, null,
                6, null, null);
            if (hayMateriales) {
                let objeto = new CascoHierro({
                    escena: this.escena,
                    x: null,
                    y: null,
                    textura: Constantes.ARMADURAS.CASCOHIERRO
                });
                this.escena.jugador.recolecta(this.escena.jugador, objeto, true);
            }
        });
    }

    azada(posY: number) {
        this.crearReceta(Constantes.HERRAMIENTAS.AZADA, posY, Constantes.HERRAMIENTAS.AZADA,
            Constantes.OBJETOS.HIERRO, Constantes.OBJETOS.TRONCOPEQUENIO, null, 3, 2, null);

        const receta = this.add.zone(this.posX, posY, this.recetaAncho, this.recetaAncho).setOrigin(0).setInteractive();
        receta.on("pointerdown", () => {
            let hayMateriales = this.construirReceta(Constantes.OBJETOS.HIERRO, Constantes.OBJETOS.TRONCOPEQUENIO, null,
                3, 2, null);
            if (hayMateriales) {
                let objeto = new Azada({
                    escena: this.escena,
                    x: null,
                    y: null,
                    textura: Constantes.HERRAMIENTAS.AZADA
                });
                this.escena.jugador.recolecta(this.escena.jugador, objeto, true);
            }
        });
    }

    regadera(posY: number) {
        this.crearReceta(Constantes.OBJETOS.REGADERA, posY, Constantes.OBJETOS.REGADERA,
            Constantes.OBJETOS.HIERRO, null, null, 3, null, null);

        const receta = this.add.zone(this.posX, posY, this.recetaAncho, this.recetaAncho).setOrigin(0).setInteractive();
        receta.on("pointerdown", () => {
            let hayMateriales = this.construirReceta(Constantes.OBJETOS.HIERRO, null, null,
                3, null, null);
            if (hayMateriales) {
                let objeto = new Regadera({
                    escena: this.escena,
                    x: null,
                    y: null,
                    textura: Constantes.OBJETOS.REGADERA
                });
                this.escena.jugador.recolecta(this.escena.jugador, objeto, true);
            }
        });
    }

    arco(posY: number) {
        this.crearReceta(Constantes.HERRAMIENTAS.ARCO, posY, Constantes.HERRAMIENTAS.ARCO,
            Constantes.OBJETOS.TRONCOPEQUENIO, Constantes.OBJETOS.BOLADESLIME, Constantes.OBJETOS.HIERRO, 5, 3, 1);

        const receta = this.add.zone(this.posX, posY, this.recetaAncho, this.recetaAncho).setOrigin(0).setInteractive();
        receta.on("pointerdown", () => {
            let hayMateriales = this.construirReceta(Constantes.OBJETOS.TRONCOPEQUENIO, Constantes.OBJETOS.BOLADESLIME, Constantes.OBJETOS.HIERRO,
                5, 3, 1);
            if (hayMateriales) {
                let objeto = new Arco({
                    escena: this.escena,
                    x: null,
                    y: null,
                    textura: Constantes.HERRAMIENTAS.ARCO
                });
                this.escena.jugador.recolecta(this.escena.jugador, objeto, true);
            }
        });
    }

    flechaPiedra(posY: number) {
        this.crearReceta(Constantes.OBJETOS.FLECHAPIEDRA, posY, Constantes.OBJETOS.FLECHAPIEDRA,
            Constantes.OBJETOS.TRONCOPEQUENIO, Constantes.OBJETOS.PIEDRAFOREST, Constantes.OBJETOS.PLUMA, 2, 3, 2);

        const receta = this.add.zone(this.posX, posY, this.recetaAncho, this.recetaAncho).setOrigin(0).setInteractive();
        receta.on("pointerdown", () => {
            let hayMateriales = this.construirReceta(Constantes.OBJETOS.TRONCOPEQUENIO, Constantes.OBJETOS.PIEDRAFOREST, Constantes.OBJETOS.PLUMA,
                2, 3, 2);
            if (hayMateriales) {
                for (let i = 0; i < 6; i++) {
                    let objeto = new Flecha({
                        escena: this.escena,
                        x: null,
                        y: null,
                        textura: Constantes.OBJETOS.FLECHAPIEDRA
                    });
                    this.escena.jugador.recolecta(this.escena.jugador, objeto, true);
                }
            }
        });
    }

    cofrePequenio(posY: number) {
        this.crearReceta(Constantes.POSICIONABLES.COFRE.PEQUENIO.ID, posY, Constantes.POSICIONABLES.COFRE.PEQUENIO.CERRADO,
            Constantes.OBJETOS.TRONCOPEQUENIO, Constantes.OBJETOS.HIERRO, null, 8, 1, null);

        const receta = this.add.zone(this.posX, posY, this.recetaAncho, this.recetaAncho).setOrigin(0).setInteractive();
        receta.on("pointerdown", () => {
            let hayMateriales = this.construirReceta(Constantes.OBJETOS.TRONCOPEQUENIO, Constantes.OBJETOS.HIERRO, null,
                8, 1, null);
            if (hayMateriales) {
                let objeto = new CofrePequenio({
                    escena: this.escena,
                    x: null,
                    y: null,
                    textura: Constantes.POSICIONABLES.COFRE.PEQUENIO
                });
                this.escena.jugador.recolecta(this.escena.jugador, objeto, true);
            }
        });
    }

    martillo(posY: number) {
        this.crearReceta(Constantes.HERRAMIENTAS.MARTILLO, posY, Constantes.HERRAMIENTAS.MARTILLO,
            Constantes.OBJETOS.TRONCOPEQUENIO, Constantes.OBJETOS.PIEDRAFOREST, null, 4, 4, null);

        const receta = this.add.zone(this.posX, posY, this.recetaAncho, this.recetaAncho).setOrigin(0).setInteractive();
        receta.on("pointerdown", () => {
            let hayMateriales = this.construirReceta(Constantes.OBJETOS.TRONCOPEQUENIO, Constantes.OBJETOS.PIEDRAFOREST, null,
                4, 4, null);
            if (hayMateriales) {
                let objeto = new CofrePequenio({
                    escena: this.escena,
                    x: null,
                    y: null,
                    textura: Constantes.HERRAMIENTAS.MARTILLO
                });
                this.escena.jugador.recolecta(this.escena.jugador, objeto, true);
            }
        });
    }

    muroPiedra(posY: number) {
        this.crearReceta(Constantes.POSICIONABLES.CONSTRUCTOR.MUROS.MUROPIEDRA, posY, Constantes.POSICIONABLES.CONSTRUCTOR.MUROS.MUROPIEDRA,
            Constantes.OBJETOS.PIEDRAFOREST, null, null, 4, null, null);

        const receta = this.add.zone(this.posX, posY, this.recetaAncho, this.recetaAncho).setOrigin(0).setInteractive();
        receta.on("pointerdown", () => {
            let hayMateriales = this.construirReceta(Constantes.OBJETOS.PIEDRAFOREST, null, null,
                4, null, null);
            if (hayMateriales) {
                let objeto = new MuroPiedra({
                    escena: this.escena,
                    x: null,
                    y: null,
                    textura: Constantes.POSICIONABLES.CONSTRUCTOR.MUROS.MUROPIEDRA
                });
                this.escena.jugador.recolecta(this.escena.jugador, objeto, true);
            }
        });
    }

    armaduraTroll(posY: number) {
        this.crearReceta(Constantes.ARMADURAS.TROLL, posY, Constantes.ARMADURAS.TROLL,
            Constantes.OBJETOS.HIERRO, Constantes.OBJETOS.CUEROTROLL, null, 5, 5, null);

        const receta = this.add.zone(this.posX, posY, this.recetaAncho, this.recetaAncho).setOrigin(0).setInteractive();
        receta.on("pointerdown", () => {
            let hayMateriales = this.construirReceta(Constantes.OBJETOS.HIERRO, Constantes.OBJETOS.CUEROTROLL, null,
                5, 5, null);
            if (hayMateriales) {
                let objeto = new ArmaduraTroll({
                    escena: this.escena,
                    x: null,
                    y: null,
                    textura: Constantes.ARMADURAS.TROLL
                });
                this.escena.jugador.recolecta(this.escena.jugador, objeto, true);
            }
        });
    }

    espadaAzulita(posY: number) {
        this.crearReceta(Constantes.HERRAMIENTAS.ESPADAS.ESPADAAZULITA, posY, Constantes.HERRAMIENTAS.ESPADAS.ESPADAAZULITA,
            Constantes.OBJETOS.AZULITA, Constantes.OBJETOS.ORO, null, 7, 3, null);

        const receta = this.add.zone(this.posX, posY, this.recetaAncho, this.recetaAncho).setOrigin(0).setInteractive();
        receta.on("pointerdown", () => {
            let hayMateriales = this.construirReceta(Constantes.OBJETOS.AZULITA, Constantes.OBJETOS.ORO, null,
                7, 3, null);
            if (hayMateriales) {
                let objeto = new EspadaAzulita({
                    escena: this.escena,
                    x: null,
                    y: null,
                    textura: Constantes.HERRAMIENTAS.ESPADAS.ESPADAAZULITA
                });
                this.escena.jugador.recolecta(this.escena.jugador, objeto, true);
            }
        });
    }

    espadaPiedraRojiza(posY: number) {
        this.crearReceta(Constantes.HERRAMIENTAS.ESPADAS.ESPADAPIEDRAROJIZA, posY, Constantes.HERRAMIENTAS.ESPADAS.ESPADAPIEDRAROJIZA,
            Constantes.OBJETOS.PIEDRAROJIZA, Constantes.HERRAMIENTAS.ESPADAS.ESPADAAZULITA, null, 3, 1, null);

        const receta = this.add.zone(this.posX, posY, this.recetaAncho, this.recetaAncho).setOrigin(0).setInteractive();
        receta.on("pointerdown", () => {
            let hayMateriales = this.construirReceta(Constantes.OBJETOS.PIEDRAROJIZA, Constantes.HERRAMIENTAS.ESPADAS.ESPADAAZULITA, null,
                3, 1, null);
            if (hayMateriales) {
                let objeto = new EspadaPiedraRojiza({
                    escena: this.escena,
                    x: null,
                    y: null,
                    textura: Constantes.HERRAMIENTAS.ESPADAS.ESPADAPIEDRAROJIZA
                });
                this.escena.jugador.recolecta(this.escena.jugador, objeto, true);
            }
        });
    }

    picoAzulita(posY: number) {
        this.crearReceta(Constantes.HERRAMIENTAS.PICOS.PICOAZULITA, posY, Constantes.HERRAMIENTAS.PICOS.PICOAZULITA,
            Constantes.OBJETOS.AZULITA, Constantes.OBJETOS.ORO, null, 7, 3, null);

        const receta = this.add.zone(this.posX, posY, this.recetaAncho, this.recetaAncho).setOrigin(0).setInteractive();
        receta.on("pointerdown", () => {
            let hayMateriales = this.construirReceta(Constantes.OBJETOS.AZULITA, Constantes.OBJETOS.ORO, null,
                7, 3, null);
            if (hayMateriales) {
                let objeto = new PicoAzulita({
                    escena: this.escena,
                    x: null,
                    y: null,
                    textura: Constantes.HERRAMIENTAS.PICOS.PICOAZULITA
                });
                this.escena.jugador.recolecta(this.escena.jugador, objeto, true);
            }
        });
    }

    hachaPiedraRojiza(posY: number) {
        this.crearReceta(Constantes.HERRAMIENTAS.HACHAS.HACHAPIEDRAROJIZA, posY, Constantes.HERRAMIENTAS.HACHAS.HACHAPIEDRAROJIZA,
            Constantes.OBJETOS.AZULITA, Constantes.OBJETOS.PIEDRAROJIZA, null, 3, 3, null);

        const receta = this.add.zone(this.posX, posY, this.recetaAncho, this.recetaAncho).setOrigin(0).setInteractive();
        receta.on("pointerdown", () => {
            let hayMateriales = this.construirReceta(Constantes.OBJETOS.AZULITA, Constantes.OBJETOS.PIEDRAROJIZA, null,
                3, 3, null);
            if (hayMateriales) {
                let objeto = new HachaPiedraRojiza({
                    escena: this.escena,
                    x: null,
                    y: null,
                    textura: Constantes.HERRAMIENTAS.HACHAS.HACHAPIEDRAROJIZA
                });
                this.escena.jugador.recolecta(this.escena.jugador, objeto, true);
            }
        });
    }

    bastonFuego(posY: number) {
        this.crearReceta(Constantes.HERRAMIENTAS.BASTONFUEGO, posY, Constantes.HERRAMIENTAS.BASTONFUEGO,
            Constantes.OBJETOS.AZULITA, Constantes.OBJETOS.ORBEROJO, null, 5, 3, null);

        const receta = this.add.zone(this.posX, posY, this.recetaAncho, this.recetaAncho).setOrigin(0).setInteractive();
        receta.on("pointerdown", () => {
            let hayMateriales = this.construirReceta(Constantes.OBJETOS.AZULITA, Constantes.OBJETOS.ORBEROJO, null,
                5, 3, null);
            if (hayMateriales) {
                let objeto = new BastonFuego({
                    escena: this.escena,
                    x: null,
                    y: null,
                    textura: Constantes.HERRAMIENTAS.BASTONFUEGO
                });
                this.escena.jugador.recolecta(this.escena.jugador, objeto, true);
            }
        });
    }

    armaduraPiedraRojiza(posY: number) {
        this.crearReceta(Constantes.ARMADURAS.PIEDRAROJIZA, posY, Constantes.ARMADURAS.PIEDRAROJIZA,
            Constantes.OBJETOS.PIEDRAROJIZA, Constantes.OBJETOS.ORO, null, 5, 3, null);

        const receta = this.add.zone(this.posX, posY, this.recetaAncho, this.recetaAncho).setOrigin(0).setInteractive();
        receta.on("pointerdown", () => {
            let hayMateriales = this.construirReceta(Constantes.OBJETOS.PIEDRAROJIZA, Constantes.OBJETOS.ORO, null,
                5, 3, null);
            if (hayMateriales) {
                let objeto = new ArmaduraPiedraRojiza({
                    escena: this.escena,
                    x: null,
                    y: null,
                    textura: Constantes.ARMADURAS.PIEDRAROJIZA
                });
                this.escena.jugador.recolecta(this.escena.jugador, objeto, true);
            }
        });
    }

    estatuaRitual(posY: number) {
        this.crearReceta(Constantes.POSICIONABLES.ESTATUARITUAL, posY, Constantes.POSICIONABLES.ESTATUARITUAL,
            Constantes.OBJETOS.HIERRO, Constantes.OBJETOS.ORO, Constantes.OBJETOS.PIEDRAFOREST, 10, 10, 20);

        const receta = this.add.zone(this.posX, posY, this.recetaAncho, this.recetaAncho).setOrigin(0).setInteractive();
        receta.on("pointerdown", () => {
            let hayMateriales = this.construirReceta(Constantes.OBJETOS.HIERRO, Constantes.OBJETOS.ORO, Constantes.OBJETOS.PIEDRAFOREST,
                10, 10, 20);
            if (hayMateriales) {
                let objeto = new EstatuaRitual({
                    escena: this.escena,
                    x: null,
                    y: null,
                    textura: Constantes.POSICIONABLES.ESTATUARITUAL
                });
                this.escena.jugador.recolecta(this.escena.jugador, objeto, true);
            }
        });
    }

}