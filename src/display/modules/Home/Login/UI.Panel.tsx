import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { Decorators } from 'kts-scaffold-framework/utils/doc';
import { connect } from 'src/redux';
import ReduxState, { IEnv } from 'src/redux/ReduxState';
import { Card, Form, Button, Input } from 'antd';
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
    loading: string[];
    env: IEnv;
}

/** Props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {

}

/** 熟人用户名密码面板 */
@connect((state: ReduxState): IReduxStatePart => ({
    loading: state.system.loading,
    env: state.env
}), true)
export default class UIPanel extends UIBasic<IProps, ModulesState> {

    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    render() {
        const { form, loading, env } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Card className={`${css.uipanel}`} title="选择公司">
                <Form>
                    <Form.Item {...formItemLayout} label="用户名">
                        {getFieldDecorator('username', {
                            initialValue: env.USERNAME,
                            rules: [Decorators.nickname()],
                        })(
                            <Input placeholder="请输入用户名" />
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="密码">
                        {getFieldDecorator('password', {
                            initialValue: env.PASSWORD,
                            rules: [Decorators.password()],
                        })(
                            <Input type="password" placeholder="请输入密码" />
                        )}
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6 }} >
                        <Button loading={loading.length > 0} onClick={this.onClickLanding} type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }

    /** 点击了登录 */
    private onClickLanding = (): void => {
        const { match } = this.props;
        this.props.form.validateFields(async (er: any, values: any) => {
            if (er) {
                return;
            }

            ModulesAction.login(values.username, values.password, `${match.url}/company`);
        });
    }
}