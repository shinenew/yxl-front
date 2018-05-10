import { createAction } from 'redux-act';

const ActionTypes = {

    /** 显示侧边栏 */
    show: createAction('$$/aside/show'),

    /** 侧边栏 */
    hide: createAction('$$/aside/hide'),
};

export default ActionTypes;