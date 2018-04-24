/**
 * 配置节点接口
 */
export default interface INode {
    
    /** 基础配置 */
    rootConfig: {
        /** 生产环境 */
        API_URI: string,
        
        /** 测速环境 */
        TEST_URI: string,
        
        /** 开发环境 */
        DEV_URI: string,
    };
}