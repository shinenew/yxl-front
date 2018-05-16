import { Request, Response } from 'kts-scaffold-framework/server';
import { CallType } from 'kts-scaffold-framework/utils/ajax';
import { Urls } from 'src/entry/constant';
import ApiBasic from 'src/api/ApiBasic';
import IOptions from './IOptions';

class MoveGroup extends ApiBasic<IOptions, any> {

    /** 入口 */
    public async api(option: IOptions): Promise<Response<any>> {
        
        const req: Request = new Request(CallType.POST, Urls.GROUP_MOVE, option);

        const data = await this.callCompany(req);
        return data;
    }
}

export default new MoveGroup().run;