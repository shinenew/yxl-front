import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import { Modal , Form, TreeSelect } from 'antd';
import { create } from 'kts-scaffold-framework/utils/form';
// const TreeNode = TreeSelect.TreeNode;
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
export default class UISetDepModal extends UIBasic<IProps, ModulesState> {

    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    /** 关闭窗口 */
    closeModal = () => {
        ModulesAction.closeSetDepModal();
    }
    /** 选择下拉树 */
    onSelect = (value) => {
        console.log(value);
        this.modulesState.depModulesState.selectTreeVal = value;
    }

    /** 保存 */
    saveSet = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                ModulesAction.setUserDep(values.departmentId);
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
                    title="设置所在部门"
                    visible={this.modulesState.depModulesState.isSetDepModal}
                    onOk={this.saveSet}
                    onCancel={this.closeModal}
                    okText="保存"
                    cancelText="取消"
                    // 关闭时清空
                    destroyOnClose={true}
                >
                    <Form.Item {...formItemLayout} label="上级部门">
                        {getFieldDecorator('departmentId', {
                            rules: [
                                { required: true, message: '请选择上级部门' },
                            ],
                            initialValue: this.modulesState.depModulesState.department && this.modulesState.depModulesState.department.parentDepartmentId
                        })(
                            <TreeSelect
                                showSearch={false}
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                treeData={this.modulesState.depModulesState.treeData}
                                onSelect={this.onSelect}
                                className={css.treeStyle}
                                treeDataSimpleMode={true}
                                placeholder={'请选择上级部门'}
                            />
                        )}
                    </Form.Item>
                </Modal>
            </div>
        );
    }
}
