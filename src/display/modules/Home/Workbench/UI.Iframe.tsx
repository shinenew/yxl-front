import * as React from 'react';
import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import { connect } from 'src/redux';
import { IAppInfo } from 'src/dataModel';
import ReduxState, { } from 'src/redux/ReduxState';
import ModulesState from './Modules.State';
import ModulesAction from './Modules.Action';

const css = require('./index.scss');

/** Redux接口 */
interface IReduxStatePart {
    appList?: IAppInfo[];
}

/** Props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {

}

/** iframe */
@connect((state: ReduxState): IReduxStatePart => ({
    appList: state.user.appList || []
}))
export default class UIIframe extends UIBasic<IProps, ModulesState> {

    constructor(props: IProps) {
        super(props, ModulesAction);
    }

    /** 获取启动了的app */ 
    private get appInfo(): IAppInfo {
        const { match, appList } = this.props;
        const appid: string = match.params.appid;

        for (let i = 0; i < appList.length; i++) {
            if (appList[i].appId.toString() === appid) {
                return appList[i];
            }
        }

        return null;
    }

    render() {
        return (
            <div className={css.iframe} >
                {
                    // this.appInfo.appIndexUri
                    this.appInfo
                    ? <iframe src={'http://b.kxl.com:3000?k=111'} />
                    : <p>没有找到app</p>
                }
            </div>
        );
    }
}