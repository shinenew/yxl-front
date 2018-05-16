import { Request, Response } from 'kts-scaffold-framework/server';
import { CallType } from 'kts-scaffold-framework/utils/ajax';
import { Urls } from 'src/entry/constant';
import ApiBasic from 'src/api/ApiBasic';
import IData from './IData';
import IOptions from './IOptions';

/**
 * GroupInfo
 */
class GroupInfo extends ApiBasic<IOptions, IData> {

    /** 入口 */
    public async api(option: IOptions): Promise<Response<IData>> {

        const req: Request = new Request(CallType.POST, Urls.ZONE_GROUP_INFO, option);

        let data: Response<any> = await this.callCompany(req);

        return new Response<IData>(null, {
            detailInfoList: data.res.detailInfoList,
            groupInfo: data.res.groupInfo
        });
    }
}

export default new GroupInfo().run;
