import * as React from 'react';
import { ModulesBasic, IPropsBasic, ModulesRoot } from 'kts-scaffold-framework/modules';
import { connect, reducers } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
//import UIComponents from './UI.Components';
import ModulesRoute, { Switch } from './Modules.Route';

// import UIComponents from './UI.Components';
import UIForm from './TableList';
import MyStore from 'src/redux/MyStore';
const css = require('./index.scss');

/** Redux接口 */
interface IReduxStatePart {

}

/** Props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {

}

/** 发票录入 */
@connect((state: ReduxState): IReduxStatePart => ({

}))
export default class InvoiceInput extends ModulesBasic<IProps, ModulesState> {

    public state: ModulesState = new ModulesState();
    constructor(props: IProps) {
        super(props, ModulesAction);
    }
    componentWillUnmount(){
        MyStore.instance.dispatch(reducers.aside.ActionTypes.hide,null);
    }
    render() {
        return (
            <ModulesRoot action={ModulesAction}>
                <div className={css.modules}>
                    <Switch>{ModulesRoute.getChildReact()}</Switch>
                    <UIForm/>
                </div>
            </ModulesRoot>
        );
    }
}