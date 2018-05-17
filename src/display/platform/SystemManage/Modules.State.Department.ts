import ModulesStateBasic from 'kts-scaffold-framework/modules/ModulesStateBasic';

/** 部门管理模块状态 */
export default class ModulesStateDepartment extends ModulesStateBasic {
    /** 当前被选择的Tab */
     activatedTab: any;
    /** 表格被选择行 */
     selectedDepRows: string[] = [];
    /** 用户列表 */
     userlist: any;
    /** 用户ID数组 */
     userIds: string[] = [];
    /** 树数据 */
     treeData: any;
    /** 是否弹出新增窗口 */
     isDepModal: boolean = false;
    /** 是否弹出修改窗口 */
     isUpdDepModal: boolean = false;
    /** 是否修改上级部门 */
     editParent: boolean = false;
    /** 下拉树选中的值 */
     selectTreeVal: string;
    /** 所有部门数据 */
     departmentList: any;
    /** 单个部门数据 */
     department: any;
    /** 单个部门Id */
     departmentId: any;
    /** 表格选中的key */
     selectedDepRowKeys: any;
    /** 选中的树节点 */
     selectTreeCode: string = '';
    /** 是否禁用按钮 */
     isDisabled: boolean = true;
    /** 是否弹出设置窗口 */
     isSetDepModal: boolean = false;
    /** 是否加载中 */
     isDepLoadding: boolean = false;
}

