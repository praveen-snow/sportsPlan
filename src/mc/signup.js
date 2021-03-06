import React from 'react';
import { signUp } from '../commandHandlers/api'
import { fetchAPI, getAPI, getrootUrl } from 'utils';


const SignUpSC = function(store) {
    //Components
    const SignUp = require("components/SignUp");
    function signUpUser(userDetails){
        let req = {};
            req = {...userDetails};
        signUp(store,req).then((rsp) => {
            console.log(rsp);
            if(rsp.status !== "Failure"){
                store.dispatch({type:'TRIGGER_LOAD',payload:{
                    load:false
                    }
                });
                // store.dispatch({type:'NAV_PUSH_BASE', payload: {
                //     current: {
                //         userActivity:  true
                //     }
                // }});
            }
        });
    }
    return (
		<SignUp
            signUpUser={signUpUser}
            loadListener={ updater => {
                return store.subscribe(function() {
                    updater(store.getState().app.appLoader);
                });
            }}
        />
	);

}
//
export default SignUpSC;
