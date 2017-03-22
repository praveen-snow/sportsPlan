import { createReducer } from 'utils';

const SET_NOTIFIER_DATA = 'SET_NOTIFIER_DATA';

const initialState = {
    messageData :{}
};

export default createReducer(initialState, {
    [SET_NOTIFIER_DATA]: (state, action) => {
        const r = {...state};
        let messageData = action.messageData;
        Object.assign(r.messageData,messageData);
        return r;
    },
});
