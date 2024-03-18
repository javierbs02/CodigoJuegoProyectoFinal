
const Constantes = {
    ESCENAS: {
        NIVEL: "Nivel",
        MENU: "Menu",
        CARGA: "Carga",
        HUD: "Hud",
        RECETAS: "Recetas",
        COMPLEMENTOS: "Complementos",
        INVENTARIO: "Inventario",
        HUDCOFRE: "HudCofre",
        HUDMERCADER: "HudMercader",
        MUERTE: "Muerte",
        AJUSTES: "Ajustes"
    },
    FUENTES:{
        JSON: "fuenteJSON",
        IMAGEN: "imagenFuente",
        BITMAP: "fuentePixel"
    },
    MAPAS:{
        CAPAPLATAFORMAS: "Mapa", //El nombre tiene que ser igual al nombre de la capa que has puesto en la App Tiled
        TILESETFOREST: "tilesetForest", //El nombre tiene que ser igual al nombre del tileset puesto en la App Tiled
        TILESETTRANSICIONES: "tilesetTransiciones",
        TILESETTAIGA: "tilesetTaiga",
        TILESETSWAMP: "tilesetSwamp",
        TILESETTUNDRA: "tilesetTundra",
        TILEMAPJSON: "mapaPrincipal",
        CAPAMAR: "Mar",
        OBJETOS:{
            SOLIDOS: "solido"
        }
    },
    JUGADOR:{
        ID: "jugador",
        ANIMACION:{
            ESPERA: "idle",
            ESPERALADO: "idle_side",
            ESPERAARRIBA: "idle_back",
            CORRER: "walk",
            CORRERLADO: "walk_side",
            CORRERARRIBA: "walk_back",
            HERIDO: "damage",
            ATACAR: "attack",
            ATACARLADO: "attack_side",
            ATACARARRIBA: "attack_back"
        }
    },
    ENEMIGOS:{
        SLIME:{
            ID: "slime",
            VELOCIDAD: 50,
            VIDA: 5,
            FUERZA: 1,
            PUNTUACION: 20,
            ANIMACION:{
                ESPERA: "slime_idle",
                ESPERALADO: "slime_idle_side",
                ESPERAARRIBA: "slime_idle_back",
                CORRER: "slime_walk",
                CORRERLADO: "slime_walk_side",
                CORRERARRIBA: "slime_walk_back",
                MORIR: "slime_die",
                HERIDO: "slime_damage",
                ATACAR: "slime_attack"
            }
        },
        DEMON:{
            ID: "demon",
            ANIMACION:{
                ESPERA: "demon_idle",
                CORRER: "demon_walk",
            }
        },
        TROLL:{
            ID: "troll",
            ANIMACION:{
                ESPERA: "troll_idle",
                CORRER: "troll_walk",
            }
        },
        BOLADEFUEGO:{
            ID: "bolaDeFuego"
        },
        EXPLOSION:{
            ID: "explosion_red",
            ANIMACION:{
                ID: "explosion"
            }
        },
        EXPLOSIONGENERICA:{
            ID: "explosionGenerica",
            ANIMACION:{
                ID: "exposiongenerica"
            }
        },
        GOBLIN:{
            ID: "goblin",
            ANIMACION:{
                ESPERA: "goblin_idle",
                CORRER: "goblin_walk"
            }
        },
        MERCADER:{
            ID: "mercader",
            ANIMACION:{
                ESPERA: "merchant_idle",
                CORRER: "merchant_walk"
            }
        },
        ESQUELETO:{
            ID: "esqueleto",
            ANIMACION:{
                ESPERA: "skeleton_idle",
                CORRER: "skeleton_walk"
            }
        },
        MINIDRAGON:{
            ID: "minidragon",
            ANIMACION:{
                ESPERA: "minidragon_idle",
                CORRER: "minidragon_walk",
                MORIR: "minidragon_die",
                HERIDO: "minidragon_damage",
                ATACAR: "minidragon_attack"
            }
        },
        BOLAFUEGOANIMADA:{
            ID: "bolaFuegoAnimada",
            ANIMACION:{
                ID: "bolafuegoanimada"
            }
        }
    },
    REGISTROS:{
        VIDA: "porcentajeVida",
        PUNTUACION: "puntuacion",
        BAJARINDICE: "bajarIndice",
        CAMBIANDO: "cambiandoPagina",
        INDICEINVENTARIO: "indiceInventario",
        INVENTARIOABIERTO: "inventarioAbierto",
        ELIGIENDO: "eligiendo",
        SONIDOS: "sonidos",
        EFECTOS: "efectos"
    },
    EVENTOS:{
        PUNTUACION: "eventoPuntuacion",
        EQUIPANDO: "equipando"
    },
    OBJETOS:{
        TIPOS:{
            RECOLECTABLES: "recolectables",
            HERRAMIENTAS: "herramientas",
            CONSUMIBLES: "consumibles",
            POSICIONABLES: "posicionables",
            ARMADURAS: "armaduras",
            SEMILLAS: "semillas",
            MONEDAS: "monedas",
            LIBROS: "libros"
        },
        TRONCOPEQUENIO: "troncoPequenio",
        PIEDRAFOREST: "piedraForest",
        CARBON: "carbon",
        ORBEROJO: "orbeRojo",
        CUEROVACA: "cueroVaca",
        MENAHIERRO: "menaHierro",
        HIERRO: "hierro",
        REGADERA: "regadera",
        MENAORO: "menaOro",
        ORO: "oro",
        BOLADESLIME: "bolaDeSlime",
        FLECHAPIEDRA: "flechaPiedra",
        HUEVO: "huevo",
        PLUMA: "pluma",
        CUEROTROLL: "cueroTroll",
        MONEDA: {
            ID: "coinAnimacion",
            ANIMACION: "monedaAnimacion"
        },
        MENAAZULITA: "menaAzulita",
        AZULITA: "azulita",
        MENAPIEDRAROJIZA: "menaPiedraRojiza",
        PIEDRAROJIZA: "piedraRojiza"
    },
    HERRAMIENTAS:{
        TIPOS:{
            ESPADAS: "espadas",
            PICOS: "picos",
            HACHAS: "hachas",
            AZADA: "azada",
            ARCO: "tipoArco",
            MARTILLO: "tipoMartillo",
            BASTON: "baston"
        },
        ESPADAS:{
            ESPADAPIEDRA: "espadaPiedra",
            ESPADAHIERRO: "espadaHierro",
            ESPADAAZULITA: "espadaAzulita",
            ESPADAPIEDRAROJIZA: "espadaPiedraRojiza",
            INFRAESPADA: "infraEspada"
        },
        PICOS:{
            PICOPIEDRA: "picoPiedra",
            PICOHIERRO: "picoHierro",
            PICOAZULITA: "picoAzulita"
        },
        HACHAS:{
            HACHAPIEDRA: "hachaPiedra",
            HACHAHIERRO: "hachaHierro",
            HACHAPIEDRAROJIZA: "hachaPiedraRojiza"
        },
        AZADA: "azadaHierro",
        ARCO: "arco",
        MARTILLO: "martillo",
        BASTONFUEGO: "bastonFuego"
    },
    COMIDA:{
        NOCOCINADA:{
            CARNE: "carneNoCocinada"
        },
        COCINADA:{
            CARNE: "carneCocinada"
        }
    },
    POSICIONABLES:{
        HORNO:{
            ID: "fogataEncendida",
            HORNOENCENDIDO: "hornoEncendido",
            HORNOAPAGADO: "hornoApagado"
        },
        COFRE:{
            PEQUENIO:{
                ID: "cofrePequenio",
                CERRADO: "cofrePequenioCerrado",
                ABIERTO: "cofrePequenioAbierto"
            }
        },
        ESTATUARITUAL: "estatuaRitual",
        CONSTRUCTOR:{
            MUROS:{
                MUROPIEDRA: "muroPiedra"
            }
        }
    },
    ARMADURAS:{
        CUERO: "armaduraCuero",
        CASCOHIERRO: "cascoHierro",
        TROLL: "armaduraTroll",
        PIEDRAROJIZA: "armaduraPiedraRojiza"
    },
    RECETAS:{
        ESPADAPIEDRA: "espadaPiedraReceta",
        HACHAPIEDRA: "hachaPiedraReceta",
        PICOPIEDRA: "picoPiedraReceta",
        FOGATA: "fogataReceta"
    },
    ELEMENTOSMAPA: {
        FOREST:{
            ARBOL: "arbolForest",
            ROCA: "rocaForest",
            CARBON: "carbonForest",
            HIERRO: "hierroForest",
            ARBUSTO: "arbustoForest",
            ORO: "oroForest",
            PIEDRAROJIZA: "piedraRojizaForest"
        },
        TIPOS:{
            ARBOL: "arbol",
            ROCA: "roca",
            ARBUSTO: "arbusto"
        }
    },
    LIBROS:{
        VENENO: "veneno",
        FORTUNA: "fortuna",
        FUERZA: "fuerza"
    },
    SONIDOS:{
        EFECTOS:{
            ATACAR: "atacar",
            ABRIRINVENTARIO: "abrirInventario",
            DEMONATTACK: "demonAttack",
            RECOLECTAR: "recolectar",
            SELECCIONAROBJETO: "seleccionarObjeto",
            DAMAGE: "damage",
            TALAR: "talar",
            PICAR: "picar"
        },
        BANDASONORA: "bandaSonoraPrincipal",
        BANDASONORA2: "bandaSonoraPrincipal2"
    },
    ANIMALES:{
        VACA:{
            ID: "vaca",
            ANIMACION:{
                ESPERA: "cow_idle",
                CORRER: "cow_walk",
            }
        },
        GALLINA:{
            ID: "gallina",
            ANIMACION:{
                CORRER: "chicken_walk",
            }
        }
    },
    UI:{
        BOTONPAGINA: "botonPagina",
        JUGADORMUERTO: "jugadorMuerto",
        FONDO: "fondo",
        OFF: "off",
        ON: "on"
    },
    CULTIVOS:{
        ZONAFERTIL: "zonaFertil",
        ZONAFERTILMOJADA: "zonaFertilMojada",
        PATATA: {
            ID: "patata",
            SEMILLA: "semillaPatata",
            ETAPAS: {
                ETAPA1: "patataEtapa1",
                ETAPA2: "patataEtapa2",
                ETAPA3: "patataEtapa3",
                ETAPA4: "patataEtapa4",
                ETAPA5: "patataEtapa5"
            }
        },
        TOMATE: {
            ID: "tomate",
            SEMILLA: "semillaTomate",
            ETAPAS: {
                ETAPA1: "tomateEtapa1",
                ETAPA2: "tomateEtapa2",
                ETAPA3: "tomateEtapa3",
                ETAPA4: "tomateEtapa4",
                ETAPA5: "tomateEtapa5"
            }
        }
    }
};

export default Constantes;