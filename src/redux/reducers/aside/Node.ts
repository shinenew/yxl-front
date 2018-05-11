/**
 * 侧边栏节点
 */
export default class Node {
    
    /** 当前收起状态 */
    public collapsed?: boolean = true;

    /** 显示组件 */
    public Components: JSX.Element = null;

    /** 标题 */
    public title: string | JSX.Element;
}
