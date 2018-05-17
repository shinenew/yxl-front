import React from 'react';
import { Table, Card, Button, message, Alert,Popconfirm } from 'antd';
import AdvancedForm from './AdvancedForm';
import ModulesAction from './Modules.Action';
import { tree } from 'src/utils';
import { MyStore, reducers } from 'src/redux';
import { InvoiceImport } from 'src/display/part';
import { Urls } from 'src/entry/constant';
import { withRouter } from 'src/routes';
import CreatGroup from './UI.CreatGroup';
import SwitchGroup from './UI.SwitchGroup';
import { invoiceInput } from 'src/api';
import { formatTime, formatDate } from 'src/utils';
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
                                <span>{record.groupNumber}({record.matchCount}/{record.waitCount})</span>
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
                    <div>
                        <span className="pd5 hand" onClick={() => { this.onDetail(record); }}>详情</span>
                        {
                            record.group &&
                            <Popconfirm
                                title="确认删除"
                                onConfirm={() => this.onDelete(record)}
                            >
                                <span className="pd5 hand">删除</span>
                            </Popconfirm>
                        }
                    </div>
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
            pageNum: 1,
            pageSize: 10,
            fields: null,
            selectedRows: [],
            selectedRowKeys: [],
            addModal: false,
            message: null,
            show: false
        };
    }
    onDelete = (record) => {
        invoiceInput.DeleteGroup(this, { invoiceGroupId: record.groupId }).then((response: any) => {
            const err = response.err;
            const res = response.res;
            if (err) {
                message.error(err.status.description);
                return null;
            } else {
                if (res) {
                    message.success('操作成功');
                }
            }
        });
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
    onAddToGroup = () => {
        if (this.state.selectedRows.length === 0) {
            message.warn('没有勾选发票');
            return null;
        }
        this.setState({
            addToModal: true
        });
    }
    onCloseModal = () => {
        this.setState({
            addModal: false
        });
    }
    onCloseSwitch = () => {
        this.setState({
            addToModal: false
        });
    }
    onDetail = (record) => {
        if (record.groupNumber) {
            this.props.history.push(`invoiceInput/group/${record.groupId}`);
        } else {
            this.props.history.push(`invoiceInput/invoiceDetail/${record.loggingId}`);
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
    onSwitchHandler = (values) => {
        const { selectedRows } = this.state;
        const data = selectedRows.map((item) => {
            return {
                invoiceGroupId: values.groupId,
                invoiceCode: item.invoiceCode,
                invoiceNumber: item.invoiceNumber,
                invoiceLoggingId: item.loggingId
            };
        });
        invoiceInput.MoveGroup(this, data).then((response: any) => {
            const err = response.err;
            const res = response.res;
            if (err) {
                message.error(err.status.description);
                return null;
            } else {
                if (res) {
                    const insert = res.map((item, index) => {
                        if (!item.success) {
                            return <div key={index}>发票代码:{item.invoiceCode},发票号码:{item.invoiceGroupNumber} 设置发票组失败</div>;
                        }
                        return null;
                    });
                    this.setState({
                        message: insert,
                        show: true
                    });

                }
            }
        });
    }
    addAlert = () => {
        return (
            <Alert
                message={this.state.message}
                type="warning"
                closable={true}
                className="mb10"
                onClose={() => { this.setState({ show: false }); }}
            />
        );
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
                <Button className="mr10" type="primary" onClick={this.onAddGroup}>新增发票组</Button>
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
                        onAddToGroup={this.onAddToGroup}
                        getData={this.getData}
                    />
                    {
                        this.state.show && this.addAlert()
                    }
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
                    {
                        this.state.addToModal &&
                        <SwitchGroup onCloseModal={this.onCloseSwitch} onSwitchHandler={this.onSwitchHandler} />
                    }
                </Card>
            </div >
        );
    }

    getData = async () => {
        let { fields, pageNum, pageSize } = this.state;
        fields = { ...fields, pageNum, pageSize };
        const data = await ModulesAction.getGroupData(fields);
        if (data) {
            const treeData = tree(data);
            this.setState({
                list: treeData
            });
        }
    }
}
export default UserForm;
