import * as React from 'react';
import { ModulesBasic, IPropsBasic, ModulesRoot } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import ModulesEvent from './Modules.Event';
import { Button } from 'antd';
import { Field } from 'kts-scaffold-framework/utils/doc';
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
                            {this.state.invoiceDetails.cancellationMark==='Y'&&<img alt="" style={{'position':'absolute',left:20}} src="/img/zuofei.png"width="200"/>}
                            {this.state.invoiceDetails.amount<0&&<img alt="" style={{'position':'absolute',left:20}} src="/img/negative.png" width="200"/>}
                            {/* <span className="ng-binding">{getCityName(data.invoiceCode)}{transformType(data.invoiceType)}</span> */}
                            <span className="ng-binding">123</span>
                            <span className="sub-title"><span >查验数据更新时间</span>: <span >{this.state.lastRealCheckTime&&Field.formatTime(this.state.lastRealCheckTime)}</span></span>
                        </div>

                            <div className="user-info section">
                                <div className="left-col">
                                    <div className="item  tst-full-info-buyer-name ">
                                        <div className="item-value">
                                            <span className="label ">购买方</span>
                                            <span className="value-compliance compliance-error" >
                                                <span className="value tst-item-value name">{this.state.invoiceDetails.buyerName}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="item tst-full-info-buyer-tax-number ">
                                        <div className="item-value">
                                            <span className="label ">纳税人识别号</span>
                                            <span className="value-compliance compliance-error" >
                                                <span className="value tst-item-value ">{this.state.invoiceDetails.buyerTaxId}</span>

                                            </span>
                                        </div>
                                    </div>
                                    <div className="item tst-full-info-buyer-address " >
                                        <div className="item-value">
                                            <span className="label ">地址及电话</span>
                                            <span className="value-compliance compliance-error" >
                                                <span className="value tst-item-value ng-binding">{this.state.invoiceDetails.buyerAddressPhone}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="item tst-full-info-buyer-account " >
                                        <div className="item-value">
                                            <span className="label ng-binding">开户行及账号</span>
                                            <span className="value-compliance compliance-error">
                                                <span className="value tst-item-value ng-binding">{this.state.invoiceDetails.buyerBankAndId}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="right-col">
                                    <div className="item value-right secondary-label tst-full-info-invoice-code " >
                                        <div className="item-value">
                                            <span className="label ">发票代码</span>
                                            <span className="value-compliance compliance-error" >
                                                <span className="value tst-item-value">{this.state.invoiceDetails.invoiceCode}</span>

                                            </span>
                                        </div>
                                    </div>
                                    <div className="item value-right secondary-label tst-full-info-invoice-number ">
                                        <div className="item-value">
                                            <span className="label ">发票号码</span>
                                            <span className="value-compliance compliance-error">
                                                <span className="value tst-item-value ">{this.state.invoiceDetails.invoiceNumber}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="item value-right secondary-label">
                                        <div className="item-value">
                                            <span className="label ">开票日期</span>
                                            <span className="value-compliance compliance-error">
                                                <span className="value tst-item-value ">{Field.formatDate(this.state.invoiceDetails.invoiceDate)}</span>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="item value-right secondary-label tst-full-info-checksum ">
                                        <div className="item-value">
                                            <span className="label ng-binding">校验码</span>
                                            <span className="value-compliance compliance-error" >
                                                <span className="value tst-item-value ng-binding">{this.state.invoiceDetails.invoiceParityCode}</span>
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
                                                        // onClick={this.toggle} 
                                                        // onChange={()=>{this.onSelectedChanged()}}
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
                                        this.state.invoiceDetails.saleItemList && this.state.invoiceDetails.saleItemList.map((item, index) => {
                                            return (
                                                <div className="line-item" key={index}>
                                                    <div className="original-info">
                                                        <div className="check-box">
                                                        <div 
                                                            className="tst-item-check-box ui-checkbox" 
                                                            // onClick={this.toggle}  
                                                            // onChange={() => { this.onSelectedChanged() }}
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
                                            <div className="item-value tst-full-info-total-price-amount" >¥{this.state.invoiceDetails.amountWithoutTax}</div>
                                        </div>
                                        <div className="item">
                                            <span className="item-label ng-scope"   >总税额</span>
                                            <div className="item-value tst-full-info-total-tax-amount">¥{this.state.invoiceDetails.amountTax}</div>
                                        </div>
                                        <div className="item">
                                            <span className="item-label ng-scope"   >总金额（大写）</span>
                                            <div className="item-value">{ Field.toStringChinese(this.state.invoiceDetails.amount)}</div>
                                        </div>
                                        <div className="item bigger">
                                            <span className="item-label ng-scope"   >合计金额（小写）</span>
                                            <div className="item-value tst-full-info-total-price-and-tax">¥{this.state.invoiceDetails.amount.toFixed(2)}</div>
                                        </div>
                                    </div>
                                </div>

                            </div>

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
                                {/* <Button type="default" className="ml-10" onClick={this.onBack}>返回</Button> */}
                            </div>
                        </div>
                    }
                    </div>
                </div>
            </ModulesRoot>
        );
    }
}