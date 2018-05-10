import { ActionBasic } from 'kts-scaffold-framework/modules';
import ModulesState from './Modules.State';

class ModulesAction extends ActionBasic<ModulesState> {
    
    public onChing = () => {
        this.modulesState.a = '-----';
        this.setModulesState(this.modulesState);
    }
}

export default new ModulesAction();