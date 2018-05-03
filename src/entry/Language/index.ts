import { UserType } from '../constant';

class LanguageData {
    /** 用户类型名称 */
    public static userType: any = {};

    /**
     * 获取用户文本
     * @param userType 用户类型
     */
    public userTypeToString(userType: UserType): string {
        return LanguageData.userType[userType];
    }
}

LanguageData.userType[UserType.公司管理员] = '公司管理员';
LanguageData.userType[UserType.普通用户] = '普通用户';
LanguageData.userType[UserType.超级管理员] = '超级管理员';

export default new LanguageData();

export {
    LanguageData
};