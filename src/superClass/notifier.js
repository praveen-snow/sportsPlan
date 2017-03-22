import React from 'react';


const NotifierSC = function(store) {
    //Components
    const Notifier = require("components/Notifier");
    return (
        <Notifier
            notifieListner={ updater => {
                return store.subscribe(function() {
                    updater(store.getState().notifier.messageData);
                });
            }}
            messageData={()=>{
                return store.getState().notifier.messageData;
            }}
        />
    );
}
//
export default NotifierSC;
