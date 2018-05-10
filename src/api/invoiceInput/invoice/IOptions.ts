/** 
 * 入参数据数据接口
 */
export default interface IOptions {

    pageNum?: number;

    pageSize?: number;
    // 销售方
    fuzzySupplierName?: string;

    invoiceCode?: string;
    invoiceNumber?: string;
    invoiceType?: string;
    // 开票时间
    minInvoiceDate?: string;
    maxInvoiceDate?: string;
    // 税价合计
    minAmount?: number;
    maxAmount?: number;
    // 状态
    state?: string;
    // 录入用户
    userId?: string;
}