import findCompanyList from './company';
import companyDisable from './companyDisable';
import getGroupInfo from './getGroupInfo';
import updateGroupInfo from './updateGroupInfo';
import companyEnable from './companyEnable';
import userList from './user/userList';
import userAdd from './user/userAdd';
import userDetail from './user/userDetail';
import userDisOrEna from './user/userDisOrEna';
import userEdit from './user/userEdit';
import userSend from './user/userSend';
import userCompanyRole from './user/userCompanyRole';
import userCurrentRole from './user/userCurrentRole';
import userRoleUpdate from './user/userRoleUpdate';

export default {
    /** 获取集团公司列表 */
    findCompanyList,
    /** 集团公司禁用 */
    companyDisable,
    /** 获取集团资料 */
    getGroupInfo,
    /** 修改集团资料 */
    updateGroupInfo,
    /** 集团公司启用 */
    companyEnable,
    /** 用户列表 */
    userList,
    /** 用户详情 */
    userDetail,
    /** 添加用户 */
    userAdd,
    /** 用户禁用或启用 */
    userDisOrEna,
    /** 用户编辑 */
    userEdit,
    /** 重新发送 */
    userSend,
    /** 用户所在公司角色 */
    userCompanyRole,
    /** 用户所在公司当前权限 */
    userCurrentRole,
    /** 更新用户角色 */
    userRoleUpdate,
};