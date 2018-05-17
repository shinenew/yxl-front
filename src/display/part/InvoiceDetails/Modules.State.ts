import ModulesStateBasic from 'kts-scaffold-framework/modules/ModulesStateBasic';
import { IInvoiceDetails } from 'src/api/invoiceInput/querySingleDetail/IData';

/** 模块状态 */
export default class ModulesState extends ModulesStateBasic {
    invoiceDetails: IInvoiceDetails;
    lastRealCheckTime: number;
}