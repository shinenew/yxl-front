import * as React from 'react';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import UIDetailsBasis, { IProps as IUIDetailsBasisProps } from './UI.Details.Basis';
import { Field } from 'kts-scaffold-framework/utils/doc';

// const css = require('./index.scss');

/** Redux接口 */
interface IReduxStatePart {
    
}

/** Props接口 */
interface IProps extends IUIDetailsBasisProps, IReduxStatePart {
    data?: any;
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
                <div className="user-info section">
                    <div className="left-col">
                        <div className="item  tst-full-info-buyer-name ">
                            <div className="item-value">
                                <span className="label" style={{width: 160}}>购买方</span>
                                <span className="value-compliance compliance-error">
                                    <span className="value tst-item-value name">
                                        {this.modulesState.invoiceDetails.buyerName}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="item tst-full-info-buyer-address ">
                            <div className="item-value">
                                <span className="label" style={{width: 160}}>身份证/组织机构代码</span>
                                <span className="value-compliance compliance-error">
                                    <span className="value tst-item-value ng-binding">
                                        {this.modulesState.invoiceDetails.buyerIdNum}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="item tst-full-info-buyer-address ">
                            <div className="item-value">
                                <span className="label" style={{width: 160}}>开户行及账号</span>
                                <span className="value-compliance compliance-error">
                                    <span className="value tst-item-value ng-binding">
                                        {this.modulesState.invoiceDetails.buyerName}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="right-col">
                        <div
                            className="item value-right secondary-label tst-full-info-invoice-code "
                        >
                            <div className="item-value">
                                <span className="label ">发票代码</span>
                                <span className="value-compliance compliance-error">
                                    <span className="value tst-item-value">
                                        {this.modulesState.invoiceDetails.invoiceCode}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div
                            className="item value-right secondary-label tst-full-info-invoice-number "
                        >
                            <div className="item-value">
                                <span className="label ">发票号码</span>
                                <span className="value-compliance compliance-error">
                                    <span className="value tst-item-value ">
                                        {this.modulesState.invoiceDetails.invoiceNumber}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div
                            className="item value-right secondary-label"
                        >
                            <div className="item-value">
                                <span className="label ">开票日期</span>
                                <span className="value-compliance compliance-error">
                                    <span className="value tst-item-value ">
                                        {Field.formatDate(
                                            this.modulesState.invoiceDetails.invoiceDate
                                        )}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div
                            className="item value-right secondary-label tst-full-info-invoice-number "
                        >
                            <div className="item-value">
                                <span className="label ">发票号码</span>
                                <span className="value-compliance compliance-error">
                                    <span className="value tst-item-value ">
                                        {this.modulesState.invoiceDetails.invoiceNumber}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            <div className="line-items">
                <div className="">
                    <form name="lineItemForm">
                        <div className="line-item line-items-title">
                            <div className="original-info">
                                <div className="check-box">
                                    <div
                                        className="tst-item-check-box ui-checkbox"
                                        onClick={ModulesAction.toggle}
                                        onChange={() => {
                                            ModulesAction.onSelectedChanged();
                                        }}
                                    >
                                        <i className="ui-icon ui-icon-checkboxOn " />
                                    </div>
                                </div>
                                <div className="name">
                                    <span>车辆类型</span>
                                </div>
                                <div className="carNo">
                                    <span>车辆识别号</span>
                                </div>
                                <div className="engine">
                                    <span>车架号码</span>
                                </div>
                                <div className="unit">
                                    <span>单位</span>
                                </div>
                                <div className="quantity">
                                    <span>数量</span>
                                </div>
                                <div className="unit-price">
                                    <span>单价</span>
                                </div>
                                <div className="price-amount">
                                    <span>金额</span>
                                </div>
                                <div className="tax-rate">
                                    <span>税率</span>
                                </div>
                                <div className="tax-amount">
                                    <span>税额</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <form name="lineItemForm">
                    <div className="line-item">
                        <div className="original-info">
                            <div className="check-box">
                                <div
                                    className="tst-item-check-box ui-checkbox"
                                    onClick={ModulesAction.toggle}
                                    onChange={() => {
                                        ModulesAction.onSelectedChanged();
                                    }}
                                >
                                    {' '}
                                    <i className="ui-icon ui-icon-checkboxOn " />{' '}
                                </div>
                            </div>
                            <div className="name">
                                <span>{this.modulesState.invoiceDetails.vehicleType}</span>
                            </div>
                            <div className="engine">
                                <span>{this.modulesState.invoiceDetails.engineNo}</span>
                            </div>
                            <div className="carNo">
                                <span>{this.modulesState.invoiceDetails.vehicleNo}</span>
                            </div>
                            <div className="unit">
                                <span>辆</span>
                            </div>
                            <div className="quantity">
                                <span>1</span>
                            </div>
                            <div className="unit-price">
                                <span>{this.modulesState.invoiceDetails.amountWithoutTax}</span>
                            </div>
                            <div className="price-amount">
                                <span>{this.modulesState.invoiceDetails.amountWithoutTax}</span>
                            </div>
                            <div className="tax-rate">
                                <span>{this.modulesState.invoiceDetails.taxRate}</span>
                            </div>
                            <div className="tax-amount">
                                <span>¥{this.modulesState.invoiceDetails.amountTax.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="user-info section">
                    <div className="left-col">
                        <div className="item  tst-full-info-buyer-name ">
                            <div className="item-value">
                                <span className="label ">厂牌型号</span>
                                <span className="value-compliance compliance-error">
                                    <span className="value tst-item-value ">
                                        {this.modulesState.invoiceDetails.factoryModel}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="item tst-full-info-buyer-address ">
                            <div className="item-value">
                                <span className="label ">产地</span>
                                <span className="value-compliance compliance-error">
                                    <span className="value tst-item-value ng-binding">
                                        {this.modulesState.invoiceDetails.productPlace}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="item tst-full-info-buyer-address ">
                            <div className="item-value">
                                <span className="label ">合格证号</span>
                                <span className="value-compliance compliance-error">
                                    <span className="value tst-item-value ng-binding">
                                        {this.modulesState.invoiceDetails.certificate}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="item tst-full-info-buyer-address ">
                            <div className="item-value">
                                <span className="label ">进口证明书号</span>
                                <span className="value-compliance compliance-error">
                                    <span className="value tst-item-value ng-binding">
                                        {this.modulesState.invoiceDetails.certificateImport}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="item tst-full-info-buyer-address ">
                            <div className="item-value">
                                <span className="label ">商检单号</span>
                                <span className="value-compliance compliance-error">
                                    <span className="value tst-item-value ng-binding">
                                        {this.modulesState.invoiceDetails.inspectionNum}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="right-col" style={{width: 400}}>
                        <div
                            className="item value-left secondary-label tst-full-info-invoice-code "
                        >
                            <div className="item-value">
                                <span className="label " >主管税务机关</span>
                                <span className="value-compliance compliance-error" >
                                    <span className="value tst-item-value">
                                        {this.modulesState.invoiceDetails.taxBureauName} {this.modulesState.invoiceDetails.taxBureauCode}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div
                            className="item value-left secondary-label tst-full-info-invoice-code "
                        >
                            <div className="item-value">
                                <span className="label " >主管税务代码</span>
                                <span className="value-compliance compliance-error" >
                                    <span className="value tst-item-value">
                                        {this.modulesState.invoiceDetails.taxBureauCode}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div
                            className="item value-left secondary-label tst-full-info-invoice-number "
                        >
                            <div className="item-value">
                                <span className="label ">完税证明号码</span>
                                <span className="value-compliance compliance-error">
                                    <span className="value tst-item-value ">
                                        {this.modulesState.invoiceDetails.taxRecords}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div
                            className="item value-left secondary-label"
                        >
                            <div className="item-value">
                                <span className="label ">吨位</span>
                                <span className="value-compliance compliance-error">
                                    <span className="value tst-item-value ">
                                        {Field.formatDate(
                                            this.modulesState.invoiceDetails.tonnage
                                        )}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div
                            className="item value-left secondary-label tst-full-info-invoice-number "
                        >
                            <div className="item-value">
                                <span className="label ">限乘人数</span>
                                <span className="value-compliance compliance-error">
                                    <span className="value tst-item-value ">
                                        {this.modulesState.invoiceDetails.limitPeople}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>                    

                <div className="price-summary-block">
                    <div className="col-right">
                        <div className="item">
                            <span className="item-label ng-scope">
                                小计 （不计税）
                            </span>
                            <div className="item-value tst-full-info-total-price-amount">
                                ¥{this.modulesState.invoiceDetails.amountWithoutTax}
                            </div>
                        </div>
                        <div className="item">
                            <span className="item-label ng-scope">
                                总税额
                            </span>
                            <div className="item-value tst-full-info-total-tax-amount">
                                ¥{this.modulesState.invoiceDetails.amountTax}
                            </div>
                        </div>
                        <div className="item">
                            <span className="item-label ng-scope">
                                总金额（大写）
                            </span>
                            <div className="item-value">
                                {Field.toStringChinese(
                                    this.modulesState.invoiceDetails.amount
                                )}
                            </div>
                        </div>
                        <div className="item bigger">
                            <span className="item-label ng-scope">
                                合计金额（小写）
                            </span>
                            <div className="item-value tst-full-info-total-price-and-tax">
                                ¥{this.modulesState.invoiceDetails.amount}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}