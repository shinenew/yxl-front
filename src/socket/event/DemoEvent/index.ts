import Event from 'kts-scaffold-framework/message/Event';
import Message from 'kts-scaffold-framework/message/Message';

export default class DemoEvent extends Event{

    /** 消息类型 */
    public static TYPE: string = Message.createType('DemoEvent');

    constructor(type: string = DemoEvent.TYPE){
        super(type);
    }
}