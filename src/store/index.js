/* src/store/index.js */

import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer  from 'reducers';
import thunk        from 'redux-thunk';
// @ifdef DEBUG
import DevTools     from 'components/LogMonitor';
// @endif

export default function configureStore (initialState) {
  const middleware = applyMiddleware(thunk);
  let createStoreWithMiddleware;
  // @ifdef DEBUG
  createStoreWithMiddleware = compose(middleware, DevTools.instrument());
  // @endif
  // @ifndef DEBUG
  createStoreWithMiddleware = compose(middleware);
  // @endif

  const store = createStoreWithMiddleware(createStore)(
    rootReducer, initialState
  );

  return store;
}
