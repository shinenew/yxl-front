import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';

// const css = require('./index.scss');

/** Redux接口 */
interface IReduxStatePart {
    
}

/** Props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {

}

/** 详情产品1 */
@ModulesAction.uiconnect
@connect((state: ReduxState): IReduxStatePart => ({

}))
export default class UIDetailslist extends UIBasic<IProps, ModulesState> {
    
    constructor(props: IProps) {
        super(props, ModulesAction);
    }
    
    render() {
        return (
            <div>
                你的组件
            </div>
        );
    }
}