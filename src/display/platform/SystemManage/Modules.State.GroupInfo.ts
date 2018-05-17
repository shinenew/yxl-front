import ModulesStateBasic from 'kts-scaffold-framework/modules/ModulesStateBasic';

/** 集团资料模块状态 */
export default class ModulesStateDepartment extends ModulesStateBasic {
    /** 集团名字 */
    name: string;
    /** 集团描述 */
    description: string;
    /** 集团页面是否编辑 */
    disable: boolean = false;
    /** 集团ID */
    orgId: string;
    /** 创建时间 */
    createTime: string;
    /** 更新时间 */
    updateTime: string;
}

