/* src/index.js */

require('es6-promise').polyfill();
import "whatwg-fetch"; /*FETCH POLLYFILL*/

import configureStore			from 'store';
import { render }				from 'react-dom';
import Navigator				from 'components/Navigator';
import React					from 'react';
import { bootstrap }			from './commandHandlers/app';

const store = configureStore(window.__INITIAL_STATE__);

if(navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
	document.body.className += ' ios';
}

export function getLatestStore(){
	return store;
}


render(
    <div className="parentComponent"
        // onClick={()=>{
        //     store.dispatch({type:"HIDE_NOTIFIER"});
        // }}
    >
    <Navigator
        store={store}
        startTransition={()=>{
            store.dispatch({type:'NAV_STARTING_TRANSITION_BASE'});
        }}
        finishedTransition={()=>{
            store.dispatch({type:'NAV_FINISHED_TRANSITION_BASE'});
        }}
        listener={ (nav)=> {
            store.subscribe(function() { nav(store.getState().navigator); });
        }}
        initialState={store.getState().navigator}
        sceneConfigurations={require("constants/sceneConfig")}
        />
    </div>,
    document.getElementById('root')
);
bootstrap(store);
