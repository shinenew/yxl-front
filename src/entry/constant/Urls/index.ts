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
     * getUploadToken 批量上传 文件上传提前获取token
     */
    getUploadToken = '/invoice/income/image/logToken',

    // 专票录入 Excel 模板文件下载
    downloadTemplate = '/invoice/income/logging/downloadTemplate',

    // 专票录入 Excel 模板文件上传
    uploadFile = '/invoice/income/logging/updateFile',
    //第三方ocr_token
    third_ocr_token = '/global/invoice/third-realcheck/ocr-token',
    //启动扫描仪
    scanStart = 'http://localhost:8088',
    //zone/caf/invoice-logging/ocr-token 发票组ocr
    caf_ocr_token = '/zone/caf/invoice-logging/ocr-token',
    ///invoice/income/logging/createLoggingOcrToken 发票ocr
    createLoggingOcrToken = '/invoice/income/logging/createLoggingOcrToken'

}

export default Urls;