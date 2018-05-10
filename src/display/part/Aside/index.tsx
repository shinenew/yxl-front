import * as React from 'react';
import { ModulesBasic, IPropsBasic, ModulesRoot } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { IAside } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import ModulesEvent from './Modules.Event';
import { Icon } from 'antd';

const css = require('./index.scss');

/** Redux接口 */
interface IReduxStatePart {
    aside?: IAside;
}

/** Props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {

}

/** 侧边栏 */
@connect((state: ReduxState): IReduxStatePart => ({
    aside: state.aside,
}))
export default class Aside extends ModulesBasic<IProps, ModulesState> {

    public static readonly Event = ModulesEvent;

    public readonly state: ModulesState = new ModulesState();

    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    render() {
        const { Components } = this.props.aside;
        return (
            <ModulesRoot action={ModulesAction}>
                <div className={css.aside} >
                    <div className="kts-aside">
                        <header className="kts-aside-title">
                            <span>{this.props.aside.title}</span>
                            <a onClick={ModulesAction.hide} className="kts-aside-close">
                                <Icon type="close" />
                            </a>
                        </header>
                        <div className="kts-aside-container">
                            <div className="kts-aside-panel" >
                                {
                                    Components
                                    && this.props.aside.collapsed === false
                                    && Components
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </ModulesRoot>
        );
    }
}