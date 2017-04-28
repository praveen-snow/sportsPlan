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
    header: {
        Enter: { y:spring(-50),z: 10 },
        Leave: { y:spring(-50),z: 10 },
        Styles(val) {
            return { x: val.x, y: spring(val.y), z: 10 };
        },
        VM(store) {
            return require("superClass/header")(store);
        }
    },
    userdetails: {
        Enter: {y:spring(-50),z: 5 },
        Leave: {y:spring(-50),z: 5 },
        Styles(val) {
            return { y:spring(val.y), x: val.x, z: 5, opacity: val.opacity};
        },
        VM(store) {
            return require("superClass/userdetails")(store);
        }
    },
    signUp: {
        Enter: {x: spring(100,[300,20]), z: 5 },
        Leave: {x: spring(90,[300,20]), z: 5 },
        Styles(val) {
            return { x:spring(val.x), y: val.y, z: 5, opacity: val.opacity};
        },
        VM(store) {
            return require("superClass/SignUp")(store);
        }
    },
    usersignin: {
        Enter: {x: spring(100,[300,20]), z: 5 },
        Leave: {x: spring(90,[300,20]), z: 5 },
        Styles(val) {
            return { x:spring(val.x), y: val.y, z: 5, opacity: val.opacity};
        },
        VM(store) {
            return require("superClass/SignIn")(store);
        }
    },
    userActivity: {
        Enter: {x: spring(100,[300,20]), z: 5 },
        Leave: {x: spring(90,[300,20]), z: 5 },
        Styles(val) {
            return { x:spring(val.x), y: val.y, z: 5, opacity: val.opacity};
        },
        VM(store) {
            return require("superClass/useractivity")(store);
        }
    }
};
