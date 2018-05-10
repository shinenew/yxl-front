import { Request, Response } from 'kts-scaffold-framework/server';
import { CallType } from 'kts-scaffold-framework/utils/ajax';
import { Urls } from 'src/entry/constant';
import ApiBasic from 'src/api/ApiBasic';
import IData from './IData';
import IOptions from './IOptions';

class Invoice extends ApiBasic<IOptions, IData> {

    /** 入口 */
    public async api(option: IOptions): Promise<Response<IData>> {
        
        const req: Request = new Request(CallType.POST, Urls.ZONE_GROUPLIST, option);

        let data: Response<any> = await this.callGlobal(req,true);
        if (data.er) {
            return data;
        }
        
        return new Response<IData>(null, {list: data.res.items});
    }
}

export default new Invoice().run;
