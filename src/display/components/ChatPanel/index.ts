import ComponentBasic from 'kts-scaffold-framework/component/ComponentBasic';
import IChatInfo from './IChatInfo';

/** 组建的props接口 */
interface IProps {

    /** 聊天内容 */
    chatList?: IChatInfo[];

    /** 当前聊天类型 */
    chatValue?: string;

    /** 聊天内容 */
    onchatValue?: (value: string) => void;
}

/** 组建的state接口 */
interface IState {

}

export default class FormDiscount extends ComponentBasic<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }
}