import React from 'react';


const headerSC = function(store) {
    //Components
    const Header = require("components/Header");
    let userNotifier = function () {
        let userObj = {};
        userObj.userName = "Praveen Kumar Chundi";
        userObj.userId = "chundpr";
        userObj.userAccount = "My Account";
        store.dispatch({type:"SET_NOTIFIER_DATA",payload:{
            messageData:userObj
        }});
        store.dispatch({type:"SHOW_NOTIFIER"});
    }
    return (
        <Header
            openUser={userNotifier}
        />
    );
}
//
export default headerSC;
