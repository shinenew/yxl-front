import reducers from '../reducers';
import IUser from '../reducers/user/Node';
import IEnv from '../reducers/env/INode';
import IConfigINode from '../reducers/config/INode';
import ISystem from '../reducers/system/Node';
import IAside from '../reducers/aside/Node';
import IRoutesTree from 'src/routes/INodeTree';

/** 全局状态的跟节点 */
export default class ReduxState {

    /** 用户数据 */
    public user: IUser = reducers.user.reducer as any;

    /** 环境数据 */
    public env: IEnv = reducers.env.reducer as any;

    /** 系统数据 */
    public system: ISystem = reducers.system.reducer as any;

    /** 路由数据 */
    public routes: IRoutesTree[] = reducers.routes.reducer as any;

    /** 配置数据 */
    public config: IConfigINode = reducers.config.reducer as any;

    /** 侧边栏 */
    public aside: IAside = reducers.aside.reducer as any;
}

export {
    /** 用户数据 */
    IUser,

    /** 环境数据 */
    IEnv,

    /** 系统数据 */
    ISystem,

    /** 路由数据接口 */
    IRoutesTree,

    /** 配置数据接口 */
    IConfigINode,

    /** 侧边栏 */
    IAside,
};