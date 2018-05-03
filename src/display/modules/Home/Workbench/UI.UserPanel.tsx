
import * as React from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import { UserType } from 'src/entry/constant';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';

const css = require('./index.scss');
const HeadPortrait = require('./IMG.HeadPortrait.jpeg');

/** Redux接口 */
interface IReduxStatePart {
    nickName?: string;
    userType?: UserType;
}

/** Props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {
    /** 当前收起状态 */
    collapsed: boolean;
}

/** 用户面板 */
@connect((state: ReduxState): IReduxStatePart => ({
    nickName: state.user.userInfo.nickName,
    userType: state.user.userInfo.userType
}))
export default class UIUserPanel extends UIBasic<IProps, ModulesState> {

    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    /** 用户类型名称 */
    private get nickNameName() {
        switch (this.props.userType) {
            case UserType.公司管理员:
                return '公司管理员';
            case UserType.普通用户:
                return '普通用户';
            case UserType.超级管理员:
                return '超级管理员';
            default:
                return '未知';
        }
    }

    render() {
        return (
            <div className={css.userPanel} >
                <img className={css.headPortrait} src={HeadPortrait} />
                {
                    this.props.collapsed ||
                    <p>
                        <span className={css.userPanelNickName} >{this.props.nickName}</span>
                        <span className={css.userPanelNickNameName} >{this.nickNameName}</span>
                    </p>
                }
                <ul className={css.userPanelMenu} data-collapsed={this.props.collapsed ? 1 : 0} >
                    <li><Link to="/workbench/platform/userCenter"><Icon type="userinfo-gerenxinxi" /></Link></li>
                    <li><Icon type="exit" /></li>
                    <li><Icon type="weibiaoti-_fuzhi" /></li>
                </ul>
            </div>
        );
    }
}