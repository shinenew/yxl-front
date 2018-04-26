module.exports = require('../../evn') || {
    NODE_ENV:'debug',
    IS_MOCK:true,//是否开启mock数据
    USERNAME:'kxladmin',//默认用户名
    PASSWORD:'123456',//默认密码
    API_URI:undefined,//服务器API头
    DOMAIN:'kxl.com',//根域名
};