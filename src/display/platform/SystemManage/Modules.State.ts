import ModulesStateBasic from 'kts-scaffold-framework/modules/ModulesStateBasic';
import { MyStore } from 'src/redux';
import ModulesStateDepartment from './Modules.State.Department';
import ModulesStateUser from './Modules.State.User';
import ModulesStateRole from './Modules.State.Role';
import ModulesStateGroupInfo from './Modules.State.GroupInfo';

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

    /************************** 关联公司及集团管理start ************************************/
    user = MyStore.instance.getState().user.userInfo;
    url = MyStore.instance.getState().user.zoneUrl;

    company: ICompany = {
        list: [],
        companyExpand: false,
        activatedTab: '',
        geturl: '//' + this.url + '/zone/company/connection/export?'
    };

    /** 公司列表选择  */
    companyState = {
        selectedRowKeys: [], // Check here to configure the default column
        selectedRows: [],   // 勾选内容
    };

    /** 集团页面 相关变量 */
    // groupInfo = {
    //     name: '',  // 集团名字
    //     description: '',  // 集团描述
    //     disable: false,   // 集团页面是否编辑
    //     orgId: '',   //集团ID
    //     createTime: '',     // 创建时间
    //     updateTime: '',    // 更新时间
    // };

    /******************************** 角色 start ******************************************* */
    // 被选中的列表
    public selectedRows: any;
    /************************** 关联公司及集团管理end ************************************/

   
    /******************************** 角色管理及公司资料 start ******************************************* */

    public ModulesStateRole = new ModulesStateRole;

    /******************************** 角色管理及公司资料 end ******************************************* */
}

// 集团页面 相关变量  接口
interface ICompany {
    list?: any;
    companyExpand?: boolean;
    activatedTab?: any;
    geturl?: any;
}

