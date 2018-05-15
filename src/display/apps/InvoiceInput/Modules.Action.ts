import { ActionBasic } from 'kts-scaffold-framework/modules';
import ModulesState from './Modules.State';
import { invoiceInput } from 'src/api';
class ModulesAction extends ActionBasic<ModulesState> {
    getGroupData = async () => {
        const invoiceRes = await invoiceInput.invoice(this, { pageNum: 1, pageSize: 10 });
        let rebornlist = invoiceRes.res;
        
        if (invoiceRes.er) {
            return null;
        }
        let uniqueArray = [];
        rebornlist.items = rebornlist.items.map((item, index) => {
            uniqueArray.push(item.groupId);
            return {
                ...item,
                id: item.invoiceCode,
                pId: item.groupId
            };
        });
        uniqueArray = Array.from(new Set(uniqueArray));
        if (uniqueArray.length === 0) {
            return rebornlist;
        }

        const groupRes = await invoiceInput.group(this, { groupIds: uniqueArray });
        if (!groupRes.er) {
            let reborngrouplist = groupRes.res.list.map((item, index) => {
                return {
                    ...item,
                    pId: null,
                    id: item.groupId,
                    group:true
                };
            });
            rebornlist.items = rebornlist.items.concat(...reborngrouplist);
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