import { Request, Response } from 'kts-scaffold-framework/server';
import { CallType } from 'kts-scaffold-framework/utils/ajax';
import { Urls } from 'src/entry/constant';
import ApiBasic from 'src/api/ApiBasic';
import IData from './IData';
import IOptions from './IOptions';

/**
 * GroupSaveDetail
 */
class GroupSaveDetail extends ApiBasic<IOptions, IData> {

    /** 入口 */
    public async api(option: IOptions): Promise<Response<IData>> {

        const req: Request = new Request(CallType.POST, Urls.ZONE_SAVE_DETAIL, option);

        let data: Response<IData> = await this.callAjax(req);

        return data;
    }
}

export default new GroupSaveDetail().run;
