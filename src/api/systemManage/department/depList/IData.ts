/** 
 * 出参数据数据接口
 */
export default interface IData {
    data: {
        createTime: number,
        departmentId: string,
        description: string,
        isDeleted: boolean,
        name: string,
        number: string,
        parentDepartmentId: string,
        updateTime: number
    }[];
}
