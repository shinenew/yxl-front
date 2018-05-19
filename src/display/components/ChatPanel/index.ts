import ComponentBasic from 'kts-scaffold-framework/component/ComponentBasic';
import IChatInfo from './IChatInfo';

/** 组建的props接口 */
interface IProps {
    chatList: IChatInfo[];
}

/** 组建的state接口 */
interface IState {
    
}

export default class FormDiscount extends ComponentBasic<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }
}