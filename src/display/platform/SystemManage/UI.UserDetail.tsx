import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect, ReduxState } from 'src/redux';
import ModulesAction from './Modules.Action';
import ModulesState from './Modules.State';
import moment from 'moment';
import { Modal, Row, Col, Tag } from 'antd';

/** 全局数据片段数据接口 */
interface IReduxStatePart {

}

/** 组建的props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {
}

/** 绑定全局数据 */
@ModulesAction.uiconnect
@connect((state: ReduxState): IReduxStatePart => ({

}))
export default class UIDetail extends UIBasic<IProps, ModulesState> {

    /** 构造函数 */
    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    /** 时间戳转时间字符串 */
    formatTime = (time) => {
        if (time) {
            const timestamp = time / 1000;
            const date = moment.unix(timestamp).format('YYYY-MM-DD HH:mm');
            return date;
        } else {
            return '';
        }
    }

    /** 隐藏详情弹框  */
    hideModal = () => {
        ModulesAction.userModalFn('detail', 'hide');
    }

    render() {
        const { } = this.props;
        return (
            <div>
                <Modal
                    title="详情页"
                    visible={this.modulesState.userModulesState.detailVisible}
                    onOk={this.hideModal} // 点击确定回调
                    onCancel={this.hideModal} // 点击遮罩层或右上角叉或取消按钮的回调
                    footer={null} // 隐藏底部确认和关闭按钮
                    mask={true} // 是否展示遮罩 默认是true
                    maskClosable={false} // 点击蒙层是否允许关闭 默认是true
                    destroyOnClose={true} // 关闭时销毁model里的子元素  
                    width={1000}
                >
                    <Row >
                        <Col span={12}><p><span style={{ fontSize: 16 }}>用户姓名：</span>{this.modulesState.userModulesState.detail && this.modulesState.userModulesState.detail.nickName} </p></Col>
                        <Col span={12}><p><span style={{ fontSize: 16 }}>电子邮箱：</span>{this.modulesState.userModulesState.detail && this.modulesState.userModulesState.detail.email}  </p></Col>
                    </Row>
                    <Row >
                        <Col span={12}> <p><span style={{ fontSize: 16 }}>所属部门：</span>{this.modulesState.userModulesState.detail && this.modulesState.userModulesState.detail.departmentName} </p></Col>
                        <Col span={12}><p><span style={{ fontSize: 16 }}>电话号码： </span> {this.modulesState.userModulesState.detail && this.modulesState.userModulesState.detail.phone} </p></Col>
                    </Row>
                    <Row >
                        <Col span={12}> <p><span style={{ fontSize: 16 }}>最后登陆时间: </span>{this.modulesState.userModulesState.detail && this.formatTime(this.modulesState.userModulesState.detail.lastLoginTime)} </p></Col>
                        <Col span={12}> <p><span style={{ fontSize: 16 }}>最后登陆IP: </span>{this.modulesState.userModulesState.detail && this.modulesState.userModulesState.detail.lastLoginIp} </p></Col>
                    </Row>
                    <Row >
                        <Col span={12}><p><span style={{ fontSize: 16 }}>用户状态: </span> {
                            this.modulesState.userModulesState.detail && this.modulesState.userModulesState.detail.acceptStatus === 'ACCEPT_ING' && <Tag>邀请中</Tag>
                        }
                            {
                                this.modulesState.userModulesState.detail && this.modulesState.userModulesState.detail.acceptStatus === 'ACCEPT_NO' && <Tag>已拒绝</Tag>
                            }
                            {
                                <Tag>{this.modulesState.userModulesState.detail && this.modulesState.userModulesState.detail.isActivated ? '已激活' : '已禁用'}</Tag>
                            } </p></Col>
                    </Row>
                    <Row>
                        <Col span={24}><p><span style={{ fontSize: 16 }}>用户备注: </span> {this.modulesState.userModulesState.detail && this.modulesState.userModulesState.detail.description} </p></Col>
                    </Row>
                </Modal>
            </div>
        );
    }

}