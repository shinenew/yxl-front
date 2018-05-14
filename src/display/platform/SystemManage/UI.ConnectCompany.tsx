import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import { Table, Row, Col, Button, Icon, Form, Input } from 'antd';
import { create } from 'kts-scaffold-framework/utils/form';

const FormItem = Form.Item;
const spanCss = { cursor: 'pointer' };
const css = require('./index.scss');

let columns = [];
/** 全局数据片段数据接口 */
interface IReduxStatePart {
}


/** 组建的props接口   123  */
interface IProps extends IReduxStatePart, IPropsBasic {
}

/** 绑定全局数据到props */
@create()
@ModulesAction.uiconnect
@connect((state: ReduxState): IReduxStatePart => ({
}))

export default class UITable extends UIBasic<IProps, ModulesState> {

  /** 构造函数 */
  constructor(props: IProps) {
    super(props, ModulesAction);

    columns = [
      {
        title: '公司名称',
        dataIndex: 'connectionName',
      },
      {
        title: '税号',
        dataIndex: 'connectionTaxId'
      },
      {
        title: '修改日期',
        dataIndex: 'updateTime',
        // render: text => Lib.Util.Date.formatTime(text)
      },

      {
        title: '操作',
        width: 70,
        dataIndex: 'connectionState',
        render: (text, record, index) => (
          <span>
            {
              (text === 1) &&
              <span style={spanCss} onClick={() => ModulesAction.onUpdate(record)}>
                启用
                        </span>
              // <span> 启用 </span>
            }
            {
              (text !== 1) &&
              <span style={spanCss} onClick={() => ModulesAction.onUpdate(record)}>
                禁用
                      </span>
              // <span>禁用 </span>
            }
          </span>
        )
      }
    ];

  }

  componentDidMount() {
    ModulesAction.findCompanyList();
  }

  /**
   * 清空筛选输入框
   */
  handleReset = () => {
    this.props.form.setFieldsValue({
      connectionName: '',
      connectionTaxId: ''
    });
    console.log(this.props.form.getFieldValue('connectionName'));
  }

  render() {
    const { selectedRowKeys } = this.modulesState.companyState;
    const rowSelection = {
      selectedRowKeys,
      onChange: ModulesAction.onSelectChange
    };
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    let connectionName = this.props.form.getFieldValue('connectionName');
    let connectionTaxId = this.props.form.getFieldValue('connectionTaxId');
    return (
      <div>
        <Row>
          <Col span={24} className={css.textRight}>
            <div className={css.pullRight}>
              <Button type="primary" onClick={() => ModulesAction.ban()}>
                批量禁用
                    </Button>
              <Button style={{ marginLeft: 10 }} type="primary" className="ml-10" onClick={() => ModulesAction.active()}>
                批量启用
                    </Button>
              <Button style={{ marginLeft: 10 }} className="ml-10 mb-10" onClick={ModulesAction.toggle}>
                筛选 <Icon type={this.modulesState.company.companyExpand ? 'up' : 'down'} />
              </Button>
            </div>

          </Col>
        </Row>
        <div style={{ display: this.modulesState.company.companyExpand ? 'block' : 'none' }}>
          <Form >
            <Row style={{ marginTop: 20, marginBottom: -45 }}>
              <Col span={8} >
                <FormItem
                  label="公司名称"
                  {...formItemLayout}
                >
                  <FormItem>
                    {getFieldDecorator('connectionName')(
                      <Input />
                    )}
                  </FormItem>
                </FormItem>
              </Col>
              <Col span={8} >
                <FormItem {...formItemLayout} label="税号">
                  {getFieldDecorator('connectionTaxId')(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <div >
                  <div className={css.pullRight}>
                    <a target="_blank" href={this.modulesState.company.geturl}>
                      <Button className="mr-10">导出</Button>
                    </a>
                    <Button style={{ marginLeft: 10 }} className="mr-10" onClick={this.handleReset}>清空</Button>
                    <Button style={{ marginLeft: 10 }} type="primary" htmlType="submit" onClick={ModulesAction.selectCompany.bind(this, connectionName, connectionTaxId)}> 筛选</Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
        <Table pagination={{ pageSize: 10 }} rowSelection={rowSelection} columns={columns} dataSource={this.modulesState.company.list} rowKey="connectionId" />
        {/* rowKey="connectionId" */}
      </div >
    );
  }

}