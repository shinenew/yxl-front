import { Request, Response } from 'kts-scaffold-framework/server';
import { CallType } from 'kts-scaffold-framework/utils/ajax';
import { Urls } from 'src/entry/constant';
import ApiBasic from 'src/api/ApiBasic';
import IData from './IData';
import IOptions from './IOptions';

/**
 * 重新发送邀请
 */
class UserSend extends ApiBasic<IOptions, IData> {

    public async api(option: IOptions): Promise<Response<IData>> {
        debugger;
        const req: Request = new Request(CallType.POST, Urls.USER_SEND, option);
        let data: Response<any> = await this.callCompany(req);
        return data;
    }
}

export default new UserSend().run;
