import { ActionBasic } from 'kts-scaffold-framework/modules';
import ModulesState from './Modules.State';
import { invoiceInput } from 'src/api';
 
class ModulesAction extends ActionBasic<ModulesState> {

    public invoiceDate = async (groupId: string, pageNum?: number, pageSize?: number) => {
        const res = await invoiceInput.groupInvoice(this, {groupId, pageNum, pageSize});
        this.modulesState.invoiceList = res.res.items;
        this.setModulesState(this.modulesState);
    }

    public updateGroupId = (id: string): void => {
        this.modulesState.groupId = id;
        this.setModulesState(this.modulesState);
    }

    public groupInfo = async (groupId: string) => {
        const res = await invoiceInput.groupInfo(this, { groupId });
        this.modulesState.detailInfoList = res.res.detailInfoList;
        this.modulesState.groupInfo = res.res.groupInfo;
        this.setModulesState(this.modulesState);
    }

    public groupSaveDetail = async (groupId: string) => {
        const groupInfo = {
            groupId
        };
        const detailInfoList = this.modulesState.detailInfoList;
        const res = await invoiceInput.groupSaveDetail(this, {
            groupInfo,
            detailInfoList
        });
        console.log(res);
    }

    public deleteDetailInfoList = (invoiceCode: string) => {
        let detailInfoList = this.modulesState.detailInfoList;
        const notInvoice = val => val.invoiceCode !== invoiceCode;
        let filtered = detailInfoList.filter(notInvoice);
        this.modulesState.detailInfoList = filtered;
        this.setModulesState(this.modulesState);
    }
}

export default new ModulesAction();