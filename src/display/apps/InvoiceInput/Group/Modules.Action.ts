import { ActionBasic } from 'kts-scaffold-framework/modules';
import ModulesState from './Modules.State';

class ModulesAction extends ActionBasic<ModulesState> {
    public deleteInvoice = (id: string): void => {
        this.modulesState.id.push(id);
        this.setModulesState(this.modulesState);
        console.log(this.modulesState.id);
      }
}

export default new ModulesAction();