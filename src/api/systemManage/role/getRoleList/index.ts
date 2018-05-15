import { Request, Response } from 'kts-scaffold-framework/server';
import { CallType } from 'kts-scaffold-framework/utils/ajax';
import { Urls } from 'src/entry/constant';
import ApiBasic from 'src/api/ApiBasic';
import IData from './IData';
import IOptions from './IOptions';

/**
 * Demo
 */
class Demo extends ApiBasic<IOptions, IData> {

    /** 入口 */
    public async api(option: IOptions): Promise<Response<IData>> {

        const req: Request = new Request(CallType.GET, Urls.SYSTEM_ROLELIST,  this.working(option) );
        let data: Response<any> = await this.callCompany(req);
        return data;
    }
    
    /** 
     * 对入参加工
     * @param option 原始如参数
     */
    private working(option: IOptions): any {
        return option;
    }
}

export default new Demo().run;
