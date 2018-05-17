import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import { Table, Row, Col, Button } from 'antd';
const css = require('./index.scss');

var columns = [
    {
        title: '员工姓名',
        dataIndex: 'nickName',
        width: 140
    },
    {
        title: '手机号码',
        dataIndex: 'phone',
        width: 200
    },
    {
        title: '电子邮箱',
        dataIndex: 'email',
    },
];
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
export default class UITable extends UIBasic<IProps, ModulesState> {

    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    render() {
        let { selectedDepRowKeys } = this.modulesState.depModulesState;
        const rowSelection = {
            // 获取选中的行
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                console.log(selectedRowKeys);
                this.modulesState.depModulesState.selectedDepRows = [];
                this.modulesState.depModulesState.selectedDepRowKeys = [];
                this.modulesState.depModulesState.selectedDepRowKeys = selectedRowKeys;
                
                selectedRows.forEach(element => {
                    this.modulesState.depModulesState.selectedDepRows.push(element);
                    this.modulesState.depModulesState.userIds.push(element.userId);
                });
                this.setState(this.modulesState.depModulesState.selectedDepRowKeys);
                ModulesAction.setDepTableKey();
                console.log(selectedDepRowKeys);
            },
            selectedRowKeys: selectedDepRowKeys,
            getCheckboxProps: record => ({
                // 禁用某一项
                // disabled: record.name === '张三', 
                // 选择框的name属性值
                // name: record.key,
            }),
            // type: 'radio'
        };
        return (
            <div className={css.modules}>
                <Row>
                    <Col style={{ textAlign: 'end', marginBottom: 10 }}>
                        <Button onClick={ModulesAction.refreshDep} type="primary" style={{ marginRight: 10 }}>刷新</Button>
                        <Button onClick={ModulesAction.openSetDepModal} disabled={this.modulesState.depModulesState.selectedDepRows.length === 0 ? true : false} type="primary">设置所在部门</Button>
                    </Col>
                    <Col>
                        <Table rowSelection={rowSelection} columns={columns} loading={this.modulesState.depModulesState.isDepLoadding} dataSource={this.modulesState.depModulesState.userlist} />
                    </Col>
                </Row>
            </div>
        );
    }
}