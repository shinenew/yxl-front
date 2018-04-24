import { Request, Response } from 'kts-scaffold-framework/server';
import { CallType } from 'kts-scaffold-framework/utils/ajax';
import { Urls } from 'src/entry/constant';
import { MyStore, reducers } from 'src/redux';
import ApiBasic from 'src/api/ApiBasic';
import IData from './IData';
import IOptions from './IOptions';

/**
 * 切换公司
 * Switching
 */
class Switching extends ApiBasic<IOptions, IData> {

    /** 入口 */
    public async api(option: IOptions): Promise<Response<IData>> {

        const req: Request = new Request(CallType.POST, Urls.AUTH_CWEB_LOGIN, option);

        let data: Response<any> = await this.callGlobal(req);

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
        
        MyStore.instance.dispatch(reducers.user.ActionTypes.fnSetUserInfo, user);

        return new Response(null);
    }
}

export default new Switching().run;
