import React from 'react';
import { Table, Card, Button } from 'antd';
import AdvancedForm from './AdvancedForm';
import ModulesAction from './Modules.Action';
import { tree } from 'src/utils';
import { MyStore, reducers } from 'src/redux';
import { InvoiceImport } from 'src/display/part';
import { Urls } from 'src/entry/constant';
import { withRouter } from 'src/routes';
import CreatGroup from './UI.CreatGroup';
import {formatTime,formatDate} from 'src/utils';
@withRouter
class UserForm extends React.Component<any, any> {

    private columns = [
        {
            title: '销售方名称',
            dataIndex: 'supplierName',
            render: (text, record) => {
                return (
                    <span>
                        {
                            record.groupNumber ?
                                <span>{record.groupNumber}({record.loggedCount}/{record.waitCount})</span>
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
            dataIndex: 'invoiceDate',
            render: (text) => formatDate(text)
        },
        {
            title: '税价合计',
            dataIndex: 'amount'
        },
        {
            title: '录入日期',
            dataIndex: 'loggingTime',
            render: (text) => formatTime(text)
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => {
                return (
                    <span onClick={() => { this.onDetail(record); }}>详情</span>
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
            addModal: false
        };
    }
    clearFields = () => {
        this.setState({
            fields: null
        });
    }
    onAddGroup = () => {
        this.setState({
            addModal: true
        });
    }
    onCloseModal = () => {
        this.setState({
            addModal: false
        });
    }
    onDetail = (record) => {
        if (record.groupNumber) {
            this.props.history.push(`invoiceInput/group/${record.groupId}`);
        }
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
        const urlData = {
            key4: Urls.logInvoiceMANUAL,
            scankey4: Urls.logInvoiceSCANNER_GUN,
            qrtoken: Urls.group_getUploadToken,
            downloadurl: Urls.group_downloadTemplate,
            url: Urls.group_uploadFile,
            scanerurl: Urls.group_ocrtoken
        };
        MyStore.instance.dispatch(reducers.aside.ActionTypes.show, {
            Components: <InvoiceImport urlData={urlData} />,
            title: '发票录入'
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
                return { disabled: record.groupNumber ? true : false };
            }
        };
        const extraButtons = (
            <div>
                <Button icon="sync" className="mr10" onClick={this.refreshInvoice} />
                <Button className="mr10" type="primary">新增发票组</Button>
                <Button className="mr10" type="primary" onClick={this.onOpenInvoiceImport}>发票录入</Button>
            </div>
        );
        return (
            <div>
                <Card title="发票录入" extra={extraButtons}>
                    <AdvancedForm
                        clearFields={this.clearFields}
                        fields={fields}
                        onValuesChange={this.handleFormChange}
                        onAddGroup={this.onAddGroup}
                    />
                    <Table
                        loading={this.props.loading}
                        bordered={true}
                        dataSource={dataSource}
                        columns={columns}
                        rowKey="id"
                        rowSelection={rowSelection}
                        scroll={{ x: 800 }}
                    />
                    {
                        this.state.addModal &&
                        <CreatGroup onCloseModal={this.onCloseModal} />
                    }
                </Card>
            </div >
        );
    }

    getData = async () => {
        const data = await ModulesAction.getGroupData();
        if (data) {
            const treeData = tree(data);
            this.setState({
                list: treeData
            });
        }
    }
}
export default UserForm;
