import { createReducer } from 'redux-act';
import ActionTypes from './ActionTypes';
import Node from './Node';

const reducer = createReducer(
    {
        [ActionTypes.show as any]: (state: Node, newstate: any) => {
            return {
                ...state,
                ...newstate,
                collapsed: false
            };
        },

        [ActionTypes.hide as any]: (state: Node) => {
            return {
                ...state,
                collapsed: true,
            };
        },
    },
    new Node()
);

export default reducer;