import React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Modal, Button, Select, message } from 'antd';
import { invoiceInput } from 'src/api';
const FormItem = Form.Item;
const Option = Select.Option;
interface UserFormProps extends FormComponentProps {
    onCloseModal: () => void;
    onSwitchHandler:(values:any)=>void;
}
class Component extends React.Component<UserFormProps, any> {
    constructor(props: UserFormProps) {
        super(props);
        this.state = {
            list: []
        };
    }
    onCloseModal = () => {
        this.props.onCloseModal();
    }
    componentDidMount() {
        invoiceInput.GetGroupList(this, {}).then((response: any) => {
            const err = response.err;
            const res = response.res;
            if (err) {
                message.error(err.status.description);
                return null;
            } else {
                if (res) {
                    this.setState({
                        list: res
                    });
                }
            }
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSwitchHandler(values);
                this.props.onCloseModal();
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const {list} = this.state;
        const data = list.map((item, index) => {
            return <Option key={item.groupId}>{item.groupNumber}</Option>;
        });
        return (
            <Modal
                visible={true}
                onCancel={this.props.onCloseModal}
                footer={null}
                title="移动发票组"
            >
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 19 }}
                        label="发票组编号"
                    >
                        {getFieldDecorator('groupId', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择发票组'
                                }
                            ]
                        })(
                            <Select
                                allowClear={true}
                                style={{ width: '100%' }}
                                placeholder="请选择发票组"
                            >
                                {data}
                            </Select>
                        )}
                    </FormItem>
                    <div style={{ 'textAlign': 'center' }}>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </div>
                </Form>

            </Modal>
        );
    }

}
const WrappedModalForm = Form.create()(Component);
export default WrappedModalForm;
