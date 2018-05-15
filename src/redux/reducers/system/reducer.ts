import { createReducer } from 'redux-act';
import { Urls, MessageType } from 'src/entry/constant';
import ActionTypes from './ActionTypes';
import Node from './Node';

const reducer = createReducer(
    {
        [ActionTypes.addLoading as any]: (state: Node, url: Urls) => {
            const loadingUrls = state.loadingUrls;
            loadingUrls.set(url, url);
            return {
                ...state,
                loadingUrls: loadingUrls,
            };
        },

        [ActionTypes.removeLoading as any]: (state: Node, url: Urls) => {
            const loadingUrls = state.loadingUrls;
            loadingUrls.delete(url);
            return {
                ...state,
                loadingUrls: loadingUrls,
            };
        },

        [ActionTypes.updateUnread as any]: (state: Node, payload: Map<MessageType, number>) => {
            const unread = state.unread;
            payload.forEach((value: number, key: MessageType) => { 
                unread.set(key, value);
            });
            return {
                ...state,
                unread:unread
            };
        },
    },
    new Node()
);

export default reducer;