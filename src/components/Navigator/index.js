import { TransitionMotion } from 'react-motion';
import PureRenderMixin      from 'react-addons-pure-render-mixin';
import React                from 'react';
import { bindListener }     from 'utils';

// @ifdef DEBUG
const reactRedux = require("react-redux");
let Provider = reactRedux.Provider;
let LogMonitor = require("components/LogMonitor");
// @endif

function checkforMatch(ary){
    if(ary[0][0].val != undefined) {
        if(Math.floor(ary[0][0].val) != Math.floor(ary[0][1].val)) return false;
    }
    if(ary[1][0].val != undefined) {
        if(Math.floor(ary[1][0].val) != Math.floor(ary[1][1].val)) return false;
    }
    if(ary[2][0].val != undefined) {
        if(Math.floor(ary[2][0].val) != Math.floor(ary[2][1].val)) return false;
    }
    return true;
}

let defaultStyles = {
	x: 0,
	y: 0,
	opacity: 100
};

export default React.createClass({
    mixins: [PureRenderMixin],
    elementCache: {},
    unsubscribe: ()=>{},
    currentCount: 0,
    wrapper: (<div />),

    getInitialState() { return {
        elements: {},
		// @ifdef DEBUG
        debug: false,
		// @endif
        modal: undefined,
        alert: undefined,
        overlay: undefined,
    }; },

    componentDidMount() {
        this.setState({elements: this.props.initialState.current});
        this.unsubscribe = bindListener(this.props.listener, state => {
            if(state.current === this.state.elements &&
                state.modal === this.state.modal &&
                state.alert === this.state.alert &&
                state.overlay === this.state.overlay
				// @ifdef DEBUG
				&& state.debug === this.state.debug
				// @endif
				) return;
            this.setState({
          elements: Object.assign(
            {
                backdrop: true
            },
            state.current.header === false ? {} :{
                header:true
            },
            state.current
          ),
				// @ifdef DEBUG
                debug: state.debug,
				// @endif
                modal: state.modal,
                alert: state.alert,
                overlay: state.overlay,
            });
            if (typeof(state) === 'undefined' || typeof(state.current) === 'undefined') {
                console.warn('Invalid nav request [', state, '] [', this.state, ']');
                return;
            }
            this.currentCount = Object.keys(state.current).length;
        });
    },

    componentWillUnmount() { this.unsubscribe(); },

    getStyles() {
        let configs = {};
        if (typeof(this.state.elements) === 'undefined') {
            console.warn('Invalid elements [', this.state.elements, ']');
            return configs;
        }
        try {
            Object.keys(this.state.elements).forEach((key, index) => {
                if (typeof(this.props.sceneConfigurations) === 'undefined') {
                    console.warn('Invalid sceneConfigurations [', this.props, ']');
                    return configs;
                }
				let elementConfig = this.state.elements[key];

				if(elementConfig === false) {
					return;
				}

				if(elementConfig === true) {
					elementConfig = {};
				}

				let mergedDefaultConfig = Object.assign({ z: index + 1 }, defaultStyles, elementConfig);
                configs[key] = Object.assign(mergedDefaultConfig, this.props.sceneConfigurations[key].Styles(mergedDefaultConfig));
            });
        } catch(ex) {
            console.error('Invalid elements [', this.state, '] [', ex, ']');
            //throw new Error(ex);
        }
        return configs;
    },

    willEnter(key) {
        /* Cache the element so it can be refrenced instead of recreated on every loop */
        this.elementCache[key] = this.props.sceneConfigurations[key].VM(this.props.store);
        return Object.assign({}, defaultStyles, this.props.sceneConfigurations[key].Enter);
    },

    willLeave(key, style, value, currentSpeed) {
        /* Remove cache when the elment is done transitioning */
        const cS = Object.assign({}, defaultStyles, currentSpeed[key]);
        const sC = Object.assign({}, defaultStyles, this.props.sceneConfigurations[key].Leave);
        if(this.elementCache[key] === undefined) return;
        if(checkforMatch([[cS.x,sC.x],[cS.y,sC.y],[cS.opacity,sC.opacity]])) {
            delete this.elementCache[key];
            if(Object.keys(value).length === this.currentCount) this.props.finishedTransition();
        }
        return sC;
    },

    sceneObj(iS) {
        return (key) => {
            const {...style} = iS[key];
            const trsn = "translate3d("+style.x+"vw,"+style.y+"vh, "+style.z+"px)"
            const s = {
                opacity:style.opacity/100,
                WebkitTransform: trsn,
                transform: trsn
            };

            return React.cloneElement(this.wrapper,{style:s,key:key},(this.elementCache[key]) ? this.elementCache[key] : false);
        };
    },

    interpolatedStyles(iS) {
        return (
            <div>
                {Object.keys(iS).map(this.sceneObj(iS))}
                {(this.state.modal) ? this.state.modal : []}
                {(this.state.overlay) ? this.state.overlay : []}
                {(this.state.alert) ? this.state.alert : []}
				// @ifdef DEBUG
                {(this.state.debug) ? (<div style={{position:"absolute",top:"0",right:"0",zIndex:"10",width:"40vw",height:"100vh"}}><Provider store={this.props.store} key="provider"><LogMonitor /></Provider></div>) : []}
				// @endif
            </div>
        );
    },

    render() {
        return (
            <TransitionMotion
              styles={this.getStyles()}
              willEnter={this.willEnter}
              willLeave={this.willLeave}>
                {interpolatedStyles => this.interpolatedStyles(interpolatedStyles)}
            </TransitionMotion>
        );
    }

});
