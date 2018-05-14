import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import IOption from './IOption';
import { ExcelImport, ScanImport, ManualImport, OcrScanerImport, ImageImport } from './InvoiceTab';
import { Tabs, Modal } from 'antd';
const TabPane = Tabs.TabPane;
/** 全局数据片段数据接口 */
interface IReduxStatePart {

}

/** 组建的props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {
    urlData?: IOption;
    refreshInvoice?: () => {};
    onClose?: () => {};
}

/** 绑定全局数据到props */
@ModulesAction.uiconnect
@connect((state: ReduxState): IReduxStatePart => ({

}), true)
export default class UIComponents extends UIBasic<IProps, ModulesState> {

    /** 构造函数 */
    constructor(props: IProps) {
        super(props, ModulesAction);
    }
    handleCancel = () => {
        this.props.onClose();
    }
    render() {
        const { refreshInvoice } = this.props;
        const { urlData, tabkey } = this.modulesState;
        return (
            <div>
                <Modal
                    className="modalsty"
                    width={600}
                    visible={true}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Tabs defaultActiveKey="1" onChange={ModulesAction.onTabChange}>
                        <TabPane tab="扫描录入" key="1">
                            {tabkey === '1' &&
                                <ScanImport
                                    fnForceUpdate={refreshInvoice}
                                    url={urlData}
                                />
                            }
                        </TabPane>
                        {
                            (urlData && urlData.qrtoken) &&
                            <TabPane tab="上传录入" key="2">
                                {tabkey === '2' &&
                                    <ImageImport fnForceUpdate={refreshInvoice} url={urlData} />}
                            </TabPane>
                        }
                        <TabPane tab="手工录入" key="3">
                            {tabkey === '3' &&
                                <ManualImport fnForceUpdate={refreshInvoice} url={urlData} />
                            }
                        </TabPane>
                        {
                            (urlData && urlData.downloadurl) && <TabPane tab="Excel" key="4">
                                {tabkey === '4' &&
                                    <ExcelImport fnForceUpdate={refreshInvoice} url={urlData} />

                                }
                            </TabPane>
                        }
                        {
                            (urlData && urlData.scanerurl) &&
                            <TabPane tab="扫描仪" key="5">
                                {tabkey === '5' && (
                                    <OcrScanerImport fnForceUpdate={refreshInvoice} url={urlData} />
                                )}
                            </TabPane>
                        }
                    </Tabs>
                </Modal>
            </div>
        );
    }
}
