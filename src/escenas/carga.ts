import Constantes from "../constantes";

export default class Carga extends Phaser.Scene {

    //Barra de carga
    private barraCarga: Phaser.GameObjects.Graphics;
    private barraProgreso: Phaser.GameObjects.Graphics;
    private sonidos: boolean;
    private efectos: boolean;

    constructor() {
        super(Constantes.ESCENAS.CARGA);
    }

    preload(): void {
        this.cameras.main.setBackgroundColor(0x9fcc98); //Color del fondo mientras carga
        this.creaBarras();
        this.registry.set(Constantes.REGISTROS.SONIDOS, true);
        this.registry.set(Constantes.REGISTROS.EFECTOS, true);
        this.sonidos = true;
        this.efectos = true;
        this.recogerDatos();

        this.load.on(
            "progress",
            function (value: number) {
                this.barraProgreso.clear();
                this.barraProgreso.fillStyle(0x72a11d, 1); //Color de la barra de carga
                this.barraProgreso.fillRect(
                    this.cameras.main.width / 4,
                    this.cameras.main.height / 2 - 16,
                    (this.cameras.main.width / 2) * value,
                    16
                );
            },
            this
        );

        //Listener cuando se hayan cargado todos los assets
        this.load.on(
            "complete",
            function () {
                //Cuando la función preload acabe de cargar todo cargar las fuentes
                const fuenteJSON = this.cache.json.get(Constantes.FUENTES.JSON);
                this.cache.bitmapFont.add(Constantes.FUENTES.BITMAP, Phaser.GameObjects.RetroFont.Parse(this, fuenteJSON));
                //Cuando preload acabe de cargar todo empieza la escena menu
                this.scene.start(Constantes.ESCENAS.MENU);
            },
            this
        );

        this.cargaAssets();
    }

    private recogerDatos(): void {
        var xhr = new XMLHttpRequest();
        let sonidos = this.sonidos;
        let efectos = this.efectos
        let self = this;
        xhr.open('GET', 'game/enviarDatos', true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                // Parsea los datos recibidos en formato JSON
                var datos = JSON.parse(xhr.responseText);
                //console.log(datos);
                //sonidos = datos.sonidos;
                //efectos = datos.efectos;
                if (datos.sonidos == 0) {
                    self.registry.set(Constantes.REGISTROS.SONIDOS, false);
                }
                if (datos.sonidos == 1) {
                    self.registry.set(Constantes.REGISTROS.SONIDOS, true);
                }
                if (datos.efectos == 0) {
                    self.registry.set(Constantes.REGISTROS.EFECTOS, false);
                }
                if(datos.efectos == 1){
                    self.registry.set(Constantes.REGISTROS.EFECTOS, true);
                }
            }
        };
        //this.registry.set(Constantes.REGISTROS.SONIDOS, sonidos);
        //this.registry.set(Constantes.REGISTROS.EFECTOS, efectos);
        xhr.send();
    }

    private creaBarras(): void {
        this.barraCarga = this.add.graphics();
        this.barraCarga.fillStyle(0xffffff, 1);
        this.barraCarga.fillRect(
            this.cameras.main.width / 4 - 2,
            this.cameras.main.height / 2 - 18,
            this.cameras.main.width / 2 + 4,
            20
        );
        this.barraProgreso = this.add.graphics();
    }

    private cargaAssets(): void {
        //Para no poner "assets/" en cada ruta
        this.load.path = "gameAssets/";

        this.load.image('logo', 'phaser3-logo.png');

        //Usamos las fuentes cargadas
        this.load.json(Constantes.FUENTES.JSON, "fuentes/fuente.json");
        this.load.image(Constantes.FUENTES.IMAGEN, "fuentes/imagenFuente.png");

        //Mapas
        this.load.tilemapTiledJSON(Constantes.MAPAS.TILEMAPJSON, "mapa/mapaFinal.json"); //Carga el mapa que tu has creado
        this.load.image(Constantes.MAPAS.TILESETFOREST, "imagenes/mapa/tilesetForest.png"); //Para cargar el mapa necesita las imágenes que has usado para hacerlo.
        this.load.image(Constantes.MAPAS.TILESETTRANSICIONES, "imagenes/mapa/tilesetTransiciones.png");
        this.load.image(Constantes.MAPAS.TILESETTAIGA, "imagenes/mapa/tilesetTaiga.png");
        this.load.image(Constantes.MAPAS.TILESETSWAMP, "imagenes/mapa/tilesetSwamp.png");
        this.load.image(Constantes.MAPAS.TILESETTUNDRA, "imagenes/mapa/tilesetTundra.png");

        //Carga de jugador
        this.load.atlas(Constantes.JUGADOR.ID, "imagenes/jugador/jugador.png", "imagenes/jugador/jugador.json");

        //Carga de enemigos
        //Slime
        this.load.atlas(Constantes.ENEMIGOS.SLIME.ID, "imagenes/enemigos/slime.png", "imagenes/enemigos/slime.json");
        //Demon
        this.load.atlas(Constantes.ENEMIGOS.DEMON.ID, "imagenes/enemigos/demon.png", "imagenes/enemigos/demon.json");
        //Troll
        this.load.atlas(Constantes.ENEMIGOS.TROLL.ID, "imagenes/enemigos/troll.png", "imagenes/enemigos/troll.json");
        //Goblin
        this.load.atlas(Constantes.ENEMIGOS.GOBLIN.ID, "imagenes/enemigos/goblin.png", "imagenes/enemigos/goblin.json");
        //Mercader
        this.load.atlas(Constantes.ENEMIGOS.MERCADER.ID, "imagenes/enemigos/mercader.png", "imagenes/enemigos/mercader.json");
        //Bola de fuego
        this.load.image(Constantes.ENEMIGOS.BOLADEFUEGO.ID, "imagenes/enemigos/bolaFuego.png");
        this.load.spritesheet(Constantes.ENEMIGOS.EXPLOSION.ID, "imagenes/enemigos/explosion_red.png", {
            frameWidth: 26,
            frameHeight: 22
        });
        //Explosión genérica
        this.load.spritesheet(Constantes.ENEMIGOS.EXPLOSIONGENERICA.ID, "imagenes/enemigos/explosionGenerica.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        //Esqueleto
        this.load.atlas(Constantes.ENEMIGOS.ESQUELETO.ID, "imagenes/enemigos/skeleton.png", "imagenes/enemigos/skeleton.json");
        //Minidrgon
        this.load.atlas(Constantes.ENEMIGOS.MINIDRAGON.ID, "imagenes/enemigos/minidragon.png", "imagenes/enemigos/minidragon.json");
        //Bola de fuego animada
        this.load.spritesheet(Constantes.ENEMIGOS.BOLAFUEGOANIMADA.ID, "imagenes/enemigos/bolaFuegoAnimada.png", {
            frameWidth: 15.67,
            frameHeight: 32
        });

        //Carga de animales
        //Vaca
        this.load.atlas(Constantes.ANIMALES.VACA.ID, "imagenes/animales/cow.png", "imagenes/animales/cow.json");
        this.load.atlas(Constantes.ANIMALES.GALLINA.ID, "imagenes/animales/chicken.png", "imagenes/animales/chicken.json");

        //Carga texturas de objetos
        this.load.image(Constantes.OBJETOS.TRONCOPEQUENIO, "imagenes/objetos/troncoPequenio.png");
        this.load.image(Constantes.OBJETOS.PIEDRAFOREST, "imagenes/objetos/piedraForest.png");
        this.load.image(Constantes.HERRAMIENTAS.ESPADAS.ESPADAPIEDRA, "imagenes/objetos/espadaPiedra.png");
        this.load.image(Constantes.HERRAMIENTAS.HACHAS.HACHAPIEDRA, "imagenes/objetos/hachaPiedra.png")
        this.load.image(Constantes.HERRAMIENTAS.PICOS.PICOPIEDRA, "imagenes/objetos/picoPiedra.png");
        this.load.image(Constantes.COMIDA.NOCOCINADA.CARNE, "imagenes/objetos/carneCruda.png");
        this.load.image(Constantes.COMIDA.COCINADA.CARNE, "imagenes/objetos/carneCocinada.png");
        this.load.image(Constantes.OBJETOS.CARBON, "imagenes/objetos/carbon.png");
        this.load.image(Constantes.OBJETOS.ORBEROJO, "imagenes/objetos/orbeRojo.png");
        this.load.image(Constantes.OBJETOS.CUEROVACA, "imagenes/objetos/cueroVaca.png");
        this.load.image(Constantes.ARMADURAS.CUERO, "imagenes/objetos/armaduraCuero.png");
        this.load.image(Constantes.OBJETOS.MENAHIERRO, "imagenes/objetos/menaHierro.png");
        this.load.image(Constantes.OBJETOS.HIERRO, "imagenes/objetos/hierro.png");
        this.load.image(Constantes.HERRAMIENTAS.ESPADAS.ESPADAHIERRO, "imagenes/objetos/espadaHierro.png");
        this.load.image(Constantes.HERRAMIENTAS.PICOS.PICOHIERRO, "imagenes/objetos/picoHierro.png");
        this.load.image(Constantes.HERRAMIENTAS.HACHAS.HACHAHIERRO, "imagenes/objetos/hachaHierro.png");
        this.load.image(Constantes.ARMADURAS.CASCOHIERRO, "imagenes/objetos/cascoHierro.png");
        this.load.image(Constantes.HERRAMIENTAS.AZADA, "imagenes/objetos/azada.png");
        this.load.image(Constantes.OBJETOS.REGADERA, "imagenes/objetos/regadera.png");
        this.load.image(Constantes.OBJETOS.MENAORO, "imagenes/objetos/menaOro.png");
        this.load.image(Constantes.OBJETOS.ORO, "imagenes/objetos/oro.png");
        this.load.image(Constantes.OBJETOS.BOLADESLIME, "imagenes/objetos/bolaDeSlime.png");
        this.load.image(Constantes.HERRAMIENTAS.ARCO, "imagenes/objetos/arco.png");
        this.load.image(Constantes.OBJETOS.FLECHAPIEDRA, "imagenes/objetos/flechaPiedra.png");
        this.load.image(Constantes.OBJETOS.HUEVO, "imagenes/objetos/huevo.png");
        this.load.image(Constantes.OBJETOS.PLUMA, "imagenes/objetos/pluma.png");
        this.load.image(Constantes.HERRAMIENTAS.MARTILLO, "imagenes/objetos/martillo.png");
        this.load.image(Constantes.POSICIONABLES.CONSTRUCTOR.MUROS.MUROPIEDRA, "imagenes/objetos/muroPiedra.png");
        this.load.image(Constantes.ARMADURAS.TROLL, "imagenes/objetos/armaduraTroll.png");
        this.load.image(Constantes.OBJETOS.CUEROTROLL, "imagenes/objetos/cueroTroll.png");
        //this.load.image(Constantes.OBJETOS.MONEDA.ID, "imagenes/objetos/coin.png");
        this.load.spritesheet(Constantes.OBJETOS.MONEDA.ID, "imagenes/objetos/coinAnimacion.png", {
            frameWidth: 7.25,
            frameHeight: 7
        });
        this.load.image(Constantes.OBJETOS.MENAAZULITA, "imagenes/objetos/menaAzulita.png");
        this.load.image(Constantes.OBJETOS.AZULITA, "imagenes/objetos/azulita.png");
        this.load.image(Constantes.HERRAMIENTAS.ESPADAS.ESPADAAZULITA, "imagenes/objetos/espadaAzulita.png");
        this.load.image(Constantes.HERRAMIENTAS.ESPADAS.ESPADAPIEDRAROJIZA, "imagenes/objetos/espadaPiedraRojiza.png");
        this.load.image(Constantes.HERRAMIENTAS.ESPADAS.INFRAESPADA, "imagenes/objetos/infraEspada.png");
        this.load.image(Constantes.HERRAMIENTAS.PICOS.PICOAZULITA, "imagenes/objetos/picoAzulita.png");
        this.load.image(Constantes.HERRAMIENTAS.HACHAS.HACHAPIEDRAROJIZA, "imagenes/objetos/hachaPiedraRojiza.png");
        this.load.image(Constantes.HERRAMIENTAS.BASTONFUEGO, "imagenes/objetos/bastonFuego.png");
        this.load.image(Constantes.OBJETOS.MENAPIEDRAROJIZA, "imagenes/objetos/menaPiedraRojiza.png");
        this.load.image(Constantes.OBJETOS.PIEDRAROJIZA, "imagenes/objetos/piedraRojiza.png");
        this.load.image(Constantes.ARMADURAS.PIEDRAROJIZA, "imagenes/objetos/armaduraPiedraRojiza.png");

        //Carga de objetos posicionables
        this.load.image(Constantes.POSICIONABLES.HORNO.HORNOAPAGADO, "imagenes/objetos/fogataApagada.png");
        this.load.spritesheet(Constantes.POSICIONABLES.HORNO.ID, "imagenes/objetos/fogataEncendida.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.image(Constantes.POSICIONABLES.COFRE.PEQUENIO.CERRADO, "imagenes/objetos/cofrePequenioCerrado.png");
        this.load.image(Constantes.POSICIONABLES.COFRE.PEQUENIO.ABIERTO, "imagenes/objetos/cofrePequenioAbierto.png");
        this.load.image(Constantes.POSICIONABLES.ESTATUARITUAL, "imagenes/objetos/estatuaRitual.png");

        //Carga de elementos del mapa
        this.load.image(Constantes.ELEMENTOSMAPA.FOREST.ARBOL, "imagenes/elementosmapa/arbolForest.png");
        this.load.image(Constantes.ELEMENTOSMAPA.FOREST.ROCA, "imagenes/elementosmapa/rocaForest.png");
        this.load.image(Constantes.ELEMENTOSMAPA.FOREST.CARBON, "imagenes/elementosmapa/carbonElementoForest.png");
        this.load.image(Constantes.ELEMENTOSMAPA.FOREST.HIERRO, "imagenes/elementosmapa/hierroElementoForest.png");
        this.load.image(Constantes.ELEMENTOSMAPA.FOREST.ARBUSTO, "imagenes/elementosmapa/arbustoForest.png");
        this.load.image(Constantes.ELEMENTOSMAPA.FOREST.ORO, "imagenes/elementosmapa/oroElementoForest.png");
        this.load.image(Constantes.ELEMENTOSMAPA.FOREST.PIEDRAROJIZA, "imagenes/elementosmapa/piedraRojizaElementoForest.png");

        //Carga de los libros
        this.load.image(Constantes.LIBROS.FORTUNA, "imagenes/libros/fortuna.png");
        this.load.image(Constantes.LIBROS.FUERZA, "imagenes/libros/fuerza.png");
        this.load.image(Constantes.LIBROS.VENENO, "imagenes/libros/veneno.png");

        //Carga de ui
        this.load.image(Constantes.UI.BOTONPAGINA, "imagenes/ui/botonPagina.png");
        this.load.image(Constantes.UI.JUGADORMUERTO, "imagenes/ui/jugadorMuerto.png");
        this.load.image(Constantes.UI.FONDO, "imagenes/ui/Background.png");
        this.load.image(Constantes.UI.OFF, "imagenes/ui/off.png");
        this.load.image(Constantes.UI.ON, "imagenes/ui/on.png");

        //Carga de cultivos
        this.load.image(Constantes.CULTIVOS.ZONAFERTIL, "imagenes/cultivos/zonaFertil.png");
        this.load.image(Constantes.CULTIVOS.ZONAFERTILMOJADA, "imagenes/cultivos/zonaFertilMojada.png");
        for (let i = 0; i < 5; i++) {
            this.load.image(Constantes.CULTIVOS.PATATA.ETAPAS[`ETAPA${i + 1}`], "imagenes/cultivos/patataEtapa" + (i + 1) + ".png");
        }
        this.load.image(Constantes.CULTIVOS.PATATA.ID, "imagenes/cultivos/patata.png");
        this.load.image(Constantes.CULTIVOS.PATATA.SEMILLA, "imagenes/cultivos/semillaPatata.png");
        for (let i = 0; i < 5; i++) {
            this.load.image(Constantes.CULTIVOS.TOMATE.ETAPAS[`ETAPA${i + 1}`], "imagenes/cultivos/tomateEtapa" + (i + 1) + ".png");
        }
        this.load.image(Constantes.CULTIVOS.TOMATE.ID, "imagenes/cultivos/tomate.png");
        this.load.image(Constantes.CULTIVOS.TOMATE.SEMILLA, "imagenes/cultivos/semillaTomate.png");

        //Carga de los sonidos del juego
        this.load.audio(Constantes.SONIDOS.EFECTOS.ATACAR, "sonidos/efectos/atacar.wav");
        this.load.audio(Constantes.SONIDOS.EFECTOS.DAMAGE, "sonidos/efectos/vida.ogg");
        this.load.audio(Constantes.SONIDOS.EFECTOS.RECOLECTAR, "sonidos/efectos/recolectar.ogg");
        this.load.audio(Constantes.SONIDOS.EFECTOS.ABRIRINVENTARIO, "sonidos/efectos/abrirInventario.ogg");
        this.load.audio(Constantes.SONIDOS.EFECTOS.DEMONATTACK, "sonidos/efectos/demonAttack.wav");
        this.load.audio(Constantes.SONIDOS.EFECTOS.SELECCIONAROBJETO, "sonidos/efectos/seleccionarObjetoInventario.ogg");
        this.load.audio(Constantes.SONIDOS.EFECTOS.TALAR, "sonidos/efectos/talar.wav");
        this.load.audio(Constantes.SONIDOS.EFECTOS.PICAR, "sonidos/efectos/picar.wav");
        this.load.audio(Constantes.SONIDOS.BANDASONORA, "sonidos/bandasonora/ambiente.wav");
        this.load.audio(Constantes.SONIDOS.BANDASONORA2, "sonidos/bandasonora/ambiente2.wav");
    }
}