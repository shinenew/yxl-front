import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
// import { DetailsType } from './Modules.Constant';
import UIDetailsSpecialTicketList from './UI.Details.SpecialTicket';
import { InvoiceType } from 'src/entry/constant';
import UiDetailsPlaneTicketList from './UI.Details.PlaneTicket';

// const css = require('./index.scss');


/** Redux接口 */
interface IReduxStatePart {
}

/** Props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {
    detailsType?: string;
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
            case InvoiceType.专票:
                return <UIDetailsSpecialTicketList {...this.props} />;
            case InvoiceType.机票:
                return <UiDetailsPlaneTicketList {...this.props} />;
            default:
                return <p>类型错误</p>;
        }
    }
}