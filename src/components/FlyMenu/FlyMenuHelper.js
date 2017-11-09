// Components

//Constants

// Diameter of the main button in pixels
export const MAIN_BUTTON_DIAM = 90;
export const CHILD_BUTTON_DIAM = 48;
// The number of child buttons that fly out from the main button
export const NUM_CHILDREN = 5;
// Hard code the position values of the mainButton
export const M_X = 490;
export const M_Y = 450;

//should be between 0 and 0.5 (its maximum value is difference between scale in finalChildButtonStyles a
// nd initialChildButtonStyles)
export const OFFSET = 0.05;

export const SPRING_CONFIG = { stiffness: 400, damping: 28 };

// How far away from the main button does the child buttons go
export const FLY_OUT_RADIUS = 130,
    SEPARATION_ANGLE = 40, //degrees
    FAN_ANGLE = (NUM_CHILDREN - 1) * SEPARATION_ANGLE, //degrees
    BASE_ANGLE = ((180 - FAN_ANGLE) / 2); // degrees

// Names of icons for each button retreived from fontAwesome, we'll add a little extra just in case
// the NUM_CHILDREN is changed to a bigger value


// Utility functions

export function toRadians(degrees) {
    return degrees * (Math.PI / 180)
}

export function finalChildDeltaPositions(index) {
    let angle = BASE_ANGLE + (index * SEPARATION_ANGLE);
    return {
        deltaX: FLY_OUT_RADIUS * Math.cos(toRadians(angle)) - (CHILD_BUTTON_DIAM / 2),
        deltaY: FLY_OUT_RADIUS * Math.sin(toRadians(angle)) + (CHILD_BUTTON_DIAM / 2)
    };
}