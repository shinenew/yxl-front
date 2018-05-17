import ModulesStateBasic from 'kts-scaffold-framework/modules/ModulesStateBasic';

/** 角色管理及公司资料模块状态 */
export default class ModulesStateRole extends ModulesStateBasic {
    // 被选中的列表
    selectedRows: any;

    /** 列表数据 */
    list: any;


    // 公司资料数据
    companyInfoList: any;


    // 下拉框得值
    selectValue: any;

    // 编辑弹框得状态
    visible: boolean = false;

    // 新增弹框状态
    addRoleVisible: boolean = false;

    // 获取页面key得值
    public key: any;

    // 下拉框权限的值
    selectData: any;
    selectDatas = [];

    // 列表权限的值
    Privilege: [{}];

    // 编辑权限列表的默认值
    redactPrivilege: [{}];

    // 修改角色时获取的值
    redactValue: any;

    // 编辑保存时封装角色的值
    roleList: any;

    /** 角色权限判断的值 */
    mode: string = 'edit';
}

