import * as React from 'react';
import { ModulesBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import UIInfo from './UI.info';

const css = require('./index.scss');

/** Redux接口 */
interface IReduxStatePart {
    
}

/** Props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {

}

/** 用户中心 */
@connect((state: ReduxState): IReduxStatePart => ({

}))
export default class UserCenter extends ModulesBasic<IProps, ModulesState> {

    public state: ModulesState = new ModulesState();

    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    render() {
        return (
            <div key={this.state.key} className={css.modules}>
                <UIInfo />
            </div>
        );
    }
}