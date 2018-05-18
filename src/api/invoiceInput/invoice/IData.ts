/** 
 * 出参数据数据接口
 */
import { IInvoiceData} from 'src/dataModel';
export default interface IData extends IInvoiceData{
    unusualState?: number;//异常状态,1:正常，2：异常
    pId?:string;
    group?:boolean;
    
    loggingId?:string;
    recordType:number;//1 发票,2发票组

    id?:any;
}