import './index.scss';

import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';

import UIAddDepModal from './UI.AddDepModal';
import UIUpdDepModal from './UI.UpdDepModal';
import UISetDepModal from './UI.SetDepModal';
import UITree from './UI.Tree';
import UIDepTable from './UI.DepTable';
import { Row, Col } from 'antd';

const css = require('./index.scss');

/** Redux接口 */
interface IReduxStatePart {

}

/** Props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {

}

/** 绑定全局数据   */
@ModulesAction.uiconnect
@connect((state: ReduxState): IReduxStatePart => ({

}))
export default class UIDepartment extends UIBasic<IProps, ModulesState> {

    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    render() {
        return (
            <div className={css.modules}>
                <Row>
                    <Col span={8} style={{ borderRight: '1px solid #cccccc' }} className={css.colPadding}>
                        <UITree />
                    </Col>
                    <Col span={16} className={css.colPadding}>
                        <UIDepTable />
                    </Col>
                </Row>
                <UIAddDepModal />
                <UIUpdDepModal />
                <UISetDepModal />
            </div>
        );
    }
}