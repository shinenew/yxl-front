/** 
 * 出参数据数据接口
 */
export default interface IData {
    info: {
        incomeInvoiceBizId: string;
        loggingBizId: string;
        realCheckBizId: string;
        realCheckMsg: string;
        realCheckState: string;
        realCheckTime: number;
    };
}