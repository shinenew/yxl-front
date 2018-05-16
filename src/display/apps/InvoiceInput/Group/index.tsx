import * as React from 'react';
import { ModulesBasic, IPropsBasic, ModulesRoot } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import UIForm from './UI.Form';
import UIHeader from './UI.Header';

const css = require('./index.scss');

/** Redux接口 */
interface IReduxStatePart {
    
}

/** Props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {

}

/** 绑定全局数据 */
@connect((state: ReduxState): IReduxStatePart => ({

}))
export default class Group extends ModulesBasic<IProps, ModulesState> {

    public state: ModulesState = new ModulesState();

    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    componentWillMount() {
        ModulesAction.updateGroupId(this.props.match.params.id);
    }

    render() {
        return (
            <ModulesRoot action={ModulesAction}>
                <div className={css.modules}>
                    <UIHeader/>
                    <UIForm {...this.props}/>
                </div>
            </ModulesRoot>
        );
    }
}