import Ajustes from "./escenas/ajustes";
import Carga from "./escenas/carga";
import Complementos from "./escenas/complementos";
import Hud from "./escenas/hud";
import HudCofre from "./escenas/hudCofre";
import HudMercader from "./escenas/hudMercader";
import Inventario from "./escenas/inventario";
import Menu from "./escenas/menu";
import Muerte from "./escenas/muerte";
import Nivel from "./escenas/nivel";
import Recetas from "./escenas/recetas";

const Configuracion = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 854,
        height: 480
    },
    pixelArt: true,
    scene: [Carga, Nivel, Menu, Hud, Recetas, Complementos, Inventario, HudCofre, HudMercader, Muerte, Ajustes],
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 0
            },
            debug: false //dibuja la hitbox del personaje
        }
    }
};

export default Configuracion;