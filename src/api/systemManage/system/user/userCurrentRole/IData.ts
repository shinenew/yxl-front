/** 
 * 出参数据数据接口
 */
export default interface IData {
    items: [{
        companyId?: string,
        createTime?: number,
        description?: string,
        isPublic?: number,
        name?: string,
        pRoleId?: string,
        roleId?: string,
        ruleGroups?: string,
        rules?: string
    }];
}