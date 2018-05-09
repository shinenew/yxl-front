import { ActionBasic } from 'kts-scaffold-framework/modules';
import ModulesState from './Modules.State';
import { MyStore, reducers } from 'src/redux';

class ModulesAction extends ActionBasic<ModulesState> {

    /** 显示 */
    public show = (Components) => {
        MyStore.instance.dispatch(reducers.aside.ActionTypes.show, {
            Components:Components
        });
    }
}

export default new ModulesAction();