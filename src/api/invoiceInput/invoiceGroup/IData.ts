/** 
 * 出参数据数据接口
 */
export default interface IData {
    list: { 
        groupId?: string ,
        matchCount:number,
        invoiceCount:number,
        groupName:string
    }[];
}
