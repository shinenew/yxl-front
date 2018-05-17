import ModulesStateBasic from 'kts-scaffold-framework/modules/ModulesStateBasic';

/** 模块状态 */
export default class ModulesState extends ModulesStateBasic {
    public id: Array<any> = [];
    public invoiceList: Array<any> = [];
    public groupId: string = '';
    public detailInfoList: Array<any> = [];
    public groupInfo: any = {};
}