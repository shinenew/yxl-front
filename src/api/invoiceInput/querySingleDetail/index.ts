import { Request, Response } from 'kts-scaffold-framework/server';
import { CallType } from 'kts-scaffold-framework/utils/ajax';
import { Urls } from 'src/entry/constant';
import ApiBasic from 'src/api/ApiBasic';
import IData from './IData';
import IOptions from './IOptions';

/**
 * QuerySingleDetail
 */
class QuerySingleDetail extends ApiBasic<IOptions, IData> {

    /** 入口 */
    public async api(option: IOptions): Promise<Response<IData>> {
        const req: Request = new Request(CallType.POST, Urls.getInvoiceDetails, option);

        let data: Response<any> = await this.callCompany(req);
        if (data.er) {
            return new Response<IData>(null);
        }
        
        return new Response<IData>(null, {info: data.res});
    }
}

export default new QuerySingleDetail().run;
