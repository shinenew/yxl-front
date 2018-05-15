import * as React from 'react';
import { ModulesBasic, IPropsBasic, ModulesRoot } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { IAside } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import { Icon, Layout } from 'antd';

const { Sider } = Layout;
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

    public readonly state: ModulesState = new ModulesState();

    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    componentDidUpdate() {
        ModulesAction.setIsShowComponent(this.props.aside.collapsed, this.state.isShowComponent);
    }

    render() {
        const { Components, collapsed, title } = this.props.aside;
        return (
            <ModulesRoot action={ModulesAction}>
                <Sider
                    style={{ background: 'none' }}
                    width={485}
                    collapsed={collapsed}
                    collapsedWidth={0}
                >
                    <div className={css.aside} >
                        <div className="kts-aside">
                            <header className="kts-aside-title">
                                <span>{title}</span>
                                <a onClick={ModulesAction.hide} className="kts-aside-close">
                                    <Icon type="close" />
                                </a>
                            </header>
                            <div className="kts-aside-container">
                                <div className="kts-aside-panel" >
                                    {
                                        !!Components
                                        && this.state.isShowComponent
                                        && this.props.aside.collapsed === false
                                        && Components
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Sider>
            </ModulesRoot>
        );
    }
}