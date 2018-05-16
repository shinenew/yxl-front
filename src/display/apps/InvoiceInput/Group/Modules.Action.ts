import { ActionBasic } from 'kts-scaffold-framework/modules';
import ModulesState from './Modules.State';
import { invoiceInput } from 'src/api';
 
class ModulesAction extends ActionBasic<ModulesState> {
    public deleteInvoice = (id: string): void => {
        this.modulesState.id.push(id);
        this.setModulesState(this.modulesState);
    }

    public invoiceDate = async (groupId: string, pageNum?: number, pageSize?: number) => {
        const res = await invoiceInput.groupInvoice(this, {groupId, pageNum, pageSize});
        this.modulesState.invoiceList = res.res.items;
        this.setModulesState(this.modulesState);
    }

    public updateGroupId = (id: string): void => {
        this.modulesState.groupId = id;
        this.setModulesState(this.modulesState);
    }
}

export default new ModulesAction();