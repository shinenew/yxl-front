/** 
 * 出参数据数据接口
 */
export default interface IData {
    res: {
        companyId: any,
        description: string,
        id: number,
        level: number,
        name: string,
        rules: string,
    }[];
}