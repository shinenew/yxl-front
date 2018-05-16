const localhost = '//localhost:8888/';
const head = '//config.kingxunlian.com/';
const configName = process.argv[3]||'dev';

/**获取配置文件地址*/
function getConfigUrl() {
    if (configName.slice(-4) === '_loc') {
        return localhost + configName.slice(0, -4) + '.js';
    } else {
        return head + configName + '.js';
    }
}

module.exports = getConfigUrl();
