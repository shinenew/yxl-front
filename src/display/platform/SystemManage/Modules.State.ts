import ModulesStateBasic from 'kts-scaffold-framework/modules/ModulesStateBasic';
import ModulesStateDepartment from './Modules.State.Department';
import ModulesStateUser from './Modules.State.User';
import ModulesStateRole from './Modules.State.Role';
import ModulesStateGroupInfo from './Modules.State.GroupInfo';
import ModulesStateConnectComapny from './Modules.State.ConnectComapny';

/** 模块状态 */
export default class ModulesState extends ModulesStateBasic {
    /************************** 部门管理start ************************************/
    public depModulesState = new ModulesStateDepartment();
    /************************** 部门管理end ************************************/

    /***********************************用户管理相关state 开始*******************/
    public userModulesState = new ModulesStateUser();
    /***********************************用户管理相关end 结束*******************/

    /************************** 集团资料start ************************************/
    public groupInfoModulesState = new ModulesStateGroupInfo();
    /************************** 集团资料end ************************************/

    /************************** 关联公司start ************************************/
    public connectComapnyModulesState = new ModulesStateConnectComapny();
    /************************** 关联公司end ************************************/

    /******************************** 角色管理及公司资料 start ******************************************* */
    public ModulesStateRole = new ModulesStateRole;
    /******************************** 角色管理及公司资料 end ******************************************* */
}

