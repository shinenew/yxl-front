import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect, ReduxState } from 'src/redux';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import { Popconfirm, Table, Tag, Row, Button, Col  } from 'antd';
import UIRoleRedact from './UI.RoleRedact';
import UIRoleAdd from './UI.RoleAdd';
import { create } from 'kts-scaffold-framework/utils/form';
/** 全局数据片段数据接口 */
interface IReduxStatePart {
}

/** 组建的props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {
}

@create()
@ModulesAction.uiconnect
@connect((state: ReduxState): IReduxStatePart => ({

}))

export default class UITable extends UIBasic<IProps, ModulesState> {
    
    // 构建表头
    public colums = [{
        title: '角色名',
        dataIndex: 'name',
        width: '100px',
    }, {
        title: '描述',
        dataIndex: 'description',
        width: '120px',
    }, {
        title: '权限级别',
        dataIndex: 'public',
        render: (text) => text === true ? '系统' : '公司',
        className: 'text-center',
        width: '90px',
    }, {
        title: '权限列表',
        dataIndex: 'ruleGroups',
        className: 'role-tags',
        render: (text, record) => {
            const rules = text && text.split(',');
            // 隐藏‘根权限’
            const visibleRule = rules && rules.filter(item => item !== '0');
            const tags = visibleRule && visibleRule.map((itr, indexs) => {
                   return <Tag key={indexs}>{this.Privilege(itr)}</Tag>;
            });
            return (
                     <span>{tags}</span>
            );
        },
    }, {
        title: '操作',
        width: 116,
        dataIndex: 'operation',
        render: (text, record, ) => { 
            return (
                <div className="editable-row-operations">
                    <span>
                        {
                            (<span style={{ 'cursor': 'pointer' }} onClick={() => ModulesAction.redactvisible(record)} >修改 | </span>)}
                        {
                            (<Popconfirm title="确认删除?" onConfirm={() => ModulesAction.deleteRole(record)}>
                                <span style={{ 'cursor': 'pointer' }}>删除</span>
                            </Popconfirm>)}
                    </span>
                </div>
            );
        },
    }];
    /** 构造函数 */
    constructor(props: IProps) {
        super(props, ModulesAction);
        ModulesAction.getRoleList();   
           
    }
     /**
      * 角色权限的处理
      */
     Privilege( text: any ) {
        // const ruleItem = this.modulesState.selectData && this.modulesState.selectData.find(it => it.id === text );
        if (this.modulesState.selectData == null) {
            return'';
        }
        for (let i = 0;i < this.modulesState.selectData.length; i++ ) {
                if (this.modulesState.selectData[i].id === parseInt( text , 10) ){
                    return this.modulesState.selectData[i].name;

            }
            
         }
      
    }
    
    render() {
        return (
            <div>
                <Row>
                    <Col style={{ textAlign: 'end', marginBottom: 10 }}>
                        <Button type="primary" onClick={ModulesAction.addVisible} style={{margin:'auto'}}>新增角色</Button>
                    </Col>
                </Row>
                <UIRoleRedact />
                <UIRoleAdd/>
                <Table
                    columns={this.colums}
                    dataSource={this.modulesState.list}
                    rowKey="roleId"
                />
            </div>);
    }
}
