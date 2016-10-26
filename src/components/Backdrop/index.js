/* src/components/Backdrop */

import React from 'react';
import { bindListener } from 'utils';
import ss from './styles.scss';
import PureRenderMixin  from 'react-addons-pure-render-mixin';
import go from 'gojs';
import {getDiagram} from '../../utils/canvasUtilities';
const goObj = go.GraphObject.make;

export default React.createClass({
    mixins: [PureRenderMixin],
    apiUnsubscribe: ()=>{},

	getInitialState() {
		return {
      menuOpen:false,
      componentModel:null,
      componentDiagram:null
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
        diagram.nodeTemplate = goObj(
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
                                  },new go.Binding("text","position")))
                                )
        );
        this.setState({componentModel: model, componentDiagram: diagram},
                            () => {
                              model.nodeDataArray = this.props.data;
                              diagram.model = model;
                              this.setState({componentModel: model, componentDiagram: diagram});
                        }
    );
    },
    changeSports(event){
      console.log(event.target.textContent);
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
        return (
            <div className="appBackground">
              <nav className="navBar">
                <img className="SvgIcon" ref="menuBar" onClick={this.openMenuBar}src={"assets/barmenu.png"} />
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
