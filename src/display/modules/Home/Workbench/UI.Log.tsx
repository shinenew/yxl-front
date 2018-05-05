import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import { Icon } from 'antd';

const css = require('./index.scss');
const logText = require('./IMG.LogText.png');

/** Redux接口 */
interface IReduxStatePart {
}

/** Props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {
}

/** iframe */
@ModulesAction.uiconnect
@connect((state: ReduxState): IReduxStatePart => ({
}))
export default class UIIframe extends UIBasic<IProps, ModulesState> {

    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    render() {
        return (
            <div className={css.log} >
                {
                    this.modulesState.collapsed
                    ? null
                    : <img className={css.logText} src={logText} />
                }
                {
                    this.modulesState.collapsed
                    ? <Icon className={css.iconCollapsed} onClick={ModulesAction.switchingCollapsed} type="shouqi" />
                    : <Icon className={css.icon} onClick={ModulesAction.switchingCollapsed} type="shouqi" />
                }
            </div>
        );
    }
}