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
     * 查询发票组合发票租明细
     */
    ZONE_GROUP_INFO = '/zone/invoice/biz-group/group-info',
    /**
     * 保存发票组明细
     */
    ZONE_SAVE_DETAIL = '/zone/invoice/biz-group/save-detail',
    /**
     * 发票组的所有发票列表
     */
    ZONE_INVOICELIST = '/zone/invoicelist',

    // POST /zone/invoice/biz-logging/single/{loggingType}
    // MANUAL(1, "手工录入"),
    // SCANNER_GUN(2, "扫描枪录入"),
    // 发票录入-四要素
    logInvoiceMANUAL = '/zone/invoice/biz-logging/single/MANUAL',

    logInvoiceSCANNER_GUN = '/zone/invoice/biz-logging/single/SCANNER_GUN',

    //     POST /zone/invoice/biz-list/query
    // 发票列表查询
    group_invoice_list = '/zone/invoice/biz-list/query',

    //POST /zone/invoice/biz-group/group-resume
    //查询发票组概要信息列表
    group_resume = '/zone/invoice/biz-group/group-resume',

    // POST /zone/invoice/biz-group/group-move
    // 移动发票到指定发票组
    GROUP_MOVE='/zone/invoice/biz-group/group-move',

    //POST /zone/invoice/biz-group/group-delete
    //删除发票组
    GROUP_DELETE='/zone/invoice/biz-group/group-delete',
    
    //POST /zone/invoice/biz-group/create-group
    //创建发票组
    CREATE_GROUP='/zone/invoice/biz-group/create-group',
    
    //GET /zone/invoice/biz-group/group-list
    //根据公司信息查询发票列表
    GROUP_GET_GROUP_LIST='/zone/invoice/biz-group/group-list',

    //POST /zone/invoice/biz-image/query
    //发票影像文件查询
    BIZ_IMAGE_QUERY='/zone/invoice/biz-image/query',

    /**
     * POST /zone/invoice/biz-logging/img-token
     *   发票录入-获取影像文件录入的token
     */
    group_getUploadToken = '/zone/invoice/biz-logging/img-token',
    /**
     * getInvoiceDetails 获取发票详情
     */
    getInvoiceDetails = '/zone/invoice/biz-logging/get-detail',

    // excel上传后错误文件下载地址
    DOWNLOADFILE='/zone/invoice/biz-logging/downloadFile',
  
    /**
     * 验证发票是否正确
     */
    realcheck = '/invoice/income/realcheck/query',

    //GET /zone/invoice/biz-logging/downloadTemplate
    //下载Excel模板 
    group_downloadTemplate = '/zone/invoice/biz-logging/downloadTemplate',

    // POST /zone/invoice/biz-logging/upload-file
    // 发票录入-Excel
    group_uploadFile = '/zone/invoice/biz-logging/upload-file',

    //POST /zone/invoice/biz-logging/ocr-token
    //发票录入-获取扫描仪录入的token
    group_ocrtoken = '/zone/invoice/biz-logging/ocr-token',

    //第三方ocr_token
    third_ocr_token = '/global/invoice/third-realcheck/ocr-token',

    //启动扫描仪
    scanStart = 'http://localhost:8088',

    //zone/caf/invoice-logging/ocr-token 发票组ocr
    caf_ocr_token = '/zone/caf/invoice-logging/ocr-token',

    ///invoice/income/logging/createLoggingOcrToken 发票ocr
    createLoggingOcrToken = '/invoice/income/logging/createLoggingOcrToken',

    /************************************** 部门接口地址 start**********************************/

    /** 
     * 查询部门
     */
    DEPARTMENT_LIST = '/zone/company/department/query',

    /** 
     * 根据部门查询员工
     */
    FIND_DEPARTMENT_USER = '/zone/company/department/user-list',

    /**
     * 新增部门
     */
    CREATE_DEPARTMENT = '/zone/company/department/create',

    /**
     * 删除部门
     */
    DELETE_DEPARTMENT = '/zone/company/department/deleted',

    /**
     * 修改部门
     */
    UPDATE_DEPARTMENT = '/zone/company/department/update',

    /**
     * 部门添加人员
     */
    USER_CREATE = '/zone/company/department/user-create',

    /**
     * 修改上级部门
     */
    PARENT_UPDATE = '/zone/company/department/parent-update',

    /************************************** 部门接口地址 end**********************************/

    /************************************** 关联公司及集团资料接口地址 start**********************************/
    /** 获取关联公司数据 */
    ZONE_CONNECTIONLIST = '/zone/company/connection/list',

    /** 禁用关联公司状态 */
    ZONE_CONNECTDISABLE = '/zone/company/connection/disable',

    /** 集团公司资料 */
    ZONE_ORGINFO = '/zone/company/org/info',

    /** 集团公司禁用 */
    ZONE_ORGUPDATE = '/zone/company/org/update',

    /** 集团公司启用 */
    ZONE_CONNECTENABLE = '/zone/company/connection/enable',
    /************************************** 关联公司及集团资料接口地址 end**********************************/

    /******************************************** 用户管理相关url 开始*******************************************/

    /** 用户列表 */
    USER_LIST = '/zone/company/user/query',

    /** 禁用或激活用户 */
    USER_DISORENA = '/zone/company/user/disable',

    /** 用户详情 */
    USER_DETAIL = '/zone/company/user/info',

    /** 新增用户 */
    USER_ADD = '/zone/company/user/alone-create',

    /** 编辑用户 */
    USER_EDIT = '/zone/company/user/update',

    /** 重新邀请 */
    USER_SEND = '/zone/company/user/invite',

    /** 用户所在公司角色 */
    USER_COMPANY_ROLE = '/zone/role/company/query',

    /** 获取当前用户所在公司权限 */
    USER_CURRENT_ROLE = '/zone/userrole/info/query',

    /** 更新某个用户的角色 */
    USER_UPDATE_ROLE = '/zone/userrole/info/override',

    /******************************************** 用户管理相关url 结束*******************************************/

    /******************************************** 角色公司相关url 开始*******************************************/
    /**
     * 公司权限列表组
     */
    SYSTEM_COMPANY_RULEGROUPS_LIST = '/zone/rulegroup/info/query-company',
    /**
     * 角色的所有角色列表
     */
    SYSTEM_ROLELIST = '/zone/role/company/query',
    /**
     * 删除角色
     */
    SYSTEM_ROLE_DELETE = '/zone/role/info/delete',
    /**
     * 跟新角色
     */
    SYSTEM_ROLE_UPDATE = '/zone/role/info/update',
    /**
     * 新增角色
     */
    SYSTEM_ROLE_CREATE = '/zone/role/info/create',
    /**
     * 获取公司资料
     */
    SYSTEM_COMPANYLIST = '/zone/company/info/get',
    /******************************************** 角色公司相关url 结束*******************************************/
}

export default Urls;