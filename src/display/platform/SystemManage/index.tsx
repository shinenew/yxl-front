import * as React from 'react';
import { ModulesBasic, IPropsBasic, ModulesRoot } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import { MyStore, reducers } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import UIComponents from './UI.Components';
import { Button } from 'antd';

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
export default class SystemManage extends ModulesBasic<IProps, ModulesState> {

    public state: ModulesState = new ModulesState();

    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    render() {
        return (
            <ModulesRoot action={ModulesAction}>
                <div className={css.modules}>
                    <Button onClick={ModulesAction.onChing} >改变</Button>
                    <Button onClick={this.onClickHandler} >开启</Button>
                </div>
            </ModulesRoot>
        );
    }

    private onClickHandler = () => {
        MyStore.instance.dispatch(reducers.aside.ActionTypes.show, {
            Components: <UIComponents />,
            title: <a>'xxxx'</a>
        });
    }
}