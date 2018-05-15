import { ActionBasic } from 'kts-scaffold-framework/modules';
import ModulesState from './Modules.State';
import { MyStore, reducers } from 'src/redux';

class ModulesAction extends ActionBasic<ModulesState> {

    /** 显示计时器ID */
    private isShowComponentTime: NodeJS.Timer;

    /** 隐藏侧边栏 */
    public hide = (): void => {
        MyStore.instance.dispatch(reducers.aside.ActionTypes.hide, null);
    }

    /** 设置组件是显示还是隐藏 */
    public setIsShowComponent = (collapsed: boolean, isShowComponent: boolean) => {
        clearTimeout(this.isShowComponentTime);
        if (collapsed === false) {
            if (isShowComponent === false) {
                this.isShowComponentTime = setTimeout(() => {
                    this.modulesState.isShowComponent = true;
                    this.setModulesState(this.modulesState);
                }, 200);
            }
        } else {
            if (this.modulesState.isShowComponent) {
                this.modulesState.isShowComponent = false;
                this.setModulesState(this.modulesState);
            }
        }
    }
}

export default new ModulesAction();