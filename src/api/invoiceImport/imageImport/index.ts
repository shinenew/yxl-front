import { Request, Response } from 'kts-scaffold-framework/server';
import { CallType } from 'kts-scaffold-framework/utils/ajax';
import ApiBasic from 'src/api/ApiBasic';
import IOptions from './IOptions';

class Invoice extends ApiBasic<IOptions, any> {

    /** 入口 */
    public async api(option: IOptions): Promise<Response<any>> {
        
        const req: Request = new Request(CallType.POST, option.url, {});

        const data = await this.callCompany(req,true);
        return data;
    }
}

export default new Invoice().run;
