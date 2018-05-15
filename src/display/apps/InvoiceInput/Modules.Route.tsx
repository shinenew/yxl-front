import { Route } from 'src/routes';
import UIForm from './TableList';

const parentName: string = 'invoiceInput'; // 路由的跟节点；

Route.addNode(
    parentName,
    { nodeName: 'list',exact:true, path: '*/invoiceInput', component: UIForm },
    { nodeName: 'group',exact:true, path: '*/group/:id', component: require('./Group').default }
);

export default {
    getChildReact: (index?: string) => {
        return Route.getChildReact(parentName, index);
    },
};

export {
    Switch
} from 'react-router-dom';