import * as React from 'react';
import { ModulesBasic, IPropsBasic, ModulesRoot } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import ModulesRoute from './Modules.Route';
import UIFeatures from './UI.Features';
import UIAide from './UI.Aide';
import UILog from './UI.Log';
import UIUserPanel from './UI.UserPanel';
import UIAppList from './UI.AppList';
import { Layout } from 'antd';

const { Content, Sider } = Layout;
const css = require('./index.scss');

/** Redux接口 */
interface IReduxStatePart {

}

/** Props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {

}

/** 绑定全局数据 */
@connect((state: ReduxState): IReduxStatePart => ({

}))
export default class Workbench extends ModulesBasic<IProps, ModulesState> {

    public state: ModulesState = new ModulesState();

    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    render() {
        return (
            <ModulesRoot action={ModulesAction}>
                <Layout className={css.layout}>
                    <Layout>
                        <Sider
                            width={180}
                            trigger={null}
                            collapsible={true}
                            collapsed={this.state.collapsed}
                            collapsedWidth={64}
                            style={{ paddingBottom: 180 }}
                        >
                            {/* 图标和收折按钮 */}
                            <UILog />

                            {/* 基础功能 */}
                            <UIFeatures />

                            <div className={css.separation} />

                            {/* 已经安装的应用列表 */}
                            <UIAppList />

                            <div className={css.separation} />

                            {/* 辅助功能 */}
                            <UIAide />

                            {/* 用户面板 */}
                            <UIUserPanel />
                        </Sider>
                        <Content>
                            {ModulesRoute.getChildReact()}
                        </Content>
                    </Layout>
                </Layout>
            </ModulesRoot>
        );
    }
}