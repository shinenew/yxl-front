import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import { Modal, Form, Input, TreeSelect } from 'antd';
import { create } from 'kts-scaffold-framework/utils/form';
/** 全局数据片段数据接口 */
interface IReduxStatePart {
}

/** 组建的props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {
}
// 对IReduxStatePart的实现并绑定到组件上
@create()
@ModulesAction.uiconnect
@connect((state: ReduxState): IReduxStatePart => ({

}))

export default class UIComponents extends UIBasic<IProps, ModulesState> {
    public state: ModulesState = new ModulesState();
    /** 构造函数 */
    constructor(props: IProps) {
        super(props, ModulesAction);
    }
    handleOk = (e) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                ModulesAction.saveRole(values);
            }
        });
        setTimeout(() => { 
            this.setState({ loading: false, visible: false });
        }, 4000);
    }
    onChange = (value) => {
        this.modulesState.selectData = value;
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const FormItem = Form.Item;
        const tProps = {
            treeData: this.modulesState.selectDatas,
            treeCheckable: true,
            treeNodeFilterProp: 'title',
            searchPlaceholder: '请选择权限'
        };
        return (
            <div>
                <Modal
                    title="新增角色"
                    visible={this.modulesState.addRoleVisible}
                    onOk={this.handleOk}
                    onCancel={ModulesAction.noAddVisible}
                >
                    <Form>
                        <FormItem
                            label="角色名"
                        >
                            {getFieldDecorator('name', {
                                // initialValue
                                 rules: [{ type: 'string', pattern: /^([-\u4e00-\u9fa5\w]{2,15})+$/, required: true, message: '请输入角色名(2-15位字符)', whitespace: true }]
                            })(
                                <Input type="text" />
                            )}
                        </FormItem>
                        <FormItem
                            label="描述"
                        >
                            {getFieldDecorator('description', {
                                rules: [{ required: false, message: '请输入描述', whitespace: true }]
                            })(
                                <Input type="text" />
                            )}
                        </FormItem>
                        <FormItem
                            label="权限"
                        >
                            {getFieldDecorator('ruleGroups', {
                                rules: [{ required: true, message: '请选择权限', type: 'array' }]
                            })(
                                <TreeSelect {...tProps}/>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}
