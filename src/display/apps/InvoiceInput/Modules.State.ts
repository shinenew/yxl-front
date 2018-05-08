import ModulesStateBasic from 'kts-scaffold-framework/modules/ModulesStateBasic';

/** 模块状态 */
export default class ModulesState extends ModulesStateBasic {

    public list: null;
    public expand: false;
    public fields: null;
    public selectedRows: null;
    public selectedRowKeys: Array<string>;
}