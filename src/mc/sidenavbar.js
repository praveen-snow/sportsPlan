import React from 'react';
import { signUp } from '../commandHandlers/api'
import { fetchAPI, getAPI, getrootUrl } from 'utils';


const SideNavBarSc = function(store) {
    //Components
    const SideNavBar = require("components/SideNavBar");
    return (
        <SideNavBar
        />
    );

}
//
export default SideNavBarSc;
