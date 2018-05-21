export default interface IChatItemBasisProps {
    /** 头像地址 */
    head?: string;

    /** 昵称 */
    nickname: string;

    /** 消息时间戳 */
    timer: number;

    /** 是否自己的消息 */
    isSelf: boolean;

    /** 是否查看 */
    isRead?: boolean;
}
