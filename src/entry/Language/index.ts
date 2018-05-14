import { UserType } from '../constant';


/** 用户类型中文 */
const userTypeToString: Map<UserType, string> = new Map<UserType, string>();
userTypeToString.set(UserType.公司管理员, '公司管理员');
userTypeToString.set(UserType.普通用户, '普通用户');
userTypeToString.set(UserType.超级管理员, '超级管理员');

export default {
    /** 用户类型中文 */
    userTypeToString
};