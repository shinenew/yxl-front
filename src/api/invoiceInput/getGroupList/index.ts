import { Request, Response } from 'kts-scaffold-framework/server';
import { CallType } from 'kts-scaffold-framework/utils/ajax';
import { Urls } from 'src/entry/constant';
import ApiBasic from 'src/api/ApiBasic';

class GetGroupList extends ApiBasic<any, any> {

    /** 入口 */
    public async api(option?: any): Promise<Response<any>> {
        
        const req: Request = new Request(CallType.GET, Urls.GROUP_GET_GROUP_LIST, option);

        const data = await this.callCompany(req);
        return data;
    }
}

export default new GetGroupList().run;