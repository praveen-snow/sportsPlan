/* src/components/DetailsFrame */

import React from 'react';
import ss from './styles.scss';
import PureRenderMixin  from 'react-addons-pure-render-mixin';
import { bindListener } from 'utils';

export default React.createClass({
    playerUnsubscribe: ()=>{},
    mixins: [PureRenderMixin],
    getInitialState() {
        return {
            playerData:this.props.playerInfoData
        };
    },
    componentWillMount() {
      ss.use();
      this.playerUnsubscribe =  bindListener(this.props.playerInfoListener, state => {
          this.setState({playerData:state});
      });
    },
    componentWillUnmount() {
      ss.unuse();
      this.playerUnsubscribe();
    },
    render() {
      let playerName = this.state.playerData.text;
        return (
            <div className="Player_DetailsContainer">
                <h3 className="DetailsHeader">Player Name:&nbsp;&nbsp;{playerName}</h3>
                <div className="DetailsBody">
                <img className="imageIcon" src={"../assets/"+playerName+".jpg"}/>
                  <p>{this.state.playerData.teamName}</p>
                  <p>{this.state.playerData.position}</p>
                  <p>{this.state.playerData.play}</p>
                  <button className="closeBtn" onClick={this.props.closePlayerInfo}>Close</button>
                </div>
            </div>
        );
    },

});
