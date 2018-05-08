import ComponentBasic from 'kts-scaffold-framework/component/ComponentBasic';

/** 组建的props接口 */
interface IProps<T> {

    /** 样式名称 */
    className?: string;

    /** 组件的值 */
    value?: T;

    /** 显示渲染函数 */
    render?: (value: T) => JSX.Element;
}

/** 组建的state接口 */
interface IState {

}

export default class FormExhibit<T = string> extends ComponentBasic<IProps<T>, IState> {
    constructor(props: IProps<T>) {
        super(props);
    }

    render() {
        return (
            this.props.render
            ? this.props.render(this.props.value)
            : this.props.value.toString()
        );
    }
}