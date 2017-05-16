import React from 'react';
import { signIn } from '../commandHandlers/api'
import { fetchAPI, getAPI, getrootUrl } from 'utils';


const SignInSC = function(store) {
    //Components
    const SignIn = require("components/SignIn");
    function userSignIn(userDetails){
        let req = {};
            req = {...userDetails};
        signIn(store,req).then((rsp) => {
            console.log(rsp);
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
        />
	);

}
//
export default SignInSC;
