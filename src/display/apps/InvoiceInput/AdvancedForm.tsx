import React from 'react';
import moment from 'moment';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Row, Col, DatePicker, InputNumber, Select, Input, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
interface UserFormProps extends FormComponentProps {

}
interface IProps extends UserFormProps {
    fields: any;
    clearFields: () => void;
    onValuesChange: (values: Array<any>) => void;
    onAddGroup: () => void;
}
class Component extends React.Component<IProps, any> {
    /**
     * 高级搜索
     * @param {*} props 
     */
    constructor(props: IProps) {
        super(props);
        this.state = {
            expand: false
        };
    }

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }

    handleReset = () => {
        this.props.clearFields();
        this.props.form.resetFields();
    }
    onAddGroup = () => {
        this.props.onAddGroup();
    }
    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let data = {
                ...values,
            };
            console.log(data);
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        return (
            <Form onSubmit={this.handleSearch}>
                <Row>
                    <Col xl={8} lg={12} sm={12}>
                        <FormItem {...formItemLayout} label={`发票代码`}>
                            {getFieldDecorator('invoiceCode')(
                                <Input />
                            )}
                        </FormItem>
                    </Col>
                    <Col xl={8} lg={12} sm={12}>
                        <FormItem {...formItemLayout} label={`发票号码`}>
                            {getFieldDecorator('invoiceNumber')(
                                <Input />
                            )}
                        </FormItem>
                    </Col>
                    <Col xl={8} lg={12} sm={12}>
                        <FormItem {...formItemLayout} label={`发票类型`}>
                            {getFieldDecorator('invoiceType')(
                                <Select allowClear={true}>
                                    <Option value="VAT_SPECIAL_INVOICE">专票</Option>
                                    <Option value="VAT_INVOICE">普票</Option>
                                    <Option value="VAT_SPECIAL_INVOICE_MOTORVEHICLE">机票</Option>
                                    <Option value="VAT_INVOICE_ELECTRONIC">电票</Option>
                                    <Option value="VAT_INVOICE_VOLUME">卷票</Option>
                                    <Option value="VAT_SPECIAL_INVOICE_TRANSPORTATION">货票</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col xl={8} lg={12} sm={12}>
                        <FormItem {...formItemLayout} label={`销售方`}>
                            {getFieldDecorator('fuzzySupplierName')(
                                <Input placeholder="支持模糊搜索" />
                            )}
                        </FormItem>
                    </Col>
                    <Col xl={8} lg={12} sm={12}>
                        <FormItem label="开票时间" {...formItemLayout}>
                            <Col span={11}>
                                <FormItem>
                                    {getFieldDecorator('minInvoiceDate')(
                                        <DatePicker style={{ width: '100%' }} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={2}>
                                <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                                    -
                            </span>
                            </Col>
                            <Col span={11}>
                                <FormItem>
                                    {getFieldDecorator('maxInvoiceDate')(
                                        <DatePicker style={{ width: '100%' }} />
                                    )}
                                </FormItem>
                            </Col>
                        </FormItem>
                    </Col>
                    <Col xl={8} lg={12} sm={12}>
                        <FormItem label="价税合计" {...formItemLayout} >
                            <Col span={11}>
                                <FormItem>
                                    {getFieldDecorator('minAmount')(
                                        <InputNumber style={{ width: '100%' }} precision={2} />
                                    )}

                                </FormItem>
                            </Col>
                            <Col span={2}>
                                <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                                    -
                            </span>
                            </Col>
                            <Col span={11}>
                                <FormItem>
                                    {getFieldDecorator('maxAmount')(
                                        <InputNumber style={{ width: '100%' }} precision={2} />
                                    )}
                                </FormItem>
                            </Col>
                        </FormItem>
                    </Col>
                    <Col xl={8} lg={12} sm={12}>
                        <FormItem {...formItemLayout} label={`状态`}>
                            {getFieldDecorator('state')(
                                <Select allowClear={true} >
                                    <Option value="FAILED">正常</Option>
                                    <Option value="PASS">异常</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col xl={8} lg={12} sm={12}>
                        <FormItem {...formItemLayout} label={`录入用户`}>
                            {getFieldDecorator('userId')(
                                <Select allowClear={true}>
                                    <Option value="">全部用户</Option>
                                    <Option value="">当前用户</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={24} className="mb10 text-right">
                        <Button type="primary" onClick={this.onAddGroup}>添加发票组</Button>
                        <Button className="mr10" onClick={this.handleReset}>清空</Button>
                        <Button type="primary" htmlType="submit">筛选</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}
const WrappedAdvancedSearchForm = Form.create({
    mapPropsToFields(props: IProps) {
        return {
            fuzzySupplierName:
                Form.createFormField({ value: props.fields && props.fields.fuzzySupplierName })
            ,
            invoiceCode:
                Form.createFormField({ value: props.fields && props.fields.invoiceCode })
            ,
            invoiceNumber:
                Form.createFormField({ value: props.fields && props.fields.invoiceNumber })
            ,
            userId:
                Form.createFormField({ value: props.fields && props.fields.userId })
            ,
            invoiceType:
                Form.createFormField({ value: props.fields && props.fields.invoiceType })
            ,
            state:
                Form.createFormField({ value: props.fields && props.fields.state })
            ,
            minInvoiceDate:
                Form.createFormField({ value: props.fields && (props.fields.minInvoiceDate && moment(props.fields.minInvoiceDate)) })
            ,
            maxInvoiceDate:
                Form.createFormField({ value: props.fields && (props.fields.maxInvoiceDate && moment(props.fields.maxInvoiceDate)) })
            ,
            minAmount:
                Form.createFormField({ value: props.fields && props.fields.minAmount })
            ,
            maxAmount:
                Form.createFormField({ value: props.fields && props.fields.maxAmount })
            ,

        };
    },
    onValuesChange(props: IProps, values: Array<any>) {
        props.onValuesChange(values);
    },
})(Component);
export default WrappedAdvancedSearchForm;
