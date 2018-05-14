import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { Link } from 'react-router-dom';
import { connect } from 'src/redux';
import { withRouter } from 'src/routes';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import { IAppInfo } from 'src/dataModel';
import { Menu, Icon } from 'antd';

const css = require('./index.scss');

/** Redux接口 */
interface IReduxStatePart {
    appList?: IAppInfo[];
}

/** Props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {

}

/** 选中公司面板 */
@withRouter
@ModulesAction.uiconnect
@connect((state: ReduxState): IReduxStatePart => ({
    appList: state.user.appList || []
}))
export default class UIAppList extends UIBasic<IProps, ModulesState> {

    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    /** appList 第三方结构 */
    private get appListElementThree(): JSX.Element[] {
        const { appList } = this.props;
        return appList.map((value: IAppInfo) => (
            <Menu.Item key={`/workbench/app/${value.appId}`}>
                <Link to={`/workbench/app/${value.appId}`}>
                    <Icon type="shezhi" />
                    <span>{value.appName}</span>
                </Link>
            </Menu.Item>
        ));
    }

    /** appList 内部结构 */
    private get appListElementInternal(): JSX.Element[] {
        return [
            (
            <Menu.Item key={`/workbench/invoiceInput`}>
                <Link to={`/workbench/invoiceInput`}>
                    <Icon type="shezhi" />
                    <span>发票录入</span>
                </Link>
            </Menu.Item>
            )
        ];
    }

    render() {
        const { location } = this.props;
        debugger;
        return (
            <Menu
                selectedKeys={[ModulesAction.getMenuSelectedKeys(location.pathname)]}
                theme="dark"
                mode="inline"
                className={css.features}
                inlineIndent={15}
                inlineCollapsed={this.modulesState.collapsed}
            >
                {this.appListElementInternal}
                {this.appListElementThree}
            </Menu>
        );
    }
}