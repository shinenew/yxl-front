import { ActionBasic } from 'kts-scaffold-framework/modules';
import ModulesState from './Modules.State';
import { MyStore } from 'src/redux';
import { IAppInfo } from 'src/dataModel';

class ModulesAction extends ActionBasic<ModulesState> {

    /** 切换收折状态 */
    public switchingCollapsed = () => {
        this.modulesState.collapsed = !this.modulesState.collapsed;
        this.setModulesState(this.modulesState);
    }

    /**
     * 获取菜单选中的状态
     * @param pathname 当前地址栏状态
     */
    public getMenuSelectedKeys(pathname: string): string {
        const { user } = MyStore.instance.getState();
        
        // 内部APP跟地址
        const selectedKeysList: string[] = [
            '/workbench/invoiceInput'
        ];

        // 三方APP跟地址
        user.appList.forEach((value: IAppInfo) => {
            selectedKeysList.push(`/workbench/app/${value.appId}`);
        });

        for (var i = 0; i < selectedKeysList.length; i++) {
            if (pathname.indexOf(selectedKeysList[i]) === 0) {
                return selectedKeysList[i];
            }
        }

        return pathname;
    }
}

export default new ModulesAction();