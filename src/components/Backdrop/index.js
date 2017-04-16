/* src/components/Backdrop */

import React from 'react';
import { bindListener } from 'utils';
import ss from './styles.scss';
import PureRenderMixin  from 'react-addons-pure-render-mixin';
import InfiniteScroll from 'react-infinite-scroller';
import qwest from 'qwest';

const imageList = [];
const api = {
    baseUrl: 'https://api.soundcloud.com',
    client_id: 'caf73ef1e709f839664ab82bef40fa96'
};

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
	componentDidMount() {

  },
  loadItems(page) {
    var self = this;
    var url = api.baseUrl + '/users/8665091/favorites';
    if(this.state.nextHref) {
        url = this.state.nextHref;
    }
    qwest.get(url, {
            client_id: api.client_id,
            linked_partitioning: 1,
            page_size: 10
        }, {
            cache: true
        })
        .then(function(xhr, resp) {
            if(resp) {
                var tracks = self.state.tracks;
                resp.collection.map((track) => {
                    if(track.artwork_url == null) {
                        track.artwork_url = track.user.avatar_url;
                    }

                    tracks.push(track);
                });

                if(resp.next_href) {
                    self.setState({
                        tracks: tracks,
                        nextHref: resp.next_href
                    });
                } else {
                    self.setState({
                        hasMoreItems: false
                    });
                }
            }
        });
  },
  render() {
    var items = [];
     this.state.tracks.map((track, i) => {
      items.push(
        <div className="track" key={i}>
          <a href={track.permalink_url} target="_blank">
            <img src={track.artwork_url} width="150" height="150" />
            <p className="title">{track.title}</p>
          </a>
        </div>
      );
     });
     let loader = (<div className="loader">Loading ...</div>);
    return (
      <div className="appBackground">
        <h1>Welcome to Scholl Book Now</h1>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadItems}
          hasMore={this.state.hasMoreItems}
          loader={loader}
          useWindow={true}
        >
        <div className="tracks">
          {items}
        </div>
        </InfiniteScroll>
      </div>
    );
  },
});
