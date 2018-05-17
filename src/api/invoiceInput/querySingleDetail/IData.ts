/** 
 * 出参数据数据接口
 */
export default interface IData {
    invoiceDetail: IInvoiceDetails;
    realCheckTime: string;
}
interface IInvoiceDetails{
    acceptTaxName: string;
    acceptTaxNum: string;
    amount: number;
    amountTax: number;
    amountWithoutTax: number;
    blueInvoiceCode: string;
    blueInvoiceNo: string;
    buyerAddressPhone: string;
    buyerBankAndId: string;
    buyerIdNum: string;
    buyerName: string;
    buyerTaxId: string;
    cancellationMark: string;
    carrierTaxName: string;
    carrierTaxNum: string;
    certificate: string;
    certificateImport: string;
    checkCount: string;
    cid: string;
    currentTaxPeriod: string;
    drawer: string;
    engineNo: string;
    factoryModel: string;
    incomeInvoiceBizId: number;
    inspectionNum: string;
    invoiceCode: string;
    invoiceDate: number;
    invoiceId: string;
    invoiceNumber: string;
    invoiceParityCode: string;
    invoiceStatus: string;
    invoiceType: string;
    legalizeDate: string;
    legalizeEndDate: string;
    legalizeInvoiceDateBegin: string;
    legalizeInvoiceDateEnd: string;
    legalizeState: string;
    limitPeople: string;
    machineCode: string;
    payee: string;
    productPlace: string;
    receiveName: string;
    receiveTaxNum: string;
    remark: string;
    reviewer: string;
    saleItemList: Array<any>;
    salerBankAccount: string;
    salerPhone: string;
    shipperName: string;
    shipperTaxNum: string;
    supplierAddressPhone: string;
    supplierBankAndId: string;
    supplierName: string;
    supplierTaxId: string;
    taxBureauCode: string;
    taxBureauName: string;
    taxDiskNumber: string;
    taxRate: string;
    taxRecords: string;
    tonnage: string;
    trafficFeeFlag: string;
    transportInfo: string;
    vehicleNo: string;
    vehicleNum: string;
    vehicleTonnage: string;
    vehicleType: string;
    wayInfo: string;
    zeroTaxRateFlag: string;
}
export {
    IInvoiceDetails
};