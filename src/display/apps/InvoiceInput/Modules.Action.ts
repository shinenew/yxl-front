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
        rebornlist.items = rebornlist.items.map((item, index) => {
            let appendData={...item,id: item.loggingId,index};
            if (item.recordType===2) {
                uniqueArray.push(item.loggingId);
                appendData={
                    ...appendData,
                    id:item.loggingId,
                    pId: null
                };
            }else if(item.recordType===1){
                appendData={
                    ...appendData,
                    pId: item.invoiceGroupId
                };
            }
            return appendData;
        });
        //uniqueArray = Array.from(new Set(uniqueArray));
        if (uniqueArray.length === 0) {
            return rebornlist;
        }
        const groupRes = await invoiceInput.group(this, uniqueArray);
        if (!groupRes.er) {
            let reborngrouplist = [];
            reborngrouplist=rebornlist.items.map((item)=>{
                if(item.recordType===2){
                    for(let i=0;i<groupRes.res.length;i++){
                        if(item.loggingId===groupRes.res[i].groupId){
                            return {
                                ...item,
                                groupNumber:groupRes.res[i].groupNumber,
                                invoiceCount:groupRes.res[i].invoiceCount,
                                loggedCount:groupRes.res[i].loggedCount,
                                matchCount:groupRes.res[i].matchCount,
                                waitCount:groupRes.res[i].shouldCount,
                            };
                        }
                    }
                    return {...item};
                }else{
                    return {...item};
                }
            });
            rebornlist.items = reborngrouplist;
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