import { createReducer, makeId } from 'utils';

const PLAYER_INFO_DATA = 'PLAYER_INFO_DATA';

const initialState = {
  playerData :null
};

export default createReducer(initialState, {
  [PLAYER_INFO_DATA]: (state, action) => {
      const r = {...state};
      r.playerData = action.playerData;
      return r;
  },
});
