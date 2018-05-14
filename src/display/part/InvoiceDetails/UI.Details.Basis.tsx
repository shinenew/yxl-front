import { UIBasic, IPropsBasic } from 'kts-scaffold-framework/modules';
import ModulesState from './Modules.State';

// const css = require('./index.scss');

/** Redux接口 */
interface IReduxStatePart {
    
}

/** Props接口 */
interface IProps extends IReduxStatePart, IPropsBasic {
}

/** 详情基础累 */
export default class DetailsBasis<P extends IProps, M extends ModulesState, S = any > extends UIBasic<P, M, S> {
    
    constructor(props: P, aodulesAction: any) {
        super(props, aodulesAction);
    }
}

export {
    IProps
};