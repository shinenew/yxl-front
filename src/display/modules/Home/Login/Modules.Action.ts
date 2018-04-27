import { ActionBasic } from 'kts-scaffold-framework/modules';
import { webToken, company } from 'src/api';
import { history } from 'src/routes';
import ModulesState from './Modules.State';

class ModulesAction extends ActionBasic<ModulesState> {

    /**
     * 用户登录
     * @param username 用户名
     * @param password 密码
     * @param url 登录成功后跳转的地址
     */
    public login = async (username: string, password: string, url: string) => {
        const data = await webToken.login(this, { identifier: username, credential: password });
        if (!data.er) {
            history.push(url);
        }
    }

    /** 更新公司列表 */
    public updateCompanyList = async () => {
        company.list(this, {});
    }
}

export default new ModulesAction();