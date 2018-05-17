import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import { Modal, Input, Form, TreeSelect } from 'antd';
import { create } from 'kts-scaffold-framework/utils/form';
const { TextArea } = Input;
// const TreeNode = TreeSelect.TreeNode;
const css = require('./index.scss');

/** Redux接口  */
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
export default class UIAddDepModal extends UIBasic<IProps, ModulesState> {

    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    /** 关闭窗口 */
    closeModal = () => {
        ModulesAction.closeDepUserModal();
    }
    /** 选择下拉树 */
    onSelect = (value) => {
        console.log(value);
        this.modulesState.depModulesState.selectTreeVal = value;
    }

    /** 保存 */
    saveUser = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                ModulesAction.saveDep(values.parentDepartmentId, values.number, values.name, values.description);
            }
        });
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
                title="新增部门"
                visible={this.modulesState.depModulesState.isDepModal}
                onOk={this.saveUser}
                onCancel={this.closeModal}
                okText="保存"
                cancelText="取消"
                // 关闭时清空
                destroyOnClose={true}
            >
                <Form.Item {...formItemLayout} label="上级部门">
                    {getFieldDecorator('parentDepartmentId', {
                        rules: [
                            { required: true, message: '请选择上级部门' },
                        ],
                    })(
                        <TreeSelect
                            showSearch={false}
                            // value={val}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            treeData={this.modulesState.depModulesState.treeData}
                            onSelect={this.onSelect}
                            className={css.treeStyle}
                            treeDataSimpleMode={true}
                            placeholder={'请选择上级部门'}
                        />
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="部门编码">
                    {getFieldDecorator('number', {
                        rules: [
                            { required: true, message: '请输入部门编码' },
                        ],
                    })(<Input size="large" placeholder="请输入部门编码" />)}
                </Form.Item>

                <Form.Item {...formItemLayout} label="部门名称">
                    {getFieldDecorator('name', {
                        rules: [
                            { required: true, message: '请输入部门名称' },
                        ],
                    })(<Input size="large" placeholder="请输入部门名称" />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="备注">
                    {getFieldDecorator('description')(<TextArea rows={4} maxLength={128} placeholder="最多输入128个字符"/> )}
                </Form.Item>
            </Modal>
            </div>
        );
    }
}
