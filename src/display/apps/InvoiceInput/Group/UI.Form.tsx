import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { create } from 'kts-scaffold-framework/utils/form';
import { connect } from 'src/redux';
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
} from 'antd';
const FormItem  = Form.Item;

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
        const { getFieldDecorator} = form;

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem className={css['group-formitem']} label="发票状态">收票中</FormItem>
                <FormItem className={css['group-formitem']} label="发票租编号">
                    {getFieldDecorator('invoice', {
                        rules: [
                            {
                                required: true, message: '请输入发票组编号!',
                        }],
                    })(
                        <Input placeholder="请输入发票组编号" />
                    )}
                </FormItem>
                <FormItem>
                    <UITable/>
                </FormItem>
                <FormItem>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button className={css['group-handler']} type="primary" htmlType="submit">提交</Button>
                            <Button className={css['group-handler']} type="primary">保存</Button>
                            <Button className={css['group-handler']} type="primary">关闭</Button>
                        </Col>
                    </Row>
                </FormItem>
            </Form>
        );
    }

    private handleSubmit = e => {
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
}