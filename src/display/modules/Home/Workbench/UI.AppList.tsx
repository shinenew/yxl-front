import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import { IAppInfo } from 'src/dataModel';
import { Menu } from 'antd';

/** Redux接口 */
interface IReduxStatePart {
    appList?: IAppInfo[];
}

/** Props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {

}

/** 选中公司面板 */
@connect((state: ReduxState): IReduxStatePart => ({
    appList: state.user.appList || []
}))
export default class UIAppList extends UIBasic<IProps, ModulesState> {

    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    /** appList 结构 */
    private get appListElement(): JSX.Element[] {
        const { appList } = this.props;
        return appList.map((value: IAppInfo) => (
            <Menu.Item key={`/workbench/app/${value.appId}`}>
                {value.appName}
            </Menu.Item>
        ));
    }

    render() {
        const { location } = this.props;
        return (
            <Menu
                selectedKeys={[location.pathname]}
                theme="dark"
                inlineIndent={64}
                // inlineCollapsed={this.modulesState.collapsed}
            >
                {this.appListElement}
            </Menu>
        );
    }
}