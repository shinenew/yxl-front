import { ActionBasic } from 'kts-scaffold-framework/modules';
import ModulesState from './Modules.State';
import { MyStore, reducers } from 'src/redux';

class ModulesAction extends ActionBasic<ModulesState> {

    /** 隐藏侧边栏 */
    public hide = (): void => {
        MyStore.instance.dispatch(reducers.aside.ActionTypes.hide, null);
    }
}

export default new ModulesAction();