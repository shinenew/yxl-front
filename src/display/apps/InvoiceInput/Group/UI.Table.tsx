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

    render() {
        const columns = [{
            title: '发票代码',
            dataIndex: 'code',
            key: 'name',
            render: text => <a href="javascript:;">{text}</a>,
          }, {
            title: '发票号码',
            dataIndex: 'number',
            key: 'number',
          }, {
            title: '代收',
            dataIndex: 'daishou',
            key: 'daishou',
            render: (text, record) => (
                <span>
                  {record.daishou ? <Icon type="check" /> : <Icon type="close" />}
                </span>
            ),
          }, {
            title: '已收',
            dataIndex: 'yishou',
            key: 'yishou',
            render: (text, record) => (
                <span>
                  {record.yishou ? <Icon type="check" /> : <Icon type="close" />}
                </span>
            ),
          }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
              <span>
                <a href="javascript:;" onClick={() => this.deleteInvoice('123')}>删除</a>
              </span>
            ),
          }
        ];
        const data = [{
            key: '1',
            code: '123213123',
            number: '123',
            daishou: true,
            yishou: true,
          }, {
            key: '2',
            code: '123213123123',
            number: '123',
            daishou: false,
            yishou: false,
          }, {
            key: '3',
            code: '123213123123',
            number: '123',
            daishou: true,
            yishou: true,
          },
          {
            key: '4',
            code: '123213123123',
            number: '123',
            daishou: false,
            yishou: false,
          }
        ];
        return (
            <Card title="发票" bordered={false}>
                <Table columns={columns} dataSource={data}/>
            </Card>
        );
    }

    private deleteInvoice = (id: string): void => {
      console.log(id);
    }
}