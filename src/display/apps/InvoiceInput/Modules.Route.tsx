import { Route } from 'src/routes';
import UIForm from './TableList';
import { InvoiceDetails } from 'src/display/part';

const parentName: string = 'invoiceInput'; // 路由的跟节点；

Route.addNode(
    parentName,
    { nodeName: 'list', path: '*/invoiceInput', component: UIForm },
    { nodeName: 'group',exact:true, path: '*/group/:id', component: require('./Group').default },
    { nodeName: 'invoiceDetail', path: '*/invoiceInput/invoiceDetail/:loggingId', title: '发票详情' , component: InvoiceDetails},
);

export default {
    getChildReact: (index?: string) => {
        return Route.getChildReact(parentName, index);
    },
};

export {
    Switch
} from 'react-router-dom';