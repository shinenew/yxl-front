import ModulesStateBasic from 'kts-scaffold-framework/modules/ModulesStateBasic';
import { MyStore } from 'src/redux';

/** 模块状态 */
export default class ModulesState extends ModulesStateBasic {
    /************************** 部门管理start ************************************/
    /** 当前被选择的Tab */
    public activatedTab: any;
    /** 表格被选择行 */
    public selectedDepRows: string[] = [];
    /** 用户列表 */
    public userlist: any;
    /** 用户ID数组 */
    public userIds: string[] = [];
    /** 树数据 */
    public treeData: any;
    /** 是否弹出新增窗口 */
    public isDepModal: boolean = false;
    /** 是否弹出修改窗口 */
    public isUpdDepModal: boolean = false;
    /** 是否修改上级部门 */
    public editParent: boolean = false;
    /** 下拉树选中的值 */
    public selectTreeVal: string;
    /** 所有部门数据 */
    public departmentList: any;
    /** 单个部门数据 */
    public department: any;
    /** 单个部门Id */
    public departmentId: any;
    /** 表格选中的key */
    public selectedDepRowKeys: any;
    /** 选中的树节点 */
    public selectTreeCode: string = '';
    /** 是否禁用按钮 */
    public isDisabled: boolean = true;
    /** 是否弹出设置窗口 */
    public isSetDepModal: boolean = false;
    /** 是否加载中 */
    public isDepLoadding: boolean = false;
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

    /******************************** 角色 start ******************************************* */
    // 被选中的列表
    public selectedRows: any;

    /** 列表数据 */
    public list: any;


    // 公司资料数据
    public companyInfoList: any;


    // 下拉框得值
    public selectValue: any;

    // 编辑弹框得状态
    public visible: boolean = false;

    // 新增弹框状态
    public addRoleVisible: boolean = false;
    public paramCondition: IParamCondition = {};

    // 获取页面key得值
    public key: any;

    // 下拉框权限的值
    public selectData: any;
    public selectDatas = [];

    // 列表权限的值
    public Privilege: [{}];

    // 编辑权限列表的值
    public redactPrivilege: [{}];

    // 修改角色时获取的值
    public redactValue: any;

    // 编辑保存时封装角色的值
    public roleList: any;

    /** 角色权限判断的值 */
    mode: any = 'edit';
    /******************************** 角色 end ******************************************* */
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

interface IParamCondition {
    id?: string;
    name?: string;
}