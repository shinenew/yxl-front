import * as React from 'react';
import { ModulesBasic, IPropsBasic, ModulesRoot } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import ModulesEvent from './Modules.Event';
import UIComponents from './UI.Components';
import IOption from './IOption';

const css = require('./index.scss');

/** Redux接口 */
interface IReduxStatePart {

}

/** Props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {
    urlData: IOption;
    refreshInvoice:()=>void;
}

/** 绑定全局数据 */
@connect((state: ReduxState): IReduxStatePart => ({

}))
export default class InvoiceImport extends ModulesBasic<IProps, ModulesState> {

    public static readonly Event = ModulesEvent;

    public readonly state: ModulesState = new ModulesState();

    constructor(props: IProps) {
        super(props, ModulesAction);
    }
    render() {
        return (
            <ModulesRoot action={ModulesAction}>
                <div className={css.modules}>
                    <UIComponents urlData={this.props.urlData} refreshInvoice={this.props.refreshInvoice}/>
                </div>
            </ModulesRoot>
        );
    }
}