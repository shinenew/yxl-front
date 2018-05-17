import ModulesStateBasic from 'kts-scaffold-framework/modules/ModulesStateBasic';
import { MyStore } from 'src/redux';
import ModulesStateDepartment from './Modules.State.Department';
import ModulesStateRole from './Modules.State.Role';

/** 模块状态 */
export default class ModulesState extends ModulesStateBasic {
    /************************** 部门管理start ************************************/
    public depModulesState = new ModulesStateDepartment();
    /************************** 部门管理end ************************************/

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
    groupInfo = {
        name: '',  // 集团名字
        description: '',  // 集团描述
        disable: false,   // 集团页面是否编辑
        orgId: '',   //集团ID
        createTime: '',     // 创建时间
        updateTime: '',    // 更新时间
    };

    /************************** 关联公司及集团管理end ************************************/

    /***********************************用户管理相关state 开始************************************/

    /** 当前页 */
    currentPage: number;
    /** 每页显示条数 */
    pageSize: number;
    /** 总条数 */
    total: number;
    /** 列表数组 */
    data: any;
    /** 详情 */
    detail: Detail;
    /** 筛选状态 */
    searchState: boolean = false;
    /** 筛选Icon样式 */
    iconStyle: boolean = false;
    /** 详情弹框状态 */
    detailVisible: boolean = false;
    /** 新增弹框状态 */
    addVisible: boolean = false;
    /** 编辑弹框状态 */
    editVisible: boolean = false;
    /** 角色弹框状态 */
    roleVisible: boolean = false;
    /** 用户所在公司角色数组 */
    userCompanyRole: any;
    /** 用户所在公司当前权限 */
    userCurrentRole: any;
    /** departmentIds */
    departmentIds: any;
    /** 用户列表数据加载状态 */
    userDataLoding: boolean = true;

    /***********************************用户管理相关state 结束************************************/

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

/**
 * 用户详情interface
 */
interface Detail {
    acceptStatus?: string;
    companyId?: string;
    credential?: string;
    departmentId?: string;
    departmentName?: string;
    description?: string;
    email?: string;
    gUserId?: string;
    isActivated?: boolean;
    isDeleted?: boolean;
    lastLoginIp?: string;
    lastLoginTime?: number;
    nickName?: string;
    phone?: string;
    userId?: string;
    userType?: string;
}

