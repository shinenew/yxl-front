import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import language from 'src/entry/Language';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import { UserType } from 'src/entry/constant';
import {
    Card,
    Input,
} from 'antd';
import DescriptionList  from 'ant-design-pro/lib/DescriptionList';
import 'ant-design-pro/dist/ant-design-pro.css';

const { Description } = DescriptionList;
const css = require('./index.scss');

/** Redux接口 */
interface IReduxStatePart {
    nickName?: string;
    userType?: UserType;
    phone?: string;
    email?: string;
    departmentName?: string;
    description?: string;
}

/** Props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {

}

/** 绑定全局数据到props */
@connect((state: ReduxState): IReduxStatePart => ({
    nickName: state.user.userInfo.nickName,
    userType: state.user.userInfo.userType,
    phone: state.user.userInfo.phone,
    email: state.user.userInfo.email,
    departmentName: state.user.userInfo.departmentName,
    description: state.user.userInfo.description,
}))
export default class UIComponents extends UIBasic<IProps, ModulesState> {

    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    /** 用户类型名称 */
    private get nickNameName(): string {
        const userTypeString: string = language.userTypeToString(this.props.userType);
        return userTypeString || '未知';
    }
    
    render() {
        return (
            <Card title="用户资料" className={css.info}>
                <DescriptionList title="" col={2} size="large" gutter={120}> 
                    <Description term="员工姓名">
                        {this.props.nickName}
                    </Description>
                    <Description term="电话">
                        {this.props.phone}
                    </Description>
                    <Description term="邮箱">
                        {this.props.email}
                    </Description>
                    <Description term="所属部门">
                        {this.props.departmentName}
                    </Description>
                    <Description term="角色">
                        <Input value={this.nickNameName} disabled={true}/>
                    </Description>
                    <Description term="备注信息">
                        {this.props.description}
                    </Description>
                </DescriptionList>
            </Card>
        );
    }
}