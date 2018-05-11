import { MessageType, Urls } from 'src/entry/constant';

/**
 * 系统数据节点
 */
export default class Node {

    /** 正在加载的服务器接口 (代替 loading ) */
    public loadingUrls: Map<Urls, string> = new Map<Urls, string>();

    /** 未读消息数量 */
    public unread: Map<MessageType, number> = new Map<MessageType, number>();
}