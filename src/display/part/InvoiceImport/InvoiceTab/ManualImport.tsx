import { Button, Col, DatePicker, Form, Input, message, Row, InputNumber } from 'antd';
import React from 'react';
import { getSwjg, adm, alxd } from './VerifyInvoice';
import { invoiceImport } from 'src/api';
import BaseImport, { IProps, create } from './BaseImport';
const FormItem = Form.Item;
@create()
class Component extends BaseImport<IProps, any> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            value: '',
            loading: false,
            showCheck: false,
            tip: '开具金额(不含税)',
            url: this.props.url && this.props.url.key4
        };
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const companyId = sessionStorage.getItem('companyId');
                const loggedUserId = sessionStorage.getItem('userId');
                const url = this.state.url;
                let data = {
                    ...values,
                    companyId,
                    invoiceDate:
                        values['invoiceDate'] &&
                        values['invoiceDate'].format('YYYY-MM-DD'),
                    loggedUserId,
                    url
                };

                invoiceImport.manualImport(this, data).then((response: any) => {
                    const err2 = response.err;
                    //const res = response.res;
                    this.setState({ loading: false });
                    if (err2) {
                        message.error(err2.status.description);
                        return null;
                    } else {
                        this.success();
                    }
                });
                this.setState({ loading: true });
            }
        });
    }
    resetForm = () => {
        const { resetFields } = this.props.form;
        resetFields();
    }
    success = () => {
        message.success('录入成功');
        super.callback();
    }
    error = () => {
        message.error('录入失败');
    }
    onCodeChange = (rule, value, callback) => {
        //检测是否为全数字
        if (rule.pattern.test(value)) {
            if (value.length === 10 || value.length === 12) {
                let swjginfo = getSwjg(value, 0);
                if (swjginfo.length === 0) {
                    callback('发票代码有误!');
                } else {
                    if (!adm(value) || swjginfo.length === 0) {
                        callback('发票代码有误!');
                    } else {
                        let fplx = alxd(value);//fplx 发票类型 

                        if ((fplx === '01' || fplx === '02' || fplx === '03')) {
                            this.setState({
                                showCheck: false
                            });
                            if (fplx === '02') {
                                this.setState({
                                    tip: '合计金额'
                                });
                            } else if (fplx === '03') {
                                this.setState({
                                    tip: '不含税价'
                                });
                            } else {
                                this.setState({
                                    tip: '开具金额(不含税)'
                                });
                            }
                        } else if (fplx === '04' || fplx === '10' || fplx === '11' || fplx === '14') {
                            this.setState({
                                showCheck: true
                            });
                        }
                        callback();
                    }
                }
            } else {
                callback('请输入10位或12位合法的发票代码');
            }
        } else {
            callback('发票代码只支持数字');
        }
    }
    render() {
        let formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 }
        };
        const { getFieldDecorator } = this.props.form;
        const config = {
            rules: [{ type: 'object', required: true, message: '请输入开票时间' }]
        };
        return (
            <Form className="manual-write-style special" onSubmit={this.handleSubmit}>
                <Row>
                    <Col span={21}>
                        <FormItem {...formItemLayout} label="发票代码" hasFeedback={true}>
                            {getFieldDecorator('invoiceCode', {
                                rules: [
                                    {
                                        required: true,
                                        pattern: /^[0-9]*$/,
                                        validator: this.onCodeChange
                                    }
                                ]
                            })(
                                <Input placeholder="10位或12位发票码" maxLength="12" />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={21}>
                        <FormItem {...formItemLayout} label="发票号码">
                            {getFieldDecorator('invoiceNumber', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入8位发票号码（只支持数字)',
                                        pattern: /^\d{8}$/
                                    }
                                ]
                            })(<Input placeholder="8位发票号码" maxLength="8" />)}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={21}>
                        <FormItem {...formItemLayout} label="开票日期">
                            {getFieldDecorator('invoiceDate', config)(
                                <DatePicker style={{ width: '100%' }} />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={21}>
                        {!this.state.showCheck && (
                            <FormItem {...formItemLayout} label={this.state.tip}>
                                {getFieldDecorator('amountWithoutTax', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入金额（小数点最多输入两位,最大长度12位数包括小数)',
                                        }
                                    ]
                                })(
                                    <InputNumber style={{ width: '100%' }} max={999999999999.99} precision={2} />
                                )}
                            </FormItem>
                        )}

                        {this.state.showCheck && (
                            <FormItem {...formItemLayout} label="校验码">
                                {getFieldDecorator('invoiceParityCode', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入6位校验码（只支持数字)',
                                            pattern: /^\d{6}$/
                                        }
                                    ]
                                })(
                                    <Input placeholder="发票校验码后6位" maxLength="6" />
                                )}
                            </FormItem>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <FormItem className="text-center">
                            <Button type="primary" htmlType="submit" loading={this.state.loading}>
                                确认保存
                            </Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        );
    }
}
const ManualImport = Form.create()(Component);
export default ManualImport;
