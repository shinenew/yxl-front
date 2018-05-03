import { ICompany, IAppInfo, IUserInfo } from 'src/dataModel';

/**
 * 用户数据节点
 */
export default class Node {

    /** 用户数据 */
    public userInfo: IUserInfo;

    /** 公司列表 */
    public companyList: ICompany[];

    /** 当前公司 */
    public currentCompany: number;

    /** 已经安装的appList */
    public appList: IAppInfo[];

    /** 用户的全局token */
    public gToken: string;

    /** 用户的公司token */
    public cToken: string;

    /** 公司接口头 */
    public zoneUrl: string;
}