import { Request, Response } from 'kts-scaffold-framework/server';
import { CallType } from 'kts-scaffold-framework/utils/ajax';
import { Urls } from 'src/entry/constant';
import ApiBasic from 'src/api/ApiBasic';
import IData from './IData';

class Invoice extends ApiBasic<Array<number>, Array<IData>> {

    /** 入口 */
    public async api(option: Array<number>): Promise<Response<Array<IData>>> {
        
        const req: Request = new Request(CallType.POST, Urls.group_resume, option);

        let data: Response<any> = await this.callCompany(req,true);
        if (data.er) {
            return data;
        }
        
        return new Response<any>(null, data.res);
    }
}

export default new Invoice().run;
