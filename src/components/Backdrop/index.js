/* src/components/Backdrop */

import React from 'react';
import { bindListener } from 'utils';
import ss from './styles.scss';
import PureRenderMixin  from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
    getInitialState() {
      return {
          tracks: [],
          hasMoreItems: true,
          nextHref: null
      };
    },
  componentWillMount() {
      ss.use();
  },
  componentWillUnmount() {
      ss.unuse();
  },
  render() {
    return (
      <div className="appBackground">
      </div>
    );
  },
});
