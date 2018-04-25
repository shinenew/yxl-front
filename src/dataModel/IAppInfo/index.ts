import { AppState } from 'src/entry/constant';

/**
 * APP据结构
 */
export default interface IAppInfo {

    /** app url */
    appIndexUri: string;

    /** 应用类别名称 */
    appCategoryName: string;

    /** 应用说明 */
    appDescription: string;

    /** 应用图标 */
    appIcon: string;

    /** APP Id */
    appId: number;

    /** 应用名称 */
    appName: string;

    /** 公司ID */
    companyId: string;

    /** 创建时间(时间戳) */
    createTime: number;

    /** 安装时间(时间戳) */
    installTime: number;

    /** 安装程序ID */
    installerId: string;

    /** 实例ID */
    instanceId: number;

    /** app状态 */
    state: AppState;

    /** 更新时间(时间戳) */
    updateTime: number;
}