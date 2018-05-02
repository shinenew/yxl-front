
import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';

const css = require('./index.scss');
const HeadPortrait = require('./IMG.HeadPortrait.jpeg');

/** Redux接口 */
interface IReduxStatePart {
}

/** Props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {
}

/** 用户面板 */
@connect((state: ReduxState): IReduxStatePart => ({
}))
export default class UIUserPanel extends UIBasic<IProps, ModulesState> {

    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    render() {
        return (
            <div className={css.userPanel} >
                <img className={css.headPortrait} src={HeadPortrait} />
            </div>
        );
    }
}