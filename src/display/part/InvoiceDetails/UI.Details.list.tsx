import * as React from 'react';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import UIDetailsBasis, { IProps as IUIDetailsBasisProps } from './UI.Details.Basis';

// const css = require('./index.scss');

/** Redux接口 */
interface IReduxStatePart {
    
}

/** Props接口 */
interface IProps extends IUIDetailsBasisProps, IReduxStatePart {

}

/** 详情产品1 */
@ModulesAction.uiconnect
@connect((state: ReduxState): IReduxStatePart => ({

}))
export default class UIDetailslist extends UIDetailsBasis<IProps, ModulesState> {
    
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