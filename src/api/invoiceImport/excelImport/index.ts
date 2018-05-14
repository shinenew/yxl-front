import { Request, Response } from 'kts-scaffold-framework/server';
import { CallType } from 'kts-scaffold-framework/utils/ajax';
import ApiBasic from 'src/api/ApiBasic';

class Invoice extends ApiBasic<any, any> {

    /** 入口 */
    public async api(option: any): Promise<Response<any>> {
        
        const req: Request = new Request(CallType.POST, option.url, option);

        const data = await this.callCompany(req,true);
        return data;
    }
}

export default new Invoice().run;
