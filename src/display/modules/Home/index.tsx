import * as React from 'react';
import { ModulesBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { MyStore, connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import ModulesRoute, { Switch } from './Modules.Route';

const css = require('./index.scss');

/** 全局数据片段数据接口 */
interface IReduxStatePart {
}

/** 组建的props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {

}

/** 绑定全局数据到props */
@connect((state: ReduxState): IReduxStatePart => ({
}))
export default class Home extends ModulesBasic<IProps, ModulesState> {

    /** 组建状态 */
    public state: ModulesState = new ModulesState();

    /** 构造函数 */
    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    componentWillMount() {
        const { user } = MyStore.instance.getState();
        const { history, location } = this.props;

        if (!user.gToken) {
            if (location.pathname !== '/login') {
                history.push('/login');
            }
        } else if (!user.cToken) {
            if (location.pathname !== '/login/company') {
                history.push('/login/company');
            }
        } else {
            if (location.pathname.indexOf('/login') === 0 || location.pathname === '/') {
                if (location.pathname !== '/workbench') {
                    history.push('/workbench');
                }
            }
        }
    }

    componentDidUpdate() {
        this.componentWillMount();
    }

    // 这里尽量只调用UI组件
    render() {
        return (
            <div key={this.state.key} className={css.modules}>
                <Switch>{ModulesRoute.getChildReact('/workbench')}</Switch>
            </div>
        );
    }
}