
import * as React from 'react';
import { Icon, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import language from 'src/entry/Language';
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
}

/** 用户面板 */
@ModulesAction.uiconnect
@connect((state: ReduxState): IReduxStatePart => ({
    nickName: state.user.userInfo.nickName,
    userType: state.user.userInfo.userType
}))
export default class UIUserPanel extends UIBasic<IProps, ModulesState> {

    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    /** 用户类型名称 */
    private get nickNameName(): string {

        const userTypeString: string = language.userTypeToString.get(this.props.userType);
        return userTypeString || '未知';
    }

    render() {
        return (
            <div className={css.userPanel} >
                <Avatar  className={css.headPortrait} src={HeadPortrait} />
                {
                    this.modulesState.collapsed ||
                    <p>
                        <span className={css.userPanelNickName} >{this.props.nickName}</span>
                        <span className={css.userPanelNickNameName} >{this.nickNameName}</span>
                    </p>
                }
                <ul className={css.userPanelMenu} data-collapsed={this.modulesState.collapsed ? 1 : 0} >
                    <li><Link to="/workbench/platform/userCenter"><Icon type="userinfo-gerenxinxi" /></Link></li>
                    <li><Link to="/login"><Icon type="exit" /></Link></li>
                    <li><Link to="/login/company"><Icon type="weibiaoti-_fuzhi" /></Link></li>
                </ul>
            </div>
        );
    }
}