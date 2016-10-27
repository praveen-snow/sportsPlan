/* src/components/BasicModal */

import React from 'react';
import ss from './styles.scss';
import PureRenderMixin  from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],
componentWillMount() {ss.use();},
componentWillUnmount() {ss.unuse();},
render() {
  return (
      <div className="popUpModel">
          <div className="ModalWrap">
                  <section className="MainContent">
                      <p>{this.props.message}</p>
                  </section>
              <button className="closeBtn" onClick={this.props.ok}>OK</button>
          </div>
      </div>
  );
},

});
