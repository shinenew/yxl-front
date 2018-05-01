import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
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
@connect((state: ReduxState): IReduxStatePart => ({
}))
export default class UIIframe extends UIBasic<IProps, ModulesState> {

    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    render() {
        return (
            <Menu
                theme="dark"
                inlineIndent={15}
                mode="inline"
                selectedKeys={['2']}
                defaultOpenKeys={this.modulesState.collapsed ? [] : ['sub1']}
                inlineCollapsed={this.modulesState.collapsed}
            >
                <Menu.SubMenu
                    key="sub1"
                    className={css.menuSubMenu}
                    title={
                        <span>
                            <Icon type="pie-chart" />
                            <span>收件箱</span>
                        </span>
                    }
                >
                    <Menu.Item key="1">
                        <Icon type="pie-chart" />
                        <span>邮件1</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="pie-chart" />
                        <span>邮件2</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="pie-chart" />
                        <span>邮件3</span>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="4">
                    <Icon type="pie-chart" />
                    <span>网络</span>
                </Menu.Item>
                <Menu.Item key="5">
                    <Icon type="pie-chart" />
                    <span>公司信息</span>
                </Menu.Item>
            </Menu>
        );
    }
}