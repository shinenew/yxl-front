import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect, ReduxState } from 'src/redux';
import ModulesAction from './Modules.Action';
import ModulesState from './Modules.State';
import { Form, Input, Modal, Row, Col } from 'antd';
import { create } from 'kts-scaffold-framework/utils/form';
// const css = require('./index.scss');
const FormItem = Form.Item;
const { TextArea } = Input;
const formItemLayout = {
    labelCol: {
        span: 5
    },
    wrapperCol: {
        span: 24 - 7 // 中间留空隙
    },
};

/** 全局数据片段数据接口 */
interface IReduxStatePart {

}

/** 组建的props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {
}

/** 绑定全局数据 */
@create()
@ModulesAction.uiconnect
@connect((state: ReduxState): IReduxStatePart => ({

}))
export default class UIAdd extends UIBasic<IProps, ModulesState> {

    /** 构造函数 */
    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    /** 隐藏addOrEdit弹框 */
    hideModal = () => {
        ModulesAction.userModalFn('add', 'hide');
    }

    /** 新增 */
    save = (): void => {
        const { form } = this.props;
        form.validateFields(async (er: any, values: any) => {
            if (er) {
                return;
            }
            // 隐藏addOrEdit弹框
            ModulesAction.userModalFn('add', 'hide');
            ModulesAction.userAdd(values);
        });
    }

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <div>
                <Modal
                    title="新增页"
                    visible={this.modulesState.userModulesState.addVisible}
                    onOk={this.save} // 点击确定回调
                    onCancel={this.hideModal} // 点击遮罩层或右上角叉或取消按钮的回调
                    // footer={null} // 隐藏底部确认和关闭按钮
                    mask={true} // 是否展示遮罩 默认是true
                    maskClosable={false} // 点击蒙层是否允许关闭 默认是true
                    destroyOnClose={true} // 关闭时销毁model里的子元素
                    width={1000} // 宽度   
                >
                    <Form>
                        <Row >
                            <Col span={4}><Input type="hidden" /></Col>
                            <Col span={16} >
                                <FormItem {...formItemLayout} label="员工姓名">
                                    {getFieldDecorator('nickName', {
                                        rules: [{ type: 'string', pattern: /^[-\u4e00-\u9fa5\w]{2,20}$/, required: true, message: '请输入2-20位字符', whitespace: true, }]
                                    })(<Input placeholder="请输入您的姓名" />)}
                                </FormItem>
                            </Col>
                            <Col span={4}><Input type="hidden" /></Col>
                        </Row>
                        <Row>
                            <Col span={4}><Input type="hidden" /></Col>
                            <Col span={16}>
                                <FormItem {...formItemLayout} label="手机号">
                                    {getFieldDecorator('phone', {
                                        rules: [{ type: 'string', pattern: /^1[34578]{1}\d{9}$/, required: false, message: '请输入正确的手机号' }]
                                    })(<Input placeholder="请输入你的手机号" />)}
                                </FormItem>
                            </Col>
                            <Col span={4}><Input type="hidden" /></Col>
                        </Row>
                        <Row>
                            <Col span={4}><Input type="hidden" /></Col>
                            <Col span={16}>
                                <FormItem {...formItemLayout} label="电子邮箱">
                                    {getFieldDecorator('email', {
                                        rules: [{ type: 'email', message: '请输入有效email!', required: true, }],
                                    })(<Input placeholder="请输入您的邮箱" />)}
                                </FormItem>
                            </Col>
                            <Col span={4}><Input type="hidden" /></Col>
                        </Row>
                        <Row>
                            <Col span={4}><Input type="hidden" /></Col>
                            <Col span={16}>
                                <FormItem {...formItemLayout} label="用户备注">
                                    {getFieldDecorator('description', {})(<TextArea placeholder="用户备注" />)}
                                </FormItem>
                            </Col>
                            <Col span={4}><Input type="hidden" /></Col>
                        </Row>
                        <FormItem>
                            {getFieldDecorator('userId', { initialValue: this.modulesState.userModulesState.detail && this.modulesState.userModulesState.detail.userId, })(<input type="hidden" />)}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}