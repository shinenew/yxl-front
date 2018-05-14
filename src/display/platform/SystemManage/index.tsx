import * as React from 'react';
import { ModulesBasic, IPropsBasic, ModulesRoot } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import { Tabs } from 'antd';
import { Route as RouteHelper } from 'src/routes';
import { BrowserRouter as Router } from 'react-router-dom';
import ModulesRoute from './Modules.Route';
import { Route } from 'react-router-dom';
const TabPane = Tabs.TabPane;

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
export default class TabsDemo extends ModulesBasic<IProps, ModulesState> {

    public state: ModulesState = new ModulesState();

    /**
     * 当前选中的tabs key
     */
    public activeKey = '0';

    /**
     * 获取当前路由的所有子路由
     */
    public childNodes = RouteHelper.getNodeChilds('workbench/platform/systemManage');

    /**
     * 构造器
     * @param props props
     */
    constructor(props: IProps) {
        super(props, ModulesAction);

        // 获取当前路由的index设为默认选中的tabs的defaultActiveKey 
        this.activeKey = this.childNodes.findIndex((node) => node.route.path === this.props.location.pathname).toString();

        // 跳转到默认路由
        if (this.props.location.pathname === '/workbench/platform/systemManage') {
            this.props.history.push(this.childNodes[0].route.path);
        }
    }

    /**
     * 点击Tabs回调
     */
    callback = (key) => {
        // 避免点击当前tabs路由跳转
        if (key !== this.activeKey) {
            this.activeKey = key;
            const redirectPath = this.childNodes[key];
            // console.log(redirectPath.route.path);
            this.props.history.push(redirectPath.route.path);
        }
    }

    render() {
        var items = [];
        this.childNodes.map((node, index) => {
            items.push(
                <TabPane tab={<span>{node.route.ico}{node.route.title}</span>} key={index}>
                    <Router>
                        <Route key={index} {...ModulesRoute.getNodeReact(node.route.nodeName).route} />
                    </Router>
                </TabPane>
            );
        });

        return (
            <ModulesRoot action={ModulesAction}>
                <Tabs defaultActiveKey={this.activeKey} onChange={this.callback.bind(this, )} className={css.cardContainer}>
                    {items}
                </Tabs>
            </ModulesRoot>
        );
    }
}