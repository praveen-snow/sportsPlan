import React from 'react';

export function bootstrap(store) {
        let state = store.getState();
        let loadAppScene = () => {
            let state = store.getState();
            store.dispatch({type:'NAV_SET_ROUTE_STACK_BASE', payload:{
                history: [],
                current: {
                    signUp: true
                }
            }});
        },
        init = store.subscribe(() => {
            let state = store.getState();
                console.log('Done loading baseline');
                init(); // Unsubscribe
                loadAppScene();
                return;
        });
        store.dispatch({type:'NAV_SET_ROUTE_STACK_BASE', payload:{
            history: [],
            current: {
                header: true
            }
        }});
}
