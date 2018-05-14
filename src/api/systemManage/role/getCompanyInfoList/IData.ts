/** 
 * 出参数据数据接口
 */
export default interface IData {
    data: {
        address: string,
        bankId: string,
        companyId: string,
        createTime: number,
        email: string,
        isActivated: boolean,
        isDeleted: boolean,
        legalEntity: string,
        name: string,
        openingBank: string,
        orgId: string,
        ownerId: string,
        pcompanyId: any,
        phone: string,
        taxId: string,
        updateTime: number,
    }[];
}