import React from 'react';
import { signUp } from '../commandHandlers/api'
import { fetchAPI, getAPI, getrootUrl } from 'utils';


const SignUpSC = function(store) {
    //Components
    const SignUp = require("components/SignUp");
    function signUpUser(userDetails){
        let req = {};
            req = {...userDetails};
        signUp(store,req);
    }
    return (
		<SignUp
            signUpUser={signUpUser}
        />
	);

}
//
export default SignUpSC;
