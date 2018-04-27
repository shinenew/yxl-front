import { createReducer } from 'redux-act';

const reducer = createReducer(
    {},
    window['ktsConfig']
);

export default reducer;