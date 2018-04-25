import * as React from 'react';
import { Router, Switch } from 'react-router-dom';
import { Route as MyRoute } from 'src/routes';
import { history } from 'src/routes';
import modules from 'src/display/modules';

MyRoute.addNode(
    MyRoute.ROOT_NAME,
    { nodeName: 'home', path: '/', component: modules.Home },
);

const Routes = () => (
    <Router history={history}>
        <Switch>
            {MyRoute.getChildReact(MyRoute.ROOT_NAME)}
        </Switch>
    </Router>
);

export default Routes;