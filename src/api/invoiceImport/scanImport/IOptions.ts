/** 
 * 入参数据数据接口
 */
export default interface IOptions {

    invoiceCode:string;
    invoiceNumber:string;
    invoiceDate:string;
    amountWithoutTax?:string;
    invoiceParityCode?:string;
    url:string;
}