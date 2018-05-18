import React from 'react';
import { Modal, Col } from 'antd';
import BaseTemplate from './BaseTemplate';
import { getCityName } from 'src/entry/constant/InvoiceType/EnumInvoiceType';
import { Field } from 'kts-scaffold-framework/utils/doc';
import { withRouter } from 'src/routes';
import { formatTime } from 'src/utils/FormatTime';
@withRouter
class CarTemplate extends BaseTemplate {
    constructor(props: any) {
        super(props);
    }
    handleCancel = () => {
        debugger;
        super.handleRoleCancel();
    }
    
    render() {
        const { data } = this.props;
        return (
            <Modal
                visible={true}
                width="900px"
                footer={null}
                onCancel={this.handleCancel}
            >
                <div className="car-invoice">
                    <div className="header">
                        <h2>
                            {getCityName(data.invoiceCode)}机动车销售统一发票
                        </h2>
                        <h3>发票联</h3>
                    </div>
                    <div className="tips">
                        <span className="with-color">开票日期：</span>
                        {formatTime(data.invoiceDate).substring(
                            0,
                            formatTime(data.invoiceDate).length -
                            5
                        )}
                    </div>
                    <div className="invoice-tips">
                        <div>
                            <span className="with-color">发票代码: </span>
                            {data.invoiceCode}
                        </div>
                        <div>
                            <span className="with-color">发票号码：</span>
                            {data.invoiceNumber}
                        </div>
                    </div>
                    <table

                        cellPadding="0"
                        cellSpacing="0"
                    >
                        <tbody>
                            <tr>
                                <td className="title">
                                    {data.cancellationMark === 'Y' && <img alt="" style={{ 'position': 'absolute', left: '43%', top: '20' }} src="/img/zuofei.png" width="200" />}
                                    <div>机打代码</div>
                                    <div>机打号码</div>
                                    <div>机器编号</div>
                                </td>
                                <td className="wrapper">
                                    <table

                                        cellPadding="0"
                                        cellSpacing="0"
                                    >
                                        <tbody>
                                            <tr>
                                                <td >
                                                    {data.invoiceCode} <br />
                                                    {data.invoiceNumber} <br />
                                                    {data.machineCode}
                                                </td>
                                                <td

                                                    className="title"
                                                >
                                                    税控码
                                                </td>
                                                <td >&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td className="title">
                                    购货单位
                                </td>
                                <td className="wrapper">
                                    <table
                                        cellPadding="0"
                                        cellSpacing="0"
                                    >
                                        <tbody>
                                            <tr>
                                                <td >
                                                    {data.buyerName}
                                                </td>
                                                <td

                                                    className="title"
                                                >
                                                    身份证号码 / 组织机构代码
                                                </td>
                                                <td >
                                                    {data.buyerIDNum || data.buyerIdNum}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td className="title">
                                    车辆类型
                                </td>
                                <td className="wrapper">
                                    <table
                                        cellPadding="0"
                                        cellSpacing="0"
                                    >
                                        <tbody>
                                            <tr>
                                                <td >
                                                    {data.vehicleType}
                                                </td>
                                                <td
                                                    className="title"

                                                >
                                                    厂牌型号
                                                </td>
                                                <td>{data.factoryModel}</td>
                                                <td
                                                    className="title"
                                                >
                                                    产地
                                                </td>
                                                <td>{data.productPlace}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td className="title">
                                    合格证号
                                </td>
                                <td className="wrapper">
                                    <table
                                        cellPadding="0"
                                        cellSpacing="0"
                                    >
                                        <tbody>
                                            <tr>
                                                <td >
                                                    {data.certificate}
                                                </td>
                                                <td
                                                    className="title"

                                                >
                                                    进口证明书号
                                                </td>
                                                <td>
                                                    {data.certificateImport}
                                                </td>
                                                <td
                                                    className="title"
                                                >
                                                    商检单号
                                                </td>
                                                <td>{data.inspectionNum}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td className="title">
                                    发动机号码
                                </td>
                                <td className="wrapper">
                                    <table
                                        cellPadding="0"
                                        cellSpacing="0"
                                    >
                                        <tbody>
                                            <tr>
                                                <td>
                                                    {data.engineNo}
                                                </td>
                                                <td
                                                    className="title"
                                                >
                                                    车辆识别号 / 车架号码
                                                </td>
                                                <td>{data.vehicleNo}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td className="title">
                                    价税合计
                                </td>
                                <td className="wrapper">
                                    <table
                                        cellPadding="0"
                                        cellSpacing="0"
                                    >
                                        <tbody>
                                            <tr>
                                                <td
                                                    style={{
                                                        borderRight: 'none'
                                                    }}
                                                >
                                                    <img style={{ width: 12, height: 12 }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAHTSURBVDjLhdM7T9NRGAbwX4FSCOgi8A0wTAgFo+KomzHyDYiEyRAxQbwtJg2IgA7MihJXNTEI4uKkIWgk0TgoTmLlYgcT+jcRVFoHLv23cnmmc973ed7rORFhlGrU6oRa+5H22QtPvPM7R4mETvXOO63YrFkp1Khz0Joxwz4oQNRZSYsGNKvcCBNR6bAhS75qU5JP7xF4Jh7KmMvc5Lm07rCkXdqoKjuh2gNpbZvXBnPGd6FDjUlf1K+Xc883cXuh2YI7orRI6c+rObLtmUFLjhRpFfEoROnUrQyU63EuJHioxBneeqUyZL4qcF1MTELgUsizz5Rplt3Nq7Vcn2UJvZYlNnJt4r4fZN0oaK9Mv1UresUKPAPWiraZR1YGERnZ/50lAtUF8a/pdEuxLmtuWs3bRpoZL1WEjJcFEmLK9AlcLGj6dbFaJ01a3Bprkym3rfhr2h+/vNkS1OvymONSeW0X7bi4Ad8dpdSopIY9n0aTeSOiEJc05sCu9CoT5nJhOwRGdpFUGZXWnjNEXfHTU4e2/UCNJgR61svJSTrMm9encWvIERXi+i1Iat+khyfS4IJT+OiTlIgadepkjRv2frutE9NiyIy0jIy0GYOOKQ1T/gGrKIJmZtDkEAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNS0xMC0wOFQyMzozMDo1OSswODowMPoOoTwAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTUtMTAtMDhUMjM6MzA6NTkrMDg6MDCLUxmAAAAATnRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA2LjguOC0xMCBRMTYgeDg2XzY0IDIwMTUtMDctMTkgaHR0cDovL3d3dy5pbWFnZW1hZ2ljay5vcmcFDJw1AAAAGHRFWHRUaHVtYjo6RG9jdW1lbnQ6OlBhZ2VzADGn/7svAAAAGHRFWHRUaHVtYjo6SW1hZ2U6OkhlaWdodAA0NDVtXFhQAAAAF3RFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADQ0Nf6tCA0AAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAF3RFWHRUaHVtYjo6TVRpbWUAMTQ0NDMxODI1OSWTlnIAAAATdEVYdFRodW1iOjpTaXplADEzLjRLQkKbmy9AAAAAWnRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8vaG9tZS93d3dyb290L3d3dy5lYXN5aWNvbi5uZXQvY2RuLWltZy5lYXN5aWNvbi5jbi9zcmMvMTE5NDUvMTE5NDUzMi5wbme1f+WMAAAAAElFTkSuQmCC" alt="ⓧ" />
                                                    {Field.toStringChinese(
                                                        data.amount
                                                    )}
                                                </td>
                                                <td
                                                    style={{
                                                        borderLeft: 'none'
                                                    }}
                                                >
                                                    <span className="with-color">
                                                        小写
                                                    </span>
                                                    ¥ {data.amount.toFixed(2)}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td className="title">
                                    单位名称
                                </td>
                                <td className="wrapper">
                                    <table
                                        cellPadding="0"
                                        cellSpacing="0"
                                    >
                                        <tbody>
                                            <tr>
                                                <td >
                                                    {data.supplierName}
                                                </td>
                                                <td
                                                    className="title"
                                                >
                                                    电话
                                                </td>
                                                <td>{data.salerPhone}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td className="title">
                                    纳税人识别号
                                </td>
                                <td className="wrapper">
                                    <table
                                        cellPadding="0"
                                        cellSpacing="0"
                                    >
                                        <tbody>
                                            <tr>
                                                <td>
                                                    {data.supplierTaxId}
                                                </td>
                                                <td
                                                    className="title"
                                                >
                                                    账号
                                                </td>
                                                <td>{data.salerBankAccount}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td className="title">
                                    地址
                                </td>
                                <td className="wrapper">
                                    <table

                                        cellPadding="0"
                                        cellSpacing="0"
                                    >
                                        <tbody>
                                            <tr className="wrapper">
                                                <td >
                                                    {data.supplierAddressPhone}
                                                </td>
                                                <td
                                                    className="title"

                                                >
                                                    开户银行
                                                </td>
                                                <td>
                                                    {data.supplierBankAndId}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td className="title">
                                    增值税税率
                                </td>
                                <td className="wrapper">
                                    <table

                                        cellPadding="0"
                                        cellSpacing="0"
                                    >
                                        <tbody>
                                            <tr>
                                                <td>
                                                    {data.taxRate}
                                                </td>
                                                <td

                                                    className="title"
                                                >
                                                    增值税税额
                                                </td>
                                                <td >¥{data.amountTax.toFixed(2)}</td>
                                                <td

                                                    className="title"
                                                >
                                                    主管税务机关及代码
                                                </td>
                                                <td>
                                                    {data.taxBureauName} <br />
                                                    {data.taxBureauCode}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td className="title">
                                    不含税价
                                </td>
                                <td className="wrapper last-line">
                                    <table

                                        cellPadding="0"
                                        cellSpacing="0"
                                    >
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span className="with-color">小写</span> ¥{data.amountWithoutTax.toFixed(2)}
                                                </td>
                                                <td
                                                    className="title"

                                                >
                                                    完税凭证号码
                                                </td>
                                                <td >
                                                    {data.taxRecords}
                                                </td>
                                                <td
                                                    className="title"

                                                >
                                                    吨位
                                                </td>
                                                <td >
                                                    {data.tonnage}
                                                </td>
                                                <td
                                                    className="title"

                                                >
                                                    限乘人数
                                                </td>
                                                <td>{data.limitPeople}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="footer">
                        <Col span={8}>
                            <span className="with-color">销货单位盖章</span>
                        </Col>
                        <Col span={8}>
                            <span className="with-color">开票人：</span>
                        </Col>
                        <Col span={8}>
                            <span className="with-color">备注：</span>
                        </Col>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default CarTemplate;
