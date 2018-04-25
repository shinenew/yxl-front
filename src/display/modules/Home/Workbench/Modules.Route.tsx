import { Route } from 'src/routes';

const parentName: string = 'workbench'; // 路由的跟节点；

Route.addNode(
    parentName,
    { nodeName: 'workbench/app', path: '/workbench/app/:appid', component: require('./UI.Iframe').default },
);

export default {
    getChildReact: (index?: string) => {
        return Route.getChildReact(parentName, index);
    },
};

export {
    Switch
} from 'react-router-dom';