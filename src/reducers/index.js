import { combineReducers } from 'redux';
//

import app                 from './app';
import navigator           from './navigator';
import players              from './players';

export default combineReducers({
    app,
    navigator,
    players
});
