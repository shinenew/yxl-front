/**
 * 侧边栏节点
 */
export default class Node {
    
    /** 当前收起状态 */
    public collapsed: boolean = false;

    /** 显示组件 */
    public Components = null;

    /** 显示内容的参数 */
    public props: any = null;

    /** 标题 */
    public title: string | JSX.Element;
}