import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect, ReduxState } from 'src/redux';
import ModulesAction from './Modules.Action';
import ModulesState from './Modules.State';
import { Modal, Form, Select, Row, Col, Icon } from 'antd';
import { create } from 'kts-scaffold-framework/utils/form';
const FormItem = Form.Item;
const { Option } = Select;
// const formItemLayout = {
//     labelCol: { span: 6 },
//     wrapperCol: { span: 18 },
// };
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
export default class UIDetail extends UIBasic<IProps, ModulesState> {

    /** 构造函数 */
    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    /** 隐藏详情弹框 */
    hideModal = () => {
        ModulesAction.userModalFn('role', 'hide');
    }

    /** 修改用户角色 */
    userRoleUpdate = () => {
        const { form } = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let detail = this.modulesState.detail;
                ModulesAction.userRoleEdit(detail && detail.userId, detail && detail.companyId, values.roles);
                ModulesAction.userModalFn('role', 'hide');
            }
        });
    }

    render() {
        // 生成多选列表
        const data = this.modulesState.userCompanyRole && this.modulesState.userCompanyRole.map((item, index) => {
            return <Option key={index} value={item.roleId} title={item.description}>{item.name}</Option>;
        });
        // 当前选中角色
        const curRole = this.modulesState.userCurrentRole && this.modulesState.userCurrentRole.map(item => item.roleId);
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Modal
                    title="角色绑定页"
                    visible={this.modulesState.roleVisible}
                    onOk={this.userRoleUpdate} // 点击确定回调
                    onCancel={this.hideModal} // 点击遮罩层或右上角叉或取消按钮的回调
                    // footer={null} // 隐藏底部确认和关闭按钮
                    mask={true} // 是否展示遮罩 默认是true
                    maskClosable={false} // 点击蒙层是否允许关闭 默认是true
                    destroyOnClose={true} // 关闭时销毁model里的子元素
                    width={600}// 宽度
                >
                    <Row style={{ margin: '25px' }}>
                        <Col span={6}>
                            <span style={{ color: '#108ee9', marginTop: '5px', display: 'block' }}>
                                <Icon type="user-add" /> 选择角色:
                            </span>
                        </Col>
                        <Col span={18}>
                            <Form>
                                <FormItem label="">
                                    {getFieldDecorator('roles',
                                        { initialValue: curRole })(
                                            <Select
                                                mode="multiple"
                                                style={{ width: '100%' }}
                                                placeholder="请选择角色"
                                            >
                                                {data}
                                            </Select>
                                        )}
                                </FormItem>
                            </Form>
                        </Col>
                    </Row>
                </Modal>
            </div>
        );
    }
}