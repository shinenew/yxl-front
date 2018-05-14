import { ActionBasic } from 'kts-scaffold-framework/modules';
import ModulesState from './Modules.State';

class ModulesAction extends ActionBasic<ModulesState> {
    onTabChange = e => {
        this.modulesState.tabkey = e;
        this.setModulesState(this.modulesState);
    }
}

export default new ModulesAction();