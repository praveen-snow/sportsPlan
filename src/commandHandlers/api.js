
import { fetchAPI, getAPI, getrootUrl } from 'utils';

export const SET_USER_DETAILS = 'setuser';

export function signUp(store, req) {
    let meta = {};
    meta.req = req;
    meta.endpoint = SET_USER_DETAILS;
    fetchAPI(store,meta);
}