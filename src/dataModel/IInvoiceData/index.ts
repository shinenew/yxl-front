/** 
 * 发票数据结构
 */
export default interface IInvoiceData {
    //销售方
    supplierName?: string;
    //发票代码
    invoiceCode?: string;
    //发票号码
    invoiceNumber?: string;
    //发票日期
    invoiceDate?: number;
    //发票验证码
    invoiceParityCode?: string;
    //税价总计
    amount?: number;
    //不含税金额
    amountWithoutTax?: number;
    //税额
    tax?: number;
    //发票组id
    invoiceGroupId?: string;
}