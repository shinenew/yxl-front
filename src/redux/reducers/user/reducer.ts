import { createReducer } from 'redux-act';
import ActionTypes from './ActionTypes';

const reducer = createReducer(
    {
        [ActionTypes.fnSetUserInfo as any]: (state, payload) => {
            const userInfo = {
                ...state,
                ...payload
            };
            window.sessionStorage.setItem('$$/User/fnSetUserInfo', JSON.stringify(userInfo));
            return userInfo;
        },
    },
    JSON.parse(window.sessionStorage.getItem('$$/User/fnSetUserInfo')) || {}
);

export default reducer;