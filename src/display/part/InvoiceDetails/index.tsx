import * as React from 'react';
import { ModulesBasic, IPropsBasic, ModulesRoot } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import ModulesEvent from './Modules.Event';
import { Button } from 'antd';
import { Field } from 'kts-scaffold-framework/utils/doc';
import Details from './UI.Details';
import './Component.less';

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
export default class InvoiceDetails extends ModulesBasic<IProps, ModulesState> {

    public static readonly Event = ModulesEvent;

    public readonly state: ModulesState = new ModulesState();

    constructor(props: IProps) {
        super(props, ModulesAction);
    }
    componentWillMount() {
        ModulesAction.getInvoiceDetails('525155675739783168');
    }
    render() {
        return (
            <ModulesRoot action={ModulesAction}>
                <div className={css.InvoiceDetails}>
                <div className="invoice-details-info-container">
                {
                    this.state.invoiceDetails&&<div className="invoice-details">
                        <div className="title">
                            {this.state.invoiceDetails.cancellationMark==='Y'&&<img alt="" style={{'position':'absolute',left:20}} src="./img/zuofei.png"width="200"/>}
                            {this.state.invoiceDetails.amount<0&&<img alt="" style={{'position':'absolute',left:20}} src="./img/negative.png" width="200"/>}
                            <span className="ng-binding">                           
                            {ModulesAction.getCityName(this.state.invoiceDetails.invoiceCode)}
                            {ModulesAction.getTransformType(this.state.invoiceDetails.invoiceType)}
                            </span>
                            <span className="sub-title"><span >查验数据更新时间</span>: <span >{this.state.lastRealCheckTime&&Field.formatTime(this.state.lastRealCheckTime)}</span></span>
                        </div>
                           <Details detailsType={'VAT_SPECIAL_INVOICE_MOTORVEHICLE'}/>
                           
                            <div className="user-info section last">
                                <div className="left-col">
                                    <div className="item name tst-full-info-supplier-name "><div className="item-value">
                                        <span  className="label ng-binding">销售方</span>
                                        <span className="value-compliance compliance-error" >
                                            <span  className="value tst-item-value ng-binding name">{this.state.invoiceDetails.supplierName}</span>

                                        </span>
                                    </div>
                                    </div>
                                    <div className="item tst-full-info-supplier-tax-number " ><div className="item-value">
                                        <span className="label ng-binding">纳税人识别号</span>
                                        <span className="value-compliance compliance-error" >
                                            <span  className="value tst-item-value ng-binding">{this.state.invoiceDetails.supplierTaxId}</span>

                                        </span>
                                    </div>
                                    </div>
                                    <div className="item tst-full-info-supplier-address "><div className="item-value">
                                        <span  className="label ng-binding">地址及电话</span>
                                        <span className="value-compliance compliance-error" >
                                            <span  className="value tst-item-value ng-binding">{this.state.invoiceDetails.supplierAddressPhone}</span>

                                        </span>
                                    </div>
                                    </div>
                                    <div className="item tst-full-info-supplier-account " ><div className="item-value">
                                        <span  className="label ng-binding">开户行及账号</span>
                                        <span className="value-compliance compliance-error" >
                                            <span  className="value tst-item-value ng-binding">{this.state.invoiceDetails.supplierBankAndId}</span>

                                        </span>
                                    </div>
                                    </div>
                                </div>
                                <div className="right-col">
                                    <div className="item">
                                        <div className="item-value">
                                            <span className="label">备注</span>
                                            <span className="value-compliance compliance-error" >
                                                <span className="value tst-item-value ng-binding">{this.state.invoiceDetails.remark}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="right btnGroup">
                            
                                <Button type="primary" className="ml-10 hide">确认保存</Button>
                                <Button type="default" className="ml-10" onClick={ModulesAction.onBack}>返回</Button>
                            </div>
                        </div>
                    }
                    </div>
                </div>
            </ModulesRoot>
        );
    }
}