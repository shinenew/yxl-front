/** 请求 */
export default class Requests{
    
    /** 请求路由地址 */
    public msgType: string;

    /** 参数 */
    public msgData: any;

    /**
     * 构造函数
     * @param uri 请求路由地址
     * @param parameter 请求参数
     */
    constructor(msgType: string, msgData: any = {}) {
        this.msgType = msgType;
        this.msgData = msgData; 
    }
}