
import { fetchAPI, getAPI, getrootUrl } from 'utils';

export const SET_USER_DETAILS = 'user/signup';

export const USER_SIGN_IN = 'user/signin';

export function signUp(store, req) {
    let meta = {};
    meta.req = req;
    meta.endpoint = SET_USER_DETAILS;
    store.dispatch({type:'TRIGGER_LOAD',payload:{
            load:true
        }
    });
    return fetchAPI(store,meta);
}

export function signIn(store, req) {
    let meta = {};
    meta.req = req;
    meta.endpoint = USER_SIGN_IN;
    store.dispatch({type:'TRIGGER_LOAD',payload:{
        load:true
    }
    });
    return fetchAPI(store,meta);
}