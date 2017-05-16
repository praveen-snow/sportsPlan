import React from 'react';
import { signUp } from '../commandHandlers/api'
import { fetchAPI, getAPI, getrootUrl } from 'utils';


const UserActivitySC = function(store) {
    //Components
    const UserActivity = require("components/UserActivity");
    return (
        <UserActivity
        />
    );

}
//
export default UserActivitySC;
