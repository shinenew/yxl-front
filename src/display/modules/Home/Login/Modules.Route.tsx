import { Route } from 'src/routes';

const parentName: string = 'login'; // 路由的跟节点；

Route.addNode(
    parentName,
    { nodeName: 'login/panel', exact: true, path: '/login', component: require('./UI.Panel').default },
    { nodeName: 'login/company', path: '*/company', component: require('./UI.Company').default },
);

export default {
    getChildReact: (index?: string) => {
        return Route.getChildReact(parentName, index);
    },
};

export {
    Switch
} from 'react-router-dom';