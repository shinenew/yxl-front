import { ActionBasic } from 'kts-scaffold-framework/modules';
import ModulesState from './Modules.State';

class ModulesAction extends ActionBasic<ModulesState> {

    /** 切换收折状态 */
    public switchingCollapsed = () => {
        this.modulesState.collapsed = !this.modulesState.collapsed;
        this.setModulesState(this.modulesState);
    }
}

export default new ModulesAction();