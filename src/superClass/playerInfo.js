import React from 'react';

const PlayerVM = function(store) {

const PlayerInfo = require("components/PlayersInfo");
return (
<PlayerInfo
        playerInfoListener={ updater => {
            return store.subscribe(function() {
                updater(store.getState().players.playerData);
            });
        }}
        playerInfoData={store.getState().players.playerData}
    />
);
}
//
export default PlayerVM;
