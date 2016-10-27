import { createReducer, makeId } from 'utils';

const GAME_DATA = 'GAME_DATA';

const initialState = {
  gameData :null
};

export default createReducer(initialState, {
  [GAME_DATA]: (state, action) => {
      const r = {...state};
      r.gameData = action.gameData;
      console.log(r);
      return r;
  },
});
