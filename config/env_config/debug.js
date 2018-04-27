let evn = {
    NODE_ENV: 'debug',
    IS_MOCK: true,//是否开启mock数据
    USERNAME: undefined,//默认用户名
    PASSWORD: undefined,//默认密码
    API_URI: undefined,//服务器API头
    DOMAIN: 'xltec.cc',//根域名
};

try {
    var info = require('../../evn');
} catch (error) {
    var info = {};
}

for(var k in info){
    evn[k] = info[k];
}

module.exports = evn;