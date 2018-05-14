import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import { withRouter } from 'src/routes';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';

// const css = require('./index.scss');

/** Redux接口 */
interface IReduxStatePart {
}

/** Props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {
}

/** 辅助功能 */
@withRouter
@ModulesAction.uiconnect
@connect((state: ReduxState): IReduxStatePart => ({
}))
export default class UIAppList extends UIBasic<IProps, ModulesState> {

    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    render() {
        const { location } = this.props;
        return (
            <Menu
                theme="dark"
                inlineIndent={15}
                mode="inline"
                selectedKeys={[ModulesAction.getMenuSelectedKeys(location.pathname)]}
                inlineCollapsed={this.modulesState.collapsed}
            >
                <Menu.Item key="4">
                    <Icon type="yingyong" />
                    <span>应用商店</span>
                </Menu.Item>
                <Menu.Item key="5">
                    <Icon type="bangzhu" />
                    <span>帮助中心</span>
                </Menu.Item>
                <Menu.Item key="/workbench/platform/systemManage">
                    <Link to="/workbench/platform/systemManage">
                        <Icon type="shezhi" />
                        <span>系统管理</span>
                    </Link>
                </Menu.Item>
            </Menu>
        );
    }
}