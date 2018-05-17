import ModulesStateBasic from 'kts-scaffold-framework/modules/ModulesStateBasic';
import { MyStore } from 'src/redux';

/** 关联公司模块状态 */
export default class ModulesStateConnectComapny extends ModulesStateBasic {
    /** 用户信息 */
    user = MyStore.instance.getState().user.userInfo;

    /** url */
    url = MyStore.instance.getState().user.zoneUrl;
    /** 公司列表 */
    list: any;

    /** 是否显示筛选项 */
    companyExpand:boolean = false;

    /**  */
    activatedTab: string = '';
 
    /** 导出 */
    geturl:string = '//' + this.url + '/zone/company/connection/export?';

    /** 公司列表选择  */
    companyState = {
        /** Check here to configure the default column */
        selectedRowKeys: [],
         /** 勾选内容  */
        selectedRows: [],
    };
}
