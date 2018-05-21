import ComponentBasic from 'kts-scaffold-framework/component/ComponentBasic';
import IChatItemBasisProps from './IChatItemBasisProps';
import IChatItemBasisState from './IChatItemBasisState';

/** 聊天项基础 */
export default class ChatItemBasis<P extends IChatItemBasisProps, S extends IChatItemBasisState > extends ComponentBasic<P, S> {
    constructor(props: P) {
        super(props);
    }
}