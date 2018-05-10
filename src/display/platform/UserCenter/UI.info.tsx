import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import language from 'src/entry/Language';
import { IUserInfo } from 'src/dataModel';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import {
    Card,
    Input,
} from 'antd';
import DescriptionList  from 'ant-design-pro/lib/DescriptionList';

const { Description } = DescriptionList;
const css = require('./index.scss');

/** Redux接口 */
interface IReduxStatePart {
    userInfo?: IUserInfo;
}

/** Props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {

}

/** 绑定全局数据到props */
@ModulesAction.uiconnect
@connect((state: ReduxState): IReduxStatePart => ({
    userInfo: state.user.userInfo,
}))
export default class UIComponents extends UIBasic<IProps, ModulesState> {

    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    /** 用户类型名称 */
    private get nickNameName(): string {
        const {userInfo} = this.props;
        const userTypeString: string = language.userTypeToString(userInfo.userType);
        return userTypeString || '未知';
    }
    
    render() {
        const {userInfo} = this.props;
        return (
            <Card title="用户资料" className={css.info}>
                <DescriptionList title="" col={2} size="large" gutter={120}> 
                    <Description term="员工姓名">
                        {userInfo.nickName}
                    </Description>
                    <Description term="电话">
                        {userInfo.phone}
                    </Description>
                    <Description term="邮箱">
                        {userInfo.email}
                    </Description>
                    <Description term="所属部门">
                        {userInfo.departmentName}
                    </Description>
                    <Description term="角色">
                        <Input value={this.nickNameName} disabled={true}/>
                    </Description>
                    <Description term="备注信息">
                        {userInfo.description}
                    </Description>
                </DescriptionList>
            </Card>
        );
    }
}