import { Request, Response } from 'kts-scaffold-framework/server';
import { CallType } from 'kts-scaffold-framework/utils/ajax';
import { Urls } from 'src/entry/constant';
import ApiBasic from 'src/api/ApiBasic';
import IData from './IData';
import IOptions from './IOptions';

class Invoice extends ApiBasic<IOptions, Array<IData>> {

    /** 入口 */
    public async api(option: IOptions): Promise<Response<Array<IData>>> {
        
        const req: Request = new Request(CallType.POST, Urls.group_invoice_list, option);

        const data = await this.callCompany(req);
        return data;
    }
}

export default new Invoice().run;