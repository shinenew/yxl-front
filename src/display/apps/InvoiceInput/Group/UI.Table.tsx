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

// const css = require('./index.scss');

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

    componentWillUnmount () {
      ModulesAction.invoiceDate('123');
    }

    render() {
        const columns = [{
            title: '发票代码',
            dataIndex: 'invoiceCode',
            key: 'name',
            render: text => <a href="javascript:;">{text}</a>,
          }, {
            title: '发票号码',
            dataIndex: 'invoiceNumber',
            key: 'number',
          }, {
            title: '代收',
            dataIndex: 'daishou',
            key: 'daishou',
            render: (text, record) => (
                <this.InvoiceSure sure={record.daishou}/>
            ),
          }, {
            title: '已收',
            dataIndex: 'yishou',
            key: 'yishou',
            render: (text, record) => (
              <this.InvoiceSure sure={record.daishou}/>
            ),
          }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
              <span>
                <a href="javascript:;" onClick={() => ModulesAction.deleteInvoice('123')}>移除</a>
              </span>
            ),
          }
        ];
        const data = [{
            key: '1',
            invoiceCode: '123213123',
            invoiceNumber: '123',
            daishou: true,
            yishou: true,
          }, {
            key: '2',
            invoiceCode: '123213123123',
            invoiceNumber: '123',
            daishou: false,
            yishou: false,
          }, {
            key: '3',
            invoiceCode: '123213123123',
            invoiceNumber: '123',
            daishou: true,
            yishou: true,
          },
          {
            key: '4',
            invoiceCode: '123213123123',
            invoiceNumber: '123',
            daishou: false,
            yishou: false,
          }
        ];
        return (
            <Card title="发票列表" bordered={false}>
                <Table columns={columns} dataSource={data} bordered={true} pagination={false}/>
            </Card>
        );
    }

    private InvoiceSure = props => {
      return (props.sure ? <span><Icon type="check" style={{color: `rgba(34,172,56,1)`}} /></span> :
        <span><Icon type="close" style={{color: 'rgba(230,0,18,1)'}} /></span>);
    }
}