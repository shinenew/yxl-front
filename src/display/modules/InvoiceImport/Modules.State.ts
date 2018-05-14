import ModulesStateBasic from 'kts-scaffold-framework/modules/ModulesStateBasic';
import IOption from './IOption';
/** 模块状态 */
export default class ModulesState extends ModulesStateBasic {
    loading: boolean;
    tabkey: string;
    urlData: IOption;
}