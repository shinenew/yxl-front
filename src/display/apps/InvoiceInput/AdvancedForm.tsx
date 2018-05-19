import React from 'react';
import moment from 'moment';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Row, Col, DatePicker, InputNumber, Select, Input, Button } from 'antd';
import { TransformType } from 'src/entry/constant';
import {transformTypeStringShort} from 'src/entry/Language';
import MyStore from 'src/redux/MyStore';
import { withRouter } from 'src/routes';
const FormItem = Form.Item;
const Option = Select.Option;
const css = require('./index.scss');
interface UserFormProps extends FormComponentProps {

}
interface IProps extends UserFormProps {
    fields: any;
    clearFields: () => void;
    onValuesChange: (values: Array<any>) => void;
    onAddToGroup?: () => void;
    getData: () => void;
    //history:any;
}
@withRouter
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
    onAddToGroup = () => {
        this.props.onAddToGroup();
    }
    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.getData();
                //this.props.history.push('invoiceInput');
            }

        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        return (
            <Form
                onSubmit={this.handleSearch}
                className={css['invoice-filter']}
            >
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
                                    <Option value={TransformType.增值税专用发票}>{transformTypeStringShort(TransformType.增值税专用发票)}</Option>
                                    <Option value={TransformType.增值税普通发票INVOICE}>{transformTypeStringShort(TransformType.增值税普通发票INVOICE)}</Option>
                                    <Option value={TransformType.机动车销售统一发票}>{transformTypeStringShort(TransformType.机动车销售统一发票)}</Option>
                                    <Option value={TransformType.增值税电子普通发票}>{transformTypeStringShort(TransformType.增值税电子普通发票)}</Option>
                                    <Option value={TransformType.增值税普通发票卷票}>{transformTypeStringShort(TransformType.增值税普通发票卷票)}</Option>
                                    <Option value={TransformType.货运运输业增值税专用发票}>{transformTypeStringShort(TransformType.货运运输业增值税专用发票)}</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col xl={8} lg={12} sm={12}>
                        <FormItem {...formItemLayout} label={`销售方`}>
                            {getFieldDecorator('supplierName')(
                                <Input placeholder="支持模糊搜索" />
                            )}
                        </FormItem>
                    </Col>
                    <Col xl={8} lg={12} sm={12} className={css['invoice-filter']}>
                        <FormItem label="开票时间" {...formItemLayout}>
                            <Col span={11}>
                                <FormItem>
                                    {getFieldDecorator('invoiceStartDate')(
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
                                    {getFieldDecorator('invoiceEndDate')(
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
                            {getFieldDecorator('unusualState')(
                                <Select allowClear={true} >
                                    <Option value="NORMAL">正常</Option>
                                    <Option value="UNUSUAL">异常</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col xl={8} lg={12} sm={12}>
                        <FormItem {...formItemLayout} label={`录入用户`}>
                            {getFieldDecorator('userId')(
                                <Select allowClear={true}>
                                    <Option value="">全部用户</Option>
                                    <Option value={MyStore.instance.getState().user.userInfo.cUserId}>当前用户</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={24} className="mb10 ">  
                        <Button
                            className={`mr10 pull-right ${css['invoice-card-but31']} ${css['invoice-card-but-width62']}`}
                            onClick={this.handleReset}
                        >
                            清空
                        </Button>
                        <Button
                            type="primary"
                            className={`mr10 pull-right ${css['invoice-card-but31']} ${css['invoice-card-but-width62']}`}
                            htmlType="submit"
                        >
                            查询
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}
const WrappedAdvancedSearchForm = Form.create({
    mapPropsToFields(props: IProps) {
        return {
            supplierName:
                Form.createFormField({ value: props.fields && props.fields.supplierName })
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
            unusualState:
                Form.createFormField({ value: props.fields && props.fields.unusualState })
            ,
            invoiceStartDate:
                Form.createFormField({ value: props.fields && (props.fields.invoiceStartDate && moment(props.fields.minInvoiceDate)) })
            ,
            invoiceEndDate:
                Form.createFormField({ value: props.fields && (props.fields.invoiceEndDate && moment(props.fields.maxInvoiceDate)) })
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
