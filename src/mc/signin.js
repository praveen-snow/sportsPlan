import React from 'react';
import { signIn } from '../commandHandlers/api'
import { fetchAPI, getAPI, getrootUrl } from 'utils';


const SignInSC = function(store) {
    //Components
    const SignIn = require("components/SignIn");
    function userSignIn(userDetails){
        let req = {...userDetails};
        signIn(store,req).then((rsp) => {
            if(rsp.status !== "Failure"){
                store.dispatch({type:'TRIGGER_LOAD',payload:{
                    load:false
                    }
                });
                store.dispatch({type:'NAV_PUSH_BASE', payload: {
                    current: {
                        userActivity:  true,
                        SideNavBar:    true
                    }
                }});
            } else {
                store.dispatch({type:'FAILURE_RESPONSE',payload:{
                    rsp:rsp
                    }
                });
            }
        });
    }
    return (
		<SignIn
            userSignIn={userSignIn}
            loadListener={ updater => {
                return store.subscribe(function() {
                    updater(store.getState().app.appLoader);
                });
            }}
            loadFailListener={ updater => {
                return store.subscribe(function() {
                    updater(store.getState().app.rsp);
                });
            }}
        />
	);

}
//
export default SignInSC;
