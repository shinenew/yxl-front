import { Route } from 'src/routes';
import apps from 'src/display/apps';

const parentName: string = 'workbench'; // 路由的跟节点；

Route.addNode(
    parentName,
    { nodeName: 'workbench/app', path: '/workbench/app/:appid', component: require('./UI.Iframe').default },
    { nodeName: 'workbench/demo', path: '/workbench/demo', title: '测速APP' , component: apps.Demo },
);

export default {
    getChildReact: (index?: string) => {
        return Route.getChildReact(parentName, index);
    },
};

export {
    Switch
} from 'react-router-dom';