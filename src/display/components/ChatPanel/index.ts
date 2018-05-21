import ComponentBasic from 'kts-scaffold-framework/component/ComponentBasic';
import IChatPanelProps from './IChatPanelProps';
import IChatPanelState from './IChatPanelState';

/** 聊天面板组件 */
export default class ChatPanel extends ComponentBasic<IChatPanelProps, IChatPanelState> {
    constructor(props: IChatPanelProps) {
        super(props);
    }
}