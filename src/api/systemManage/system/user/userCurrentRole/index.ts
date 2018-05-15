import { Request, Response } from 'kts-scaffold-framework/server';
import { CallType } from 'kts-scaffold-framework/utils/ajax';
import { Urls } from 'src/entry/constant';
import ApiBasic from 'src/api/ApiBasic';
import IData from './IData';
import IOptions from './IOptions';

/**
 * 用户所在公司的当前权限
 */
class UserCurrentRole extends ApiBasic<IOptions, IData> {

    public async api(option: IOptions): Promise<Response<IData>> {
        const req: Request = new Request(CallType.GET, Urls.USER_CURRENT_ROLE, option);
        let data: Response<any> = await this.callCompany(req);
        return data;
    }
}

export default new UserCurrentRole().run;
