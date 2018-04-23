import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import { Card, Form, Button, Select } from 'antd';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';

const css = require('./index.scss');

const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 24 - 6
    },
};

/** Redux接口 */
interface IReduxStatePart {

}

/** Props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {

}

/** 选中公司面板 */
@connect((state: ReduxState): IReduxStatePart => ({}), true)
export default class UIPanel extends UIBasic<IProps, ModulesState> {

    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Card className={`${css.uipanel}`} title="选择公司">
                <Form>
                    <Form.Item {...formItemLayout} label="公司">
                        {getFieldDecorator('company', {
                            rules: [{
                                required: true,
                                message: '请选公司',
                                whitespace: true
                            }],
                        })(
                            <Select placeholder="请选公司">
                                <Select.Option value="jack">Jack</Select.Option>
                                <Select.Option value="lucy">Lucy</Select.Option>
                                <Select.Option value="Yiminghe">yiminghe</Select.Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6 }} >
                        <Button onClick={this.onEnterClickHandler} type="primary" htmlType="submit">
                            进入
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }

    /** 点击了进入 */
    private onEnterClickHandler = () => {
        this.props.form.validateFields((er: any, values: any) => {
            if (er) {
                return;
            }
            this.props.history.push(`/workbench`);
        });
    }
}