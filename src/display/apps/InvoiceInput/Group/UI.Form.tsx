import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { create } from 'kts-scaffold-framework/utils/form';
import { connect } from 'src/redux';
import { history } from 'src/routes';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import UITable from './UI.Table';
import {
    Form,
    Input,
    Button,
    Row,
    Col,
    Modal
} from 'antd';
const FormItem  = Form.Item;
const confirm = Modal.confirm;

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
export default class UIComponents extends UIBasic<IProps, ModulesState> {

    constructor(props: IProps) {
        super(props, ModulesAction);
    }
    
    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;

        return (
            <Form
                className={css['group-form']}
                onSubmit={this.handleSubmit}
            >
                <div className={css['group-form-header']}>
                    <this.GroupMatch 
                        isMatch={this.modulesState.groupInfo.matchState}
                        createType={this.modulesState.groupInfo.createType}
                    />
                    <FormItem className={css['group-formitem']} label="发票组编号">
                        {getFieldDecorator('invoice', {
                            initialValue: this.modulesState.groupInfo.groupNumber,
                            rules: [
                                {
                                    required: true, message: '请输入发票组编号!',
                            }],
                        })(
                            <Input disabled={true} placeholder="请输入发票组编号" />
                        )}
                    </FormItem>
                </div>
                <FormItem>
                    <UITable {...this.props}/>
                </FormItem>
                <FormItem>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button 
                                className={css['group-handler']}
                                onClick={this.closeConfirm}
                            >关闭
                            </Button>
                            <Button
                                className={css['group-handler']}
                                onClick={this.saveConfirm}
                                type="primary"
                                htmlType="submit"
                            >保存
                            </Button>
                        </Col>
                    </Row>
                </FormItem>
            </Form>
        );
    }

    private handleSubmit = (e):void => {
        const { form } = this.props;
        const {  validateFields } = form;
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            } else {
                console.log(values);
            }
        });
    }

    private GroupMatch(props: any):JSX.Element {
        const createType = props.createType;
        const isMatch = props.isMatch;
        if ( createType ) {
            if (isMatch) {
            return (
                <FormItem className={css['group-formitem']} label="匹配状态">
                    <span className={css['group-formitem-match']}><span className={css['group-formitem-success']}/>匹配成功</span>
                </FormItem>
                );
            } else {
                return (
                    <FormItem className={css['group-formitem']} label="匹配状态">
                        <span className={css['group-formitem-match']}><span className={css['group-formitem-error']}/>匹配中</span>
                    </FormItem>
                );
            }
        }
        return <span/>;
    }

    private closeConfirm = (): void => {
        const groupId = this.props.match.params.id;
        if (this.modulesState.recover) {
            confirm({
                title: '关闭',
                content: '关闭后修改的内容将丢失，是否保存？',
                cancelText: '不保存',
                okText: '保存',
                onOk() {
                    ModulesAction.groupSaveDetail(groupId);
                    ModulesAction.groupInfo(groupId);
                    history.goBack();
                },
                onCancel() {
                    history.goBack();
                }
            });
        } else {
            history.goBack();
        }
    }

    private saveConfirm = (): void => {
        const groupId = this.props.match.params.id;
        ModulesAction.groupSaveDetail(groupId);
        history.goBack();
    }
}