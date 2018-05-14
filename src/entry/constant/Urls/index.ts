enum Urls {
    /** 用户登录 */
    WEB_TOKEN_LOGIN = '/global/auth/web-token/login',

    /** 用户的所有公司列表 */
    COMPANY_LIST = '/global/account/company/list',

    /** 获取用户数据 */
    COMPANY_USER_INFO = '/zone/company/user/info',

    /** 登录公司 */
    AUTH_CWEB_LOGIN = '/global/auth/cweb/login',

    /** 获取公司已安装应用列表 */
    APP_INSTANCE_QUERY = '/zone/open/app-instance/query',
    /**
     * 发票组的发票组列表
     */
    ZONE_GROUPLIST = '/zone/grouplist',
    /**
     * 发票组的所有发票列表
     */
    ZONE_INVOICELIST = '/zone/invoicelist',
    /**
     * 四要素录入接口
     */
    logInvoice = '/invoice/income/logging/add',
    /**
     * getUploadToken 批量上传
     */
    getUploadToken = '/invoice/income/image/logToken',

    
}

export default Urls;