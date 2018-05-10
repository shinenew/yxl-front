import { Route } from 'src/routes';
import apps from 'src/display/apps';
import platform from 'src/display/platform';
import UIIframe from './UI.Iframe';

const parentName: string = 'workbench'; // 路由的跟节点；

Route.addNode(
    parentName,
    { nodeName: 'workbench/app', path: '/workbench/app/:appid', component: UIIframe },
    { nodeName: 'workbench/invoiceInput', path: '/workbench/invoiceInput', title: '发票录入' , component: apps.InvoiceInput },
    { nodeName: '/workbench/platform/userCenter', path: '/workbench/platform/userCenter', title: '用户中心' , component: platform.UserCenter },
    { nodeName: '/workbench/platform/inBox', path: '/workbench/platform/inBox', title: '收件箱' , component: platform.InBox },
    { nodeName: '/workbench/platform/systemManage', path: '/workbench/platform/systemManage', title: '系统管理' , component: platform.SystemManage },
);

export default {
    getChildReact: (index?: string) => {
        return Route.getChildReact(parentName, index);
    },
};

export {
    Switch
} from 'react-router-dom';