import * as React from 'react';
import { ModulesBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import ModulesRoute from './Modules.Route';
import UIFeatures from './UI.Features';
import UILog from './UI.Log';
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
            <Layout className={css.layout}>
                <Layout>
                    <Sider
                        width={180} 
                        trigger={null} 
                        collapsible={true} 
                        collapsed={this.state.collapsed} 
                        collapsedWidth={64}
                    >
                        {/* 图标和收折按钮 */}
                        <UILog collapsed={this.state.collapsed} />
                        
                        {/* 基础功能 */}
                        <UIFeatures key={this.state.key} />

                        <div className={css.separation} />
                        
                        {/* <UIAppList {...this.props} /> */}
                    </Sider>
                    <Content>
                        {ModulesRoute.getChildReact()}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}