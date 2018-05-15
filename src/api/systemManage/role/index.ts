import getRoleList from './getRoleList';
import getRolePrivilege from './getRolePrivilegeList';
import getCompanyInfoList from './getCompanyInfoList';
import saveRole from './saveRole';
import deleteRole from './deleteRole';
import updataRole from './updateRole';
export default {

    /** 查询信息 */
    getRoleList,
    /** 查询角色的所有权限 */
    getRolePrivilege,
    /** 查询公司信息 */
    getCompanyInfoList,
    /** 新增角色  */
    saveRole,
    /** 删除角色 */
    deleteRole,
    /** 跟新角色 */
    updataRole,
};