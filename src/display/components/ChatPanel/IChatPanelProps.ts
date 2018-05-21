

/** props接口 */
export default interface IChatPanelProps {

    /** 
     * 聊天内容 
     * @see ChatItemBasis
     */
    chatList?: JSX.Element[];

    /** 标题内容 */
    title?: JSX.Element;

    /** 邮箱列表 */
    mailList: string[];

    /** 聊天内容改变 */
    onChangeChatValue?: (value: string) => void;

    /** 用户触发发送 */
    onSend?: (value: string) => void;

    /** 顶层样式 */
    className: string;
}