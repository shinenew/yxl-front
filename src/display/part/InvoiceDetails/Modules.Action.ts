import { ActionBasic } from 'kts-scaffold-framework/modules';
import ModulesState from './Modules.State';
import { invoiceInput } from 'src/api';

class ModulesAction extends ActionBasic<ModulesState> {
    /**
     * 获取发票详情
     * @param {string} incomeInvoiceBizId -发票id
     */
    public getInvoiceDetails = async (incomeInvoiceBizId: string) => {
        const res: any = await invoiceInput.querySingleDetail(this, {incomeInvoiceBizId: incomeInvoiceBizId});
        console.log(res);
    }
}

export default new ModulesAction();