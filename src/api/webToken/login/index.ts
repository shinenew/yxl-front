import { Request, Response } from 'kts-scaffold-framework/server';
import { CallType } from 'kts-scaffold-framework/utils/ajax';
import { Urls } from 'src/entry/constant';
import ApiBasic from 'src/api/ApiBasic';
import { MyStore, reducers } from 'src/redux';
import IData from './IData';
import IOptions from './IOptions';

/**
 * Login
 * 用户登录
 */
class Login extends ApiBasic<IOptions, IData> {

    /** 入口 */
    public async api(option: IOptions): Promise<Response<IData>> {

        const req: Request = new Request(CallType.POST, Urls.WEB_TOKEN_LOGIN, option);

        let data: any = await this.callGlobal(req);
        
        if (!data.er) {
            MyStore.instance.dispatch(reducers.user.ActionTypes.fnSetUserInfo, { gToken: data.res.token });
        }

        return data;
    }
}

export default new Login().run;
