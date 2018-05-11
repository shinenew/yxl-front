/**
 * 信道
 */
class Channel {

    /** 发送消息 */
    public call = (options:any, ) => {
        console.log('发送消息');
    }

    /** 用户登录 */
    public login = () => {
        console.log('用户登录');
    }

    /** 用户 */
    public logout = () => {
        console.log('用户登录');
    }

    /** 注册监听 */
    public on = () => {
        console.log('注册监听');
    }

    /**
     * 注销监听
     */
    public off = () => {
        console.log('注销监听');
    }
}

export default new Channel();