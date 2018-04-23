import { Route } from 'src/routes';

const parentName: string = 'home'; // 路由的跟节点；

Route.addNode(
    parentName,
    { nodeName: 'login', path: '/login', component: require('./Login').default },
    { nodeName: 'workbench', path: '/workbench', component: require('./Workbench').default },
);

export default {
    getChildReact: (index?: string) => {
        return Route.getChildReact(parentName, index);
    },
};

export {
    Switch
} from 'react-router-dom';