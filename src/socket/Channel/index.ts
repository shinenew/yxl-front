/**
 * 信道
 */
class Channel {

    /**
     * 发送消息
     */
    public call = () => {
        console.log('发送消息');
    }

    /**
     * 注册监听
     */
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