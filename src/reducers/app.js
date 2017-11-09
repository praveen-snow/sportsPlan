import { createReducer, makeId } from 'utils';

const TRIGGER_LOAD = 'TRIGGER_LOAD';
const FAILURE_RESPONSE = 'FAILURE_RESPONSE';

const initialState = {
    appLoader: false,
    rsp:{}
};

export default createReducer(initialState, {
  [TRIGGER_LOAD]: (state, action) => {
      const r = {...state};
      r.appLoader = action.load;
      return r;
  },
  [FAILURE_RESPONSE]: (state, action) => {
      const r = {...state};
      r.rsp = action.rsp;
      return r;
  }
});
