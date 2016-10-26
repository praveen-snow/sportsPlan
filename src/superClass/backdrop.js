import React from 'react';

const BackdropVM = function(store) {
    //Components
    const Backdrop = require("components/Backdrop");
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
                {key:"B11",teamName:"Dallas Cowboys",play:"Defense",position:"Tackle",text:"Orlando Scandrick",source:"../assets/teamB.png"},
                {key:"ball",position:"",text:"ball",source:"../assets/footBall.png"}
              ];
    return (
		<Backdrop
            apiListener={ updater => {
                return store.subscribe(function() {
                    updater(store.getState().app);
                });
            }}
            data={data}
        />
	);

}
//
export default BackdropVM;
