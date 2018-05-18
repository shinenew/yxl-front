import React from 'react';
import { Table, Card, Button, message, Alert, Popconfirm, Icon, Tooltip, Col, Row } from 'antd';
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
import { typeDesc } from 'src/entry/constant/InvoiceType/EnumInvoiceType';
import Template from 'src/display/components/InvoiceTemplate';
const css = require('./index.scss');
@withRouter
class UserForm extends React.Component<any, any> {

    private columns = [
        {
            title: '',
            dataIndex: 'loggingId',
            className: 'text-center',
            render: (text, record) => {
                return (
                    <div >
                        {
                            record.recordType === 2 &&
                            <Icon type="folder" style={{ fontSize: 16, color: '#5CC4E9' }} />

                        }
                        {
                            record.recordType === 1 &&
                            <div className="ui-item-icon input-type bg-green">
                                {typeDesc(record)}
                            </div>

                        }
                    </div>
                );
            }
        },
        {
            title: '销售方名称',
            dataIndex: 'supplierName',
            render: (text, record) => {
                return (
                    <div>
                        {
                            record.groupNumber ?
                                <span>
                                    {record.groupNumber}({record.matchCount}/{record.waitCount})
                                </span>
                                : <span>{text}</span>
                        }
                    </div>
                );

            }
        },
        {
            title: '',
            dataIndex: 'unusualState',
            render: (text, record) => {
                return (
                    <span>{text === 'UNUSUAL' && this.creatTip(record)}
                    </span>
                );
            }
        },
        {
            title: '发票代码',
            width: 125,
            dataIndex: 'invoiceCode'
        },
        {
            title: '发票号码',
            width: 95,
            dataIndex: 'invoiceNumber'
        },
        {
            title: '开票日期',
            width: 110,
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
            render: (text, record) => {
                return (
                    <div>
                        {record.recordType === 1 && formatTime(text)}
                    </div>
                );
            }
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: 140,
            render: (text, record) => {
                return (
                    <div>
                        {
                            (record.realcheckState === 'PASS' || record.recordType === 2) &&
                            <span className="pd5 hand" onClick={() => { this.onDetail(record); }}>详情</span>
                        }
                        {
                            (!record.group && record.realcheckState === 'PASS') &&
                            <span className="pd5 hand" onClick={() => { this.onShowTemplate(record); }}>票面信息</span>
                        }
                        {
                            record.decodeState === 'PASS' &&
                            <span className="pd5 hand" onClick={() => this.viewFailedImage(record)}>查看文件</span>
                        }
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
            show: false,
            template: false,
            templateData: null,
        };
    }
    viewFailedImage = record => {
        invoiceInput.ImgQuery(this, { invoiceLoggingId: record.loggingId }).then((response: any) => {
            const err = response.err;
            const res = response.res;
            if (err) {
                message.error(err.status.description);
                return null;
            } else {
                if (res) {
                    window.open(res.imageUrl);
                }
            }
        });
    }
    creatTip = (record) => {
        let warnArray = [];
        if (record.decodeState === 'FAILED') {
            warnArray.push(<div key="0">未识别</div>);
        }
        if (record.duplicateState === 'FAILED') {
            warnArray.push(<div key="1">重复录入</div>);
        }
        if (record.realcheckState === 'FAILED') {
            warnArray.push(<div key="2">查验状态:{record.realcheckMsg || '查验异常'}</div>);
        }
        if (record.standardState === 'FAILED') {
            warnArray.push(<div key="3">合规状态:{record.standardMsg || '不合规'}</div>);
        }
        const warnMessage = <div>{warnArray}</div>;
        return (
            <Tooltip title={warnMessage}>
                <Icon type="warning" style={{ color: '#EB6100' }} />
            </Tooltip>
        );
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
    onShowTemplate = (record) => {
        invoiceInput.querySingleDetail(this, { incomeInvoiceBizId: record.loggingId }).then((response: any) => {
            const err = response.err;
            const res = response.res;
            if (err) {
                message.error(err.status.description);
                return null;
            } else {
                if (res) {
                    this.setState({
                        template: true,
                        templateData: res.invoiceDetail,
                        templateType: record.invoiceType
                    });
                }
            }
        });
    }
    closeTemplate = () => {
        this.setState({
            template: false
        });
    }
    onDetail = (record) => {
        if (record.groupNumber) {
            this.props.history.push(`invoiceInput/group/${record.loggingId}`);
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
        this.getData();
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
                        message: insert || '移动成功',
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
    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
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
                <Button icon="sync" className={`mr10 ${css['invoice-card-but31']}`} onClick={this.refreshInvoice} />
                <Button className={`mr10 ${css['invoice-card-but31']}`} type="primary" onClick={this.onAddGroup}>新增发票组</Button>
                <Button className={`mr10 ${css['invoice-card-but31']}`} type="primary" onClick={this.onOpenInvoiceImport}>发票录入</Button>
            </div>
        );
        return (
            <div>
                <Card className={css['invoice-card']} title="发票录入" extra={extraButtons}>
                    <Row className={`${css['invoice-card-hander']}`}>
                        <Col span={12} className="text-left">
                            <Button
                                className={`mr10 font10 ${css['invoice-card-button']}`}
                                onClick={this.onAddToGroup}
                                icon="tianjia font10"
                            >
                                添加到发票组
                            </Button>
                            <Button
                                className={`font10 ${css['invoice-card-button']}`}
                                icon="chixugengxin font10"
                            >
                                更新加载信息
                            </Button>
                        </Col>
                        <Col span={12} className="text-right">
                            <Button
                                onClick={this.toggle}
                                className={`mr10 mb-10 font10 ${css['invoice-card-button']}`}
                                htmlType="submit"
                                icon="caret-down font10"
                            >
                                筛选
                            </Button>
                        </Col>
                    </Row>
                    <div style={{ display: this.state.expand ? 'block' : 'none' }}>
                        <AdvancedForm
                            clearFields={this.clearFields}
                            fields={fields}
                            onValuesChange={this.handleFormChange}
                            getData={this.getData}
                        />
                    </div>
                    {
                        this.state.show && this.addAlert()
                    }
                    <Table
                        className="ui-list"
                        style={{ borderColor: '#E9EAEB' }}
                        loading={this.props.loading}
                        bordered={true}
                        dataSource={dataSource}
                        columns={columns}
                        rowClassName={(record, index) => {
                            return (
                                record.recordType === 2 ? 'groupItem' : 'ui-item doc-item'
                            );
                        }}
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
                    {
                        this.state.template &&
                        Template({ type: this.state.templateType, data: this.state.templateData, onClose: this.closeTemplate })

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
