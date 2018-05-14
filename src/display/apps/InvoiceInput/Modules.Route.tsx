import { Route } from 'src/routes';

const parentName: string = 'invoiceInput'; // 路由的跟节点；

Route.addNode(
    parentName,
    { nodeName: 'group', path: '/', component: require('./Group').default },
);

export default {
    getChildReact: (index?: string) => {
        return Route.getChildReact(parentName, index);
    },
};

export {
    Switch
} from 'react-router-dom';