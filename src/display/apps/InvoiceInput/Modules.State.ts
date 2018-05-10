import ModulesStateBasic from 'kts-scaffold-framework/modules/ModulesStateBasic';

/** 模块状态 */
export default class ModulesState extends ModulesStateBasic {

    public list: any;
    public pageMeta:any;
    public expand: false;
    public fields: any = {};
    public selectedRows: Array<any>;
    public selectedRowKeys: Array<string>;

}