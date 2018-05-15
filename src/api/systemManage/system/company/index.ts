import { Request, Response } from 'kts-scaffold-framework/server';
import { CallType } from 'kts-scaffold-framework/utils/ajax';
import { Urls } from 'src/entry/constant';
import ApiBasic from 'src/api/ApiBasic';
import IData from './IData';
import IOptions from './IOptions';

/**
 * getCarMockData
 */
class GetCarMockData extends ApiBasic<IOptions, IData> {

    /** 入口 */
    public async api(option: IOptions): Promise<Response<IData>> {
        
        const req: Request = new Request(CallType.GET, Urls.ZONE_CONNECTIONLIST, option);
        let data: Response<any> = await this.callCompany(req);

        return data;
    }
}

export default new GetCarMockData().run; 
