import { Request, Response } from 'kts-scaffold-framework/server';
import { CallType } from 'kts-scaffold-framework/utils/ajax';
import { Urls } from 'src/entry/constant';
import ApiBasic from 'src/api/ApiBasic';
import IData from './IData';
import IOptions from './IOptions';

/**
 * RealcheckQuery
 */
class RealcheckQuery extends ApiBasic<IOptions, IData> {
    /** 入口 */
    public async api(option: IOptions): Promise<Response<IData>> {
        option.incomeInvoiceBizId = '537972639935758336';
        const req: Request = new Request(CallType.GET, Urls.realcheck, option);

        let data: Response<any> = await this.callCompany(req);
        if (data.er) {
            return new Response<IData>(null);
        }
        
        return new Response<IData>(null, {info: data.res});
    }
}

export default new RealcheckQuery().run;
