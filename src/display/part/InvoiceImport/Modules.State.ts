import ModulesStateBasic from 'kts-scaffold-framework/modules/ModulesStateBasic';
/** 模块状态 */
export default class ModulesState extends ModulesStateBasic {
    loading: boolean;
    tabkey: string = '1';

    constructor() {
        super();
        console.log(1);        
    }
}