import { Route } from 'src/routes';
<<<<<<< HEAD
import { InvoiceDetails } from 'src/display/part';
=======
import UIForm from './TableList';
>>>>>>> 2f235a0685bfb2fbcaec8f727221b48c387a16b0

const parentName: string = 'invoiceInput'; // 路由的跟节点；

Route.addNode(
    parentName,
<<<<<<< HEAD
    { nodeName: 'group', path: 'invoiceInput/group', component: require('./Group').default },
    { nodeName: 'invoiceDetail', path: 'invoiceInput/invoiceDetail', title: '发票详情' , component: InvoiceDetails},
=======
    { nodeName: 'list',exact:true, path: '*/invoiceInput', component: UIForm },
    { nodeName: 'group',exact:true, path: '*/group/:id', component: require('./Group').default }
>>>>>>> 2f235a0685bfb2fbcaec8f727221b48c387a16b0
);

export default {
    getChildReact: (index?: string) => {
        return Route.getChildReact(parentName, index);
    },
};

export {
    Switch
} from 'react-router-dom';