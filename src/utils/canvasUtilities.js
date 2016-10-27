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
export function getSoccerData(){
  let data = [
              {key:"A1",teamName:"Real Madrid C.F.",play:"",position:"Forward",text:"Cristiano Ronaldo",source:"../assets/soccerTeamA.png"},
              {key:"A2",teamName:"Real Madrid C.F.",play:"",position:"Midfielder",text:"James Rodríguez",source:"../assets/soccerTeamA.png"},
              {key:"A3",teamName:"Real Madrid C.F.",play:"",position:"Forward",text:"Gareth Bale",source:"../assets/soccerTeamA.png"},
              {key:"A4",teamName:"Real Madrid C.F.",play:"",position:"Forward",text:"Karim Benzema",source:"../assets/soccerTeamA.png"},
              {key:"A5",teamName:"Real Madrid C.F.",play:"",position:"Defender",text:"Sergio Ramos",source:"../assets/soccerTeamA.png"},
              {key:"A6",teamName:"Real Madrid C.F.",play:"",position:"Forward",text:"Álvaro Morata",source:"../assets/soccerTeamA.png"},
              {key:"A7",teamName:"Real Madrid C.F.",play:"",position:"Goalkeeper",text:"Keylor Navas",source:"../assets/soccerTeamA.png"},
              {key:"A8",teamName:"Real Madrid C.F.",play:"",position:"Midfielder",text:"Marco Asensio",source:"../assets/soccerTeamA.png"},
              {key:"A9",teamName:"Real Madrid C.F.",play:"",position:"Midfielder",text:"Isco",source:"../assets/soccerTeamA.png"},
              {key:"A10",teamName:"Real Madrid C.F.",play:"",position:"Midfielder",text:"Casemiro",source:"../assets/soccerTeamA.png"},
              {key:"A11",teamName:"Real Madrid C.F.",play:"",position:"Defender",text:"Marcelo Vieira",source:"../assets/soccerTeamA.png"},
              {key:"ball",position:"",text:"ball",source:"../assets/soccerBall.png"},
                {key:"B1",teamName:"Manchester United F.C.",play:"",position:"Midfielder",text:"Paul Pogba",source:"../assets/soccerTeamB.png"},
              {key:"B2",teamName:"Manchester United F.C.",play:"",position:"Forward",text:"Zlatan Ibrahimović",source:"../assets/soccerTeamB.png"},
              {key:"B3",teamName:"Manchester United F.C.",play:"",position:"Forward",text:"Wayne Rooney",source:"../assets/soccerTeamB.png"},
              {key:"B4",teamName:"Manchester United F.C.",play:"",position:"Midfielder",text:"Henrikh Mkhitaryan",source:"../assets/soccerTeamB.png"},
              {key:"B5",teamName:"Manchester United F.C.",play:"",position:"Forward",text:"Marcus Rashford",source:"../assets/soccerTeamB.png"},
              {key:"B6",teamName:"Manchester United F.C.",play:"",position:"Midfielder",text:"Bastian Schweinsteiger",source:"../assets/soccerTeamB.png"},
              {key:"B7",teamName:"Manchester United F.C.",play:"",position:"Forward",text:"Anthony Martial",source:"../assets/soccerTeamB.png"},
              {key:"B8",teamName:"Manchester United F.C.",play:"",position:"Goalkeeper",text:"David de Gea",source:"../assets/soccerTeamB.png"},
              {key:"B9",teamName:"Manchester United F.C.",play:"",position:"Forward",text:"Marouane Fellaini",source:"../assets/soccerTeamB.png"},
              {key:"B10",teamName:"Manchester United F.C.",play:"",position:"Defender",text:"Antonio Valencia",source:"../assets/soccerTeamB.png"},
              {key:"B11",teamName:"Manchester United F.C.",play:"",position:"Defender",text:"Luke Shaw",source:"../assets/soccerTeamB.png"}
            ];
    return data;
}
export function getData(){
  let data = [
              {key:"A1",teamName:"Cleveland Browns",play:"Offense",position:"Quarter Back",text:"Cody Kessler",source:"../assets/teamA.png"},
              {key:"A2",teamName:"Cleveland Browns",play:"Offense",position:"Center",text:"Cameron Erving",source:"../assets/teamA.png"},
              {key:"A3",teamName:"Cleveland Browns",play:"Offense",position:"Tail Back",text:"George Atkinson III",source:"../assets/teamA.png"},
              {key:"A4",teamName:"Cleveland Browns",play:"Offense",position:"Full Back",text:"Dan Vitale",source:"../assets/teamA.png"},
              {key:"A5",teamName:"Cleveland Browns",play:"Offense",position:"Flanker",text:"Jordan Payton",source:"../assets/teamA.png"},
              {key:"A6",teamName:"Cleveland Browns",play:"Offense",position:"Tight End",text:"Seth DeValve",source:"../assets/teamA.png"},
              {key:"A7",teamName:"Cleveland Browns",play:"Offense",position:"Left Guard",text:"Spencer Drango",source:"../assets/teamA.png"},
              {key:"A8",teamName:"Cleveland Browns",play:"Offense",position:"Right Guard",text:"Gary Barnidge",source:"../assets/teamA.png"},
              {key:"A9",teamName:"Cleveland Browns",play:"Offense",position:"Left Tackle",text:"Nate Orchard",source:"../assets/teamA.png"},
              {key:"A10",teamName:"Cleveland Browns",play:"Offense",position:"Right Tackle",text:"Demario Davis",source:"../assets/teamA.png"},
              {key:"A11",teamName:"Cleveland Browns",play:"Offense",position:"Split End",text:"Andrew Hawkins",source:"../assets/teamA.png"},
              {key:"ball",position:"",text:"ball",source:"../assets/footBall.png"},
              {key:"B1",teamName:"Dallas Cowboys",play:"Defense",position:"Strong Safety",text:"Barry Church",source:"../assets/teamB.png"},
              {key:"B2",teamName:"Dallas Cowboys",play:"Defense",position:"Free Safety",text:"Byron Jones",source:"../assets/teamB.png"},
              {key:"B3",teamName:"Dallas Cowboys",play:"Defense",position:"Right Corner Back",text:"Brandon Carr",source:"../assets/teamB.png"},
              {key:"B4",teamName:"Dallas Cowboys",play:"Defense",position:"Right Line Backer",text:"David Irving",source:"../assets/teamB.png"},
              {key:"B5",teamName:"Dallas Cowboys",play:"Defense",position:"Right End",text:"Tyrone Crawford",source:"../assets/teamB.png"},
              {key:"B6",teamName:"Dallas Cowboys",play:"Defense",position:"Middle Line Backer",text:"Anthony Hitchens",source:"../assets/teamB.png"},
              {key:"B7",teamName:"Dallas Cowboys",play:"Defense",position:"Left Line Backer",text:"Andrew Gachkar",source:"../assets/teamB.png"},
              {key:"B8",teamName:"Dallas Cowboys",play:"Defense",position:"Left Corner Back",text:"Sean Lee",source:"../assets/teamB.png"},
              {key:"B9",teamName:"Dallas Cowboys",play:"Defense",position:"Nose Tackle",text:"Benson Mayowa",source:"../assets/teamB.png"},
              {key:"B10",teamName:"Dallas Cowboys",play:"Defense",position:"Left End",text:"Terrell McClain",source:"../assets/teamB.png"},
              {key:"B11",teamName:"Dallas Cowboys",play:"Defense",position:"Tackle",text:"Orlando Scandrick",source:"../assets/teamB.png"}
            ];
    return data;
}
