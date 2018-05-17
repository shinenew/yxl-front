import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import {
    Table,
    Card,
    Icon
} from 'antd';

/** Redux接口 */
interface IReduxStatePart {
    
}

/** Props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {

}

/** 绑定全局数据到props */
@ModulesAction.uiconnect
@connect((state: ReduxState): IReduxStatePart => ({

}))
export default class UIComponents extends UIBasic<IProps, ModulesState> {

    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    componentWillMount () {
      ModulesAction.groupInfo(this.props.match.params.id);
    }

    render() {
        const data = this.modulesState.detailInfoList;
        const columns = this.tableColumn(this.modulesState.groupInfo.createType);
        return (
            <Card title="发票列表" bordered={false}>
                <Table
                  className={`kts-app-ant-table`}
                  columns={columns}
                  dataSource={data}
                  bordered={true}
                  pagination={false}
                />
            </Card>
        );
    }

    private InvoiceSure = props => {
      return (props.sure ? <span><Icon type="check" style={{color: `rgba(34,172,56,1)`}} /></span> :
        <span><Icon type="close" style={{color: 'rgba(230,0,18,1)'}} /></span>);
    }

    private tableColumn = (createType: string): any => {
      if (createType) {
        return [{
            title: '发票代码',
            dataIndex: 'invoiceCode',
            key: 'name',
            render: text => <a href="javascript:;">{text}</a>,
          }, {
            title: '发票号码',
            dataIndex: 'invoiceNumber',
            key: 'number',
          }, {
            title: '应收',
            dataIndex: 'waitState',
            key: 'waitState',
            render: (text, record) => (
                <this.InvoiceSure sure={record.waitState}/>
            ),
          }, {
            title: '已收',
            dataIndex: 'receivedState',
            key: 'receivedState',
            render: (text, record) => (
              <this.InvoiceSure sure={record.receivedState}/>
            ),
          }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
              <span>
                <a href="javascript:;" onClick={() => ModulesAction.deleteDetailInfoList(record.invoiceCode, record.waitState)}>移除</a>
              </span>
            ),
          }
        ];
      } else {
        return [{
          title: '发票代码',
          dataIndex: 'invoiceCode',
          key: 'name',
          render: text => <a href="javascript:;">{text}</a>,
        }, {
          title: '发票号码',
          dataIndex: 'invoiceNumber',
          key: 'number',
        }, {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <span>
              <a href="javascript:;" onClick={() => ModulesAction.deleteDetailInfoList(record.invoiceCode)}>移除</a>
            </span>
          ),
        }
      ];
      }
    }
}