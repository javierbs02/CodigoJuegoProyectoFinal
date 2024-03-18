import Constantes from "../constantes";
import Vaca from "../gameobjects/animales/vaca";
import ArbolForest from "../gameobjects/elementosmapa/arbolForest";
import CarbonElemento from "../gameobjects/elementosmapa/carbonElemento";
import HierroElemento from "../gameobjects/elementosmapa/hierroElemento";
import RocaForest from "../gameobjects/elementosmapa/rocaForest";
import Enemigo from "../gameobjects/enemigo";
import Demon from "../gameobjects/enemigos/demon";
import Slime from "../gameobjects/enemigos/slime";
import Troll from "../gameobjects/enemigos/troll";
import Jugador from "../gameobjects/jugador";
import Objeto from "../gameobjects/objetos/objeto";
import EspadaPiedra from "../gameobjects/objetos/herramientas/espadaPiedra";
import PiedraForest from "../gameobjects/objetos/piedraforest";
import Tronco from "../gameobjects/objetos/tronco";
import Arbusto from "../gameobjects/elementosmapa/arbusto";
import PatataCultivo from "../gameobjects/cultivos/patataCultivo";
import ZonaFertil from "../gameobjects/cultivos/zonaFertil";
import Goblin from "../gameobjects/enemigos/goblin";
import OroElemento from "../gameobjects/elementosmapa/oroElemento";
import Gallina from "../gameobjects/animales/gallina";
import Mercader from "../gameobjects/mercader";
import PiedraRojizaElemento from "../gameobjects/elementosmapa/piedraRojizaElemento";
import Esqueleto from "../gameobjects/enemigos/esqueleto";
import Minidragon from "../gameobjects/enemigos/minidragon";

export default class Nivel extends Phaser.Scene {

    //Declaramos las variables necesarias para crear el mapa
    public mapaNivel: Phaser.Tilemaps.Tilemap;
    public conjuntoPatrones: Phaser.Tilemaps.Tileset[];
    public tilesetForest: Phaser.Tilemaps.Tileset;
    public tilesetTransiciones: Phaser.Tilemaps.Tileset;
    public tilesetTaiga: Phaser.Tilemaps.Tileset;
    public tilesetSwamp: Phaser.Tilemaps.Tileset;
    public tilesetTundra: Phaser.Tilemaps.Tileset;
    public capaMapaNivel: Phaser.Tilemaps.TilemapLayer;
    public arrayEnemigos: any[];
    public arrayObjetos: any[];
    public arrayElementos: any[];
    public arrayAnimales: any[];
    public arrayPosicionables: any[];
    public arrayZonaFertil: any[];
    public arrayCultivos: any[];
    private arraySolido: any[];
    protected indice: number;
    public puntuacion: number;
    public enemigoAtacado: Enemigo;
    public solidObjects;
    public solidGroup;
    public physicsGroup: Phaser.Physics.Arcade.Group;
    public capaMar: Phaser.Tilemaps.TilemapLayer;
    public grupoObjetos: any;
    public grupoEnemigos: any;
    public grupoElementos: any;
    public grupoAnimales: any;
    public grupoPosicionables: any;
    public grupoZonaFertil: any;
    public grupoCultivos: any;
    private bandaSonora1: Phaser.Sound.BaseSound;
    private bandaSonora2: Phaser.Sound.BaseSound;
    private contMusica: number;
    public paginaRecetas: number;
    public tiempoDia: number;
    public dia: number;
    public duracionDia: number;
    public mercader: Mercader;
    public numCambioEnemigos: number;

    //Jugador
    public jugador: Jugador;

    constructor() {
        super(Constantes.ESCENAS.NIVEL);
    }

    init(): void {
        this.indice = 0;
        this.puntuacion = 0;
        this.registry.set(Constantes.REGISTROS.PUNTUACION, this.puntuacion);
        this.arrayEnemigos = new Array();
        this.arrayObjetos = new Array();
        this.arrayElementos = new Array();
        this.arrayAnimales = new Array();
        this.arrayPosicionables = new Array();
        this.arrayZonaFertil = new Array();
        this.arrayCultivos = new Array();
        this.arraySolido = new Array();
        this.physicsGroup = this.physics.add.group();
        this.paginaRecetas = 1;
        this.tiempoDia = 0;
        this.dia = 0;
        this.duracionDia = 24000;
        this.numCambioEnemigos = 10;
        this.contMusica = 0;
    }

    create() {
        this.creaBandaSonora();
        this.creaMapaNivel(Constantes.MAPAS.TILEMAPJSON);
        this.camaraConfig();
        this.creaAnimaciones();
        this.creaJugador();
        this.fisicasNivel();
        this.animacionesEnemigos();
        this.animacionesObjetos();
        this.crearEnemigos();
        this.crearObjetos();
        this.crearElementosMapa();
        this.crearAnimales();
        this.crearMercader();
        let inventarioAbierto = false;
        this.registry.set(Constantes.REGISTROS.INVENTARIOABIERTO, inventarioAbierto);
        const datos = {
            escena: this
        }
        this.scene.launch(Constantes.ESCENAS.HUD, datos);

    }

    update(time: number, delta: number): void {

        this.manejarCarga();
        this.jugador.update();
        this.mercader.update();
        for (let i = 0; i < this.arrayEnemigos.length; i++) {
            this.arrayEnemigos[i].update();
        }
        for (let i = 0; i < this.arrayAnimales.length; i++) {
            this.arrayAnimales[i].update();
        }
        for (let i = 0; i < this.arrayPosicionables.length; i++) {
            this.arrayPosicionables[i].update();
        }
        for (let i = 0; i < this.arrayZonaFertil.length; i++) {
            this.arrayZonaFertil[i].update();
        }
        for (let i = 0; i < this.arrayObjetos.length; i++) {
            this.arrayObjetos[i].update();
        }
        for (let i = 0; i < this.arrayCultivos.length; i++) {
            this.arrayCultivos[i].update();
        }
        if (this.arrayEnemigos.length <= this.numCambioEnemigos && !this.jugador.hayEnemigosCerca(this.arrayEnemigos)) {
            this.arrayEnemigos.forEach((enemigo) => {
                this.grupoEnemigos.remove(enemigo);
                this.physicsGroup.remove(enemigo);
                enemigo.destroy();
            });
            this.arrayEnemigos = [];
            this.crearEnemigos();
        }
        if (this.arrayAnimales.length <= 2 && !this.jugador.hayEnemigosCerca(this.arrayAnimales)) {
            this.arrayAnimales.forEach((animal) => {
                this.physicsGroup.remove(animal);
                this.grupoAnimales.remove(animal);
                animal.destroy();
            });
            this.arrayAnimales = [];
            this.crearAnimales();
        }
        this.manejoDias();
        let sonido = this.registry.get(Constantes.REGISTROS.SONIDOS);
        if (sonido) {
            if (this.bandaSonora1.isPlaying && this.contMusica >= 3) {
                const tween = this.tweens.add({
                    targets: this.bandaSonora1,
                    volume: 0,
                    duration: 1000,
                    onComplete: () => {
                        // Cuando el Tween termine, detenemos la música por completo
                        this.bandaSonora1.stop();

                        // Reproducimos la nueva música
                        this.bandaSonora2.play();
                        this.tweens.add({
                            targets: this.bandaSonora2, //Que música va a coger para hacer la animación
                            volume: 0.2, //Que va a hacer la animación, en este caso subir el volumen a 1
                            duration: 2000 //Cuánto tiempo va a tardar en subir el volumen, en este caso 2000ms = 2s
                        });
                    }
                });
                this.contMusica = 0;
            }
            if (this.bandaSonora2.isPlaying && this.contMusica >= 3) {
                const tween = this.tweens.add({
                    targets: this.bandaSonora2,
                    volume: 0,
                    duration: 1000,
                    onComplete: () => {
                        // Cuando el Tween termine, detenemos la música por completo
                        this.bandaSonora2.stop();

                        // Reproducimos la nueva música
                        this.bandaSonora1.play();
                        this.tweens.add({
                            targets: this.bandaSonora1, //Que música va a coger para hacer la animación
                            volume: 0.2, //Que va a hacer la animación, en este caso subir el volumen a 1
                            duration: 2000 //Cuánto tiempo va a tardar en subir el volumen, en este caso 2000ms = 2s
                        });
                    }
                });
                this.contMusica = 0;
            }
        }
    }

    creaMapaNivel(jsonMapa: string): void {
        //Creamos el tilemap(El mapa que has dibujado)
        let imagenForest = Constantes.MAPAS.TILESETFOREST;
        let imagenTransiciones = Constantes.MAPAS.TILESETTRANSICIONES;
        let imagenSwamp = Constantes.MAPAS.TILESETSWAMP;
        let imagenTaiga = Constantes.MAPAS.TILESETTAIGA;
        let imagenTundra = Constantes.MAPAS.TILESETTUNDRA;
        this.mapaNivel = this.make.tilemap({
            key: jsonMapa
        });
        this.tilesetForest = this.mapaNivel.addTilesetImage(imagenForest);
        this.tilesetTransiciones = this.mapaNivel.addTilesetImage(imagenTransiciones);
        this.tilesetSwamp = this.mapaNivel.addTilesetImage(imagenSwamp);
        this.tilesetTaiga = this.mapaNivel.addTilesetImage(imagenTaiga);
        this.tilesetTundra = this.mapaNivel.addTilesetImage(imagenTundra);
        this.conjuntoPatrones = new Array();
        this.conjuntoPatrones.push(this.tilesetForest);
        this.conjuntoPatrones.push(this.tilesetTransiciones);
        this.conjuntoPatrones.push(this.tilesetSwamp);
        this.conjuntoPatrones.push(this.tilesetTaiga);
        this.conjuntoPatrones.push(this.tilesetTundra);
        this.capaMapaNivel = this.mapaNivel.createLayer(Constantes.MAPAS.CAPAPLATAFORMAS, this.conjuntoPatrones);
        this.solidObjects = this.mapaNivel.getObjectLayer(Constantes.MAPAS.OBJETOS.SOLIDOS).objects;
        this.solidGroup = this.physics.add.staticGroup();
        this.capaMar = this.mapaNivel.createLayer(Constantes.MAPAS.CAPAMAR, this.conjuntoPatrones);
    }

    camaraConfig(): void {
        //Acercamos la cámara
        this.cameras.main.zoom = 2.3;
    }

    manejoDias(): void {
        this.tiempoDia++;
        if (this.tiempoDia >= this.duracionDia) {
            this.tiempoDia = 0;
            this.dia++;
        }

    }

    creaJugador(): void {
        //Crear jugador
        this.mapaNivel.findObject(Constantes.JUGADOR.ID, (d: any) => { //Busca un objeto en el mapa que hemos creado llamado Constantes.JUGADOR.ID ("jugador") y al encontrarlo crea al jugador
            this.jugador = new Jugador({
                escena: this,
                x: d.x, //Posición guardada en la aplicación de mapa
                y: d.y,
                texture: Constantes.JUGADOR.ID
            });
        });
        //Para que la cámara siga al jugador
        this.cameras.main.setBounds(0, 0, this.mapaNivel.widthInPixels, this.mapaNivel.heightInPixels);
        this.cameras.main.startFollow(this.jugador);
        this.jugador.setDepth(this.jugador.y);
        //Collider: Hace que todo lo que tengamos en el mapa colisione con el personaje
        //this.physics.add.collider(this.jugador, this.capaPlataformasMapaNivel);
        let porcentajeVida: number = this.jugador.vida / this.jugador.vidaMax;
        this.registry.set(Constantes.REGISTROS.VIDA, porcentajeVida);


    }

    crearEnemigos(): void {
        let numEnemigos = Phaser.Math.Between(10, 15);
        if (this.puntuacion >= 0) {
            //Slime
            /*for (let i = 0; i < numEnemigos; i++) {
                let slime = this.generarEnemigos(Constantes.ENEMIGOS.SLIME.ID, Slime);
                this.arrayEnemigos.push(slime);
            }*/
        }
        if (this.puntuacion >= 500) {
            this.numCambioEnemigos = 20;
            //Demon
            numEnemigos = Phaser.Math.Between(10, 15);
            for (let i = 0; i < numEnemigos; i++) {
                let demon = this.generarEnemigos(Constantes.ENEMIGOS.DEMON.ID, Demon);
                this.arrayEnemigos.push(demon);
            }
        }
        if (this.puntuacion >= 1000) {
            this.numCambioEnemigos = 30;
            //Troll
            numEnemigos = Phaser.Math.Between(10, 15);
            for (let i = 0; i < numEnemigos; i++) {
                let troll = this.generarEnemigos(Constantes.ENEMIGOS.DEMON.ID, Troll);
                this.arrayEnemigos.push(troll);
            }

            //Goblin
            numEnemigos = Phaser.Math.Between(10, 15);
            for (let i = 0; i < numEnemigos; i++) {
                let goblin = this.generarEnemigos(Constantes.ENEMIGOS.GOBLIN.ID, Goblin);
                this.arrayEnemigos.push(goblin);
            }
        }
        if (this.puntuacion >= 1500) {
            this.numCambioEnemigos = 40;
            //Esqueleto
            numEnemigos = Phaser.Math.Between(10, 15);
            for (let i = 0; i < numEnemigos; i++) {
                let esqueleto = this.generarEnemigos(Constantes.ENEMIGOS.ESQUELETO.ID, Esqueleto);
                this.arrayEnemigos.push(esqueleto);
            }
            //Minidragon
            numEnemigos = Phaser.Math.Between(10, 15);
            for (let i = 0; i < numEnemigos; i++) {
                let minidragon = this.generarEnemigos(Constantes.ENEMIGOS.MINIDRAGON.ID, Minidragon);
                this.arrayEnemigos.push(minidragon);
            }
        }
        this.arrayEnemigos.forEach(enemigo => {
            enemigo.on("pointerdown", () => {
                this.jugador.atacar(this.jugador, enemigo);
            }, enemigo);
        });
        //Física entre el enemigo y el jugador cuando se tocan
        for (let i = 0; i < this.arrayEnemigos.length; i++) {
            this.physics.add.overlap(this.jugador, this.arrayEnemigos[i], this.jugador.herido, null, this);
        }

        // Crear un grupo de físicas para los enemigos
        this.grupoEnemigos = this.physics.add.group(this.arrayEnemigos);
        //this.physicsGroup = this.physics.add.group(this.arrayEnemigos);
        this.arrayEnemigos.forEach(enemigo => {
            this.physicsGroup.add(enemigo);
        });

        //Agregar colisiones con las partes del mapa que son sólidas
        this.arrayEnemigos.forEach(enemigo => {
            this.physics.add.collider(enemigo, this.solidGroup, null, null, this);
            this.physics.add.collider(enemigo, this.grupoElementos, null, null, this);
            this.physics.add.collider(enemigo, this.grupoAnimales, null, null, this);
            this.physics.add.collider(enemigo, this.grupoPosicionables, null, null, this);

            this.physics.add.overlap(enemigo, this.grupoEnemigos, (enemigo1: any, enemigo2: any) => {
                if (enemigo1.body.x <= enemigo2.body.x) {
                    enemigo1.body.x += -5;
                    enemigo2.body.x += 5;
                }
                else {
                    enemigo1.body.x += 5;
                    enemigo2.body.x += -5;
                }
            });
            this.physics.add.overlap(enemigo, this.grupoAnimales, (enemigo1: any, enemigo2: any) => {
                if (enemigo1.body.x <= enemigo2.body.x) {
                    enemigo1.body.x += -5;
                    enemigo2.body.x += 5;
                }
                else {
                    enemigo1.body.x += 5;
                    enemigo2.body.x += -5;
                }
            });

        });

    }

    generarEnemigos(texture: string, tipoEnemigo: any): any {
        let posX: number;
        let posY: number;
        let generacionValida: boolean;

        do {
            posX = Phaser.Math.Between(200, 2300);
            posY = Phaser.Math.Between(200, 2300);
            generacionValida = this.comprobarGeneracion(posX, posY);
        } while (generacionValida);

        let objeto = new tipoEnemigo({
            escena: this,
            x: posX,
            y: posY,
            texture: texture
        }).setInteractive();

        while (this.comprobarColision4(objeto)) {
            objeto.destroy();
            do {
                posX = Phaser.Math.Between(200, 2300);
                posY = Phaser.Math.Between(200, 2300);
                generacionValida = this.comprobarGeneracion(posX, posY);
            } while (generacionValida);

            objeto = new tipoEnemigo({
                escena: this,
                x: posX,
                y: posY,
                texture: texture
            }).setInteractive();
            this.comprobarColision4(objeto);
        }

        return objeto;
    }



    crearObjetos(): void {
        let numObjetos: number = Phaser.Math.Between(5, 10);

        //Tronco pequeño
        for (let i = 0; i < numObjetos; i++) {
            let objeto = this.generarObjeto(Constantes.OBJETOS.TRONCOPEQUENIO, Tronco);
            this.arrayObjetos.push(objeto);
        }

        //Piedra del bosque
        numObjetos = Phaser.Math.Between(5, 10);
        for (let i = 0; i < numObjetos; i++) {
            let objeto = this.generarObjeto(Constantes.OBJETOS.PIEDRAFOREST, PiedraForest);
            this.arrayObjetos.push(objeto);
        }

        this.grupoObjetos = this.physics.add.group(this.arrayObjetos);
        //this.physicsGroup = this.physics.add.group(this.arrayObjetos);

        for (let i = 0; i < this.arrayObjetos.length; i++) {
            this.physics.add.overlap(this.jugador, this.arrayObjetos[i], this.jugador.recolecta, null, this);
            this.physics.add.collider(this.arrayObjetos[i], this.grupoObjetos);
            this.physics.add.collider(this.arrayObjetos[i], this.grupoElementos);
        }
    }

    generarObjeto(texture: string, tipoObjeto: any): any {
        let posX: number;
        let posY: number;
        let generacionValida: boolean;

        do {
            posX = Phaser.Math.Between(200, 2300);
            posY = Phaser.Math.Between(200, 2300);
            generacionValida = this.comprobarGeneracion(posX, posY);
        } while (generacionValida);

        let objeto = new tipoObjeto({
            escena: this,
            x: posX,
            y: posY,
            textura: texture
        }).setInteractive();
        let compColision = this.comprobarColision4(objeto);
        while (compColision) {
            objeto.destroy();
            do {
                posX = Phaser.Math.Between(200, 2300);
                posY = Phaser.Math.Between(200, 2300);
                generacionValida = this.comprobarGeneracion(posX, posY);
            } while (generacionValida);

            objeto = new tipoObjeto({
                escena: this,
                x: posX,
                y: posY,
                textura: texture
            }).setInteractive();
            compColision = this.comprobarColision4(objeto);
        }

        return objeto;
    }

    crearElementosMapa(): void {
        let numElementos: number = Phaser.Math.Between(20, 30);

        //Árbol del bosque
        for (let i = 0; i < numElementos; i++) {
            let elementoMapa = this.generarElementosMapa(Constantes.ELEMENTOSMAPA.FOREST.ARBOL, ArbolForest);
            this.arrayElementos.push(elementoMapa);
        }
        //Roca del bosque
        numElementos = Phaser.Math.Between(20, 30);
        for (let i = 0; i < numElementos; i++) {
            let elementoMapa = this.generarElementosMapa(Constantes.ELEMENTOSMAPA.FOREST.ROCA, RocaForest);
            this.arrayElementos.push(elementoMapa);
        }
        //Carbón
        numElementos = Phaser.Math.Between(15, 25);
        for (let i = 0; i < numElementos; i++) {
            let elementoMapa = this.generarElementosMapa(Constantes.ELEMENTOSMAPA.FOREST.CARBON, CarbonElemento);
            this.arrayElementos.push(elementoMapa);
        }

        //Hierro
        numElementos = Phaser.Math.Between(15, 25);
        for (let i = 0; i < numElementos; i++) {
            let elementoMapa = this.generarElementosMapa(Constantes.ELEMENTOSMAPA.FOREST.HIERRO, HierroElemento);
            this.arrayElementos.push(elementoMapa);
        }

        //Arbusto
        numElementos = Phaser.Math.Between(10, 20);
        for (let i = 0; i < numElementos; i++) {
            let elementoMapa = this.generarElementosMapa(Constantes.ELEMENTOSMAPA.FOREST.ARBUSTO, Arbusto);
            this.arrayElementos.push(elementoMapa);
        }

        //Oro
        numElementos = Phaser.Math.Between(5, 10);
        for (let i = 0; i < numElementos; i++) {
            let elementoMapa = this.generarElementosMapa(Constantes.ELEMENTOSMAPA.FOREST.ORO, OroElemento);
            this.arrayElementos.push(elementoMapa);
        }

        //Piedra Rojiza
        for (let i = 0; i < 3; i++) {
            let elementoMapa = this.generarElementosMapa(Constantes.ELEMENTOSMAPA.FOREST.PIEDRAROJIZA, PiedraRojizaElemento);
            this.arrayElementos.push(elementoMapa);
        }

        this.arrayElementos.forEach(elemento => {
            elemento.on("pointerdown", () => {
                this.jugador.destruirElementos(this.jugador, elemento);
            });
        });

        this.grupoElementos = this.physics.add.group(this.arrayElementos);
        //this.physicsGroup = this.physics.add.group(this.arrayElementos);
        this.arrayElementos.forEach(elemento => {
            this.physicsGroup.add(elemento);
        });
        this.arrayElementos.forEach(elemento => {
            this.physics.add.collider(elemento, this.grupoElementos);
            this.physics.add.collider(elemento, this.solidGroup);
            this.physics.add.collider(elemento, this.jugador);
            this.physics.add.collider(elemento, this.grupoEnemigos);
            this.physics.add.collider(elemento, this.grupoAnimales);
            this.physics.add.collider(elemento, this.grupoPosicionables);
        });
        this.arrayElementos.map((elemento: any) => {
            elemento.body.setImmovable(true);
        });
    }

    private generarElementosMapa(texture: string, tipoElemento: any): any {
        let posX: number;
        let posY: number;
        let generacionValida: boolean;

        do {
            posX = Phaser.Math.Between(200, 2300);
            posY = Phaser.Math.Between(200, 2300);
            generacionValida = this.comprobarGeneracion(posX, posY);
        } while (generacionValida);

        let objeto = new tipoElemento({
            escena: this,
            x: posX,
            y: posY,
            texture: texture
        }).setInteractive();
        let compColision = this.comprobarColision4(objeto);
        while (compColision) {
            objeto.destroy();
            do {
                posX = Phaser.Math.Between(200, 2300);
                posY = Phaser.Math.Between(200, 2300);
                generacionValida = this.comprobarGeneracion(posX, posY);
            } while (generacionValida);

            objeto = new tipoElemento({
                escena: this,
                x: posX,
                y: posY,
                texture: texture
            }).setInteractive();
            compColision = this.comprobarColision4(objeto);
        }

        return objeto;
    }

    crearAnimales(): void {
        let numAnimales = Phaser.Math.Between(3, 5);

        //Vaca
        for (let i = 0; i < numAnimales; i++) {
            let vaca = this.generarAnimales(Constantes.ANIMALES.VACA.ID, Vaca);
            this.arrayAnimales.push(vaca);
        }
        //Gallina
        numAnimales = Phaser.Math.Between(3, 5);
        for (let i = 0; i < numAnimales; i++) {
            let gallina = this.generarAnimales(Constantes.ANIMALES.GALLINA.ID, Gallina);
            this.arrayAnimales.push(gallina);
        }
        this.arrayAnimales.forEach(animal => {
            animal.on("pointerdown", () => {
                this.jugador.atacar(this.jugador, animal);
            }, animal);
        });

        // Crear un grupo de físicas para los enemigos
        this.grupoAnimales = this.physics.add.group(this.arrayAnimales);
        //this.physicsGroup = this.physics.add.group(this.arrayAnimales);
        this.arrayAnimales.forEach(animal => {
            this.physicsGroup.add(animal);
        });

        //Agregar colisiones con las partes del mapa que son sólidas
        this.arrayAnimales.forEach(animal => {
            this.physics.add.collider(animal, this.solidGroup);
            this.physics.add.collider(animal, this.grupoEnemigos);
            this.physics.add.collider(animal, this.grupoElementos);
            this.physics.add.collider(animal, this.grupoAnimales);
            this.physics.add.collider(animal, this.jugador);
            this.physics.add.collider(animal, this.grupoPosicionables);
        });
    }

    private generarAnimales(texture: string, tipoAnimal: any): any {
        let posX: number;
        let posY: number;
        let generacionValida: boolean;

        do {
            posX = Phaser.Math.Between(200, 2300);
            posY = Phaser.Math.Between(200, 2300);
            generacionValida = this.comprobarGeneracion(posX, posY);
        } while (generacionValida);

        let objeto = new tipoAnimal({
            escena: this,
            x: posX,
            y: posY,
            texture: texture
        }).setInteractive();
        let compColision = this.comprobarColision4(objeto);
        while (compColision) {
            objeto.destroy();
            do {
                posX = Phaser.Math.Between(200, 2300);
                posY = Phaser.Math.Between(200, 2300);
                generacionValida = this.comprobarGeneracion(posX, posY);
            } while (generacionValida);

            objeto = new tipoAnimal({
                escena: this,
                x: posX,
                y: posY,
                texture: texture
            }).setInteractive();
            compColision = this.comprobarColision4(objeto);
        }

        return objeto;
    }

    crearMercader(): void {
        this.mercader = this.generarEnemigos(Constantes.ENEMIGOS.MERCADER.ID, Mercader);
        this.physicsGroup.add(this.mercader);

        //Agregar colisiones con las partes del mapa que son sólidas
        this.physics.add.collider(this.mercader, this.solidGroup, null, null, this);
        //this.physics.add.collider(enemigo, this.grupoEnemigos, null, null, this);
        this.physics.add.collider(this.mercader, this.grupoElementos, null, null, this);
        this.physics.add.collider(this.mercader, this.grupoAnimales, null, null, this);
        this.physics.add.collider(this.mercader, this.grupoPosicionables, null, null, this);
        this.physics.add.collider(this.mercader, this.jugador, null, null, this);

        this.physics.add.overlap(this.mercader, this.grupoEnemigos, (enemigo1: any, enemigo2: any) => {
            if (enemigo1.body.x <= enemigo2.body.x) {
                enemigo1.body.x += -5;
                enemigo2.body.x += 5;
            }
            else {
                enemigo1.body.x += 5;
                enemigo2.body.x += -5;
            }
        });

    }


    comprobarGeneracion(posX: number, posY: number): boolean {
        let tileLibre = this.capaMar.getTileAtWorldXY(posX, posY);
        let distanciaJugador = Phaser.Math.Distance.Between(posX, posY, this.jugador.body.x, this.jugador.body.y);

        if (!tileLibre && distanciaJugador > 400) {
            return false; // Se puede generar el enemigo en esta posición
        } else {
            return true; // No se puede generar el enemigo en esta posición
        }
    }


    comprobarColision4(objeto2: any) {
        let colision = false;
        this.arrayElementos.forEach(objeto => {
            if (!colision) {
                if (Phaser.Geom.Intersects.RectangleToRectangle(objeto.getBounds(), objeto2.getBounds())) {
                    colision = true;
                }
            }
        });
        this.arrayEnemigos.forEach(objeto => {
            if (!colision) {
                if (Phaser.Geom.Intersects.RectangleToRectangle(objeto.getBounds(), objeto2.getBounds())) {
                    colision = true;
                }
            }
        });
        this.arrayObjetos.forEach(objeto => {
            if (!colision) {
                if (Phaser.Geom.Intersects.RectangleToRectangle(objeto.getBounds(), objeto2.getBounds())) {
                    colision = true;
                }
            }
        });
        this.solidGroup.getChildren().forEach((objeto) => {
            if (!colision) {
                if (Phaser.Geom.Intersects.RectangleToRectangle(objeto.body, objeto2.getBounds())) {
                    colision = true;
                }
            }
        });
        return colision;
    }


    fisicasNivel(): void {

        for (let obj of this.solidObjects) {
            if (obj.name === 'borde') {
                let solid = this.solidGroup.create(obj.x + obj.width / 2, obj.y + obj.height / 2, null, null, false);
                solid.setSize(obj.width, obj.height);
                solid.setOrigin(0.5);
                this.arraySolido.push(solid);
            }
        }

        this.physics.add.collider(this.jugador, this.solidGroup);
    }

    creaBandaSonora(): void {
        let sonido = this.registry.get(Constantes.REGISTROS.SONIDOS);
        if (sonido) {
            this.bandaSonora1 = this.sound.add(Constantes.SONIDOS.BANDASONORA, {
                loop: true,
                volume: 0 //El volumen de la música
            });
            this.bandaSonora2 = this.sound.add(Constantes.SONIDOS.BANDASONORA2, {
                loop: true,
                volume: 0 //El volumen de la música
            });
            this.bandaSonora1.play();
            //Fade in sonido
            //Añadimos una animación al sonido
            this.tweens.add({
                targets: this.bandaSonora1, //Que música va a coger para hacer la animación
                volume: 0.2, //Que va a hacer la animación, en este caso subir el volumen a 1
                duration: 2000 //Cuánto tiempo va a tardar en subir el volumen, en este caso 2000ms = 2s
            });
            this.bandaSonora1.on("looped", () => {
                this.contMusica++;
            });
            this.bandaSonora2.on("looped", () => {
                this.contMusica++;
            })
        }
    }

    manejarCarga(): void {
        const camera = this.cameras.main;

        this.arrayObjetos.forEach(object => {
            // Verificar si el objeto está dentro del área visible de la cámara
            if (camera.worldView.contains(object.x, object.y)) {
                object.setActive(true);
                object.setVisible(true);
            }
            else {
                object.setActive(false);
                object.setVisible(false);
            }
        });
        this.arrayEnemigos.forEach(object => {
            // Verificar si el objeto está dentro del área visible de la cámara
            if (camera.worldView.contains(object.x, object.y)) {
                object.setActive(true);
                object.setVisible(true);
                object.setInteractive();
            }
            else {
                object.setActive(false);
                object.setVisible(false);
                object.disableInteractive();
            }
        });
        this.arrayElementos.forEach(object => {
            // Verificar si el objeto está dentro del área visible de la cámara
            if (camera.worldView.contains(object.x, object.y)) {
                object.setActive(true);
                object.setVisible(true);
                object.setInteractive();
            }
            else {
                object.setActive(false);
                object.setVisible(false);
                object.disableInteractive();
            }
        });
        this.arrayAnimales.forEach(object => {
            // Verificar si el objeto está dentro del área visible de la cámara
            if (camera.worldView.contains(object.x, object.y)) {
                object.setActive(true);
                object.setVisible(true);
                object.setInteractive();
            }
            else {
                object.setActive(false);
                object.setVisible(false);
                object.disableInteractive();
            }
        });
        this.arrayCultivos.forEach(object => {
            // Verificar si el objeto está dentro del área visible de la cámara
            if (camera.worldView.contains(object.x, object.y)) {
                object.setActive(true);
                object.setVisible(true);
                object.setInteractive();
            }
            else {
                object.setActive(false);
                object.setVisible(false);
                object.disableInteractive();
            }
        });
    }

    creaAnimaciones(): void {
        //Se crean todas las animaciones aquí porque estarán en todos los niveles
        //Animaciones del jugador
        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.ESPERA,
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID, {
                prefix: Constantes.JUGADOR.ANIMACION.ESPERA + "_", end: 5
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 5, //Frames por segundo a la que se mueve la imágen
            repeat: -1 //Esto es para que el bucle de la animación se repita constantemente
        });

        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.ESPERALADO,
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID, {
                prefix: Constantes.JUGADOR.ANIMACION.ESPERALADO + "_", end: 5
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 5, //Frames por segundo a la que se mueve la imágen
            repeat: -1 //Esto es para que el bucle de la animación se repita constantemente
        });

        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.ESPERAARRIBA,
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID, {
                prefix: Constantes.JUGADOR.ANIMACION.ESPERAARRIBA + "_", end: 5
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 5, //Frames por segundo a la que se mueve la imágen
            repeat: -1 //Esto es para que el bucle de la animación se repita constantemente
        });

        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.CORRER,
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID, {
                prefix: Constantes.JUGADOR.ANIMACION.CORRER + "_", end: 5
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 5, //Frames por segundo a la que se mueve la imágen
            repeat: -1 //Esto es para que el bucle de la animación se repita constantemente
        });

        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.CORRERLADO,
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID, {
                prefix: Constantes.JUGADOR.ANIMACION.CORRERLADO + "_", end: 5
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 5, //Frames por segundo a la que se mueve la imágen
            repeat: -1 //Esto es para que el bucle de la animación se repita constantemente
        });

        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.CORRERARRIBA,
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID, {
                prefix: Constantes.JUGADOR.ANIMACION.CORRERARRIBA + "_", end: 5
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 5, //Frames por segundo a la que se mueve la imágen
            repeat: -1 //Esto es para que el bucle de la animación se repita constantemente
        });

        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.HERIDO,
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID, {
                prefix: Constantes.JUGADOR.ANIMACION.HERIDO + "_", end: 2
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 7, //Frames por segundo a la que se mueve la imágen
            repeat: 0
        });
        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.ATACAR,
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID, {
                prefix: Constantes.JUGADOR.ANIMACION.ATACAR + "_", end: 3
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 7, //Frames por segundo a la que se mueve la imágen
            repeat: 0
        });
        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.ATACARLADO,
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID, {
                prefix: Constantes.JUGADOR.ANIMACION.ATACARLADO + "_", end: 3
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 7, //Frames por segundo a la que se mueve la imágen
            repeat: 0
        });
        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.ATACARARRIBA,
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID, {
                prefix: Constantes.JUGADOR.ANIMACION.ATACARARRIBA + "_", end: 3
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 7, //Frames por segundo a la que se mueve la imágen
            repeat: 0
        });
    }

    animacionesEnemigos(): void {
        //SLIME
        this.anims.create({
            key: Constantes.ENEMIGOS.SLIME.ANIMACION.ESPERA,
            frames: this.anims.generateFrameNames(Constantes.ENEMIGOS.SLIME.ID, {
                prefix: Constantes.ENEMIGOS.SLIME.ANIMACION.ESPERA + "_", end: 3
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 6, //Frames por segundo a la que se mueve la imágen
            repeat: -1 //Esto es para que el bucle de la animación se repita constantemente
        });
        this.anims.create({
            key: Constantes.ENEMIGOS.SLIME.ANIMACION.CORRER,
            frames: this.anims.generateFrameNames(Constantes.ENEMIGOS.SLIME.ID, {
                prefix: Constantes.ENEMIGOS.SLIME.ANIMACION.CORRER + "_", end: 5
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 5, //Frames por segundo a la que se mueve la imágen
            repeat: -1 //Esto es para que el bucle de la animación se repita constantemente
        });
        this.anims.create({
            key: Constantes.ENEMIGOS.SLIME.ANIMACION.MORIR,
            frames: this.anims.generateFrameNames(Constantes.ENEMIGOS.SLIME.ID, {
                prefix: Constantes.ENEMIGOS.SLIME.ANIMACION.MORIR + "_", end: 4
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 5, //Frames por segundo a la que se mueve la imágen
            repeat: 0 //Esto es para que el bucle de la animación se repita constantemente
        });
        this.anims.create({
            key: Constantes.ENEMIGOS.SLIME.ANIMACION.HERIDO,
            frames: this.anims.generateFrameNames(Constantes.ENEMIGOS.SLIME.ID, {
                prefix: Constantes.ENEMIGOS.SLIME.ANIMACION.HERIDO + "_", end: 2
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 5, //Frames por segundo a la que se mueve la imágen
            repeat: 0 //Esto es para que el bucle de la animación se repita constantemente
        });
        this.anims.create({
            key: Constantes.ENEMIGOS.SLIME.ANIMACION.ATACAR,
            frames: this.anims.generateFrameNames(Constantes.ENEMIGOS.SLIME.ID, {
                prefix: Constantes.ENEMIGOS.SLIME.ANIMACION.ATACAR + "_", end: 6
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 5, //Frames por segundo a la que se mueve la imágen
            repeat: 0 //Esto es para que el bucle de la animación se repita constantemente
        });

        //DEMON
        this.anims.create({
            key: Constantes.ENEMIGOS.DEMON.ANIMACION.ESPERA,
            frames: this.anims.generateFrameNames(Constantes.ENEMIGOS.DEMON.ID, {
                prefix: Constantes.ENEMIGOS.DEMON.ANIMACION.ESPERA + "_", end: 3
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 5, //Frames por segundo a la que se mueve la imágen
            repeat: -1 //Esto es para que el bucle de la animación se repita constantemente
        });
        this.anims.create({
            key: Constantes.ENEMIGOS.DEMON.ANIMACION.CORRER,
            frames: this.anims.generateFrameNames(Constantes.ENEMIGOS.DEMON.ID, {
                prefix: Constantes.ENEMIGOS.DEMON.ANIMACION.CORRER + "_", end: 3
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 5, //Frames por segundo a la que se mueve la imágen
            repeat: -1 //Esto es para que el bucle de la animación se repita constantemente
        });
        //EXPLOSION
        this.anims.create({
            key: Constantes.ENEMIGOS.EXPLOSION.ANIMACION.ID,
            frames: Constantes.ENEMIGOS.EXPLOSION.ID,
            frameRate: 10,
            //Si solo quieres que se repita una vez
            repeat: 0
        });
        //TROLL
        this.anims.create({
            key: Constantes.ENEMIGOS.TROLL.ANIMACION.ESPERA,
            frames: this.anims.generateFrameNames(Constantes.ENEMIGOS.TROLL.ID, {
                prefix: Constantes.ENEMIGOS.TROLL.ANIMACION.ESPERA + "_", end: 3
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 5, //Frames por segundo a la que se mueve la imágen
            repeat: -1 //Esto es para que el bucle de la animación se repita constantemente
        });
        this.anims.create({
            key: Constantes.ENEMIGOS.TROLL.ANIMACION.CORRER,
            frames: this.anims.generateFrameNames(Constantes.ENEMIGOS.TROLL.ID, {
                prefix: Constantes.ENEMIGOS.TROLL.ANIMACION.CORRER + "_", end: 3
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 5, //Frames por segundo a la que se mueve la imágen
            repeat: -1 //Esto es para que el bucle de la animación se repita constantemente
        });

        //VACA
        this.anims.create({
            key: Constantes.ANIMALES.VACA.ANIMACION.CORRER,
            frames: this.anims.generateFrameNames(Constantes.ANIMALES.VACA.ID, {
                prefix: Constantes.ANIMALES.VACA.ANIMACION.CORRER + "_", end: 1
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 5, //Frames por segundo a la que se mueve la imágen
            repeat: -1 //Esto es para que el bucle de la animación se repita constantemente
        });
        this.anims.create({
            key: Constantes.ANIMALES.VACA.ANIMACION.ESPERA,
            frames: this.anims.generateFrameNames(Constantes.ANIMALES.VACA.ID, {
                prefix: Constantes.ANIMALES.VACA.ANIMACION.ESPERA + "_", end: 2
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 5, //Frames por segundo a la que se mueve la imágen
            repeat: -1 //Esto es para que el bucle de la animación se repita constantemente
        });
        this.anims.create({
            key: Constantes.ENEMIGOS.EXPLOSIONGENERICA.ANIMACION.ID,
            frames: Constantes.ENEMIGOS.EXPLOSIONGENERICA.ID,
            frameRate: 10,
            //Si solo quieres que se repita una vez
            repeat: 0
        });
        //Moneda
        this.anims.create({
            key: Constantes.OBJETOS.MONEDA.ANIMACION,
            frames: Constantes.OBJETOS.MONEDA.ID,
            frameRate: 10,
            //Si solo quieres que se repita una vez
            repeat: -1
        });
        //GALLINA
        this.anims.create({
            key: Constantes.ANIMALES.GALLINA.ANIMACION.CORRER,
            frames: this.anims.generateFrameNames(Constantes.ANIMALES.GALLINA.ID, {
                prefix: Constantes.ANIMALES.GALLINA.ANIMACION.CORRER + "_", end: 3
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 5, //Frames por segundo a la que se mueve la imágen
            repeat: -1 //Esto es para que el bucle de la animación se repita constantemente
        });

        //GOBLIN
        this.anims.create({
            key: Constantes.ENEMIGOS.GOBLIN.ANIMACION.ESPERA,
            frames: this.anims.generateFrameNames(Constantes.ENEMIGOS.GOBLIN.ID, {
                prefix: Constantes.ENEMIGOS.GOBLIN.ANIMACION.ESPERA + "_", end: 5
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 6, //Frames por segundo a la que se mueve la imágen
            repeat: -1 //Esto es para que el bucle de la animación se repita constantemente
        });
        this.anims.create({
            key: Constantes.ENEMIGOS.GOBLIN.ANIMACION.CORRER,
            frames: this.anims.generateFrameNames(Constantes.ENEMIGOS.GOBLIN.ID, {
                prefix: Constantes.ENEMIGOS.GOBLIN.ANIMACION.CORRER + "_", end: 5
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 5, //Frames por segundo a la que se mueve la imágen
            repeat: -1 //Esto es para que el bucle de la animación se repita constantemente
        });
        //MERCADER
        this.anims.create({
            key: Constantes.ENEMIGOS.MERCADER.ANIMACION.ESPERA,
            frames: this.anims.generateFrameNames(Constantes.ENEMIGOS.MERCADER.ID, {
                prefix: Constantes.ENEMIGOS.MERCADER.ANIMACION.ESPERA + "_", end: 3
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 6, //Frames por segundo a la que se mueve la imágen
            repeat: -1 //Esto es para que el bucle de la animación se repita constantemente
        });
        this.anims.create({
            key: Constantes.ENEMIGOS.MERCADER.ANIMACION.CORRER,
            frames: this.anims.generateFrameNames(Constantes.ENEMIGOS.MERCADER.ID, {
                prefix: Constantes.ENEMIGOS.MERCADER.ANIMACION.CORRER + "_", end: 5
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 5, //Frames por segundo a la que se mueve la imágen
            repeat: -1 //Esto es para que el bucle de la animación se repita constantemente
        });
        //ESQUELETO
        this.anims.create({
            key: Constantes.ENEMIGOS.ESQUELETO.ANIMACION.ESPERA,
            frames: this.anims.generateFrameNames(Constantes.ENEMIGOS.ESQUELETO.ID, {
                prefix: Constantes.ENEMIGOS.ESQUELETO.ANIMACION.ESPERA + "_", end: 3
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 6, //Frames por segundo a la que se mueve la imágen
            repeat: -1 //Esto es para que el bucle de la animación se repita constantemente
        });
        this.anims.create({
            key: Constantes.ENEMIGOS.ESQUELETO.ANIMACION.CORRER,
            frames: this.anims.generateFrameNames(Constantes.ENEMIGOS.ESQUELETO.ID, {
                prefix: Constantes.ENEMIGOS.ESQUELETO.ANIMACION.CORRER + "_", end: 3
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 5, //Frames por segundo a la que se mueve la imágen
            repeat: -1 //Esto es para que el bucle de la animación se repita constantemente
        });
        //MINIDRAGON
        this.anims.create({
            key: Constantes.ENEMIGOS.MINIDRAGON.ANIMACION.ESPERA,
            frames: this.anims.generateFrameNames(Constantes.ENEMIGOS.MINIDRAGON.ID, {
                prefix: Constantes.ENEMIGOS.MINIDRAGON.ANIMACION.ESPERA + "_", end: 6
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 6, //Frames por segundo a la que se mueve la imágen
            repeat: -1 //Esto es para que el bucle de la animación se repita constantemente
        });
        this.anims.create({
            key: Constantes.ENEMIGOS.MINIDRAGON.ANIMACION.CORRER,
            frames: this.anims.generateFrameNames(Constantes.ENEMIGOS.MINIDRAGON.ID, {
                prefix: Constantes.ENEMIGOS.MINIDRAGON.ANIMACION.CORRER + "_", end: 7
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 5, //Frames por segundo a la que se mueve la imágen
            repeat: -1 //Esto es para que el bucle de la animación se repita constantemente
        });
        this.anims.create({
            key: Constantes.ENEMIGOS.MINIDRAGON.ANIMACION.MORIR,
            frames: this.anims.generateFrameNames(Constantes.ENEMIGOS.MINIDRAGON.ID, {
                prefix: Constantes.ENEMIGOS.MINIDRAGON.ANIMACION.MORIR + "_", end: 5
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 5, //Frames por segundo a la que se mueve la imágen
            repeat: 0 //Esto es para que el bucle de la animación se repita constantemente
        });
        this.anims.create({
            key: Constantes.ENEMIGOS.MINIDRAGON.ANIMACION.HERIDO,
            frames: this.anims.generateFrameNames(Constantes.ENEMIGOS.MINIDRAGON.ID, {
                prefix: Constantes.ENEMIGOS.MINIDRAGON.ANIMACION.HERIDO + "_", end: 3
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 5, //Frames por segundo a la que se mueve la imágen
            repeat: 0 //Esto es para que el bucle de la animación se repita constantemente
        });
        this.anims.create({
            key: Constantes.ENEMIGOS.MINIDRAGON.ANIMACION.ATACAR,
            frames: this.anims.generateFrameNames(Constantes.ENEMIGOS.MINIDRAGON.ID, {
                prefix: Constantes.ENEMIGOS.MINIDRAGON.ANIMACION.ATACAR + "_", end: 5
            }), //Asignamos el nombre que tiene la animación en orden, cada sprite se llama "idle-0/1", siendo del 0 al 1 por eso le ponemos "end: 11". Son en total 11
            frameRate: 5, //Frames por segundo a la que se mueve la imágen
            repeat: 0 //Esto es para que el bucle de la animación se repita constantemente
        });

        //Bola de fuego animada
        this.anims.create({
            key: Constantes.ENEMIGOS.BOLAFUEGOANIMADA.ANIMACION.ID,
            frames: Constantes.ENEMIGOS.BOLAFUEGOANIMADA.ID,
            frameRate: 10,
            //Si solo quieres que se repita una vez
            repeat: -1
        });
    }

    animacionesObjetos(): void {
        this.anims.create({
            key: Constantes.POSICIONABLES.HORNO.HORNOENCENDIDO,
            frames: Constantes.POSICIONABLES.HORNO.ID,
            frameRate: 5, //Frames por segundo a la que se mueve la imágen
            repeat: -1 //Esto es para que el bucle de la animación se repita constantemente
        });
    }
}