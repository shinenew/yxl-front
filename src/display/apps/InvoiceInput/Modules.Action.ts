import { ActionBasic } from 'kts-scaffold-framework/modules';
import ModulesState from './Modules.State';
import { invoiceInput } from 'src/api';
class ModulesAction extends ActionBasic<ModulesState> {
    getGroupData = async (fields:any) => {
        const invoiceRes = await invoiceInput.invoice(this, fields);
        let rebornlist = invoiceRes.res;

        if (invoiceRes.er) {
            return null;
        }
        let uniqueArray = [];
        rebornlist = rebornlist.map((item, index) => {
            if (item.invoiceGroupId) {
                uniqueArray.push(item.invoiceGroupId);
            }
            return {
                ...item,
                id: index,
                pId: item.invoiceGroupId
            };
        });
        uniqueArray = Array.from(new Set(uniqueArray));
        if (uniqueArray.length === 0) {
            return rebornlist;
        }
        const groupRes = await invoiceInput.group(this, uniqueArray);
        if (!groupRes.er) {
            let reborngrouplist = [];
            reborngrouplist = groupRes.res && groupRes.res.map((item, index) => {
                return {
                    ...item,
                    pId: null,
                    id: item.groupId,
                    group: true,
                };
            });
            rebornlist = rebornlist.concat(...reborngrouplist);
        }
        return rebornlist;
    }
    clearFields = () => {
        this.modulesState.fields = null;
        this.setModulesState(this.modulesState);
    }
    handleFormChange = (changedFields) => {
        this.modulesState.fields = { ...changedFields };
        this.setModulesState(this.modulesState);
    }
    onChange = (selectedRowKeys, selectedRows) => {
        this.modulesState.selectedRows = selectedRows;
        this.modulesState.selectedRowKeys = selectedRowKeys;
        this.setModulesState(this.modulesState);
    }
    refreshInvoice = () => {
        console.log(2);
    }
}

export default new ModulesAction();