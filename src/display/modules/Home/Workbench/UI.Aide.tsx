import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
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
    /** 当前收起状态 */
    collapsed: boolean;
}

/** 辅助功能 */
@connect((state: ReduxState): IReduxStatePart => ({
}))
export default class UIAppList extends UIBasic<IProps, ModulesState> {

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
                inlineCollapsed={this.modulesState.collapsed}
            >
                <Menu.Item key="4">
                    <Icon type="appstore-o" />
                    <span>应用商店</span>
                </Menu.Item>
                <Menu.Item key="5">
                    <Icon type="question-circle" />
                    <span>帮助中心</span>
                </Menu.Item>
                <Menu.Item key="6">
                    <Icon type="setting" />
                    <span>系统管理</span>
                </Menu.Item>
            </Menu>
        );
    }
}