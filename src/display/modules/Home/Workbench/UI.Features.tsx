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
@ModulesAction.uiconnect
@connect((state: ReduxState): IReduxStatePart => ({
}))
export default class UIFeatures extends UIBasic<IProps, ModulesState> {

    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    render() {
        return (
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[this.props.location.pathname]}
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
                    <Menu.Item key="1">
                        <span>文件</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <span>消息</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <span>任务</span>
                    </Menu.Item>
                    <Menu.Item key="13">
                        <span>协作</span>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="4">
                    <Icon type="relationship" />
                    <span>网络</span>
                </Menu.Item>
                <Menu.Item key="5">
                    <Icon type="gongsi" />
                    <span>公司信息</span>
                </Menu.Item>
            </Menu>
        );
    }
}