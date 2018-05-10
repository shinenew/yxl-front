import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { Link } from 'react-router-dom';
import { connect } from 'src/redux';
import { Menu, Icon } from 'antd';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';

const css = require('./index.scss');

/** Redux接口 */
interface IReduxStatePart {
}

/** Props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {
}

/** 基础功能 */
@ModulesAction.uiconnect
@connect((state: ReduxState): IReduxStatePart => ({
}))
export default class UIFeatures extends UIBasic<IProps, ModulesState> {

    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    render() {
        const { location } = this.props;
        return (
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[ModulesAction.getMenuSelectedKeys(location.pathname)]}
                defaultOpenKeys={this.modulesState.collapsed ? [] : ['sub1']}
                inlineCollapsed={this.modulesState.collapsed}
                inlineIndent={15}
                className={css.features}
            >
                <Menu.SubMenu
                    key="sub1"
                    className={css.menuSubMenu}
                    title={
                        <span>
                            <Icon type="xiaoxi1" />
                            <span>收件箱</span>
                        </span>
                    }
                >
                    <Menu.Item key="/workbench/platform/inBox/file">
                        <Link to="/workbench/platform/inBox/file">
                            <span className={css.p15}>文件</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/workbench/platform/inBox/message">
                        <Link to="/workbench/platform/inBox/message">
                            <span className={css.p15}>消息</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/workbench/platform/inBox/task">
                        <Link to="/workbench/platform/inBox/task">
                            <span className={css.p15}>任务</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/workbench/platform/inBox/cooperation">
                        <Link to="/workbench/platform/inBox/cooperation">
                            <span className={css.p15}>协作</span>
                        </Link>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="4">
                    <Icon type="relationship" />
                    <span>网络</span>
                </Menu.Item>
                <Menu.Item key="5">
                    <Icon type="wendang" />
                    <span>文档中心</span>
                </Menu.Item>
            </Menu>
        );
    }
}