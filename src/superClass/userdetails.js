import React from 'react';


const UserDetailsSC = function(store) {
    //Components
    const UserDetails = require("components/UserDetails");
    function userSignIn(){
        store.dispatch({type:'NAV_PUSH_BASE', payload: {
            current: {
                usersignin:  true
            }
        }});
    }
    return (
        <UserDetails
            notifieListner={ updater => {
                return store.subscribe(function() {
                    updater(store.getState().notifier.messageData);
                });
            }}
            messageData={()=>{
                return store.getState().notifier.messageData;
            }}
            userSignIn={userSignIn}
        />
    );
}
//
export default UserDetailsSC;
