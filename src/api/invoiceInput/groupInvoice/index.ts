import { Request, Response } from 'kts-scaffold-framework/server';
import { CallType } from 'kts-scaffold-framework/utils/ajax';
import { Urls } from 'src/entry/constant';
import ApiBasic from 'src/api/ApiBasic';
import IData from './IData';
import IOptions from './IOptions';

/**
 * GroupInvoice
 */
class GroupInvoice extends ApiBasic<IOptions, IData> {

    /** 入口 */
    public async api(option: IOptions): Promise<Response<IData>> {

        const req: Request = new Request(CallType.GET, Urls.ZONE_INVOICELIST, option);

        const data: Response<IData> = await this.callAjax(req, true);

        console.log(data);

        return data;
    }
}

export default new GroupInvoice().run;
