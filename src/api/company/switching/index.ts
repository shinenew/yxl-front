import { Request, Response } from 'kts-scaffold-framework/server';
import { CallType } from 'kts-scaffold-framework/utils/ajax';
import { Urls } from 'src/entry/constant';
import { MyStore, reducers } from 'src/redux';
import ApiBasic from 'src/api/ApiBasic';
import IOptions from './IOptions';

/**
 * 切换公司
 * Switching
 */
class Switching extends ApiBasic<IOptions, undefined> {

    /** 入口 */
    public async api(option: IOptions): Promise<Response<undefined>> {

        let data: Response<any>;

        // 登录公司
        data = await this.callGlobal(new Request(CallType.POST, Urls.AUTH_CWEB_LOGIN, option));
        if (data.er) {
            return data;
        }

        const { user } = MyStore.instance.getState();
        user.cToken = data.res.cToken;
        user.zoneUrl = data.res.zoneUrl;

        for (let i = 0; i < user.companyList.length; i++) {
            if (user.companyList[i].companyId === option.companyId) {
                user.currentCompany = i;
                break;
            }
        }
        
        // 获取公司已安装应用列表
        data = await this.callCompany(new Request(CallType.GET, Urls.APP_INSTANCE_QUERY, option));
        if (data.er) {
            return data;
        }
        user.appList = data.res;
        
        MyStore.instance.dispatch(reducers.user.ActionTypes.fnSetUserInfo, user);

        return new Response(null);
    }
}

export default new Switching().run;
