import { MyStore } from 'src/redux';
import { Response } from 'kts-scaffold-framework/server';
import { Agent, Request } from 'kts-scaffold-framework/server';
import { reducers } from 'src/redux';
import { NodeEnvType } from 'src/entry/constant';

export default abstract class ApiBasic<O, D> {

    constructor() {
        this.api = this.api.bind(this);
    }

    /** 向服务器发送请求 */
    public call = async (request: Request, mock: boolean = false): Promise<any> => {

        request = {
            ...request,
            options: this.getOptions(request.options)
        };

        MyStore.instance.dispatch(reducers.system.ActionTypes.addLoading, request.uri); // 添加loading

        const data = await Agent.instance.call(request, this.domain, mock);

        MyStore.instance.dispatch(reducers.system.ActionTypes.removeLoading, request.uri); // 删除loading

        return data;
    }

    /**
     * 执行api
     * @param option api 入参
     */
    public run = async (target: any, option: O): Promise<Response<D>> => {
        return await this.api(option);
    }

    /** 
     * 抽象方法（子类api逻辑的实现入口） 
     * @param option api 入参
     */
    protected async api(option: O): Promise<Response<D>> {
        throw '请重写api方法';
    }

    /** 请求头（全局） */
    private get domain(): string {
        const { env } = MyStore.instance.getState();
        switch (env.NODE_ENV) {
            case NodeEnvType.开发环境:
                return '';
            case NodeEnvType.生产环境:
                return '';
            case NodeEnvType.测试环境:
                return '';
            default:
                console.error('[api]环境变量异常', env);
                return '';
        }
    }

    /**
     * 获取可用的 options 参数。
     * @param options 
     */
    private getOptions = (options: any): any => {
        const res = { ...options };
        const token = MyStore.instance.getState().user.token;

        // token是否存在
        if (token) {
            res['Authorization'] = token; // 添加用户token
        }

        return res;
    }
}