import { Request, Response } from 'kts-scaffold-framework/server';
import { CallType } from 'kts-scaffold-framework/utils/ajax';
import ApiBasic from 'src/api/ApiBasic';
import IOptions from './IOptions';
import { MyStore } from 'src/redux';

class Invoice extends ApiBasic<IOptions, any> {

    /** 入口 */
    public async api(option: IOptions): Promise<Response<any>> {

        const req: Request = new Request(CallType.POST, option.url, option);
        const { user } = MyStore.instance.getState();

        const data = await this.callCompany(req, true);
        if (data.er) {
            return data;
        }
        const body=data.res;
        let data2 = {
            funcModule: 'Start',
            funcParam: {
                keyPrefix: body.keyPrefix,
                token: body.token,
                uploadUrl: body.uploadUrl,
            },
            operName: user.userInfo.cUserId


        };
        return await this.callCompany(new Request(CallType.POST,option.fixUrl,data2), true);
    }
}

export default new Invoice().run;
