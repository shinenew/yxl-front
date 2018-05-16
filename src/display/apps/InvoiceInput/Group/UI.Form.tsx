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
                    <FormItem className={css['group-formitem']} label="匹配状态">
                        <this.GroupMatch isMatch={this.modulesState.groupInfo.matchState} />
                    </FormItem>
                    <FormItem className={css['group-formitem']} label="发票租编号">
                        {getFieldDecorator('invoice', {
                            initialValue: this.modulesState.groupId,
                            rules: [
                                {
                                    required: true, message: '请输入发票组编号!',
                            }],
                        })(
                            <Input placeholder="请输入发票组编号" />
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
                                onClick={() => history.goBack()}
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

    private GroupMatch(props: any) {
        const isMatch = props.isMatch;
        console.log(isMatch);
        if (isMatch) {
            return <span className={css['group-formitem-match']}><span className={css['group-formitem-success']}/>匹配成功</span>;
        } else {
            return <span className={css['group-formitem-match']}><span className={css['group-formitem-error']}/>匹配失败</span>;
        }
    }

    private saveConfirm = (): void => {
        const groupId = this.props.match.params.id;
        confirm({
            title: '确认保存',
            content: '即将保存发票分组详情和移除发票项',
            onOk() {
                ModulesAction.groupSaveDetail(groupId);
                ModulesAction.groupInfo(groupId);
            }
        });
    }
}