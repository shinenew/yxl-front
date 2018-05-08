import React from 'react';
import { Table, Card, Button } from 'antd';
import AdvancedForm from './AdvancedForm';
const css = require('./index.scss');
class UserForm extends React.Component<any, any> {
    private columns = [
        {
            title: '销售方名称',
            dataIndex: 'applyName',
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
    ];
    constructor(props: any) {
        super(props);
        this.state = {
            list: null,
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
    render() {
        let dataSource;
        let columns = this.columns;
        let { selectedRowKeys, fields } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onChange,
        };
        const extraButtons = (
            <div>
                <Button icon="sync" className={css.mr10} onClick={this.refreshInvoice} />
                <Button className={css.mr10} type="primary">新增发票组</Button>
                <Button className={css.mr10} type="primary">发票录入</Button>
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
                        rowKey="index"
                        rowSelection={rowSelection}
                    />
                </Card>
            </div >
        );
    }
}
export default UserForm;
