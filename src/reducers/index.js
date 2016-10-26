import { combineReducers } from 'redux';
//

import app                 from './app';
import currentProduct      from './currentProduct';
import header              from './header';
import navigator           from './navigator';


export default combineReducers({
    app,
    currentProduct,
    header,
    navigator
});
