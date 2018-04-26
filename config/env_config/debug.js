let evn = {};
try {
    evn = require('../../evn');
} catch (error) {
    
}

module.exports = {
    NODE_ENV: 'debug',
    IS_MOCK: true,//是否开启mock数据
    USERNAME: undefined,//默认用户名
    PASSWORD: undefined,//默认密码
    API_URI: undefined,//服务器API头
    DOMAIN: 'kxl.com',//根域名
    ...evn
};