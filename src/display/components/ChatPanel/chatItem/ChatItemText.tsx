import ComponentBasic from 'kts-scaffold-framework/component/ComponentBasic';
import IChatItemBasisProps from './IChatItemBasisProps';
import IChatItemBasisState from './IChatItemBasisState';

interface IState extends IChatItemBasisState{
    
}

interface IProps extends IChatItemBasisProps {

}

/** 聊天文本项 */
export default class ChatItemText extends ComponentBasic<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }
}