import ComponentBasic from 'kts-scaffold-framework/component/ComponentBasic';

/** 组建的props接口 */
interface IProps {

    /** 样式名称 */
    className: string;
}

/** 组建的state接口 */
interface IState {
    
}

export default class FormDiscount extends ComponentBasic<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }
}