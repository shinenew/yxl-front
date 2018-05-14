// import { SrvRecord } from "dns";

/** 
 * 入参数据数据接口
 */
export default interface IOptions {
    companyId: string;
    createTime: number;
    departmentId: string;
    description: string;
    isDeleted: boolean;
    name: string;
    number: string;
    parentDepartmentId: string;
    updateTime: number;
}