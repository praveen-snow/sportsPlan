import React from 'react';


const BackdropVM = function(store) {
    //Components
    const Backdrop = require("components/Backdrop");
    ///popup is a stateless component
    const POPUP = require("components/PopUp");

      function setData(textContent,data){
        if(textContent === 'Soccer'||textContent === 'Football'){
          store.dispatch({type: 'GAME_DATA', payload: {
              gameData: data
          }});
        }else{
          store.dispatch({type:"NAV_SET_MODAL_BASE", payload: {
              modal: (
                  <POPUP
                      message={"Only football and soccer functionalities were implemented"}
                      ok={()=>{
                        store.dispatch({type:'NAV_SET_MODAL_BASE',payload:{
                            caller: 'superClass/backdrop', modal: undefined
                        }});
                      }}
                  />
              )
          }});
        }
      }
    return (
		<Backdrop
            gameDataListener={ updater => {
                return store.subscribe(function() {
                    updater(store.getState().app.gameData);
                });
            }}
            setModelData={(textContent,data)=>{
              setData(textContent,data);
              store.dispatch({type:'NAV_POP_BASE'});
            }}
            showPopUp={()=>{
              store.dispatch({type:"NAV_SET_MODAL_BASE", payload: {
                  modal: (
                      <POPUP
                          message={"Only football and soccer functionalities were implemented"}
                          ok={()=>{
                            store.dispatch({type:'NAV_SET_MODAL_BASE',payload:{
                                caller: 'superClass/backdrop', modal: undefined
                            }});
                          }}
                      />
                  )
              }});
            }}
        />
	);

}
//
export default BackdropVM;
