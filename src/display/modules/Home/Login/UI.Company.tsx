import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import { Card, Form, Button, Select } from 'antd';
import { ICompany } from 'src/dataModel';
import { company } from 'src/api';
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
    companyList: ICompany[];
}

/** Props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {

}

/** 选中公司面板 */
@ModulesAction.uiconnect
@connect((state: ReduxState): IReduxStatePart => ({
    loading: state.system.loading,
    companyList: state.user.companyList || [],
}), true)
export default class UIPanel extends UIBasic<IProps, ModulesState> {

    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    componentWillMount() {
        ModulesAction.unloginCompany();
        ModulesAction.updateCompanyList();
    }

    render() {
        const { form, loading, companyList } = this.props;
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
                                {companyList.map((value: ICompany, i: number) => (
                                    <Select.Option key={i} value={i.toString()}>{value.companyName}</Select.Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6 }} >
                        <Button loading={loading.length > 0} onClick={this.onEnterClickHandler} type="primary" htmlType="submit">
                            进入
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }

    /** 点击了进入 */
    private onEnterClickHandler = () => {
        const { companyList } = this.props;
        this.props.form.validateFields(async (er: any, values: any) => {
            if (er) {
                return;
            }

            const data = await company.switching(this, { companyId: companyList[values.company].companyId });
            if (data.er) {
                return;
            }

            this.props.history.push(`/workbench`);
        });
    }
}