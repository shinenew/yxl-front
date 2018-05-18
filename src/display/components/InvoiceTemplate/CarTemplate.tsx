import React from 'react';
import { Modal, Col } from 'antd';
import BaseTemplate from './BaseTemplate';
import { getCityName } from 'src/entry/constant/InvoiceType/EnumInvoiceType';
import { Field } from 'kts-scaffold-framework/utils/doc';
import { formatTime } from 'src/utils/FormatTime';
declare module 'react' {
    interface TdHTMLAttributes<T> {
        width?: any;
        height?: any;
    }
    interface TableHTMLAttributes<T> {
        width?: any;
        height?: any;
    }
}
class CarTemplate extends BaseTemplate {

    constructor(props: any) {
        super(props);
    }
    handleCancel = () => {
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
                        style={{
                            width: 860,
                            height: 540
                        }}
                        cellPadding="0"
                        cellSpacing="0"
                    >
                        <tbody>
                            <tr>
                                <td style={{ width: 110, height: 95 }} className="title">
                                    <div>机打代码</div>
                                    <div>机打号码</div>
                                    <div>机器编号</div>
                                </td>
                                <td style={{ width: 750 }} className="wrapper">
                                    <table

                                        style={{
                                            width: '100%',
                                            height: 95
                                        }}
                                        cellPadding="0"
                                        cellSpacing="0"
                                    >
                                        <tbody>
                                            <tr>
                                                <td style={{ width: 255 }} >
                                                    {data.invoiceCode} <br />
                                                    {data.invoiceNumber} <br />
                                                    {data.machineCode}
                                                </td>
                                                <td
                                                    style={{ width: 32 }}
                                                    className="title"
                                                >
                                                    税控码
                                                </td>
                                                <td style={{ width: 463 }}>&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ height: 55 }} className="title">
                                    购货单位
                                </td>
                                <td className="wrapper">
                                    <table
                                        style={{ width: '100%', height: 55 }}
                                        cellPadding="0"
                                        cellSpacing="0"
                                    >
                                        <tbody>
                                            <tr>
                                                <td style={{ width: 268 }}>
                                                    {data.buyerName}
                                                </td>
                                                <td
                                                    style={{ width: 180 }}
                                                    className="title"
                                                >
                                                    身份证号码 / 组织机构代码
                                                </td>
                                                <td style={{ width: 220 }}>
                                                    {data.buyerIDNum || data.buyerIdNum}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ height: 40 }} className="title">
                                    车辆类型
                                </td>
                                <td className="wrapper">
                                    <table
                                        style={{
                                            width: '100%',
                                            height: 40
                                        }}
                                        cellPadding="0"
                                        cellSpacing="0"
                                    >
                                        <tbody>
                                            <tr>
                                                <td style={{ width: 200 }}>
                                                    {data.vehicleType}
                                                </td>
                                                <td
                                                    className="title"
                                                    style={{ width: 100 }}
                                                >
                                                    厂牌型号
                                                </td>
                                                <td>{data.factoryModel}</td>
                                                <td
                                                    className="title"
                                                    style={{ width: 50 }}
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
                                <td height="40" className="title">
                                    合格证号
                                </td>
                                <td className="wrapper">
                                    <table
                                        width="100%"
                                        height="40"
                                        cellPadding="0"
                                        cellSpacing="0"
                                    >
                                        <tbody>
                                            <tr>
                                                <td width="200">
                                                    {data.certificate}
                                                </td>
                                                <td
                                                    className="title"
                                                    width="100"
                                                >
                                                    进口证明书号
                                                </td>
                                                <td>
                                                    {data.certificateImport}
                                                </td>
                                                <td
                                                    className="title"
                                                    width="80"
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
                                <td height="40" className="title">
                                    发动机号码
                                </td>
                                <td className="wrapper">
                                    <table
                                        width="100%"
                                        height="40"
                                        cellPadding="0"
                                        cellSpacing="0"
                                    >
                                        <tbody>
                                            <tr>
                                                <td width="200">
                                                    {data.engineNo}
                                                </td>
                                                <td
                                                    className="title"
                                                    width="200"
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
                                <td height="40" className="title">
                                    价税合计
                                </td>
                                <td className="wrapper">
                                    <table
                                        width="100%"
                                        height="40"
                                        cellPadding="0"
                                        cellSpacing="0"
                                    >
                                        <tbody>
                                            <tr>
                                                <td
                                                    style={{
                                                        borderRight: 'none'
                                                    }}
                                                    width="500"
                                                >
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
                                <td height="40" className="title">
                                    单位名称
                                </td>
                                <td className="wrapper">
                                    <table
                                        width="100%"
                                        height="40"
                                        cellPadding="0"
                                        cellSpacing="0"
                                    >
                                        <tbody>
                                            <tr>
                                                <td width="450">
                                                    {data.supplierName}
                                                </td>
                                                <td
                                                    className="title"
                                                    width="60"
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
                                <td height="40" className="title">
                                    纳税人识别号
                                </td>
                                <td className="wrapper">
                                    <table
                                        width="100%"
                                        height="40"
                                        cellPadding="0"
                                        cellSpacing="0"
                                    >
                                        <tbody>
                                            <tr>
                                                <td width="450">
                                                    {data.supplierTaxId}
                                                </td>
                                                <td
                                                    className="title"
                                                    width="60"
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
                                <td height="40" className="title">
                                    地址
                                </td>
                                <td className="wrapper">
                                    <table
                                        width="100%"
                                        height="40"
                                        cellPadding="0"
                                        cellSpacing="0"
                                    >
                                        <tbody>
                                            <tr className="wrapper">
                                                <td width="300">
                                                    {data.supplierAddressPhone}
                                                </td>
                                                <td
                                                    className="title"
                                                    width="80"
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
                                <td height="70" className="title">
                                    增值税税率
                                </td>
                                <td className="wrapper">
                                    <table
                                        width="100%"
                                        height="70"
                                        cellPadding="0"
                                        cellSpacing="0"
                                    >
                                        <tbody>
                                            <tr>
                                                <td width="70">
                                                    {data.taxRate}
                                                </td>
                                                <td
                                                    width="100"
                                                    className="title"
                                                >
                                                    增值税税额
                                                </td>
                                                <td width="100">¥{data.amountTax.toFixed(2)}</td>
                                                <td
                                                    width="120"
                                                    className="title"
                                                >
                                                    主管税务机关及代码
                                                </td>
                                                <td width="200">
                                                    {data.taxBureauName} <br />
                                                    {data.taxBureauCode}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td height="40" className="title">
                                    不含税价
                                </td>
                                <td className="wrapper last-line">
                                    <table
                                        width="100%"
                                        height="41"
                                        cellPadding="0"
                                        cellSpacing="0"
                                    >
                                        <tbody>
                                            <tr>
                                                <td width="150">
                                                    小写 ¥{data.amountWithoutTax.toFixed(2)}
                                                </td>
                                                <td
                                                    className="title"
                                                    width="120"
                                                >
                                                    完税凭证号码
                                                </td>
                                                <td width="160">
                                                    {data.taxRecords}
                                                </td>
                                                <td
                                                    className="title"
                                                    width="63"
                                                >
                                                    吨位
                                                </td>
                                                <td width="80">
                                                    {data.tonnage}
                                                </td>
                                                <td
                                                    className="title"
                                                    width="100"
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
