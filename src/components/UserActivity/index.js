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
    render() {
        return (
            <div className="sbw-user-activity">

            </div>
        );
    },

});
