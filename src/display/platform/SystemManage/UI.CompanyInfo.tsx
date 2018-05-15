import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import { Form, Card, Row, Col, Input, Tag } from 'antd';
import moment from 'moment';
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
export default class UICompany extends UIBasic<IProps, ModulesState> {
    public state: ModulesState = new ModulesState();

    constructor(props: IProps) {
        super(props, ModulesAction);
        ModulesAction.getCompanyInfo();
    }

    render() {
        const formatTime = (timeStr) => {
            if (timeStr) {
                const timestamp = timeStr / 1000;
                const date = moment.unix(timestamp)
                    .format('YYYY-MM-DD HH:mm');
                return date;
            } else {
                return '';
            }
        };
        const data = this.modulesState.companyInfoList;
        const { getFieldDecorator } = this.props.form;
        const formLayout = 'horizontal';
        const FormItem = Form.Item;
        const formItemLayout =
            formLayout === 'horizontal'
                ? {
                    labelCol: { span: 6 },
                    wrapperCol: { span: 18 }
                }
                : null;
        return (
            <div className={css.companyAdminUserInfo}>
                {data ? (
                    <Form layout={'horizontal'}>
                        <Card title="公司资料" className={css.userInfo}>
                            <Row>
                                <Col span={20}>
                                    <FormItem label="公司名称" {...formItemLayout}>
                                        {getFieldDecorator('name', {
                                            rules: [
                                                {
                                                    type: 'string',
                                                    pattern: /^\S.{3,25}\S$/,
                                                    required: true,
                                                    message: '请输入公司名称(5-25位字符,前后不能有空格)',
                                                    whitespace: true,
                                                }
                                            ],
                                            initialValue: data.name
                                        })(
                                            <Input
                                                placeholder="请输入公司名称"
                                                disabled={true}
                                                className={css.antInputDisabled}

                                            />
                                        )}
                                    </FormItem>

                                    <FormItem label="地址" {...formItemLayout}>
                                        {getFieldDecorator('address', {
                                            rules: [
                                                {
                                                    type: 'string',
                                                    pattern: /^.{10,80}$/,
                                                    required: true,
                                                    message: '请输入正确的地址(10-80位)',
                                                    whitespace: true
                                                }
                                            ],
                                            initialValue: data.address
                                        })(
                                            <Input
                                                placeholder="请输入公司工商注册的地址"
                                                disabled={true}
                                                className={css.antInputDisabled}

                                            />
                                        )}
                                    </FormItem>

                                    <FormItem label="税号" {...formItemLayout}>
                                        {getFieldDecorator('taxId', {
                                            rules: [
                                                {
                                                    type: 'string',
                                                    pattern: /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/,
                                                    required: true,
                                                    message:
                                                        '15或17或18或20位字母、数字组成',
                                                    whitespace: true
                                                }
                                            ],
                                            initialValue: data.taxId
                                        })(
                                            <Input
                                                placeholder="请输入纳税人识别号"
                                                disabled={true}
                                                className={css.antInputDisabled}

                                            />
                                        )}
                                    </FormItem>

                                    <FormItem label="银行账号" {...formItemLayout}>
                                        {getFieldDecorator('bankId', {
                                            rules: [
                                                {
                                                    type: 'string',
                                                    pattern: /^\d*$/,
                                                    required: true,
                                                    message: '银行卡只支持数字',
                                                    whitespace: true
                                                }
                                            ],
                                            initialValue: data.bankId
                                        })(
                                            <Input
                                                placeholder="请输入银行账号"
                                                maxLength="28"
                                                disabled={true}
                                                className={css.antInputDisabled}

                                            />
                                        )}
                                    </FormItem>

                                    <FormItem label="法人" {...formItemLayout}>
                                        {getFieldDecorator('legalEntity', {
                                            rules: [
                                                {
                                                    type: 'string',
                                                    pattern: /^.{2,25}$/,
                                                    required: true,
                                                    message: '请输入法人(2-25位)',
                                                    whitespace: true
                                                }
                                            ],
                                            initialValue: data.legalEntity
                                        })(
                                            <Input
                                                placeholder="请输入法人"
                                                disabled={true}
                                                className={css.antInputDisabled}

                                            />
                                        )}
                                    </FormItem>

                                    <FormItem label="开户行" {...formItemLayout}>
                                        {getFieldDecorator('openingBank', {
                                            rules: [
                                                {
                                                    type: 'string',
                                                    pattern: /^.{5,25}$/,
                                                    required: false,
                                                    message: '请输入开户行名称(5-25位)',
                                                    whitespace: true
                                                }
                                            ],
                                            initialValue: data.openingBank
                                        })(
                                            <Input
                                                placeholder="请输入开户行"
                                                disabled={true}
                                                className={css.antInputDisabled}

                                            />
                                        )}
                                    </FormItem>

                                    <FormItem label="电话" {...formItemLayout}>
                                        {getFieldDecorator('phone', {
                                            rules: [
                                                {
                                                    type: 'string',
                                                    pattern: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,
                                                    required: true,
                                                    message: '请输入公司固定电话',
                                                    whitespace: true
                                                }
                                            ],
                                            initialValue: data.phone
                                        })(
                                            <Input
                                                placeholder="请输入电话"
                                                disabled={true}
                                                className={css.antInputDisabled}

                                            />
                                        )}
                                    </FormItem>

                                    <FormItem label="电子邮箱" {...formItemLayout}>
                                        {getFieldDecorator('email', {
                                            rules: [
                                                {
                                                    type: 'email',
                                                    required: true,
                                                    message: '请输入有效的邮箱地址'

                                                }
                                            ],
                                            initialValue: data.email
                                        })(
                                            <Input
                                                placeholder="请输入电子邮箱"
                                                disabled={true}
                                                className={css.antInputDisabled}
                                            />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </Card>

                        <Card title="公司信息" className={css.userStatus}>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <FormItem
                                        className={css.noBorderBottom}
                                        label="状态"
                                        {...formItemLayout}
                                    >
                                        <span>{data.loginName}</span>
                                        {data.isActivated ? (
                                            <Tag color="blue">已激活</Tag>
                                        ) : (
                                                <Tag color="#ccc">未激活</Tag>
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem label="创建时间" {...formItemLayout}>
                                        <span>
                                            {formatTime(data.createTime)
                                            }
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem label="更新时间" {...formItemLayout}>
                                        <span>
                                            {formatTime(data.updateTime)}
                                        </span>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Card>

                    </Form>
                ) : null}
            </div>
        );
    }
}