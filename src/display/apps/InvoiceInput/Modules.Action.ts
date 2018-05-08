import { ActionBasic } from 'kts-scaffold-framework/modules';
import ModulesState from './Modules.State';

class ModulesAction extends ActionBasic<ModulesState> {

    public onCancel = () => {
        this.modulesState.isVisible = !this.modulesState.isVisible;
        this.setModulesState(this.modulesState);
     }
}

export default new ModulesAction();