/** 请求 */
export default class Requests{
    
    /** 请求路由地址 */
    public uri: string;

    /** 参数 */
    public parameter: any;

    /**
     * 构造函数
     * @param uri 请求路由地址
     * @param parameter 请求参数
     */
    constructor(uri: string, parameter: any = {}) {
        this.uri = uri;
        this.parameter = parameter; 
    }
}