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
            <div className="sbw-signup">
                <div className="sbw-form">
                    <div className="sbw-form-wrapper">
                        <div className="sbw-input-wrapper">
                            <input className="sbw-input" placeholder="Email">

                            </input>
                            <input className="sbw-input" placeholder="Password">

                            </input>
                        </div>
                        <div className="sbw-input-wrapper">
                            <input className="sbw-input" placeholder="First Name">

                            </input>
                            <input className="sbw-input" placeholder="Last Name">

                            </input>
                        </div>
                        <div className="sbw-signup-btn">sign up for free</div>
                    </div>
                </div>
            </div>
        );
    },

});
