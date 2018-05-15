import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect, ReduxState } from 'src/redux';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import UIDetail from './UI.UserDetail';
import UIAdd from './UI.UserAdd';
import UISearch from './UI.UserSearche';
import UIRole from './UI.UserRole';
import UIEidt from './UI.UserEdit';
import { Row, Col, Table, Popconfirm, Icon, Tag, Button } from 'antd';
const css = require('./index.scss');

/** 全局数据片段数据接口 */
interface IReduxStatePart {
}

/** 组建的props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {
}

/** 绑定全局数据   */
@ModulesAction.uiconnect
@connect((state: ReduxState): IReduxStatePart => ({

}))
export default class UIComponents extends UIBasic<IProps, ModulesState> {
    /** 对话框状态 */
    state = { visible: false };
    text_center = css.text_center;
    /** 构建表头 */
    public columns = [{
        title: '用户姓名',
        dataIndex: 'nickName',
    }, {
        title: '手机号',
        dataIndex: 'phone',
    }, {
        title: '电子邮箱',
        dataIndex: 'email'
    }, {
        title: '用户状态',
        dataIndex: 'isActivated',
        render: (text, record) => {
            return (
                <div>
                    {record.acceptStatus === 'ACCEPT_ING' && <Tag>邀请中</Tag>}
                    {record.acceptStatus === 'ACCEPT_NO' && <Tag>已拒绝</Tag>}
                    {<Tag>{record.isActivated ? '已激活' : '已禁用'}</Tag>}
                </div>
            );
        },
    }, {
        title: '操作', dataIndex: '', key: 'operation', width: '32%', render: (text, record, index) => (
            <span>
                <Row gutter={10}>
                    <span style={{ 'cursor': 'pointer' }} title="详情" onClick={() => this.showDetailModal(record)}>详情 &nbsp;|</span>
                    <span style={{ 'cursor': 'pointer' }} title="角色绑定" onClick={() => this.showRoleModal(record)}>角色绑定 &nbsp;|</span>
                    {/* <span style={{ 'cursor': 'pointer' }} title="编辑" onClick={() => this.showEditModal(record)}>编辑 &nbsp;|</span> */}
                    {
                        (record.isActivated === true ) ? (
                            <span style={{ 'cursor': 'pointer' }} title="修改" onClick={() => this.showEditModal(record)} >
                                修改 |{''}
                            </span>
                        ) : ('')
                    }
                    {record.acceptStatus === 'ACCEPT_YES' &&
                        <Popconfirm title={record.isActivated ? '确认禁用？' : '确认激活？'} onConfirm={() => this.onDisOrEna(record)}>
                            <span style={{ 'cursor': 'pointer' }} title={record.isActivated ? '禁用' : '激活'} > {record.isActivated ? '禁用' : '激活'}</span>
                        </Popconfirm>
                    }

                    {
                        (record.acceptStatus === 'ACCEPT_ING' || record.acceptStatus === 'ACCEPT_NO') &&
                        <span style={{ 'cursor': 'pointer' }} title="重新发送" onClick={() => this.onSendInvite(record)}> 重新发送</span>
                    }

                </Row>
            </span>
        )
    }];

    componentDidMount() {
        ModulesAction.getUserList();
    }

    /** 构造函数 */
    constructor(props: IProps) {
        super(props, ModulesAction);
    }


    /** 重新邀请 */
    onSendInvite = (record) => {
        ModulesAction.userSend(record);
    }

    /** 禁用或激活用户 */
    onDisOrEna = (record) => {
        let status = true;
        if (record && record.isActivated === false) {
            status = false;
        }
        ModulesAction.userDisOrEna(record, status);
    }

    /** 显示详情弹框 */
    showDetailModal = (record) => {
        ModulesAction.userModalFn('detail', 'show', record);
    }

    /** 显示编辑弹框 */
    showEditModal = (record) => {
        ModulesAction.userModalFn('edit', 'show', record);
    }

    /** 改变icon状态 */
    onChangIcon = () => {
        ModulesAction.userSearchIcon();
    }

    /** 角色绑定弹框 */
    showRoleModal = (record) => {
        ModulesAction.userModalFn('role', 'show', record);
        // 获取用户所在的公司的所有权限
        ModulesAction.getUserCompanyRole(record.companyId);
        // 获取用户在公司的当前权限
        ModulesAction.getUserCurrentRole(record.userId);
    }

    /** 显示新增用户弹框 */
    showUserAdd = () => {
        ModulesAction.userModalFn('add', 'show');
    }

    render() {
        return (
            <div>
                <div>
                    <Row>
                        <Col span={24} className={css.text_right}>
                            <Button className={css.mr_10} type="primary" onClick={() => this.showUserAdd()}>新增 <Icon type="plus-circle" /></Button>
                            <Button onClick={() => this.onChangIcon()}>筛选 <Icon type={this.modulesState.iconStyle ? 'up' : 'down'} /></Button>
                        </Col>
                    </Row>
                </div>
                <UISearch />
                <div>
                    <Table
                        rowKey={record => record.userId}
                        columns={this.columns}
                        loading={this.modulesState.userDataLoding}
                        dataSource={this.modulesState.data}
                        pagination={{ pageSize: 10, showTotal: () => <span className={css.page_total}>用户总数：<span className={css.number}>{this.modulesState.total}</span> </span> }}
                    />
                </div>
                <UIRole />
                <UIDetail />
                <UIAdd />
                <UIEidt />
            </div>
        );
    }
}
