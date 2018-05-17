import ModulesStateBasic from 'kts-scaffold-framework/modules/ModulesStateBasic';
import { MyStore } from 'src/redux';
import ModulesStateDepartment from './Modules.State.Department';
import ModulesStateUser from './Modules.State.User';

/** 模块状态 */
export default class ModulesState extends ModulesStateBasic {
    /************************** 部门管理start ************************************/
    public depModulesState = new ModulesStateDepartment();
    /************************** 部门管理end ************************************/

    /** 用户管理 */
    public userModulesState = new ModulesStateUser();
    
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

interface IParamCondition {
    id?: string;
    name?: string;
}