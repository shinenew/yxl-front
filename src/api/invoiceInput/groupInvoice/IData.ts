/** 
 * 出参数据数据接口
 */
import { IInvoiceData, IPageMeta} from 'src/dataModel';
export default interface IData {
    items: IItems[];
    pageMeta: IPageMeta;
}

interface IItems extends IInvoiceData {
    state?: string;
}