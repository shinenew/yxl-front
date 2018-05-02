import { AcceptStatus, UserType } from 'src/entry/constant';

/**
 * 用户数据结构
 */
export default interface IUserInfo {
    
    /** 用户邀请状态 */
    acceptStatus: AcceptStatus;

    /** 公司ID */
    companyId: string;

    /** 凭据 */
    credential: null;

    /** 部门ID */
    departmentId: string;
    
    /** 部门名称 */
    departmentName: string;

    /** 描述 */
    description: string;

    /** 邮箱 */
    email: string;

    /** 用户ID(平台) */
    gUserId: string;

    /** 是否激活 */
    isActivated: boolean;

    /** 是否删除 */
    isDeleted: boolean;

    /** 最后登录IP */
    lastLoginIp: string;

    /** 最后登录(时间戳) */
    lastLoginTime: number;

    /** 昵称 */
    nickName: string;

    /** 电话 */
    phone: string;
    
    /** 用户ID（公司） */
    cUserId: string;
    
    /** 用户类型 */
    userType: UserType;
}