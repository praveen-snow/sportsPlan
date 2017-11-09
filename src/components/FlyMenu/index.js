import React from 'react';
import ReactDOM from 'react-dom';
import { Motion, StaggeredMotion, spring } from 'react-motion';
import range from 'lodash.range';
import PureRenderMixin  from 'react-addons-pure-render-mixin';
import ss from './styles.scss';
import { toRadians, finalChildDeltaPositions, MAIN_BUTTON_DIAM, CHILD_BUTTON_DIAM, NUM_CHILDREN, M_X, M_Y, OFFSET, SPRING_CONFIG } from './FlyMenuHelper';
export default React.createClass({
    mixins: [PureRenderMixin],

    getInitialState() {
        return {
            isOpen: false,
            childButtons: []
        };
    },
    componentDidMount() {
        window.addEventListener('click', this.closeMenu);
    },

    componentWillMount() {
      ss.use();
      let childButtons = [];
      this.setState({ childButtons: childButtons.slice(0) });
    },

    componentWillUnmount() {
        ss.unuse();
        window.removeEventListener('click', this.closeMenu);
    },

    mainButtonStyles() {
        return {
            width: MAIN_BUTTON_DIAM,
            height: MAIN_BUTTON_DIAM,
            top: M_Y - (MAIN_BUTTON_DIAM / 2),
            left: M_X - (MAIN_BUTTON_DIAM / 2)
        };
    },

    initialChildButtonStyles() {
        return {
            width: CHILD_BUTTON_DIAM,
            height: CHILD_BUTTON_DIAM,
            top: spring(M_Y - (CHILD_BUTTON_DIAM / 2), SPRING_CONFIG),
            left: spring(M_X - (CHILD_BUTTON_DIAM / 2), SPRING_CONFIG),
            rotate: spring(-180, SPRING_CONFIG),
            scale: spring(0.5, SPRING_CONFIG)
        };
    },

    initialChildButtonStylesInit() {
        return {
            width: CHILD_BUTTON_DIAM,
            height: CHILD_BUTTON_DIAM,
            top: M_Y - (CHILD_BUTTON_DIAM / 2),
            left: M_X - (CHILD_BUTTON_DIAM / 2),
            rotate: -180,
            scale: 0.5
        };
    },

    finalChildButtonStylesInit(childIndex) {
        let { deltaX, deltaY } = finalChildDeltaPositions(childIndex);
        return {
            width: CHILD_BUTTON_DIAM,
            height: CHILD_BUTTON_DIAM,
            top: M_Y - deltaY,
            left: M_X + deltaX,
            rotate: 0,
            scale: 1
        };
    },

    finalChildButtonStyles(childIndex) {
        let { deltaX, deltaY } = finalChildDeltaPositions(childIndex);
        return {
            width: CHILD_BUTTON_DIAM,
            height: CHILD_BUTTON_DIAM,
            top: spring(M_Y - deltaY, SPRING_CONFIG),
            left: spring(M_X + deltaX, SPRING_CONFIG),
            rotate: spring(0, SPRING_CONFIG),
            scale: spring(1, SPRING_CONFIG)
        };
    },

    toggleMenu(e) {
        e.stopPropagation();
        let isOpen = this.state.isOpen;
        this.setState({
            isOpen: !isOpen
        });
    },

    closeMenu() {
        this.setState({ isOpen: false });
    },

    renderChildButtons() {
        const isOpen  = this.state.isOpen;
        const targetButtonStylesInitObject = range(NUM_CHILDREN).map(i => {
            return isOpen ? this.finalChildButtonStylesInit(i) : this.initialChildButtonStylesInit();
        });

        //StaggeredMotion now takes an Array of object
        const targetButtonStylesInit = Object.keys(targetButtonStylesInitObject).map(key => targetButtonStylesInitObject[key]);

        const targetButtonStyles = range(NUM_CHILDREN).map(i => {
            return isOpen ? this.finalChildButtonStyles(i) : this.initialChildButtonStyles();
        });

        const scaleMin = this.initialChildButtonStyles().scale.val;
        const scaleMax = this.finalChildButtonStyles(0).scale.val;

        //This function returns target styles for each child button in current animation frame
        //according to actual styles in previous animation frame.
        //Each button could have one of two target styles
        // - defined in initialChildButtonStyles (for collapsed buttons)
        // - defined in finalChildButtonStyles (for expanded buttons)
        // To decide which target style should be applied function uses css 'scale' property
        // for previous button in previous animation frame.
        // When 'scale' for previous button passes some 'border' which is a simple combination one of
        // two 'scale' values and some OFFSET the target style for next button should be changed.
        //
        // For example let's set the OFFSET for 0.3 - it this case border's value for closed buttons will be 0.8.
        //
        // All buttons are closed
        //                INITIAL-BUTTON-SCALE-(0.5)-----------BORDER-(0.8)------FINAL-BUTTON-SCALE-(1)
        //                |------------------------------------------|--------------------------------|
        // BUTTON NO 1    o------------------------------------------|---------------------------------
        // BUTTON NO 2    o------------------------------------------|---------------------------------
        //
        // When user clicks on menu button no 1 changes its target style according to finalChildButtonStyles method
        // and starts growing up. In this frame this button doesn't pass the border so target style for button no 2
        // stays as it was in previous animation frame
        // BUTTON NO 1    -----------------------------------o-------|---------------------------------
        // BUTTON NO 2    o------------------------------------------|---------------------------------
        //
        //
        //
        // (...few frames later)
        // In previous frame button no 1 passes the border so target style for button no 2 could be changed.
        // BUTTON NO 1    -------------------------------------------|-o-------------------------------
        // BUTTON NO 2    -----o-------------------------------------|---------------------------------
        //
        //
        // All buttons are expanded - in this case border value is 0.7 (OFFSET = 0.3)
        //                INITIAL-BUTTON-SCALE-(0.5)---BORDER-(0.7)--------------FINAL-BUTTON-SCALE-(1)
        //                |------------------------------|--------------------------------------------|
        // BUTTON NO 1    -------------------------------|--------------------------------------------O
        // BUTTON NO 2    -------------------------------|--------------------------------------------O
        //
        // When user clicks on menu button no 1 changes its target style according to initialChildButtonStyles method
        // and starts shrinking down. In this frame this button doesn't pass the border so target style for button no 2
        // stays as it was defined in finalChildButtonStyles method
        // BUTTON NO 1    -------------------------------|------------------------------------O--------
        // BUTTON NO 2    -------------------------------|--------------------------------------------O
        //
        //
        //
        // (...few frames later)
        // In previous frame button no 1 passes the border so target style for button no 2 could be changed
        // and this button starts to animate to its default state.
        // BUTTON NO 1    -----------------------------o-|---------------------------------------------
        // BUTTON NO 2    -------------------------------|------------------------------------O--------
        let calculateStylesForNextFrame = prevFrameStyles => {
            prevFrameStyles = isOpen ? prevFrameStyles : prevFrameStyles.reverse();

            let nextFrameTargetStyles = prevFrameStyles.map((buttonStyleInPreviousFrame, i) => {
                //animation always starts from first button
                if (i === 0) {
                    return targetButtonStyles[i];
                }

                const prevButtonScale = prevFrameStyles[i - 1].scale;
                const shouldApplyTargetStyle = () => {
                    if (isOpen) {
                        return prevButtonScale >= scaleMin + OFFSET;
                    } else {
                        return prevButtonScale <= scaleMax - OFFSET;
                    }
                };

                return shouldApplyTargetStyle() ? targetButtonStyles[i] : buttonStyleInPreviousFrame;
            });

            return isOpen ? nextFrameTargetStyles : nextFrameTargetStyles.reverse();
        };
        let childButtonIcons = ['pencil', 'at', 'camera', 'bell', 'comment', 'bolt', 'ban', 'code'];
        let left = 255;
        return (
            <StaggeredMotion
                defaultStyles={targetButtonStylesInit}
                styles={calculateStylesForNextFrame}>
                {interpolatedStyles =>
                    (<div>
                        {interpolatedStyles.map(({height, left, rotate, scale, top, width}, index) =>
                            <div
                                className="child-button"
                                key={index}
                                style={{
                                    left,
                                    height,
                                    top,
                                    transform: `rotate(${rotate}deg) scale(${scale})`,
                                    width
                                }}
                            >
                                <i className={"fa fa-" + childButtonIcons[index] + " fa-lg"}></i>
                            </div>
                        )}
                    </div>)
                }
            </StaggeredMotion>
        );
    },

    render() {
        let isOpen = this.state.isOpen;
        let mainButtonRotation =
            isOpen ? { rotate: spring(0, { stiffness: 500, damping: 30 }) } : { rotate: spring(-135, { stiffness: 500, damping: 30 }) };
        return (
            <div>
                {this.renderChildButtons()}
                <Motion style={mainButtonRotation}>
                    {({rotate}) =>
                        <div
                            className="main-button"
                            style={{...this.mainButtonStyles(), transform: `rotate(${rotate}deg)`}}
                            onClick={this.toggleMenu}>
                            {/*Using fa-close instead of fa-plus because fa-plus doesn't center properly*/}
                            <i className="fa fa-close fa-3x"/>
                        </div>
                    }
                </Motion>
            </div>
        );
    }
});