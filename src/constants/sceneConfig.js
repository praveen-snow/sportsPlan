import { spring } from 'react-motion';

export default {
    backdrop: {
        Enter: { z: -10 },
        Leave: { z: -10 },
        Styles(val) {
            return { x: val.x, y: val.y, z: -10 };
        },
        VM(store) {
            return require("superClass/backdrop")(store);
        }
    },
    playerInfoPage: {
        Enter: {x: spring(100,[300,20]), z: 5 },
        Leave: {x: spring(90,[300,20]), z: 5 },
        Styles(val) {
            return { x:spring(val.x), y: val.y, z: 5, opacity: val.opacity};
        },
        VM(store) {
            return require("superClass/playerInfo")(store);
        }
    }
};
