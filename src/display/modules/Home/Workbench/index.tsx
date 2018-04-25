import * as React from 'react';
import { ModulesBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import ModulesRoute from './Modules.Route';
import UIAppList from './UI.AppList';
import UIHeader from './UI.Header';
import { Layout } from 'antd';

const { Header, Content, Sider } = Layout;
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
                <Header>
                    <UIHeader {...this.props} />
                </Header>
                <Layout>
                    <Sider collapsible={true} >
                        <UIAppList {...this.props} />
                    </Sider>
                    <Content>
                        {ModulesRoute.getChildReact()}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}