import ModulesStateBasic from 'kts-scaffold-framework/modules/ModulesStateBasic';

/** 用户管理模块状态  */
export default class ModulesStateUser extends ModulesStateBasic{
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
}

/** 用户详情接口 */
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