import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect, ReduxState} from 'src/redux';
import ModulesAction from './Modules.Action';
import ModulesState from './Modules.State';
import { Form, Input, Modal, Row, Col } from 'antd';
import { create } from 'kts-scaffold-framework/utils/form';
const FormItem = Form.Item;
const { TextArea } = Input;
// const Option = Select.Option;
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
        ModulesAction.userModalFn('edit', 'hide');
    }

    /** 保存-编辑 */
    edit = (): void => {
        const { form } = this.props;
        // const { user } = MyStore.instance.getState();
        // const companyId = user.userInfo.companyId;
        form.validateFields(async (er: any, values: any) => {
            if (er) {
                return;
            }
            // 隐藏addOrEdit弹框
            ModulesAction.userModalFn('edit', 'hide');
            ModulesAction.userEdit(values);
        });

    }

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <div>
                <Modal
                    title="编辑页"
                    visible={this.modulesState.editVisible}
                    onOk={this.edit} // 点击确定回调
                    onCancel={this.hideModal} // 点击遮罩层或右上角叉或取消按钮的回调
                    // footer={null} // 隐藏底部确认和关闭按钮
                    mask={true} // 是否展示遮罩 默认是true
                    maskClosable={false} // 点击蒙层是否允许关闭 默认是true
                    destroyOnClose={true} // 关闭时销毁model里的子元素
                    width={1000} // 宽度   
                >
                    <Form>
                        <Row >
                            <Col span={10}>
                                <FormItem {...formItemLayout} label="用户姓名">
                                    {getFieldDecorator('nickName', {
                                        initialValue: this.modulesState.detail && this.modulesState.detail.nickName,
                                        rules: [{ required: true, message: '用户姓名不能为空' }],

                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>

                            <Col span={10}>
                                <FormItem {...formItemLayout} label="电子邮箱">
                                    <Input disabled={true} />
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={10}>
                                <FormItem {...formItemLayout} label="手机号">
                                    {getFieldDecorator('phone', {
                                        initialValue: this.modulesState.detail && this.modulesState.detail.phone,
                                        // rules: [{ required: true, message: '手机号不能为空' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={10}>
                                <FormItem {...formItemLayout} label="所属部门">
                                    {getFieldDecorator('departmentName', {
                                        initialValue: this.modulesState.detail && this.modulesState.detail.departmentName,
                                    })(
                                        <Input disabled={true} />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={10}>
                                <FormItem {...formItemLayout} label="用户状态">
                                    {this.modulesState.detail && this.modulesState.detail.acceptStatus === 'ACCEPT_ING' && <Input disabled={true} value="邀请中" />}
                                    {this.modulesState.detail && this.modulesState.detail.acceptStatus === 'ACCEPT_NO' && <Input disabled={true} value="已拒绝" />}
                                    {this.modulesState.detail && this.modulesState.detail.isActivated ? <Input disabled={true} value="已激活" /> : <Input disabled={true} value="已禁用" />}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={10}>
                                <FormItem {...formItemLayout} label="用户备注">
                                    {getFieldDecorator('description', {
                                        initialValue: this.modulesState.detail && this.modulesState.detail.description,
                                    })(
                                        <TextArea autosize={{ minRows: 2, maxRows: 6 }} placeholder="用户备注" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <FormItem>
                            {getFieldDecorator('userId', {
                                initialValue: this.modulesState.detail && this.modulesState.detail.userId,
                            })(
                                <input type="hidden" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('companyId', {
                                initialValue: this.modulesState.detail && this.modulesState.detail.companyId,
                            })(
                                <input type="hidden" />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }

}