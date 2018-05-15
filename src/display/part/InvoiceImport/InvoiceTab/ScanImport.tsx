import React from 'react';
import { Form, Input, message } from 'antd';
import { alxd } from './VerifyInvoice';
import { invoiceImport } from 'src/api';
import BaseImport, { IProps, create } from './BaseImport';
const FormItem = Form.Item;
@create()
class Component extends BaseImport<IProps, any> {
    public queryTimeout: any;
    public textInput; any;
    constructor(props: IProps) {
        super(props);
        this.state = {
            value: '',
            loading: false,
            showCheck: false,
            tip: '开具金额(不含税)',
            url: this.props.url && this.props.url.key4
        };
        this.focusTextInput = this.focusTextInput.bind(this);
    }
    handleSubmit = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({
                    value: null
                });
                const companyId = sessionStorage.getItem('companyId');
                const loggedUserId = sessionStorage.getItem('userId');
                let data = {
                    ...values,
                    url: this.state.url,
                    companyId,
                    loggedUserId,
                };
                invoiceImport.scanImport(this, data).then((res: any) => {
                    if (res.er) {
                        message.error(err.status.description);
                        return null;
                    } else {
                        super.forceUpdate();
                        this.success();
                    }
                });

            }
        });
    }
    resetForm = () => {
        const { resetFields } = this.props.form;
        resetFields();
    }
    success = () => {
        message.success('上传成功');
    }
    error = () => {
        message.error('上传失败，请稍后重新上传');
    }
    componentDidMount() {
        this.focusTextInput();
    }
    onScannerChange = (e) => {
        clearTimeout(this.queryTimeout);
        this.setState({
            value: e.target.value
        }, () => { this.queryTimeout = setTimeout(this.onGetqrcode, 200); });


    }
    onGetqrcode = () => {
        let code = this.state.value;
        let array = code.replace(/， /g, ',').split(',');
        //console.log(array);

        if (array.length < 7) {
            message.error('数据未识别');
            this.setState({
                value: null
            });
        } else {
            if (array[2].length < 10) {
                return null;
            }
            if (array[3].length < 8) {
                return null;
            }
            let fplx = alxd(array[2]);//fplx 发票类型 

            if ((fplx === '01' || fplx === '02' || fplx === '03')) {
                let tip = '';
                if (fplx === '02') {
                    tip = '合计金额';
                } else if (fplx === '03') {
                    tip = '不含税价';
                } else {
                    tip = '开具金额(不含税)';
                }
                this.setState({
                    showCheck: false,
                    tip: tip
                });
            } else if (fplx === '04' || fplx === '10' || fplx === '11' || fplx === '14') {
                this.setState({
                    showCheck: true
                });
            }

            let r = new RegExp(/^[0-9]*$/);
            //console.log(r.test(array[2]),r.test(array[3]),r.test(array[5]),new RegExp(/^[0-9].*$/).test(array[4]))
            if (r.test(array[2]) && r.test(array[3]) && r.test(array[5]) && new RegExp(/^[0-9].*$/).test(array[4])) {

                this.props.form.setFieldsValue({
                    invoiceCode: array[2],
                    invoiceNumber: array[3],
                    invoiceDate: array[5].substring(0, 4) + '-' + array[5].substring(4, 6) + '-' + array[5].substring(6, 8),
                    amountWithoutTax: array[4],
                    invoiceParityCode: array[6].substr(-6, 6)
                });
                this.handleSubmit();

            } else {
                message.error('数据未识别');
                this.setState({
                    value: null
                });
            }

        }
    }

    onScannerBlur = () => {
        this.textInput.focus();
    }
    focusTextInput() {
        this.textInput.focus();
    }
    render() {
        let formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{ width: '600px' }}>
                <Form style={{ width: '360px', 'display': 'inline-block' }}>
                    <FormItem {...formItemLayout} label="扫码输入" style={{ height: 0, opacity: 0 }}>
                        <Input ref={(input) => { this.textInput = input; }} onChange={this.onScannerChange} onBlur={this.onScannerBlur} value={this.state.value} />
                    </FormItem>
                    <FormItem {...formItemLayout} label="发票代码">
                        {getFieldDecorator('invoiceCode'
                        )(
                            <Input readOnly={true} />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="发票号码">
                        {getFieldDecorator('invoiceNumber')(
                            <Input readOnly={true} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="开票日期"
                    >
                        {getFieldDecorator('invoiceDate')(
                            <Input readOnly={true} />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label={this.state.tip} className={this.state.showCheck ? 'hide' : ''}>
                        {getFieldDecorator('amountWithoutTax')(
                            <Input readOnly={true} />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="校验码" className={this.state.showCheck ? '' : 'hide'}>
                        {getFieldDecorator('invoiceParityCode')(
                            <Input readOnly={true} />
                        )}
                    </FormItem>
                </Form>
                
                <div style={{ width: 560, 'padding': '10px 0px 0', 'borderTop': '1px solid #cccccc', 'color': '#999999' }}>请将扫码枪靠近发票二维码，并保证二维码清晰，系统会自动进行发票录入。(扫码多次失败可以尝试把输入法设置成小写)</div>
            </div>
        );
    }

}
const ScanImport = Form.create()(Component);
export default ScanImport;
