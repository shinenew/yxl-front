import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { create } from 'kts-scaffold-framework/utils/form';
import { connect } from 'src/redux';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';
import IOption from './IOption';
import { ExcelImport, ScanImport, ManualImport, OcrScanerImport, ImageImport } from './InvoiceTab';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
/** 全局数据片段数据接口 */
interface IReduxStatePart {

}

/** 组建的props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {
    urlData: IOption;
    refreshInvoice?: () => void;
    onClose?: () => void;
}

/** 绑定全局数据到props */
@create()
@ModulesAction.uiconnect
@connect((state: ReduxState): IReduxStatePart => ({

}))
export default class UIComponents extends UIBasic<IProps, ModulesState> {

    /** 构造函数 */
    constructor(props: IProps) {
        super(props, ModulesAction);
    }
    handleCancel = () => {
        this.props.onClose();
    }
    render() {
        const { refreshInvoice,urlData } = this.props;
        const { tabkey } = this.modulesState;
        console.log(this.modulesState);
        return (
            <div>
                <div style={{padding:15}}>
                    <Tabs defaultActiveKey={tabkey} onChange={ModulesAction.onTabChange} animated={false}>
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
                </div>
            </div>
        );
    }
}
