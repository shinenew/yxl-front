import React from 'react';
import { Table, Card, Button } from 'antd';
import AdvancedForm from './AdvancedForm';
import ModulesAction from './Modules.Action';
import { tree } from 'src/utils';
import { MyStore, reducers } from 'src/redux';
import { InvoiceImport } from 'src/display/part';
const css = require('./index.scss');
class UserForm extends React.Component<any, any> {

    private columns = [
        {
            title: '销售方名称',
            dataIndex: 'supplierName',
            render: (text, record) => {
                return (
                    <span>
                        {
                            record.groupName ?
                                <span>{record.groupName}({record.matchCount}/{record.invoiceCount})</span>
                                : <span>{text}</span>
                        }
                    </span>
                );

            }
        },
        {
            title: '发票代码',
            dataIndex: 'invoiceCode'
        },
        {
            title: '发票号码',
            dataIndex: 'invoiceNumber'
        },
        {
            title: '开票日期',
            dataIndex: 'invoiceDate'
        },
        {
            title: '税价合计',
            dataIndex: 'amount'
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: () => {
                return (
                    <span>详情</span>
                );
            }
        }
    ];
    constructor(props: any) {
        super(props);
        this.state = {
            list: null,
            pageMeta: null,
            expand: false,
            fields: null,
            selectedRows: null,
            selectedRowKeys: [],
        };
    }
    clearFields = () => {
        this.setState({
            fields: null
        });
    }
    handleFormChange = (changedFields) => {
        this.setState({
            fields: { ...this.state.fields, ...changedFields },
        });
    }
    onChange = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedRows: selectedRows,
            selectedRowKeys: selectedRowKeys,
        });
    }
    refreshInvoice = () => {
        console.log(2);
    }
    componentDidMount() {
        this.getData();
    }
    onOpenInvoiceImport = () => {
        MyStore.instance.dispatch(reducers.aside.ActionTypes.show, {
            Components:<InvoiceImport/>,
            title:'发票录入'
        });
    }
    render() {

        let columns = this.columns;
        let { selectedRowKeys, fields, list } = this.state;
        let dataSource = list;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onChange,
            hideDefaultSelections: true,
            getCheckboxProps: (record) => {
                return { disabled: record.groupName };
            }
        };
        const extraButtons = (
            <div>
                <Button icon="sync" className={css.mr10} onClick={this.refreshInvoice} />
                <Button className={css.mr10} type="primary">新增发票组</Button>
                <Button className={css.mr10} type="primary" onClick={this.onOpenInvoiceImport}>发票录入</Button>
            </div>
        );
        return (
            <div>
                <Card title="发票录入" extra={extraButtons}>
                    <AdvancedForm clearFields={this.clearFields} fields={fields} onValuesChange={this.handleFormChange} />
                    <Table
                        loading={this.props.loading}
                        bordered={true}
                        dataSource={dataSource}
                        columns={columns}
                        rowKey="id"
                        rowSelection={rowSelection}
                    />
                </Card>
            </div >
        );
    }

    getData = async () => {
        const data = await ModulesAction.getGroupData();
        const treeData = tree(data.items);
        this.setState({
            list: treeData,
            pageMeta: data.pageMeta
        });
    }
}
export default UserForm;
