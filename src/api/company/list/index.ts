import { Request, Response } from 'kts-scaffold-framework/server';
import { CallType } from 'kts-scaffold-framework/utils/ajax';
import { Urls } from 'src/entry/constant';
import { MyStore, reducers } from 'src/redux';
import ApiBasic from 'src/api/ApiBasic';
import IData from './IData';
import IOptions from './IOptions';

/**
 * List
 * 公司列表
 */
class List extends ApiBasic<IOptions, IData> {

    /** 入口 */
    public async api(option: IOptions): Promise<Response<IData>> {

        const req: Request = new Request(CallType.GET, Urls.COMPANY_LIST, option);

        let data: Response<IData> = await this.callGlobal(req);

        if (data.er) {
            return data;
        }

        MyStore.instance.dispatch(reducers.user.ActionTypes.fnSetUserInfo, {
            companyList: data.res,
            currentCompany: -1,
        });

        return new Response(null);
    }
}

export default new List().run;
