import { Request, Response } from 'kts-scaffold-framework/server';
import { CallType } from 'kts-scaffold-framework/utils/ajax';
import { Urls } from 'src/entry/constant';
import { MyStore, reducers } from 'src/redux';
import { IUser } from 'src/redux/ReduxState';
import ApiBasic from 'src/api/ApiBasic';
import IOptions from './IOptions';

/**
 * 切换公司
 * Switching
 */
class Switching extends ApiBasic<IOptions, undefined> {

    /** 入口 */
    public async api(option: IOptions): Promise<Response<undefined>> {

        const { user } = MyStore.instance.getState();
        let data: Response<any>;
        
        // 登录公司
        data = await this.authCwebLogin(option, user);
        if (data.er) {
            return data;
        }

        // 获取公司已安装应用列表
        data = await this.callCompany(new Request(CallType.GET, Urls.APP_INSTANCE_QUERY, option));
        if (data.er) {
            return data;
        }
        user.appList = data.res;

        // 获取用户信息
        data = await this.companyUserInfo(option, user);
        if (data.er) {
            return data;
        }

        MyStore.instance.dispatch(reducers.user.ActionTypes.fnSetUserInfo, user);

        return new Response(null);
    }

    /**
     * 登录公司
     */
    private authCwebLogin = async (option: IOptions, user: IUser): Promise<Response<undefined>> => {
        let data: Response<any> = await this.callGlobal(new Request(CallType.POST, Urls.AUTH_CWEB_LOGIN, option));
        if (data.er) {
            return data;
        }

        user.cToken = data.res.cToken;
        user.zoneUrl = data.res.zoneUrl;

        for (let i = 0; i < user.companyList.length; i++) {
            if (user.companyList[i].companyId === option.companyId) {
                user.currentCompany = i;
                break;
            }
        }

        return new Response(null);
    }

    /**
     * 获取用户信息
     */
    private companyUserInfo = async (option: IOptions, user: IUser): Promise<Response<undefined>> => {
        let data: Response<any> = await this.callCompany(new Request(CallType.GET, Urls.COMPANY_USER_INFO, option));
        if (data.er) {
            return data;
        }
        
        data.res.cUserId = data.res.userId;
        delete data.res.userId;
        user.userInfo = data.res;

        return new Response(null);
    }
}

export default new Switching().run;
