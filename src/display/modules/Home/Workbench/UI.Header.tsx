import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import { IAppInfo } from 'src/dataModel';

/** Redux接口 */
interface IReduxStatePart {
    appList?: IAppInfo[];
}

/** Props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {

}

/** 选中公司面板 */
@connect((state: ReduxState): IReduxStatePart => ({
    appList: state.user.appList
}))
export default class UIHeader extends UIBasic<IProps, ModulesState> {

    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    render() {
        return (
            <p>{}</p>
        );
    }
}