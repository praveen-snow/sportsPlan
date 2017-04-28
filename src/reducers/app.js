import { createReducer, makeId } from 'utils';

const TRIGGER_LOAD = 'TRIGGER_LOAD';

const initialState = {
    appLoader: false
};

export default createReducer(initialState, {
  [TRIGGER_LOAD]: (state, action) => {
      const r = {...state};
      r.appLoader = action.load;
      return r;
  },
});
