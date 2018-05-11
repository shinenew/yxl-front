import { createAction } from 'redux-act';

const ActionTypes = {

    // 添加加载接口
    addLoading: createAction('$$/system/addLoading'),

    // 删除加载接口
    removeLoading: createAction('$$/system/addLoading'),

    // 更新未读信息
    updateUnread: createAction('$$/system/updateUnread'),
};

export default ActionTypes;