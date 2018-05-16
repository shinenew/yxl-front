import React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Form, Modal, Button, Input ,message} from 'antd';
import { invoiceInput } from 'src/api';
const FormItem = Form.Item;
interface UserFormProps extends FormComponentProps {
    onCloseModal: () => void;
}
class Component extends React.Component<UserFormProps, any> {
    onCloseModal = () => {
        this.props.onCloseModal();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err){
                invoiceInput.CreatGroup(this, values).then((response: any) => {
                    const err2 = response.err;
                    const res = response.res;
                    if (err2) {
                        message.error(err2.status.description);
                        return null;
                    } else {
                        if(res){
                            message.success('操作成功');
                            this.onCloseModal();
                        }
                    }
                });
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        
        return (
            <Modal
                visible={true}
                onCancel={this.props.onCloseModal}
                footer={null}
                title="新增发票组"
            >
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 19 }}
                        label="发票组名字"
                    >
                        {getFieldDecorator('groupNumber', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入发票组名字'
                                }
                            ]
                        })(
                            <Input />
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
