/* src/components/Backdrop */

import React from 'react';
import { bindListener } from 'utils';
import ss from './styles.scss';
import PureRenderMixin  from 'react-addons-pure-render-mixin';

export default React.createClass({
    notificationUnsubscribe: ()=>{},
    mixins: [PureRenderMixin],

    getInitialState() {
        return {
        };
    },
    componentWillMount() {
        ss.use();
        // this.notificationUnsubscribe =  bindListener(this.props.notifieListner, state => {
        //     this.setState({messageData:state});
        // });
    },
    componentWillUnmount() {
        ss.unuse();
        this.notificationUnsubscribe();
    },
    componentDidMount() {

    },
    render() {
        return (
            <div className="sbw-user-details">
                <div className="userWrapper">
                    <div onClick={this.props.userSignIn} className="user-details">
                        <i className="fa fa-unlock" aria-hidden="true"></i> Sign In
                    </div>
                    <div className="user-details">
                        <i className="fa fa-archive" aria-hidden="true"></i> About
                    </div>
                    <div className="user-details">
                        <i className="fa fa-info" aria-hidden="true"></i> Help
                    </div>
                </div>
            </div>
        );
    },

});
