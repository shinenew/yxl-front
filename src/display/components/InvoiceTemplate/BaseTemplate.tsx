import React from 'react';
import { Modal } from 'antd';
import transformType, { getCityName } from 'src/entry/constant/InvoiceType/EnumInvoiceType';
import { Field } from 'kts-scaffold-framework/utils/doc';
import moment from 'moment';
import { withRouter } from 'src/routes';
@withRouter
class BaseTemplate extends React.Component<any, any> {
    /**
     * 公共组件 - 纸质发票展示页面 / 票面信息
     */
    constructor(props:any) {
        super(props);
        this.state = {
            value: this.props.data
        };
        this.handleRoleCancel=this.handleRoleCancel.bind(this);
    }
    public handleRoleCancel() {
        this.props.onClose();
    }
    template = () => {
        let pdfInvoiceView = this.state.value;
        return (
        <div className="product-list">
            <div className="product">
                <div className="name"><label>货物或应税劳务、服务名称</label></div>
                <div className="model"><label>规格型号</label></div>
                <div className="unit"><label>单位</label></div>
                <div className="quantity"><label>数&nbsp;&nbsp;量</label></div>
                <div className="unitPrice">
                    <label>
                        <span>单&nbsp;&nbsp;价</span>
                    </label>
                </div>
                <div className="priceAmount">
                    <label>
                        <span>金&nbsp;额</span>
                    </label>
                </div>
                <div className="taxRate">
                    <label className="taxRate-dropdown">
                        <span>税率</span>
                    </label>
                </div>
                <div className="taxAmount"><label>税&nbsp;&nbsp;额</label></div>
            </div>
            <div className="products-content">
                {
                    pdfInvoiceView.saleItemList.length < 8 ? pdfInvoiceView.saleItemList.map((item, index) => {
                        return (
                            <div className="product" key={index}>
                                <div className="name"><span className="input" title={item.name}><i >{item.name}</i></span></div>
                                <div className="model"><span className="input line-one" title={item.specification}><i >{item.specification}</i></span></div>
                                <div className="unit"><span className="input line-one" title={item.unit}><i >{item.unit}</i></span></div>
                                <div className="quantity"><span className="input" title={item.quantity}><i >{item.quantity}</i></span></div>
                                <div className="unitPrice"><span className="input" title={item.unitPrice}><i>{item.unitPrice}</i></span></div>
                                <div className="priceAmount"><span className="input" title={item.amountWithoutTax} >{item.amountWithoutTax && item.amountWithoutTax.toFixed(2)}</span></div>
                                <div className="taxRate"><span className="input" title={item.taxPercent} >{item.taxPercent}</span></div>
                                <div className="taxAmount"><span className="input " title={item.taxAmount}>{item.taxAmount && item.taxAmount.toFixed(2)}</span></div>
                            </div>
                        );
                    }) : <div className="product"><div className="name"><span className="input"><i >(详见销货清单)</i></span></div></div>
                }
            </div>
            <div className="product summary">
                <div className="name"><label>合&nbsp;&nbsp;&nbsp;&nbsp;计</label></div>
                <div className="model"></div>
                <div className="unit"></div>
                <div className="quantity"></div>
                <div className="unitPrice"></div>
                <div className="priceAmount money">
                    <span className="input " title={pdfInvoiceView.amountWithoutTax} >¥{pdfInvoiceView.amountWithoutTax && pdfInvoiceView.amountWithoutTax.toFixed(2)}</span>
                </div>
                <div className="taxRate"></div>
                <div className="taxAmount money">
                    <span className="input " title={pdfInvoiceView.amountTax} >¥{pdfInvoiceView.amountTax && pdfInvoiceView.amountTax.toFixed(2)}</span>
                </div>
            </div>
            <div className="v-lines line-0"></div>
            <div className="v-lines line-1"></div>
            <div className="v-lines line-2"></div>
            <div className="v-lines line-3"></div>
            <div className="v-lines line-4"></div>
            <div className="v-lines line-5"></div>
            <div className="v-lines line-6"></div>
            <div className="v-lines line-7"></div>
            <div className="v-lines line-8"></div>
            <div className="v-lines line-9"></div>

        </div>
        );
    }
    render() {
        let pdfInvoiceView = this.state.value;
        return (
            <div>
                <Modal
                    closable={false}
                    visible={true}
                    onCancel={this.handleRoleCancel}
                    width="818px"
                    footer={null}
                    wrapClassName="special-modal"
                >
                    <div className="view-invoice">
                        <div className="invoice" >
                            <div className="sell-info header">
                                <div id="invoiceTitle" className="title">
                                    {pdfInvoiceView.cancellationMark === 'Y' && <img alt="" style={{ 'position': 'absolute', left: 20 }} src="/img/zuofei.png" width="200" />}
                                    {pdfInvoiceView.amount < 0 && <img alt="" style={{ 'position': 'absolute', left: 20 }} src="/img/negative.png" width="200" />}
                                    <span id="invoiceTypeTitle" className="region">{getCityName(pdfInvoiceView.invoiceCode)}{transformType(pdfInvoiceView.invoiceType)}</span>
                                    <p className="hr"></p>
                                </div>
                                <div className="left-block">
                                    <div className="isRed ">{pdfInvoiceView.creditDescription}</div>
                                    <div className="machineNumber">机器编号：<i>{pdfInvoiceView.machineCode}</i></div>
                                </div>
                                <div className="right-block">
                                    <div className="label-input-fields">
                                        <div className="label-input-field">
                                            <label>发票代码：</label>
                                            <span className="input " >{pdfInvoiceView.invoiceCode}</span>
                                        </div>
                                        <div className="label-input-field">
                                            <label>发票号码：</label>
                                            <span className="input " >{pdfInvoiceView.invoiceNumber}</span>
                                        </div>
                                        <div className="label-input-field">
                                            <label>开票日期：</label>
                                            <span className="input">
                                                <span >{moment.unix(pdfInvoiceView.invoiceDate / 1000)
                                                    .format('YYYY')}</span><span className="label">年</span>
                                                <span >{moment.unix(pdfInvoiceView.invoiceDate / 1000)
                                                    .format('MM')}</span><span className="label">月</span>
                                                <span >{moment.unix(pdfInvoiceView.invoiceDate / 1000)
                                                    .format('DD')}</span><span className="label">日</span>
                                            </span>
                                        </div>
                                        <div className="label-input-field signature">
                                            <label>校验码：</label>
                                            <span className="input">{pdfInvoiceView.invoiceParityCode}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="sell-info">
                                <div className="sell">
                                    <div className="vertical-title">
                                        <div className="labelHolder">
                                            <label>购买方</label>
                                        </div>
                                    </div>
                                    <div className="label-input-fields">

                                        <div className="label-input-field">
                                            <label>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</label>
                                            <span className="input" title={pdfInvoiceView.buyerName}><i >{pdfInvoiceView.buyerName}</i></span>
                                        </div>
                                        <div className="label-input-field">
                                            <label>纳税人识别号：</label>
                                            <span className="input number taxNumber" >{pdfInvoiceView.buyerTaxId}</span>
                                        </div>
                                        <div className="label-input-field">
                                            <label>地址、电话：</label>
                                            <span className="input line-one" title={pdfInvoiceView.buyerAddressPhone}><i >{pdfInvoiceView.buyerAddressPhone}</i></span>
                                        </div>
                                        <div className="label-input-field">
                                            <label>开户行及帐号：</label>
                                            <span className="input line-one" title={pdfInvoiceView.buyerBankAndId}><i>{pdfInvoiceView.buyerBankAndId}</i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="info">
                                    <div className="vertical-title smaller">
                                        <div className="labelHolder">
                                            <label>密码区</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {
                                this.template()
                            }

                            <div className="product-price-tax-total">
                                <div className="title"><label>价税合计（大写）</label></div>
                                <div className="price-chinese">
                                    <img className="price-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAHTSURBVDjLhdM7T9NRGAbwX4FSCOgi8A0wTAgFo+KomzHyDYiEyRAxQbwtJg2IgA7MihJXNTEI4uKkIWgk0TgoTmLlYgcT+jcRVFoHLv23cnmmc973ed7rORFhlGrU6oRa+5H22QtPvPM7R4mETvXOO63YrFkp1Khz0Joxwz4oQNRZSYsGNKvcCBNR6bAhS75qU5JP7xF4Jh7KmMvc5Lm07rCkXdqoKjuh2gNpbZvXBnPGd6FDjUlf1K+Xc883cXuh2YI7orRI6c+rObLtmUFLjhRpFfEoROnUrQyU63EuJHioxBneeqUyZL4qcF1MTELgUsizz5Rplt3Nq7Vcn2UJvZYlNnJt4r4fZN0oaK9Mv1UresUKPAPWiraZR1YGERnZ/50lAtUF8a/pdEuxLmtuWs3bRpoZL1WEjJcFEmLK9AlcLGj6dbFaJ01a3Bprkym3rfhr2h+/vNkS1OvymONSeW0X7bi4Ad8dpdSopIY9n0aTeSOiEJc05sCu9CoT5nJhOwRGdpFUGZXWnjNEXfHTU4e2/UCNJgR61svJSTrMm9encWvIERXi+i1Iat+khyfS4IJT+OiTlIgadepkjRv2frutE9NiyIy0jIy0GYOOKQ1T/gGrKIJmZtDkEAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNS0xMC0wOFQyMzozMDo1OSswODowMPoOoTwAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTUtMTAtMDhUMjM6MzA6NTkrMDg6MDCLUxmAAAAATnRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA2LjguOC0xMCBRMTYgeDg2XzY0IDIwMTUtMDctMTkgaHR0cDovL3d3dy5pbWFnZW1hZ2ljay5vcmcFDJw1AAAAGHRFWHRUaHVtYjo6RG9jdW1lbnQ6OlBhZ2VzADGn/7svAAAAGHRFWHRUaHVtYjo6SW1hZ2U6OkhlaWdodAA0NDVtXFhQAAAAF3RFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADQ0Nf6tCA0AAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAF3RFWHRUaHVtYjo6TVRpbWUAMTQ0NDMxODI1OSWTlnIAAAATdEVYdFRodW1iOjpTaXplADEzLjRLQkKbmy9AAAAAWnRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8vaG9tZS93d3dyb290L3d3dy5lYXN5aWNvbi5uZXQvY2RuLWltZy5lYXN5aWNvbi5jbi9zcmMvMTE5NDUvMTE5NDUzMi5wbme1f+WMAAAAAElFTkSuQmCC" alt="ⓧ" />
                                    {Field.toStringChinese(pdfInvoiceView.amount)}</div>
                                <div className="price-number">
                                    <label>（小写）</label>
                                    <span className="money ">¥{pdfInvoiceView.amount && pdfInvoiceView.amount.toFixed(2)}</span>
                                </div>
                                <div className="v-lines line-1"></div>
                            </div>

                            <div className="sell-info">
                                <div className="sell">
                                    <div className="vertical-title">
                                        <div className="labelHolder">
                                            <label>销售方</label>
                                        </div>
                                    </div>
                                    <div className="label-input-fields">
                                        <div className="label-input-field">
                                            <label>名称：</label>
                                            <span className="input" title={pdfInvoiceView.supplierName}><i  >{pdfInvoiceView.supplierName}</i></span>
                                        </div>
                                        <div className="label-input-field">
                                            <label>纳税人识别号：</label>
                                            <span className="input money taxNumber" title={pdfInvoiceView.supplierTaxId} >{pdfInvoiceView.supplierTaxId}</span>
                                        </div>
                                        <div className="label-input-field">
                                            <label>地址、电话：</label>
                                            <span className="input" title={pdfInvoiceView.supplierAddressPhone}><i>{pdfInvoiceView.supplierAddressPhone}</i></span>
                                        </div>
                                        <div className="label-input-field">
                                            <label>开户行及帐号：</label>
                                            <span className="input" title={pdfInvoiceView.supplierBankAndId}><i >{pdfInvoiceView.supplierBankAndId}</i></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="info">
                                    <div className="vertical-title smaller">
                                        <div className="labelHolder">
                                            <label>备注</label>
                                        </div>
                                    </div>
                                    <div className="comments">
                                        <span className="textarea" title={pdfInvoiceView.remark}>{pdfInvoiceView.remark}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="sell-info invoice-footer">
                                <div className="label-input-fields">
                                    <div className="label-input-field">
                                        <label>收款人：</label>
                                        <span className="input " title="" >{pdfInvoiceView.payee}</span>
                                    </div>
                                    <div className="label-input-field">
                                        <label>复核：</label>
                                        <span className="input " title="" >{pdfInvoiceView.reviewer}</span>
                                    </div>
                                    <div className="label-input-field">
                                        <label>开票人：</label>
                                        <span className="input " title="" >{pdfInvoiceView.drawer}</span>
                                    </div>
                                    <div className="label-input-field signature">
                                        <label>销售方：（ 章 ）</label>
                                        <span className="input"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            pdfInvoiceView.saleItemList.length > 7 &&
                            <div className="invoice-list">
                                <div className="list-header">
                                    <h1>增值税销售货物或者提供应税劳务清单</h1>
                                    <div className="header-block">
                                        <div className="header-block-item">
                                            <span className="voColor">购买方名称：</span><span>{pdfInvoiceView.buyerName}</span>
                                        </div>
                                        <div className="header-block-item ">
                                            <span className="voColor">销售方名称：</span><span>{pdfInvoiceView.supplierName}</span>
                                        </div>
                                        <div className="header-block-item ">
                                            <div className="inline-block-item invoiceCode">
                                                <span className="voColor">所属增值税电子普通发票代码：</span><span >{pdfInvoiceView.invoiceCode}</span>
                                            </div>
                                            <div className="inline-block-item invoiceNo">
                                                <span className="voColor">号码:</span><span >{pdfInvoiceView.invoiceNumber}</span>
                                            </div>
                                            <div className="inline-block-item pageNo">
                                                <span> </span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="product-list">
                                    <div className="list-detail">
                                        <table>
                                            <tbody><tr className="name">
                                                <th>序号</th>
                                                <th>货物(劳务)名称</th>
                                                <th>规格型号</th>
                                                <th>单位</th>
                                                <th>数量</th>
                                                <th>单价</th>
                                                <th>金额</th>
                                                <th>税率</th>
                                                <th>税额</th>
                                            </tr>
                                                {
                                                    pdfInvoiceView.saleItemList.length > 7 && pdfInvoiceView.saleItemList.map((item, index) => {
                                                        return (<tr className="lineItems ng-scope" key={index}>
                                                            <td className="index">{(index + 1)}</td>
                                                            <td className="item-name" >{item.name}</td>
                                                            <td className="specification center">{item.specification}</td>
                                                            <td className="unit center">{item.unit}</td>
                                                            <td className="quantity text-right">{item.quantity}</td>
                                                            <td className="unitPrice text-right">{item.unitPrice && item.unitPrice.toFixed(2)}</td>
                                                            <td className="priceAmount text-right">{item.amountWithoutTax && item.amountWithoutTax.toFixed(2)}</td>
                                                            <td className="taxRate center">{item.taxPercent}</td>
                                                            <td className="taxAmount text-right">{item.taxAmount && item.taxAmount.toFixed(2)}</td>
                                                        </tr>);
                                                    })
                                                }
                                                <tr className="lineItems">
                                                    <td className="voColor">小计</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td className="text-right" >¥{pdfInvoiceView.amountWithoutTax && pdfInvoiceView.amountWithoutTax.toFixed(2)}</td>
                                                    <td></td>
                                                    <td className="taxAmount text-right " >¥{pdfInvoiceView.amountTax && pdfInvoiceView.amountTax.toFixed(2)}</td>
                                                </tr>
                                                <tr className="lineItems">
                                                    <td className="voColor">总计</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td className="text-right" >¥{pdfInvoiceView.amountWithoutTax && pdfInvoiceView.amountWithoutTax.toFixed(2)}</td>
                                                    <td></td>
                                                    <td className="taxAmount text-right " >¥{pdfInvoiceView.amountTax && pdfInvoiceView.amountTax.toFixed(2)}</td>
                                                </tr>
                                                <tr className="remark">
                                                    <th className="voColor">备注</th>
                                                    <th className="word-wrap " colSpan={8} >{pdfInvoiceView.remark}</th>
                                                </tr>
                                            </tbody></table>
                                    </div>
                                </div>

                                <div className="list-footer">
                                    <span className="footer-left voColor">
                                        销售方(章)：
            </span>
                                    <div className="label-input-field footer-right">
                                        <span className="voColor">填开日期：</span>
                                        <div>
                                            <span >{moment.unix(pdfInvoiceView.invoiceDate / 1000)
                                                .format('YYYY')}</span><span className="label">年</span>
                                            <span >{moment.unix(pdfInvoiceView.invoiceDate / 1000)
                                                .format('MM')}</span><span className="label">月</span>
                                            <span >{moment.unix(pdfInvoiceView.invoiceDate / 1000)
                                                .format('DD')}</span><span className="label">日</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </Modal>
            </div>
        );
    }

}
export default BaseTemplate;
