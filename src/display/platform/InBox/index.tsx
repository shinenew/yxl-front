import * as React from 'react';
import { ModulesBasic, IPropsBasic, ModulesRoot } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
// import ModulesService from './Modules.Service';
import UIComponents from './UI.Components';

const css = require('./index.scss');

/** Redux接口 */
interface IReduxStatePart {
    
}

/** Props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {
    
}

/** 收件箱 */
@connect((state: ReduxState): IReduxStatePart => ({

}))
export default class InBox extends ModulesBasic<IProps, ModulesState> {

    public state: ModulesState = new ModulesState();

    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    render() {
        return (
            <ModulesRoot action={ModulesAction}>
                <div className={css.modules}>
                    <UIComponents />
                </div>
            </ModulesRoot>
        );
    }
}