import { createReducer } from 'utils';

export default (function createNavigationReducer(namespace, initState) {
    // need to export these from a file in constants
    const NAV_PUSH = 'NAV_PUSH_BASE';
    const NAV_POP = 'NAV_POP_BASE';
	// @ifdef DEBUG
    const NAV_DEBUG = 'NAV_DEBUG_BASE';
	// @endif
    const NAV_REPLACE = 'NAV_REPLACE_BASE';
    const NAV_REPLACE_AT_INDEX = 'NAV_REPLACE_AT_INDEX_BASE';
    const NAV_FINISHED_TRANSITION = 'NAV_FINISHED_TRANSITION_BASE';
    const NAV_SET_MODAL = 'NAV_SET_MODAL_BASE';
    const NAV_SET_ALERT = 'NAV_SET_ALERT_BASE';
    const NAV_SET_OVERLAY = 'NAV_SET_OVERLAY_BASE';
    const NAV_SET_ROUTE_STACK = 'NAV_SET_ROUTE_STACK_BASE';
    const NAV_CLEAR_HISTORY = 'NAV_CLEAR_HISTORY_BASE';

    const initialState = (initState) ? initState : {
        current: {
			header: false
		},
        history: [],
		// @ifdef DEBUG
        debug: false,
		// @endif
        transitioning: false,
        modal: undefined,
        alert: undefined,
        overlay: undefined,
    };

    return createReducer(initialState, {
        ['RESET_REDUCER']: (state, action) => {
            initialState.history = [];
            initialState.current = {header: false};
            return initialState;
        },
        [NAV_PUSH] : (state, action) => {
            const newState = {...state};
            newState.transitioning = true;
            newState.history.push(action.history);
            newState.current = action.current;
            return newState;
        },
        [NAV_POP] : (state, action) => {
            if(state.history.length === 0) return state;
            const newState = {...state};
            newState.transitioning = true;
            newState.current = newState.history.pop();
            return newState;
        },
        [NAV_REPLACE] : (state, action) => {
            const newState = {...state};
            newState.transitioning = true;
            newState.current = action.current;
            return newState;
        },
        [NAV_REPLACE_AT_INDEX] : (state, action) => {
            const newState = {...state};
            newState.transitioning = true;
            if(state.current == action.current) newState.transitioning = false;
            newState.history = state.history.slice(0, action.index);
            newState.current = action.current;
            return newState;
        },
        [NAV_SET_ROUTE_STACK] : (state, action) => {
            const newState = {...state};
            newState.transitioning = true;
            newState.history = action.history;
            newState.current = action.current;
            return newState;
        },
		// @ifdef DEBUG
        [NAV_DEBUG] : (state, action) => {
            const newState = {...state};
            newState.debug = !state.debug;
            return newState;
        },
		// @endif
        [NAV_FINISHED_TRANSITION] : (state, action) => {
            const newState = {...state};
            newState.transitioning = false;
            return newState;
        },
        [NAV_SET_MODAL] : (state, action) => {
            const newState = {...state};
            newState.modal = action.modal;
            return newState;
        },
        [NAV_SET_ALERT] : (state, action) => {
            const newState = {...state};
            newState.alert = action.alert;
            return newState;
        },
        [NAV_SET_OVERLAY] : (state, action) => {
            const newState = {...state};
            newState.overlay = action.overlay;
            return newState;
        },
        [NAV_CLEAR_HISTORY] : (state, action) => {
            const newState = {...state};
            newState.history = [];
            return newState;
        }
     });
})();
