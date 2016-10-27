import {getLatestStore} from '../../src';
let store = getLatestStore();

export function getDiagram(goObj,refElement){
  let diagram = goObj(go.Diagram,refElement,{
    initialContentAlignment: go.Spot.Center
  });
  return diagram;
}
export function getPlayers(goObj){
  let players = goObj(
                          go.Node,"Auto",new go.Binding("text"),
                          goObj(
                            go.Panel,goObj(
                              go.Picture,{
                                name:"picture",
                                desiredSize: new go.Size(50,50),
                                margin: new go.Margin(6,8,6,10),
                              }, new go.Binding("source")
                            ),goObj(go.Panel,"Table",goObj(go.TextBlock,{
                              row:5,
                              column:0,
                              font:"8pt, sans-serif",
                              textAlign:"center",
                              stroke:"#fff"
                            },new go.Binding("text","position"))),
                            { doubleClick: (e, obj)=>{
                              setPlayerInfo(obj.part.data);
                            }}
                          )
  );
  function setPlayerInfo(playerData){
    store.dispatch({type: 'PLAYER_INFO_DATA', payload: {
        playerData: playerData
    }});
    let pageHistory = {backdrop:   true};
    store.dispatch({type:'NAV_PUSH_BASE', payload: {
        history:pageHistory,
        current: {
            playerInfoPage:  true
        }
    }});

  }
  return players;
}
