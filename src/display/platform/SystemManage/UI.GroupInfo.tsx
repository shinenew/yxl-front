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
                initialValue: this.modulesState.groupInfo.name !== undefined ? this.modulesState.groupInfo.name : '',
                rules: [{ type: 'string', pattern: /^\S.{1,25}\S$/, message: '请输入集团名称(3-25位字符,前后不能有空格)' }]
              })(
                <Input className={this.modulesState.groupInfo.disable ? '' : css.groupInput} disabled={!this.modulesState.groupInfo.disable} />
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
                initialValue: this.modulesState.groupInfo.description !== undefined ? this.modulesState.groupInfo.description : ''
              })(
                <TextArea className={this.modulesState.groupInfo.disable ? '' : css.groupInput} rows={5} disabled={!this.modulesState.groupInfo.disable} />
              )}
            </FormItem>
            <FormItem required={false}>
              {getFieldDecorator('orgId', {
                initialValue: this.modulesState.groupInfo.orgId !== undefined ? this.modulesState.groupInfo.orgId : ''
              })(
                <Input type="hidden" />
              )}
            </FormItem>
            <FormItem required={false}>
              {getFieldDecorator('createTime', {
                initialValue: this.modulesState.groupInfo.createTime !== undefined ? this.modulesState.groupInfo.createTime : ''
              })(
                <Input type="hidden" />
              )}
            </FormItem>
            <FormItem required={false}>
              {getFieldDecorator('updateTime', {
                initialValue: this.modulesState.groupInfo.updateTime !== undefined ? this.modulesState.groupInfo.updateTime : ''
              })(
                <Input type="hidden" />
              )}
            </FormItem>
            </Card>
        </Form>
          {<Row style={{ marginTop: 10 }} className={css.textCenter}>
            {
              !this.modulesState.groupInfo.disable && <Button className="text-center" type="primary" onClick={() => ModulesAction.isEdit()} >修改</Button>}
            {this.modulesState.groupInfo.disable && /*  */
              <div>
                <Button onClick={() => this.updateGroupInfo()} className="text-center" type="primary" htmlType="submit">保存</Button>
                <Button style={{ marginLeft: 20 }} onClick={() => ModulesAction.isEdit()} className="text-center ml-10" type="default" >取消</Button>
              </div>}
          </Row>}
      </div>
        );
      }
    }
