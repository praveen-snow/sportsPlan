import { spring } from 'react-motion';

export default {
    backdrop: {
        Enter: { z: -10 },
        Leave: { z: -10 },
        Styles(val) {
            return { x: val.x, y: val.y, z: -10 };
        },
        VM(store) {
            return require("mc/backdrop")(store);
        }
    },
    header: {
        Enter: { y:spring(-50),z: 10 },
        Leave: { y:spring(-50),z: 10 },
        Styles(val) {
            return { x: val.x, y: spring(val.y), z: 10 };
        },
        VM(store) {
            return require("mc/header")(store);
        }
    },
    userdetails: {
        Enter: {x: spring(100,[300,20]), z: 5 },
        Leave: {x: spring(90,[300,20]), z: 5 },
        Styles(val) {
            return { x:spring(val.x), y: val.y, z: 5, opacity: val.opacity};
        },
        VM(store) {
            return require("mc/userdetails")(store);
        }
    },
    signUp: {
        Enter: {x: spring(100,[300,20]), z: 5 },
        Leave: {x: spring(90,[300,20]), z: 5 },
        Styles(val) {
            return { x:spring(val.x), y: val.y, z: 5, opacity: val.opacity};
        },
        VM(store) {
            return require("mc/signup")(store);
        }
    },
    usersignin: {
        Enter: {x: spring(100,[300,20]), z: 5 },
        Leave: {x: spring(90,[300,20]), z: 5 },
        Styles(val) {
            return { x:spring(val.x), y: val.y, z: 5, opacity: val.opacity};
        },
        VM(store) {
            return require("mc/signin")(store);
        }
    },
    userActivity: {
        Enter: {x: spring(100,[300,20]), z: 5 },
        Leave: {x: spring(90,[300,20]), z: 5 },
        Styles(val) {
            return { x:spring(val.x), y: val.y, z: 5, opacity: val.opacity};
        },
        VM(store) {
            return require("mc/useractivity")(store);
        }
    },
    SideNavBar: {
        Enter: {x: spring(-100,[300,20]), z: 5 },
        Leave: {x: spring(-90,[300,20]), z: 5 },
        Styles(val) {
            return { x:spring(val.x), y: val.y, z: 5, opacity: val.opacity};
        },
        VM(store) {
            return require("mc/sidenavbar")(store);
        }
    }
};
