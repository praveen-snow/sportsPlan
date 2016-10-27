/* src/components/Backdrop */

import React from 'react';
import { bindListener } from 'utils';
import ss from './styles.scss';
import PureRenderMixin  from 'react-addons-pure-render-mixin';
import go from 'gojs';
import {getDiagram,getPlayers} from '../../utils/canvasUtilities';
const goObj = go.GraphObject.make;

export default React.createClass({
    mixins: [PureRenderMixin],
    apiUnsubscribe: ()=>{},

	getInitialState() {
		return {
      menuOpen:false,
      componentModel:null,
      componentDiagram:null,
      groundImage:'../../assets/amFootball.jpg',
      gameTitle:'Football'
		};
	},
    componentWillMount() {
        ss.use();
        this.apiUnsubscribe = bindListener(this.props.apiListener, state => {});
    },
    componentWillUnmount() {
        ss.unuse();
        this.apiUnsubscribe();
    },
  	componentDidMount() {
      this.renderPlayground();
  	},
    renderPlayground(){
        let model = goObj(go.TreeModel);
        let refElement = this.refs.playGroundDiv;
        let diagram = getDiagram(goObj,refElement);
          diagram.nodeTemplate = getPlayers(goObj);

          this.setState({componentModel: model, componentDiagram: diagram},
                            () => {
                              model.nodeDataArray = this.props.data;
                              diagram.model = model;
                              this.setState({componentModel: model, componentDiagram: diagram});
                        }
    );
    },
    changeSports(event){
      if(event.target.textContent === 'Soccer'){
        this.setState({
          groundImage:'../../assets/soccerGround.svg',
          gameTitle:event.target.textContent
        });
      }else if(event.target.textContent === 'Football'){
        this.setState({
          groundImage:'../../assets/amFootball.jpg',
          gameTitle:event.target.textContent
        });
      }else{
        this.props.showPopUp();
      }
    },
    createNavList(){
      let arr=[];
      let sportsList = [
        "Football",
        "Soccer",
        "Baseball",
        "Cricket"
      ]
      sportsList.map((value)=>{
        arr.push(<a className="sportsList" onClick={this.changeSports}>{value}</a>);
      });
      return arr;
    },
    openMenuBar(){
      let element = this.refs.sideNavBar;
      this.setState({
        menuOpen:!this.state.menuOpen
      });
      let menuOpen = this.state.menuOpen;
      if(!menuOpen){
        element.style.display = "block";
      }else{
        element.style.display = "none";
      }
    },
    render() {
      var imgUrl = this.state.groundImage;
      var divStyle = {
          backgroundImage: 'url(' + imgUrl + ')'
      }
        return (
            <div style={divStyle} className="appBackground">
              <nav className="navBar">
                <img className="SvgIcon" ref="menuBar" onClick={this.openMenuBar}src={"assets/barmenu.png"} />
                <h2 className="title">{this.state.gameTitle}</h2>
              </nav>
              <div ref="sideNavBar" className="sideNav">
                <a href="javascript:void(0)" className="closebtn" onClick={this.openMenuBar}>&times;</a>
                {this.createNavList()}
              </div>
              <div className="playGroundDiv" ref="playGroundDiv"></div>
            </div>
        );
    },

});
