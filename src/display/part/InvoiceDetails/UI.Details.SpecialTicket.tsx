import * as React from 'react';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import UIDetailsBasis, { IProps as IUIDetailsBasisProps } from './UI.Details.Basis';
import { Field } from 'kts-scaffold-framework/utils/doc';

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
            
            <div className="original-info">
                 <div className="user-info section">
                    <div className="left-col">
                        <div className="item  tst-full-info-buyer-name ">
                            <div className="item-value">
                                <span className="label ">购买方</span>
                                <span className="value-compliance compliance-error" >
                                    <span className="value tst-item-value name">{this.modulesState.invoiceDetails.buyerName}</span>
                                </span>
                            </div>
                        </div>
                        <div className="item tst-full-info-buyer-tax-number ">
                            <div className="item-value">
                                <span className="label ">纳税人识别号</span>
                                <span className="value-compliance compliance-error" >
                                    <span className="value tst-item-value ">{this.modulesState.invoiceDetails.buyerTaxId}</span>

                                </span>
                            </div>
                        </div>
                        <div className="item tst-full-info-buyer-address " >
                            <div className="item-value">
                                <span className="label ">地址及电话</span>
                                <span className="value-compliance compliance-error" >
                                    <span className="value tst-item-value ng-binding">{this.modulesState.invoiceDetails.buyerAddressPhone}</span>
                                </span>
                            </div>
                        </div>
                        <div className="item tst-full-info-buyer-account " >
                            <div className="item-value">
                                <span className="label ng-binding">开户行及账号</span>
                                <span className="value-compliance compliance-error">
                                    <span className="value tst-item-value ng-binding">{this.modulesState.invoiceDetails.buyerBankAndId}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="right-col">
                        <div className="item value-right secondary-label tst-full-info-invoice-code " >
                            <div className="item-value">
                                <span className="label ">发票代码</span>
                                <span className="value-compliance compliance-error" >
                                    <span className="value tst-item-value">{this.modulesState.invoiceDetails.invoiceCode}</span>

                                </span>
                            </div>
                        </div>
                        <div className="item value-right secondary-label tst-full-info-invoice-number ">
                            <div className="item-value">
                                <span className="label ">发票号码</span>
                                <span className="value-compliance compliance-error">
                                    <span className="value tst-item-value ">{this.modulesState.invoiceDetails.invoiceNumber}</span>
                                </span>
                            </div>
                        </div>
                        <div className="item value-right secondary-label">
                            <div className="item-value">
                                <span className="label ">开票日期</span>
                                <span className="value-compliance compliance-error">
                                    <span className="value tst-item-value ">{Field.formatDate(this.modulesState.invoiceDetails.invoiceDate)}</span>
                                </span>
                            </div>
                        </div>

                        <div className="item value-right secondary-label tst-full-info-checksum ">
                            <div className="item-value">
                                <span className="label ng-binding">校验码</span>
                                <span className="value-compliance compliance-error" >
                                    <span className="value tst-item-value ng-binding">{this.modulesState.invoiceDetails.invoiceParityCode}</span>
                                </span>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="line-items">
                    <div  className="">
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
                                            <i className="ui-icon ui-icon-checkboxOn "/>
                                        </div>
                                    </div>
                                    <div className="name"><span>货物或应税劳务／服务名称</span></div>
                                    <div className="model"><span>规格型号</span>
                                    </div>
                                    <div className="unit"><span>单位</span>
                                    </div>
                                    <div className="quantity"><span>数量</span>
                                    </div>
                                    <div className="unit-price"><span>单价</span>
                                    </div>
                                    <div className="price-amount"><span>金额</span>
                                    </div>
                                    <div className="tax-rate"><span>税率</span>
                                    </div>
                                    <div className="tax-amount"><span>税额</span>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>

                    <form name="lineItemForm">
                        {
                            this.modulesState.invoiceDetails.saleItemList && this.modulesState.invoiceDetails.saleItemList.map((item, index) => {
                                return (
                                    <div className="line-item" key={index}>
                                        <div className="original-info">
                                            <div className="check-box">
                                            <div 
                                                className="tst-item-check-box ui-checkbox" 
                                                onClick={ModulesAction.toggle}  
                                                onChange={() => { 
                                                    ModulesAction.onSelectedChanged(); 
                                                }}
                                            > 
                                            <i className="ui-icon ui-icon-checkboxOn "/>
                                            </div>
                                            </div>
                                            <div className="name"><span>{item.name}</span></div>
                                            <div className="model"><span>{item.specification}</span></div>
                                            <div className="unit"><span>{item.unit}</span></div>
                                            <div className="quantity"><span>{item.quantity}</span></div>
                                            <div className="unit-price"><span>{item.unitPrice}</span></div>
                                            <div className="price-amount"><span>{item.amountWithoutTax}</span></div>
                                            <div className="tax-rate"><span>{item.taxPercent}</span></div>
                                            <div className="tax-amount"><span>{item.taxAmount}</span></div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </form>

                    <div className="price-summary-block">
                        <div className="col-right">
                            <div className="item">
                                <span className="item-label ng-scope"   >小计 （不计税）</span>
                                <div className="item-value tst-full-info-total-price-amount" >¥{this.modulesState.invoiceDetails.amountWithoutTax}</div>
                            </div>
                            <div className="item">
                                <span className="item-label ng-scope"   >总税额</span>
                                <div className="item-value tst-full-info-total-tax-amount">¥{this.modulesState.invoiceDetails.amountTax}</div>
                            </div>
                            <div className="item">
                                <span className="item-label ng-scope"   >总金额（大写）</span>
                                <div className="item-value">{ Field.toStringChinese(this.modulesState.invoiceDetails.amount)}</div>
                            </div>
                            <div className="item bigger">
                                <span className="item-label ng-scope"   >合计金额（小写）</span>
                                <div className="item-value tst-full-info-total-price-and-tax">¥{this.modulesState.invoiceDetails.amount.toFixed(2)}</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}