import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import { Modal, Input, Form, TreeSelect, Button, Row, Col, message } from 'antd';
const { TextArea } = Input;
// const TreeNode = TreeSelect.TreeNode;
import { create } from 'kts-scaffold-framework/utils/form';
const css = require('./index.scss');

/** Redux接口 */
interface IReduxStatePart {

}

/** Props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {

}

/** 绑定全局数据到props */
@create()
@ModulesAction.uiconnect
@connect((state: ReduxState): IReduxStatePart => ({

}))
export default class UIUpdDepModal extends UIBasic<IProps, ModulesState> {
    /** 组建状态 */
    public state: ModulesState = new ModulesState();

    constructor(props: IProps) {
        super(props, ModulesAction);
        this.modulesState.editParent = false;
        this.setState(this.modulesState);
    }

    /** 关闭窗口 */
    closeModal = () => {
        ModulesAction.closeUpdDepUserModal();
    }
    /** 选择下拉树 */
    onSelect = (value) => {
        console.log(value);
        this.modulesState.selectTreeVal = value;
    }

    /** 保存 */
    saveUser = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                ModulesAction.updDep(values);
            }
        });
    }

    /** 修改上级部门 */
    changeMode = () => {
        this.modulesState.editParent = true;
        this.setState(this.modulesState);
    }

    /** 取消修改上级部门 */
    onFallback = () => {
        this.modulesState.editParent = false;
        this.setState(this.modulesState);
    }

    /** 保存修改上级部门 */
    changeDep = () => {
        this.modulesState.editParent = false;
        console.log(this.props.form.getFieldsValue(['parentDepartmentId']));
        let depId = this.props.form.getFieldsValue(['parentDepartmentId']);
        if (!depId) {
            message.warn('请选择上级部门');
            return;
        }

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                ModulesAction.updParentDep(values);
            }
        });

        this.setState(this.modulesState);
    }

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
        };
        return (
            <div>
                <Modal
                    title="修改部门"
                    visible={this.modulesState.isUpdDepModal}
                    onOk={this.saveUser}
                    onCancel={this.closeModal}
                    okText="保存"
                    cancelText="取消"
                    // 关闭时清空
                    destroyOnClose={true}
                >
                    <Form.Item {...formItemLayout} style={{ display: 'none' }}>
                        {getFieldDecorator('departmentId', {
                            initialValue: this.modulesState.department && this.modulesState.department.departmentId
                        })(<input type="hidden" />)}
                    </Form.Item>

                    <Form.Item {...formItemLayout} style={{ display: 'none' }}>
                        {getFieldDecorator('createTime', {
                            initialValue: this.modulesState.department && this.modulesState.department.createTime
                        })(<input type="hidden" />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="上级部门">
                        {getFieldDecorator('parentDepartmentId', {
                            rules: [
                                { required: true, message: '请选择上级部门' },
                            ],
                            initialValue: this.modulesState.department && this.modulesState.department.parentDepartmentId
                        })(
                            <TreeSelect
                                showSearch={false}
                                // value={val}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                treeData={this.modulesState.treeData}
                                onSelect={this.onSelect}
                                className={css.treeStyle}
                                treeDataSimpleMode={true}
                                placeholder={'请选择上级部门'}
                                disabled={!this.modulesState.editParent}
                            />
                        )}

                    </Form.Item>
                    <Form.Item {...formItemLayout}>
                        <Row>
                            <Col span={20} offset={5}>
                                {!this.modulesState.editParent && <Button type="primary" onClick={this.changeMode}>修改</Button>}
                                {this.modulesState.editParent && <span>
                                    <Button type="primary" onClick={this.changeDep} style={{ marginRight: 10 }}>保存</Button>
                                    <Button type="default" onClick={this.onFallback} className="ml-10">取消</Button>
                                </span>}
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="部门编码">
                        {getFieldDecorator('number', {
                            rules: [
                                { required: true, message: '请输入部门编码' },
                            ],
                            initialValue: this.modulesState.department && this.modulesState.department.number
                        })(<Input size="large" placeholder="请输入部门编码" />)}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="部门名称">
                        {getFieldDecorator('name', {
                            rules: [
                                { required: true, message: '请输入部门名称' },
                            ],
                            initialValue: this.modulesState.department && this.modulesState.department.name
                        })(<Input size="large" placeholder="请输入部门名称" />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="备注">
                        {getFieldDecorator('description', { initialValue: this.modulesState.department && this.modulesState.department.description })
                            (<TextArea rows={4} maxLength={128} placeholder="最多输入128个字符" />)}
                    </Form.Item>
                </Modal>
            </div>
        );
    }
}
