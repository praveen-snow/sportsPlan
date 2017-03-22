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
            messageData:this.props.messageData()
        };
    },
    componentWillMount() {
        ss.use();
        this.notificationUnsubscribe =  bindListener(this.props.notifieListner, state => {
            this.setState({messageData:state});
        });
    },
    componentWillUnmount() {
        ss.unuse();
        this.notificationUnsubscribe();
    },
    componentDidMount() {

    },
    render() {
        return (
            <div className="appNotifier">
                <div className="outerWrap">
                    <div className="innerWrap">
                        <p>{this.state.messageData.userName}</p>
                    </div>
                </div>
            </div>
        );
    },

});
