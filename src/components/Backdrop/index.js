/* src/components/Backdrop */

import React from 'react';
import { bindListener } from 'utils';
import ss from './styles.scss';
import PureRenderMixin  from 'react-addons-pure-render-mixin';
import InfiniteScroll from 'react-infinite-scroller';
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
    items(){

    },
    loadFunc(){

    },
    render() {
      var items = [];
      let tracks = [
      {
          permalink_url:"www.google.com",
          artwork_url:"./assets/Cristiano Ronaldo.jpg",
          title:"hello"
      }
      ];
       tracks.map((track, i) => {
           items.push(
               <div className="track" key={i}>
                   <a href={track.permalink_url} target="_blank">
                       <img src={track.artwork_url} width="150" height="150" />
                       <p className="title">{track.title}</p>
                   </a>
               </div>
           );
       });
        return (
            <div className="appBackground">
                <h1>Welcome to Scholl Book Now</h1>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadFunc}
                    hasMore={true || false}
                    loader={<div className="loader">Loading ...</div>}
                    useWindow={false}
                >
                    {items}
                </InfiniteScroll>
            </div>
        );
    },

});
