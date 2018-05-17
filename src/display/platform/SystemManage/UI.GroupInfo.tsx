import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import { Form, Input, Row, Button, Card } from 'antd';
import { create } from 'kts-scaffold-framework/utils/form';

const { TextArea } = Input;
const FormItem = Form.Item;
const css = require('./index.scss');

/** 全局数据片段数据接口 */
interface IReduxStatePart {

}

/** 组建的props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {

}

/** 绑定全局数据到props */
@create()
@ModulesAction.uiconnect
@connect((state: ReduxState): IReduxStatePart => ({

}))

export default class TabUI extends UIBasic<IProps, ModulesState> {

  /** 构造函数 */
  constructor(props: IProps) {
    super(props, ModulesAction);
    ModulesAction.getGroupInfoByCompanyId();
  }

  /** 保存 */
  updateGroupInfo = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        ModulesAction.updateGroupInfo(values);
      }
    });
  }

  render() {
    console.log(this.modulesState);
    const { getFieldDecorator } = this.props.form;
    const formLayout: string = 'horizontal';
    const formItemLayout = formLayout === 'horizontal' ? {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 },
    } : null;
    return (
      <div>
        <Form>
          <Card title="集团资料" className={css.userInfo}>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  集团名&nbsp;&nbsp;
              </span>
              )}
            >
              {getFieldDecorator('name', {
                initialValue: this.modulesState.groupInfoModulesState.name !== undefined ? this.modulesState.groupInfoModulesState.name : '',
                rules: [{ type: 'string', pattern: /^\S.{1,25}\S$/, message: '请输入集团名称(3-25位字符,前后不能有空格)' }]
              })(
                <Input className={this.modulesState.groupInfoModulesState.disable ? '' : css.groupInput} disabled={!this.modulesState.groupInfoModulesState.disable} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  集团描述&nbsp;&nbsp;
              </span>
              )}
            >
              {getFieldDecorator('description', {
                initialValue: this.modulesState.groupInfoModulesState.description !== undefined ? this.modulesState.groupInfoModulesState.description : ''
              })(
                <TextArea className={this.modulesState.groupInfoModulesState.disable ? '' : css.groupInput} rows={5} disabled={!this.modulesState.groupInfoModulesState.disable} />
              )}
            </FormItem>
            <FormItem required={false}>
              {getFieldDecorator('orgId', {
                initialValue: this.modulesState.groupInfoModulesState.orgId !== undefined ? this.modulesState.groupInfoModulesState.orgId : ''
              })(
                <Input type="hidden" />
              )}
            </FormItem>
            <FormItem required={false}>
              {getFieldDecorator('createTime', {
                initialValue: this.modulesState.groupInfoModulesState.createTime !== undefined ? this.modulesState.groupInfoModulesState.createTime : ''
              })(
                <Input type="hidden" />
              )}
            </FormItem>
            <FormItem required={false}>
              {getFieldDecorator('updateTime', {
                initialValue: this.modulesState.groupInfoModulesState
                .updateTime !== undefined ? this.modulesState.groupInfoModulesState.updateTime : ''
              })(
                <Input type="hidden" />
              )}
            </FormItem>
            </Card>
        </Form>
          {<Row style={{ marginTop: 10 }} className={css.textCenter}>
            {
              !this.modulesState.groupInfoModulesState.disable && <Button className="text-center" type="primary" onClick={() => ModulesAction.isEdit()} >修改</Button>}
            {this.modulesState.groupInfoModulesState.disable && /*  */
              <div>
                <Button onClick={() => this.updateGroupInfo()} className="text-center" type="primary" htmlType="submit">保存</Button>
                <Button style={{ marginLeft: 20 }} onClick={() => ModulesAction.isEdit()} className="text-center ml-10" type="default" >取消</Button>
              </div>}
          </Row>}
      </div>
        );
      }
    }
