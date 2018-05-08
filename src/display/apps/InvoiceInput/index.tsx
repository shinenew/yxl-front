import * as React from 'react';
import { ModulesBasic, IPropsBasic, ModulesRoot } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import { Button, Select } from 'antd';
import UIComponents from './UI.Components';
import { Aside, SelectBox } from 'src/display/components';

const css = require('./index.scss');

/** Redux接口 */
interface IReduxStatePart {

}

/** Props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {

}

/** 发票录入 */
@connect((state: ReduxState): IReduxStatePart => ({

}))
export default class InvoiceInput extends ModulesBasic<IProps, ModulesState> {

    public state: ModulesState = new ModulesState();

    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    render() {
        return (
            <ModulesRoot action={ModulesAction}>
                <div className={css.modules}>
                    <UIComponents />
                </div>

                <Button onClick={ModulesAction.onCancel}>
                    {
                        this.state.isVisible
                            ? '关闭'
                            : '开启'
                    }
                </Button>

                <Aside onCancel={ModulesAction.onCancel} title="标题" visible={this.state.isVisible}>
                    内容<br />
                </Aside>

                <SelectBox value="1" >
                    <Select.Option key={99} value={1212} >1313</Select.Option>
                    {SelectBox.createOption([
                        { value: 1, children: '1' },
                        { value: 2, children: '2', isOnChang: false, onClick: (e) => { console.log(e); } },
                    ])}
                </SelectBox>
            </ModulesRoot>
        );
    }
}