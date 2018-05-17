import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
const css = require('./index.scss');
import { Row, Col, Tree, Button, Modal } from 'antd';
const TreeNode = Tree.TreeNode;
const confirm = Modal.confirm;
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
export default class UITree extends UIBasic<IProps, ModulesState> {

    constructor(props: IProps) {
        super(props, ModulesAction);
        ModulesAction.departmentQuery();
        this.onUpdate = this.onUpdate.bind(this);
    }

    /** 选择树节点 */
    onSelect = (selectedKeys, info) => {
        // console.log('selected', selectedKeys, info);
        // console.log(selectedKeys);
        ModulesAction.departmentUser(selectedKeys);
    }

    // 示新增界面
    onAdd = () => {
        ModulesAction.addDepUserModal();
    }

    /** 删除 */
    onDelete = () => {
        confirm({
            title: '你确定要删除此部门吗?',
            onOk: () => {
                ModulesAction.deleteDep(this.modulesState.depModulesState.selectTreeCode);
            },
        });
    }

    /** 修改 */
    onUpdate(departmentId: any) {
        ModulesAction.getDepartment(this.modulesState.depModulesState.selectTreeCode);
    }

    /** 构建树 */
    renderTreeNodes = (data) => {
        return data && data.map((item) => {
            if (item.children !== null && item.children !== undefined) {
                if (item.children.length > 0) {
                    return (
                        /** 构建树子节点 */
                        <TreeNode title={'(' + item.number + ')' + item.title} key={item.key} id={item.departmentId}>
                            {this.renderTreeNodes(item.children)}
                        </TreeNode>
                    );
                }
            }

            return <TreeNode title={'(' + item.number + ')' + item.title} key={item.key} id={item.departmentId} />;
        });
    }
    render() {
        return (
            <div className={css.modules}>
                <Row >
                    <Col style={{ 'height': 500, overflow: 'auto' }}>
                        <Tree
                            checkable={false}
                            onSelect={this.onSelect}
                            autoExpandParent={false}
                        >
                            {this.renderTreeNodes(this.modulesState.depModulesState.treeData)}
                        </Tree>
                    </Col>
                    <Col style={{ borderTop: '1px solid #cccccc', paddingTop: 15,textAlign:'center' }}>
                        <Button type="primary" onClick={ModulesAction.addDepUserModal.bind(this, 2)} style={{marginRight:10}}>新增</Button>
                        <Button type="danger" onClick={this.onDelete} disabled={this.modulesState.depModulesState.isDisabled} className="ml-10" style={{marginRight:10}}>删除</Button>
                        <Button
                            type="primary"
                            onClick={ModulesAction.getDepartment.bind(this, this.modulesState.depModulesState.selectTreeCode)}
                            disabled={this.modulesState.depModulesState.isDisabled}
                            className="ml-10"
                        >
                            修改
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}