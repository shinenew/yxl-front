/** 
 * 出参数据数据接口
 */
export default interface IData {
    detailInfoList: {
        groupDetailId?: string;
        invoiceCode?: string;
        invoiceGroupId?: string;
        invoiceGroupNumber?: string;
        invoiceLoggingId?: number;
        invoiceNumber?: string;
        matchMessage?: string;
        matchState?: number;
        receivedState?: number;
        waitState?: number;
    }[];
    groupInfo: {
        createType?: number;
        groupId?: string;
        groupNumber?: string;
        invoiceCount: number;
        loggedCount?: number;
        matchMessage?: string;
        matchState?: number;
        waitCount?: number;
    };
}