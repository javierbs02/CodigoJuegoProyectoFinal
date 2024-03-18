import Constantes from "../constantes";
import Nivel from "../escenas/nivel";
import ZonaFertil from "./cultivos/zonaFertil";
import ElementoMapa from "./elementosmapa/elementomapa";
import Enemigo from "./enemigo";
import Objeto from "./objetos/objeto";
import Armadura from "./objetos/armaduras/armadura";
import Azada from "./objetos/herramientas/azada";
import Consumible from "./objetos/consumibles/consumible";
import Herramienta from "./objetos/herramientas/herramienta";
import Regadera from "./objetos/regadera";
import Posicionable from "./posicionables/posicionable";
import Semilla from "./cultivos/semilla";
import Flecha from "./objetos/flecha";
import Animal from "./animales/animal";
import OrbeRojo from "./objetos/orbeRojo";
import Oro from "./objetos/oro";
import Arco from "./objetos/herramientas/arco";
import PatataSemilla from "./cultivos/patataSemilla";
import MuroPiedra from "./posicionables/muroPiedra";
import PicoPiedra from "./objetos/herramientas/picoPiedra";
import CarneCruda from "./objetos/consumibles/carneCruda";
import Horno from "./posicionables/horno";
import Carbon from "./objetos/carbon";
import PiedraForest from "./objetos/piedraforest";
import Tronco from "./objetos/tronco";
import ArmaduraTroll from "./objetos/armaduras/armaduraTroll";
import Martillo from "./objetos/herramientas/martillo";
import CofrePequenio from "./posicionables/cofrePequenio";
import PicoAzulita from "./objetos/herramientas/picoAzulita";
import Fortuna from "./objetos/libros/fortuna";
import EstatuaRitual from "./posicionables/estatuaRitual";

export default class Jugador extends Phaser.Physics.Arcade.Sprite {
    public escena: Nivel;
    private teclasWASD: any;
    public direccion: string;
    public vidaMax: number;
    public vida: number
    public defensa: number;
    public estaHerido: boolean;
    public fuerza: number;
    private estaAtacando: boolean;
    private distanciaAtaque: number;
    public recolectando: boolean;
    public inventario: any[][];
    public indiceInventario: number;
    private maximosSlots: number
    public objetoEquipado: Objeto;
    public arrayBarra: any[][];
    private teclasNumericas: Phaser.Input.Keyboard.Key[];
    public indiceObjetoEquipado: number;
    public equipando: boolean;
    public ordenar: boolean;
    private atacarAudio: Phaser.Sound.BaseSound;
    private damageAudio: Phaser.Sound.BaseSound;
    private recolectarAudio: Phaser.Sound.BaseSound;
    private talarAudio: Phaser.Sound.BaseSound;
    private picarAudio: Phaser.Sound.BaseSound;
    private teclaUsar: any;
    private teclaSoltar: any;
    public consumiendo: boolean;
    private contador: number;
    private objetoDibujado: boolean;
    public datos: any;
    public posicionando: boolean;
    public armaduraEquipada: Armadura;
    public monedas: number;
    public sonando: boolean;

    constructor(config: any) {
        super(config.escena, config.x, config.y, config.texture);

        this.escena = config.escena;
        this.direccion = "bottom";
        this.vidaMax = 10;
        this.vida = 10;
        this.defensa = 0;
        this.fuerza = 0;
        this.distanciaAtaque = 100;
        this.estaHerido = false;
        this.recolectando = false;
        this.inventario = new Array();
        this.arrayBarra = new Array();
        this.indiceInventario = 0;
        this.maximosSlots = 32;
        this.equipando = false;
        this.ordenar = false;
        this.estaAtacando = false;
        this.teclaUsar = this.escena.input.keyboard.addKey('e');
        this.teclaSoltar = this.escena.input.keyboard.addKey("q");
        this.consumiendo = false;
        this.contador = 0;
        this.objetoDibujado = false;
        this.posicionando = false;
        this.monedas = 10000;
        this.sonando = false;
        //Insertar el nuevo objeto (personaje) dentro de la escena que queramos
        this.escena.physics.world.enable(this);
        this.escena.add.existing(this);
        this.body.setSize(10, 15); // Para cambiar el tamaño de la hitbox
        this.body.setOffset(1, 3);

        this.teclasWASD = this.escena.input.keyboard.addKeys("W,A,S,D");
        this.teclasNumericas = [];
        for (let i = 0; i < 8; i++) {
            this.teclasNumericas[i] = this.escena.input.keyboard.addKey(49 + i);
        }

        //Inicializar array
        for (let i = 0; i < this.maximosSlots; i++) {
            this.inventario[i] = new Array();
            this.inventario[i][1] = 0;
        }
        for (let i = 0; i < 8; i++) {
            this.arrayBarra[i] = new Array();
            this.arrayBarra[i][1] = 0;
        }

        this.inventario[0][0] = new PicoPiedra({
            escena: this.escena,
            x: null,
            y: null,
            textura: Constantes.HERRAMIENTAS.PICOS.PICOPIEDRA
        });
        this.inventario[0][1] = 1;
        this.indiceInventario++;

        this.inventario[1][0] = new CarneCruda({
            escena: this.escena,
            x: null,
            y: null,
            textura: Constantes.COMIDA.NOCOCINADA.CARNE
        });
        this.inventario[1][1] = 21;
        this.indiceInventario++;

        this.inventario[2][0] = new Horno({
            escena: this.escena,
            x: null,
            y: null,
            textura: Constantes.POSICIONABLES.HORNO.HORNOAPAGADO
        });
        this.inventario[2][1] = 3;
        this.indiceInventario++;

        this.inventario[3][0] = new Carbon({
            escena: this.escena,
            x: null,
            y: null,
            textura: Constantes.OBJETOS.CARBON
        });
        this.inventario[3][1] = 23;
        this.indiceInventario++;

        this.inventario[4][0] = new PiedraForest({
            escena: this.escena,
            x: null,
            y: null,
            textura: Constantes.OBJETOS.PIEDRAFOREST
        });
        this.inventario[4][1] = 23;
        this.indiceInventario++;

        this.inventario[5][0] = new Tronco({
            escena: this.escena,
            x: null,
            y: null,
            textura: Constantes.OBJETOS.TRONCOPEQUENIO
        });
        this.inventario[5][1] = 23;
        this.indiceInventario++;

        this.inventario[6][0] = new ArmaduraTroll({
            escena: this.escena,
            x: null,
            y: null,
            textura: Constantes.ARMADURAS.TROLL
        });
        this.inventario[6][1] = 1;
        this.indiceInventario++;

        this.inventario[7][0] = new Azada({
            escena: this.escena,
            x: null,
            y: null,
            textura: Constantes.HERRAMIENTAS.AZADA
        });
        this.inventario[7][1] = 1;
        this.indiceInventario++;

        this.inventario[8][0] = new Regadera({
            escena: this.escena,
            x: null,
            y: null,
            textura: Constantes.OBJETOS.REGADERA
        });
        this.inventario[8][1] = 1;
        this.indiceInventario++;

        this.inventario[9][0] = new PatataSemilla({
            escena: this.escena,
            x: null,
            y: null,
            textura: Constantes.CULTIVOS.PATATA.SEMILLA
        });
        this.inventario[9][1] = 21;
        this.indiceInventario++;

        this.inventario[10][0] = new Arco({
            escena: this.escena,
            x: null,
            y: null,
            textura: Constantes.HERRAMIENTAS.ARCO
        });
        this.inventario[10][1] = 1;
        this.indiceInventario++;

        this.inventario[11][0] = new Flecha({
            escena: this.escena,
            x: null,
            y: null,
            textura: Constantes.OBJETOS.FLECHAPIEDRA
        });
        this.inventario[11][1] = 13;
        this.indiceInventario++;

        this.inventario[12][0] = new Martillo({
            escena: this.escena,
            x: null,
            y: null,
            textura: Constantes.HERRAMIENTAS.MARTILLO
        });
        this.inventario[12][1] = 1;
        this.indiceInventario++;

        this.inventario[13][0] = new MuroPiedra({
            escena: this.escena,
            x: null,
            y: null,
            textura: Constantes.POSICIONABLES.CONSTRUCTOR.MUROS.MUROPIEDRA
        });
        this.inventario[13][1] = 21;
        this.indiceInventario++;

        this.inventario[14][0] = new CofrePequenio({
            escena: this.escena,
            x: null,
            y: null,
            textura: Constantes.POSICIONABLES.COFRE.PEQUENIO.CERRADO
        });
        this.inventario[14][1] = 2;
        this.indiceInventario++;

        this.inventario[15][0] = new Oro({
            escena: this.escena,
            x: null,
            y: null,
            textura: Constantes.OBJETOS.ORO
        });
        this.inventario[15][1] = 7;
        this.indiceInventario++;

        this.inventario[16][0] = new PicoAzulita({
            escena: this.escena,
            x: null,
            y: null,
            textura: Constantes.HERRAMIENTAS.PICOS.PICOAZULITA
        });
        this.inventario[16][1] = 1;
        this.indiceInventario++;

        this.inventario[17][0] = new Fortuna({
            escena: this.escena,
            x: null,
            y: null,
            textura: Constantes.LIBROS.FORTUNA
        });
        this.inventario[17][1] = 1;
        this.indiceInventario++;

        this.inventario[18][0] = new EstatuaRitual({
            escena: this.escena,
            x: null,
            y: null,
            textura: Constantes.POSICIONABLES.ESTATUARITUAL
        });
        this.inventario[18][1] = 1;
        this.indiceInventario++;

        //Inicializamos los efectos de sonido del jugador
        this.atacarAudio = this.escena.sound.add(Constantes.SONIDOS.EFECTOS.ATACAR);
        this.recolectarAudio = this.escena.sound.add(Constantes.SONIDOS.EFECTOS.RECOLECTAR);
        this.damageAudio = this.escena.sound.add(Constantes.SONIDOS.EFECTOS.DAMAGE, {
            volume: 0.3
        });
        this.talarAudio = this.escena.sound.add(Constantes.SONIDOS.EFECTOS.TALAR);
        this.picarAudio = this.escena.sound.add(Constantes.SONIDOS.EFECTOS.PICAR);

        this.escena.input.on("pointerdown", () => {
            this.disparar(this);
        });
    }

    update(): void {
        //Control de movimiento
        //Si se presiona la tecla A o la flecha izquierda
        if (this.teclasWASD.A.isDown && !this.teclasWASD.D.isDown && !this.teclasWASD.W.isDown && !this.teclasWASD.S.isDown && !this.estaHerido) {
            this.setVelocityX(-150);
            this.setVelocityY(0);
            this.flipX = true; //El personaje se da la vuelta
            this.direccion = "left";
            if (!this.estaAtacando) {
                this.anims.play(Constantes.JUGADOR.ANIMACION.CORRERLADO, true);
            }
            else if (this.estaAtacando) {
                this.anims.play(Constantes.JUGADOR.ANIMACION.ATACARLADO, true);
            }
        }
        else if (this.teclasWASD.D.isDown && !this.teclasWASD.A.isDown && !this.teclasWASD.W.isDown && !this.teclasWASD.S.isDown && !this.estaHerido) {
            this.setVelocityX(150);
            this.setVelocityY(0);
            this.direccion = "right";
            this.flipX = false;
            if (!this.estaAtacando) {
                this.anims.play(Constantes.JUGADOR.ANIMACION.CORRERLADO, true);
            }
            else if (this.estaAtacando) {
                this.anims.play(Constantes.JUGADOR.ANIMACION.ATACARLADO, true);
            }
        }
        else if (this.teclasWASD.W.isDown && !this.teclasWASD.A.isDown && !this.teclasWASD.D.isDown && !this.teclasWASD.S.isDown && !this.estaHerido) {
            this.setVelocityY(-150);
            this.setVelocityX(0);
            this.direccion = "up";
            if (!this.estaAtacando) {
                this.anims.play(Constantes.JUGADOR.ANIMACION.CORRERARRIBA, true);
            }
            else if (this.estaAtacando) {
                this.anims.play(Constantes.JUGADOR.ANIMACION.ATACARARRIBA, true);
            }
        }
        else if (this.teclasWASD.S.isDown && !this.teclasWASD.A.isDown && !this.teclasWASD.D.isDown && !this.teclasWASD.W.isDown && !this.estaHerido) {
            this.setVelocityY(150);
            this.setVelocityX(0);
            this.direccion = "bottom";
            if (!this.estaAtacando) {
                this.anims.play(Constantes.JUGADOR.ANIMACION.CORRER, true);
            }
            else if (this.estaAtacando) {
                this.anims.play(Constantes.JUGADOR.ANIMACION.ATACAR, true);
            }
        }
        else {
            this.setVelocityX(0);
            this.setVelocityY(0);
            if (this.direccion == "left" && !this.estaHerido) {
                this.flipX = true;
                if (!this.estaAtacando) {
                    this.anims.play(Constantes.JUGADOR.ANIMACION.ESPERALADO, true);
                }
                else if (this.estaAtacando) {
                    this.anims.play(Constantes.JUGADOR.ANIMACION.ATACARLADO, true);
                }
            }
            else if (this.direccion == "right" && !this.estaHerido) {
                this.flipX = false;
                if (!this.estaAtacando) {
                    this.anims.play(Constantes.JUGADOR.ANIMACION.ESPERALADO, true);
                }
                else if (this.estaAtacando) {
                    this.anims.play(Constantes.JUGADOR.ANIMACION.ATACARLADO, true);
                }
            }
            else if (this.direccion == "up" && !this.estaHerido) {
                if (!this.estaAtacando) {
                    this.anims.play(Constantes.JUGADOR.ANIMACION.ESPERAARRIBA, true);
                }
                else if (this.estaAtacando) {
                    this.anims.play(Constantes.JUGADOR.ANIMACION.ATACARARRIBA, true);
                }
            }
            else if (this.direccion == "bottom" && !this.estaHerido) {
                if (!this.estaAtacando) {
                    this.anims.play(Constantes.JUGADOR.ANIMACION.ESPERA, true);
                }
                else if (this.estaAtacando) {
                    this.anims.play(Constantes.JUGADOR.ANIMACION.ATACAR, true);
                }
            }
        }
        if (this.estaHerido) {
            if (this.direccion == "left") {
                this.body.x += 1.5;
            }
            else if (this.direccion == "right") {
                this.body.x -= 1.5;
            }
            else if (this.direccion == "up") {
                this.body.y += 1.5;
            }
            else if (this.direccion == "bottom") {
                this.body.y -= 1.5;
            }
        }

        let posX = this.body.x;
        let posY = this.body.y;
        if (this.hayAgua(posX, posY)) {
            this.morir(this);
        }
        this.equipar();
        this.usar();
        this.soltarObjeto();
        this.arar();
        this.cogerAgua();
        this.posicionarObjeto();
        this.dibujarObjetoPosicionable();
        this.seguirAlRaton();
        this.setDepth(this.body.y);

    }


    herido(jugador: Jugador, enemigo: Enemigo): void {
        if (!jugador.estaHerido) {
            if (jugador.armaduraEquipada) {
                let danioTotal = enemigo.fuerza - jugador.armaduraEquipada.fuerza;
                if (danioTotal <= 0) {
                    danioTotal = 1;
                }
                jugador.vida -= danioTotal;
            }
            else {
                jugador.vida -= enemigo.fuerza;
            }
            if (jugador.vida <= 0) {
                jugador.morir(jugador);
            }
            let porcentaje: number = jugador.vida / jugador.vidaMax;
            jugador.escena.registry.set(Constantes.REGISTROS.VIDA, porcentaje);
            let efectos = jugador.escena.registry.get(Constantes.REGISTROS.EFECTOS);
            if (efectos) {
                jugador.damageAudio.play();
            }
            enemigo.colisionJugador();
        }
        jugador.estaHerido = true;

        if (jugador.estaHerido) {
            if (jugador.direccion === "left" || jugador.direccion === "up") {
                jugador.flipX = false;
                jugador.anims.play(Constantes.JUGADOR.ANIMACION.HERIDO, true);
                jugador.setVelocity(0, 0);
            }
            else if (jugador.direccion === "right" || jugador.direccion === "bottom") {
                jugador.anims.play(Constantes.JUGADOR.ANIMACION.HERIDO, true);
                jugador.setVelocity(0, 0);
                jugador.flipX = true;
            }
            jugador.once("animationcomplete", () => {
                jugador.estaHerido = false;
            });
        }

    }

    morir(jugador: Jugador): void {
        if (jugador.escena.scene.isActive(Constantes.ESCENAS.COMPLEMENTOS)) {
            jugador.escena.scene.stop(Constantes.ESCENAS.COMPLEMENTOS);
        }
        if (jugador.escena.scene.isActive(Constantes.ESCENAS.HUD)) {
            jugador.escena.scene.stop(Constantes.ESCENAS.HUD);
        }
        if (jugador.escena.scene.isActive(Constantes.ESCENAS.HUDCOFRE)) {
            jugador.escena.scene.stop(Constantes.ESCENAS.HUDCOFRE);
        }
        if (jugador.escena.scene.isActive(Constantes.ESCENAS.HUDMERCADER)) {
            jugador.escena.scene.stop(Constantes.ESCENAS.HUDMERCADER);
        }
        if (jugador.escena.scene.isActive(Constantes.ESCENAS.INVENTARIO)) {
            jugador.escena.scene.stop(Constantes.ESCENAS.INVENTARIO);
        }
        if (jugador.escena.scene.isActive(Constantes.ESCENAS.RECETAS)) {
            jugador.escena.scene.stop(Constantes.ESCENAS.RECETAS);
        }
        jugador.escena.scene.stop(Constantes.ESCENAS.NIVEL);
        let datos = {
            escena: this.escena
        };
        this.enviarPuntuacion();
        jugador.escena.scene.run(Constantes.ESCENAS.MUERTE, datos);
    }

    recibirPuntuacion(enemigo: Enemigo): number {
        let puntuacion = 0;
        for (let i = 0; i < this.escena.arrayEnemigos.length; i++) {
            if (this.escena.arrayEnemigos[i] == enemigo) {
                if (this.escena.arrayEnemigos[i].config.texture == Constantes.ENEMIGOS.SLIME.ID) {
                    puntuacion = Constantes.ENEMIGOS.SLIME.PUNTUACION;
                }
            }
        }
        return puntuacion;
    }

    atacar(jugador: Jugador, enemigo: any): void {
        if (jugador.objetoEquipado && jugador.objetoEquipado.tipoHerramienta == Constantes.HERRAMIENTAS.TIPOS.ESPADAS) {
            let distanciaJugador: number = jugador.body.x + jugador.body.y;
            let distanciaEnemigo: number = enemigo.body.x + enemigo.body.y;
            if (Math.abs(distanciaJugador - distanciaEnemigo) <= this.distanciaAtaque) {
                jugador.estaAtacando = true;
                if (jugador.estaAtacando == true) {
                    jugador.once("animationcomplete", () => {
                        jugador.estaAtacando = false;
                    });
                }
                if (!enemigo.estaHerido) {
                    // Deshabilitar interacción del enemigo
                    enemigo.vida -= jugador.objetoEquipado.fuerza;
                    enemigo.estaHerido = true;
                    let efectos = jugador.escena.registry.get(Constantes.REGISTROS.EFECTOS);
                    if (efectos) {
                        jugador.atacarAudio.play();
                    }
                }
                if (enemigo.estaHerido) {
                    enemigo.herido();
                }
                if (enemigo.vida <= 0) {
                    enemigo.morir();
                }
            }
        }
    }

    recolecta(jugador: Jugador, objeto: Objeto, suelo: boolean = true): void {
        if (objeto.tipoObjeto != Constantes.OBJETOS.TIPOS.MONEDAS) {
            let noBarra: boolean = false;
            jugador.ordenar = true;
            jugador.inventario.sort((a, b) => {
                // Si ambos elementos son nulos, no cambiamos el orden
                if (a[0] === null && b[0] === null) {
                    return 0;
                }
                // Si el primer elemento es nulo, movemos el segundo elemento al comienzo
                if (a[0] === null) {
                    return 1;
                }
                // Si el segundo elemento es nulo, movemos el primer elemento al comienzo
                if (b[0] === null) {
                    return -1;
                }
                // Si ambos elementos tienen objetos, no cambiamos el orden
                return 0;
            });
            for (let i = 0; i < jugador.arrayBarra.length; i++) {
                if (jugador.arrayBarra[i][0] && jugador.arrayBarra[i][0].texture.key == objeto.texture.key &&
                    jugador.arrayBarra[i][1] < jugador.maximosSlots && objeto.tipoObjeto != Constantes.OBJETOS.TIPOS.HERRAMIENTAS &&
                    objeto.tipoObjeto != Constantes.OBJETOS.TIPOS.ARMADURAS) {
                    jugador.arrayBarra[i][1]++;
                    break;
                }
                else {
                    if (i == jugador.arrayBarra.length - 1) {
                        noBarra = true;
                    }
                }
            }
            if (noBarra) {
                for (let i = 0; i < jugador.inventario.length; i++) {
                    if (jugador.inventario[i][1] != 0 && objeto.tipoObjeto != Constantes.OBJETOS.TIPOS.HERRAMIENTAS && objeto.tipoObjeto != Constantes.OBJETOS.TIPOS.ARMADURAS) {
                        if (jugador.inventario[i][0].texture.key == objeto.texture.key && jugador.inventario[i][1] < jugador.maximosSlots) {
                            jugador.inventario[i][1]++;
                            break;
                        }
                    }
                    else {
                        jugador.inventario[jugador.indiceInventario][0] = objeto;
                        jugador.inventario[jugador.indiceInventario][1] = 1;
                        jugador.indiceInventario++;
                        break;
                    }
                }
            }
            jugador.escena.puntuacion += objeto.puntuacionObjeto;
            jugador.escena.registry.set(Constantes.REGISTROS.PUNTUACION, jugador.escena.puntuacion);
        }
        else {
            jugador.monedas += 1;
        }
        if (suelo) {
            let efectos = jugador.escena.registry.get(Constantes.REGISTROS.EFECTOS);
            if (efectos) {
                if (!jugador.sonando) {
                    jugador.recolectarAudio.play();
                    jugador.sonando = true;
                    jugador.recolectarAudio.once("complete", () => {
                        jugador.sonando = false;
                    });
                }
            }
            let indice = jugador.escena.arrayObjetos.indexOf(objeto);
            jugador.escena.arrayObjetos.splice(indice, 1);
            jugador.escena.grupoObjetos.remove(objeto, true);
            objeto.destroy();
        }
        jugador.recolectando = true;
        jugador.ordenarInventario(jugador);

    }

    posicionarObjeto(): void {
        if (this.objetoEquipado && this.objetoEquipado.tipoObjeto == Constantes.OBJETOS.TIPOS.POSICIONABLES && this.teclaUsar.isDown) {
            let posicionable = this.objetoEquipado as Posicionable;
            let esPosicionable = this.datos.objeto.esPosicionable();
            if (esPosicionable) {
                if (!this.posicionando) {
                    posicionable.usar(posicionable.constructor);
                    posicionable.destruirObjetoBarra();
                    this.posicionando = true;
                    this.actualizarHUD();
                }
            }
            else {
                const aviso: Phaser.GameObjects.BitmapText = this.escena.add.bitmapText(50, this.height - 80, Constantes.FUENTES.BITMAP, "No puedes poner un objeto aquí", 10);
                this.escena.time.addEvent({
                    //Tiempo q  ue hay que esperar
                    delay: 1000, //3000 milisegundos
                    //Lo que pasa cuando se agota el tiempo
                    callback: () => {
                        aviso.destroy();
                    }
                });
            }
        }
        if (this.posicionando) {
            this.contador++;
            if (this.contador >= 50) {
                this.contador = 0;
                this.posicionando = false;
            }
        }
    }

    public ordenarInventario(jugador: Jugador): void {
        for (let i = 0; i < jugador.inventario.length; i++) {

            for (let j = 0; j < jugador.inventario.length; j++) {
                if (jugador.inventario[i][1] > 0 && jugador.inventario[j][1] > 0 && jugador.inventario[i][0].texture.key == jugador.inventario[j][0].texture.key && i != j) {
                    if (jugador.inventario[i][1] < jugador.maximosSlots && jugador.inventario[i][0].tipoObjeto != Constantes.OBJETOS.TIPOS.HERRAMIENTAS && jugador.inventario[i][0].tipoObjeto != Constantes.OBJETOS.TIPOS.ARMADURAS) {
                        if (jugador.inventario[i][1] + jugador.inventario[j][1] <= jugador.maximosSlots) {
                            jugador.inventario[i][1] += jugador.inventario[j][1];
                            jugador.inventario[j][0] = null;
                            jugador.inventario[j][1] = 0;
                            jugador.indiceInventario--;
                        }
                        else {
                            let numero = (jugador.inventario[i][1] + jugador.inventario[j][1]) - 32;
                            jugador.inventario[j][1] = numero;
                            jugador.inventario[i][1] = 32;
                        }
                    }
                }
            }
        }
    }

    equipar(): void {
        for (let i = 0; i < 8; i++) {
            let tecla = i + 1;
            if (this.teclasNumericas[i].isDown && this.arrayBarra[i][0]) {
                this.objetoEquipado = this.arrayBarra[i][0];
                this.indiceObjetoEquipado = i;
                this.equipando = true;
            }
        }
        for (let i = 0; i < this.arrayBarra.length; i++) {
            if (this.indiceObjetoEquipado == i && !this.arrayBarra[i][0]) {
                this.objetoEquipado = null;
            }
        }
    }

    destruirElementos(jugador: Jugador, elemento: ElementoMapa): void {
        if (jugador.objetoEquipado && jugador.estaAtacando == false && jugador.objetoEquipado.tipoObjeto == Constantes.OBJETOS.TIPOS.HERRAMIENTAS) {
            let posJugador: number = jugador.body.x + jugador.body.y;
            let posElemento: number = elemento.body.x + elemento.body.y;
            let distancia: number = Math.abs(posJugador - posElemento);
            //Como sabemos que el objeto equipado tiene que ser una herramienta hacemos una especie de Cast
            let herramientaEquipada = jugador.objetoEquipado as Herramienta;

            if (elemento.herramientaNecesaria == herramientaEquipada.tipoHerramienta && distancia <= 50 && elemento.resistencia <= herramientaEquipada.resistencia) {
                const eventNames = this.escena.events.eventNames();
                jugador.estaAtacando = true;
                if (elemento.tipo == Constantes.ELEMENTOSMAPA.TIPOS.ARBOL) {
                    let efectos = jugador.escena.registry.get(Constantes.REGISTROS.EFECTOS);
                    if (efectos) {
                        jugador.talarAudio.play();
                    }
                }
                else if (elemento.tipo == Constantes.ELEMENTOSMAPA.TIPOS.ROCA) {
                    let efectos = this.escena.registry.get(Constantes.REGISTROS.EFECTOS);
                    if (efectos) {
                        jugador.picarAudio.play();
                    }
                }
                elemento.vida -= herramientaEquipada.fuerza;
                if (elemento.vida <= 0) {
                    elemento.elementoDestruido();
                }
                jugador.once("animationcomplete", () => {
                    jugador.estaAtacando = false;
                });
            }
        }
    }

    usar(): void {
        if (this.teclaUsar.isDown && this.objetoEquipado && this.objetoEquipado.tipoObjeto == Constantes.OBJETOS.TIPOS.CONSUMIBLES) {
            let consumibleEquipado = this.objetoEquipado as Consumible;
            if (!this.consumiendo) {
                consumibleEquipado.consumir();
                this.consumiendo = true;
                this.actualizarHUD();
            }
        }
        if (this.consumiendo) {
            this.contador++;
            if (this.contador >= 50) {
                this.consumiendo = false;
                this.contador = 0;
            }
        }
    }

    arar(): void {
        if (this.objetoEquipado && this.objetoEquipado.tipoHerramienta == Constantes.HERRAMIENTAS.TIPOS.AZADA && this.teclaUsar.isDown) {
            let azada = this.objetoEquipado as Azada;
            let esPosicionable = this.datos.objeto.esPosicionable();
            if (esPosicionable) {
                if (!this.posicionando) {
                    azada.usar();
                    this.posicionando = true;
                }
            }
            else {
                const aviso: Phaser.GameObjects.BitmapText = this.escena.add.bitmapText(50, this.height - 80, Constantes.FUENTES.BITMAP, "No puedes poner un objeto aquí", 10);
                this.escena.time.addEvent({
                    //Tiempo q  ue hay que esperar
                    delay: 1000, //3000 milisegundos
                    //Lo que pasa cuando se agota el tiempo
                    callback: () => {
                        aviso.destroy();
                    }
                });
            }
        }
        if (this.posicionando) {
            this.contador++;
            if (this.contador >= 50) {
                this.contador = 0;
                this.posicionando = false;
            }
        }
    }

    disparar(jugador: Jugador): void {
        if (jugador.objetoEquipado && (jugador.objetoEquipado.tipoHerramienta == Constantes.HERRAMIENTAS.TIPOS.ARCO ||
            jugador.objetoEquipado.tipoHerramienta == Constantes.HERRAMIENTAS.TIPOS.BASTON)) {
            if (!jugador.posicionando) {
                jugador.posicionando = true;
                let mouseX = jugador.escena.input.mousePointer.worldX;
                let mouseY = jugador.escena.input.mousePointer.worldY;

                const angle = Phaser.Math.Angle.Between(
                    jugador.body.x,
                    jugador.body.y,
                    mouseX,
                    mouseY
                );

                // Crear un vector que apunte en la dirección del jugador
                const velocity = new Phaser.Math.Vector2(
                    Math.cos(angle) * 200,
                    Math.sin(angle) * 200
                );
                if (jugador.objetoEquipado.tipoHerramienta == Constantes.HERRAMIENTAS.TIPOS.BASTON && jugador.hayObjeto(OrbeRojo)) {
                    let orbeRojo = new OrbeRojo({
                        escena: jugador.escena,
                        x: jugador.body.x + 4,
                        y: jugador.body.y + 7,
                        textura: Constantes.ENEMIGOS.BOLADEFUEGO.ID
                    });
                    orbeRojo.setVelocity(velocity.x, velocity.y);
                    orbeRojo.setRotation(angle); //170.4
                    jugador.escena.physics.world.enable(orbeRojo);
                    jugador.escena.add.existing(orbeRojo);
                    jugador.escena.physics.add.overlap(orbeRojo, jugador.escena.grupoEnemigos, (proyectil, enemigo: Enemigo) => {
                        if (enemigo && proyectil) {
                            if (!enemigo.estaHerido) {
                                // Deshabilitar interacción del enemigo
                                enemigo.vida -= jugador.objetoEquipado.fuerza + orbeRojo.fuerza;
                                enemigo.estaHerido = true;
                            }
                            if (enemigo.estaHerido) {
                                enemigo.herido();
                            }
                            if (enemigo.vida <= 0) {
                                enemigo.morir();
                            }
                            orbeRojo.destroy();
                        }
                    });
                    jugador.escena.physics.add.overlap(orbeRojo, jugador.escena.grupoAnimales, (proyectil, animal: Animal) => {
                        if (!animal.estaHerido && animal) {
                            // Deshabilitar interacción del enemigo
                            animal.vida -= jugador.objetoEquipado.fuerza + orbeRojo.fuerza;
                            animal.estaHerido = true;

                        }
                        if (animal.estaHerido && animal) {
                            animal.herido();
                        }
                        if (animal.vida <= 0 && animal) {
                            animal.morir();
                        }
                        orbeRojo.destroy();
                    });

                    jugador.escena.physics.add.overlap(orbeRojo, jugador.escena.physicsGroup, () => {
                        orbeRojo.destroy();
                    });
                }
                else if (jugador.objetoEquipado.tipoHerramienta == Constantes.HERRAMIENTAS.TIPOS.ARCO && jugador.hayObjeto(Flecha)) {
                    let flecha = new Flecha({
                        escena: jugador.escena,
                        x: jugador.body.x + 4,
                        y: jugador.body.y + 7,
                        textura: Constantes.OBJETOS.FLECHAPIEDRA
                    });

                    flecha.setVelocity(velocity.x, velocity.y);
                    flecha.setRotation(angle + 0.7); //170.4
                    jugador.escena.physics.world.enable(flecha);
                    jugador.escena.add.existing(flecha);
                    jugador.escena.physics.add.overlap(flecha, jugador.escena.grupoEnemigos, (proyectil, enemigo: Enemigo) => {
                        if (enemigo && proyectil) {
                            if (!enemigo.estaHerido) {
                                // Deshabilitar interacción del enemigo
                                enemigo.vida -= jugador.objetoEquipado.fuerza + flecha.fuerza;
                                enemigo.estaHerido = true;
                            }
                            if (enemigo.estaHerido) {
                                enemigo.herido();
                            }
                            if (enemigo.vida <= 0) {
                                enemigo.morir();
                            }
                            flecha.destroy();
                        }
                    });
                    jugador.escena.physics.add.overlap(flecha, jugador.escena.grupoAnimales, (proyectil, animal: Animal) => {
                        if (!animal.estaHerido && animal) {
                            // Deshabilitar interacción del enemigo
                            animal.vida -= jugador.objetoEquipado.fuerza + flecha.fuerza;
                            animal.estaHerido = true;

                        }
                        if (animal.estaHerido && animal) {
                            animal.herido();
                        }
                        if (animal.vida <= 0 && animal) {
                            animal.morir();
                        }
                        flecha.destroy();
                    });

                    jugador.escena.physics.add.overlap(flecha, jugador.escena.physicsGroup, () => {
                        flecha.destroy();
                    });
                }



            }
        }
    }

    hayObjeto(objeto: any): boolean {
        let comp = false;
        const indice = this.inventario.findIndex((elemento) => elemento[0] instanceof objeto);

        if (indice != -1) {
            this.destruirObjetoInventario(indice, false);
            comp = true;
        }
        else {
            let indiceBarra = this.arrayBarra.findIndex((elemento) => elemento[0] instanceof objeto);
            if (indiceBarra != -1) {
                this.destruirObjetoBarra(indiceBarra);
                comp = true;
            }
            else {
                comp = false;
            }
        }

        return comp;
    }

    cultivar(jugador: any, cultivo: any): void {
        if (jugador.objetoEquipado && jugador.objetoEquipado.tipoObjeto == Constantes.OBJETOS.TIPOS.SEMILLAS
            && !cultivo.cultivado && cultivo.estaMojada) {
            let semilla = jugador.objetoEquipado as Semilla;
            cultivo.cultivado = true;
            if (cultivo) {
                let plantacion = new semilla.cultivoSemilla({
                    escena: jugador.escena,
                    x: cultivo.body.x + 8,
                    y: cultivo.body.y + 4,
                    textura: semilla.texturaCultivo
                });
                jugador.escena.arrayCultivos.push(plantacion);
                jugador.escena.grupoCultivos = jugador.escena.physics.add.group(jugador.escena.arrayCultivos);
                plantacion.zonaFertil = cultivo;
                jugador.destruirObjetoEquipado();
            }
        }
    }

    seguirAlRaton(): void {
        if (this.objetoDibujado) {
            let comp: boolean = false;
            let indice: number = 0;
            let mouseX = this.escena.input.mousePointer.worldX;
            let mouseY = this.escena.input.mousePointer.worldY;
            if (this.datos.objeto.esConstructor) {
                for (let i = 0; i < this.escena.arrayPosicionables.length; i++) {
                    if (this.escena.arrayPosicionables[i].esConstructor && this.escena.arrayPosicionables[i]) {
                        let distanciaObjetos = Phaser.Math.Distance.Between(mouseX, mouseY, this.escena.arrayPosicionables[i].body.x, this.escena.arrayPosicionables[i].body.y);
                        if (distanciaObjetos <= 25) {
                            comp = true;
                            indice = i;
                            break;
                        }
                        else {
                            comp = false;
                        }
                    }
                    else {
                        comp = false;
                    }
                }
                if (comp) {
                    let ladoMasCercano = this.ladoMasCercano(this.datos.objeto, this.escena.arrayPosicionables[indice]);
                    if (ladoMasCercano == "left") {
                        this.datos.objeto.body.x = this.escena.arrayPosicionables[indice].body.x - this.escena.arrayPosicionables[indice].body.width;
                        this.datos.objeto.body.y = this.escena.arrayPosicionables[indice].body.y;
                    }
                    else if (ladoMasCercano == "right") {
                        this.datos.objeto.body.x = this.escena.arrayPosicionables[indice].body.x + this.escena.arrayPosicionables[indice].body.width;
                        this.datos.objeto.body.y = this.escena.arrayPosicionables[indice].body.y;
                    }
                    else if (ladoMasCercano == "top") {
                        this.datos.objeto.body.x = this.escena.arrayPosicionables[indice].body.x;
                        this.datos.objeto.body.y = this.escena.arrayPosicionables[indice].body.y - this.escena.arrayPosicionables[indice].body.height;
                    }
                    else if (ladoMasCercano == "bottom") {
                        this.datos.objeto.body.x = this.escena.arrayPosicionables[indice].body.x;
                        this.datos.objeto.body.y = this.escena.arrayPosicionables[indice].body.y + this.escena.arrayPosicionables[indice].body.height;
                    }
                }
                else {
                    this.datos.objeto.body.x = mouseX;
                    this.datos.objeto.body.y = mouseY;
                }
            }
            else {
                this.datos.objeto.body.x = mouseX;
                this.datos.objeto.body.y = mouseY;
            }
            let esPosicionable = this.datos.objeto.esPosicionable();
            if (!esPosicionable) {
                this.datos.objeto.setTint(0xC86363, 0.5);
            }
            else {
                this.datos.objeto.clearTint();
            }
        }
    }

    dibujarObjetoPosicionable(): void {
        if (this.objetoEquipado && (this.objetoEquipado.tipoObjeto == Constantes.OBJETOS.TIPOS.POSICIONABLES ||
            this.objetoEquipado.tipoHerramienta == Constantes.HERRAMIENTAS.TIPOS.AZADA)) {
            if (!this.objetoDibujado) {
                if (this.objetoEquipado.tipoObjeto == Constantes.OBJETOS.TIPOS.POSICIONABLES &&
                    this.objetoEquipado.tipoHerramienta != Constantes.HERRAMIENTAS.TIPOS.AZADA) {
                    let indice = this.indiceObjetoEquipado;
                    let clase = this.objetoEquipado.constructor;
                    let mouseX = this.escena.input.mousePointer.worldX;
                    let mouseY = this.escena.input.mousePointer.worldY;
                    let objetoPosicionable = this.objetoEquipado as Posicionable;
                    if (typeof clase == "function") {
                        let objeto = new clase.prototype.constructor({
                            escena: this.escena,
                            x: mouseX,
                            y: mouseY,
                            textura: objetoPosicionable.textura
                        });
                        objeto.setDepth(1000);
                        objeto.setAlpha(0.7);
                        this.objetoDibujado = true;
                        this.datos = {
                            numero: indice,
                            objeto: objeto
                        };
                    }
                }
                else if (this.objetoEquipado.tipoObjeto != Constantes.OBJETOS.TIPOS.POSICIONABLES &&
                    this.objetoEquipado.tipoHerramienta == Constantes.HERRAMIENTAS.TIPOS.AZADA) {
                    let indice = this.indiceObjetoEquipado;
                    let mouseX = this.escena.input.mousePointer.worldX;
                    let mouseY = this.escena.input.mousePointer.worldY;
                    let objeto = new ZonaFertil({
                        escena: this.escena,
                        x: mouseX,
                        y: mouseY,
                        textura: Constantes.CULTIVOS.ZONAFERTIL
                    });
                    objeto.setDepth(1000);
                    objeto.setAlpha(0.8);
                    this.objetoDibujado = true;
                    this.datos = {
                        numero: indice,
                        objeto: objeto
                    };
                }
            }
        }

        if (this.objetoDibujado && this.indiceObjetoEquipado != this.datos.numero) {
            this.objetoDibujado = false;
            this.datos.objeto.destroy();
        }
        if (this.objetoEquipado == null && this.objetoDibujado) {
            this.objetoDibujado = false;
            this.datos.objeto.destroy();
        }
    }

    regar(jugador: any, cultivo: any): void {
        if (jugador.objetoEquipado instanceof Regadera) {
            let regadera = jugador.objetoEquipado as Regadera;
            if (regadera.cantidadAgua > 0 && !cultivo.estaMojada) {
                cultivo.estaMojada = true;
                regadera.cantidadAgua--;
            }

        }
    }

    cogerAgua(): void {
        if (this.objetoEquipado && this.objetoEquipado instanceof Regadera) {
            let regadera = this.objetoEquipado as Regadera;
            if (regadera.cantidadAgua < regadera.maxCantidadAgua && this.teclaUsar.isDown && !this.posicionando) {
                let mouseX = this.escena.input.mousePointer.worldX;
                let mouseY = this.escena.input.mousePointer.worldY;
                if (this.hayAgua(mouseX, mouseY)) {
                    regadera.cantidadAgua++;
                    this.posicionando = true;
                }
            }
        }
    }

    soltarObjeto(): void {
        if (this.objetoEquipado && this.teclaSoltar.isDown) {
            if (!this.posicionando) {
                let clase = this.objetoEquipado.constructor;
                let objeto = new clase.prototype.constructor({
                    escena: this.escena,
                    x: this.body.x,
                    y: this.body.y + 25,
                    textura: this.objetoEquipado.texture.key
                });
                this.escena.arrayObjetos.push(objeto);
                this.escena.grupoObjetos = this.escena.physics.add.group(this.escena.arrayObjetos);

                for (let i = 0; i < this.escena.arrayObjetos.length; i++) {
                    this.escena.physics.add.overlap(this.escena.jugador, this.escena.arrayObjetos[i], this.escena.jugador.recolecta, null, this);
                    this.escena.physics.add.collider(this.escena.arrayObjetos[i], this.escena.grupoObjetos);
                }
                this.destruirObjetoEquipado();
                this.posicionando = true;
            }
        }
    }

    hayEnemigosCerca(arrayEnemigos: any[]): boolean {
        let comp = false;
        arrayEnemigos.forEach((enemigo) => {
            let distanciaJugador = Phaser.Math.Distance.Between(this.body.x, this.body.y, enemigo.body.x, enemigo.body.y);
            if (distanciaJugador <= 400) {
                comp = true;
            }
        })
        return comp;
    }

    ladoMasCercano(objeto1: any, objeto2: any): string {
        let lado: string;
        let centroObjeto1X = objeto1.body.x + (objeto1.body.width / 2);
        let centroObjeto1Y = objeto1.body.y + (objeto1.body.height / 2);

        let centroObjeto2X = objeto2.body.x + (objeto2.body.width / 2);
        let centroObjeto2Y = objeto2.body.y + (objeto2.body.height / 2);

        if (centroObjeto1X < centroObjeto2X && Math.abs(centroObjeto1Y - centroObjeto2Y) <= 15) {
            lado = "left";
        }
        else if (centroObjeto1X > centroObjeto2X && Math.abs(centroObjeto1Y - centroObjeto2Y) <= 15) {
            lado = "right";
        }
        else if (centroObjeto1Y < centroObjeto2Y && Math.abs(centroObjeto1X - centroObjeto2X) <= 15) {
            lado = "top";
        }
        else if (centroObjeto1Y > centroObjeto2Y && Math.abs(centroObjeto1X - centroObjeto2X) <= 15) {
            lado = "bottom";
        }
        return lado;
    }

    enviarObjetosBarra(indiceBarra: number, indiceInventario: number) {
        let eligiendo: boolean = this.escena.registry.get(Constantes.REGISTROS.ELIGIENDO);
        if (eligiendo) {
            let objetoElegido = this.inventario[indiceInventario][0];
            let numeroObjeto = this.inventario[indiceInventario][1];
            if (this.arrayBarra[indiceBarra][1] > 0) {
                let objetoBarra = this.arrayBarra[indiceBarra][0];
                let numeroBarra = this.arrayBarra[indiceBarra][1];
                this.inventario[indiceInventario][0] = objetoBarra;
                this.inventario[indiceInventario][1] = numeroBarra;
            }
            else if (this.arrayBarra[indiceBarra][1] == 0) {
                this.inventario[indiceInventario][0] = null;
                this.inventario[indiceInventario][1] = 0;
                this.indiceInventario--;
            }
            this.arrayBarra[indiceBarra][0] = objetoElegido;
            this.arrayBarra[indiceBarra][1] = numeroObjeto;
            this.inventario.sort(this.compare);
            this.actualizarInventario();
            eligiendo = false;
            this.escena.registry.set(Constantes.REGISTROS.ELIGIENDO, eligiendo);
        }
    }

    destruirObjetoEquipado(): void {

        for (let i = 0; i < this.arrayBarra.length; i++) {
            if (this.arrayBarra[i][0] && i == this.indiceObjetoEquipado) {

                this.arrayBarra[i][1] -= 1;
                if (this.arrayBarra[i][1] <= 0) {
                    this.arrayBarra[i][0] = null;
                    this.arrayBarra[i][1] = 0;
                }
                this.actualizarHUD();
            }
        }

    }

    destruirObjetoInventario(indice: number, inventarioAbierto: boolean = true): void {
        this.inventario[indice][1]--;
        if (this.inventario[indice][1] <= 0) {
            this.inventario[indice][0] = null;
            this.inventario[indice][1] = 0;
            this.indiceInventario--;
        }
        if (inventarioAbierto) {
            this.inventario.sort(this.compare);
            this.actualizarInventario();
        }
    }

    enviarPuntuacion(): void {
        // Suponiendo que tienes la puntuación en una variable llamada "puntuacion"

        //const csrfToken = document.getElementById('csrf-token').getAttribute('value');
        var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');


        // Crea una nueva instancia de XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // Define la URL de la ruta en tu proyecto Laravel
        var url = '/ProyectoFinal/PaginaWebPF/public/game/almacenarPuntuacion';

        // Crea un objeto de datos con la puntuación que deseas enviar
        var data = {
            csrfToken: $("meta[name='csrf-token']").attr("content"),
            puntuacion: this.escena.puntuacion,
            monedas: this.monedas
        };

        // Convierte los datos en formato JSON
        var jsonData = JSON.stringify(data);

        // Configura la solicitud AJAX
        xhr.open('POST', 'game/almacenarPuntuacion', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        // Define la función de devolución de llamada cuando se complete la solicitud AJAX
        xhr.onload = function () {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                // Puedes realizar acciones adicionales aquí después de enviar la puntuación con éxito
            }
        };

        // Envía la solicitud AJAX con los datos JSON
        xhr.send(jsonData);
    }

    destruirObjetoBarra(indice: number): void {
        this.arrayBarra[indice][1]--;
        if (this.arrayBarra[indice][1] <= 0) {
            this.arrayBarra[indice][0] = null;
            this.arrayBarra[indice][1] = 0;
        }
        this.actualizarHUD();
    }

    equiparArmadura(indice: number): void {
        if (this.inventario[indice][0].tipoObjeto == Constantes.OBJETOS.TIPOS.ARMADURAS) {
            if (this.armaduraEquipada) {
                let armadura = this.armaduraEquipada;
                this.armaduraEquipada = this.inventario[indice][0];
                this.inventario[indice][0] = armadura;
                this.inventario[indice][1] = 1;
            } else {
                this.armaduraEquipada = this.inventario[indice][0];
                this.inventario[indice][0] = null;
                this.inventario[indice][1] = 0;
                this.indiceInventario--;
            }
            this.inventario.sort(this.compare);
            this.actualizarInventario();
            this.actualizarComplementos();
        }
    }

    hayAgua(posX: number, posY: number): boolean {

        let hayMar = this.escena.capaMar.getTileAtWorldXY(posX, posY);
        if (hayMar) {
            return true;
        }
        else {
            return false;
        }
    }

    actualizarInventario(): void {
        let datos = {
            escena: this.escena
        }
        this.escena.scene.stop(Constantes.ESCENAS.INVENTARIO);
        this.escena.scene.launch(Constantes.ESCENAS.INVENTARIO, datos);
    }

    actualizarHUD(): void {
        let datos = {
            escena: this.escena
        }
        this.escena.scene.stop(Constantes.ESCENAS.HUD);
        this.escena.scene.launch(Constantes.ESCENAS.HUD, datos);
    }

    actualizarComplementos(): void {
        let datos = {
            escena: this.escena
        }
        this.escena.scene.stop(Constantes.ESCENAS.COMPLEMENTOS);
        this.escena.scene.launch(Constantes.ESCENAS.COMPLEMENTOS, datos);
    }

    compare(a: any[], b: any[]): number {
        // Si a está vacío y b no, colocamos b antes que a
        if (a[0] === null && b[0] !== null) {
            return 1;
        }
        // Si b está vacío y a no, colocamos a antes que b
        if (b[0] === null && a[0] !== null) {
            return -1;
        }
        // Si ambos están vacíos o ambos tienen un valor, los comparamos normalmente
        return 0;
    }
}