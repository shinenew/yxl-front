import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import { DetailsType } from './Modules.Constant';
import UIDetailsList from './UI.Details.list';

// const css = require('./index.scss');


/** Redux接口 */
interface IReduxStatePart {
}

/** Props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {
    detailsType: DetailsType;
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
        switch (this.props.detailsType) {
            case DetailsType.类型1:
                return <UIDetailsList />;

            default:
                return <p>类型错误</p>;
        }
    }
}