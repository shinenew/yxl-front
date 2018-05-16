import * as React from 'react';
import { Icon } from 'antd';
import { Route } from 'src/routes';

const parentName: string = 'workbench/platform/systemManage'; // 路由的跟节点；

Route.addNode(
    parentName,
    { nodeName: '/workbench/platform/systemManage-user', path: '/workbench/platform/systemManage/user', ico: <Icon type="user" />, title: '用户管理', component: require('./UI.UserTable').default },
     { nodeName: '/workbench/platform/systemManage-role', path: '/workbench/platform/systemManage/role', ico: <Icon type="team" />, title: '角色管理', component: require('./UI.Role').default },
     { nodeName: '/workbench/platform/systemManage-companyinfo', path: '/workbench/platform/systemManage/companyinfo', ico: <Icon type="profile" />, title: '公司资料', component: require('./UI.CompanyInfo').default },
    { nodeName: '/workbench/platform/systemManage-group', path: '/workbench/platform/systemManage/group', ico: <Icon type="global" />, title: '集团资料', component: require('./UI.GroupInfo').default },
    // { nodeName: '/workbench/platform/systemManage-company', path: '/workbench/platform/systemManage/company', ico: <Icon type="fork" />, title: '关联公司', component: require('./UI.ConnectCompany').default },
    { nodeName: '/workbench/platform/systemManage-department', path: '/workbench/platform/systemManage/department', ico: <Icon type="contacts" />, title: '部门管理', component: require('./UI.Department').default },
);

export default {
    getChildReact: (index?: string) => {
        return Route.getChildReact(parentName, index);
    },
    getNodeReact: (nodename: string) => {
        return Route.getNode(nodename);
    }
};

export {
    Switch
} from 'react-router-dom';