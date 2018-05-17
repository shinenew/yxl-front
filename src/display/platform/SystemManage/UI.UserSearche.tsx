import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import { Input, Form, Select, Button, Row, Col } from 'antd';
import { create } from 'kts-scaffold-framework/utils/form';
const css = require('./index.scss');
const FormItem = Form.Item;
const { Option } = Select;

/** 全局数据片段数据接口 */
interface IReduxStatePart {
}

/** 组建的props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {
}
/** 绑定全局数据 */
@create()
@ModulesAction.uiconnect
@connect((state: ReduxState): IReduxStatePart => ({

}))
export default class UIComponents extends UIBasic<IProps, ModulesState> {

    /** 组建状态 */
    public state: ModulesState = new ModulesState();

    /** 构造函数 */
    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    // /** 设置searchStr */
    // searchStrOnChange = (e) => {
    //     // let str: string = e.target.value;
    //     // this.state.searchStr = str;
    // }

    // /** 设置searchType */
    // searchTypeOnChange = (e) => {
    //     // let type: string = `${e}`;
    //     // this.state.searchType = type;
    // }

    // /** 获取列表数据 */
    // getList = () => {
    //     // ModulesAction.pageList(
    //     //     this.state.pageNumber,
    //     //     this.state.pageSize

    //     // );
    // }

    /** 清空form内容 */
    handleReset = () => {
        // this.props.clearFields();
        this.props.form.resetFields();
    }

    /** 筛选 */
    onSearch = () => {
        const { form } = this.props;
        form.validateFields(async (er: any, values: any) => {
            if (er) {
                return;
            }
            console.log(values);
            ModulesAction.getUserList(values);
        });
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        // const departments = this.modulesState.departmentIds && this.modulesState.departmentIds.map((item, index) => {
        //     return <Option key={item.departmentId}>{item.name}</Option>;
        // });
        // const roles = this.modulesState.roleIds && this.modulesState.roleIds.map((item, index) => {
        //     return <Option key={item.roleId}>{item.name}</Option>;
        // });
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{ display: this.modulesState.userModulesState.searchState ? 'block' : 'none' }}>
                <Form>
                    <Row gutter={15}>
                        <Col span={5} >
                            <FormItem {...formItemLayout} label={`用户姓名`}>
                                {getFieldDecorator('nickName')(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>

                        <Col span={5} >
                            <FormItem {...formItemLayout} label={`电子邮箱`}>
                                {getFieldDecorator('email')(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>

                        <Col span={5} >
                            <FormItem {...formItemLayout} label={`激活状态`}>
                                {getFieldDecorator('isActivated')(
                                    <Select allowClear={true}>
                                        <Option value="true">激活</Option>
                                        <Option value="false">禁用</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={5} >
                            <FormItem {...formItemLayout} label={`邀请状态`}>
                                {getFieldDecorator('acceptStatus')(
                                    <Select allowClear={true}>
                                        <Option value="0">邀请中</Option>
                                        <Option value="2">接受</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={24} className={css.text_right}>
                            <Button className={css.mr_10} onClick={this.handleReset}>清空</Button>
                            <Button type="primary" onClick={this.onSearch}> 筛选</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }

}
