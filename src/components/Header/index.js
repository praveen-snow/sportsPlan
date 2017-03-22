/* src/components/Header */

import React from 'react';
import { bindListener } from 'utils';
import ss from './styles.scss';
import PureRenderMixin  from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],

    getInitialState() {
        return {
        };
    },
    componentWillMount() {
        ss.use();
    },
    componentWillUnmount() {
        ss.unuse();
    },
    componentDidMount() {

    },
    showUser(){
      this.props.openUser();
    },
    render() {
        return (
            <div className="appHeader">
                <nav className="appNavigator">
                    <div className="wrapper">
                        <div className="leftWrapper">
                            <i className="fa fa-ravelry" aria-hidden="true"></i>
                        </div>
                        <div className="rightWrapper">
                            <i className="fa fa-user-circle" onClick={this.showUser}aria-hidden="true"></i>
                        </div>
                    </div>
                </nav>
            </div>
        );
    },

});
