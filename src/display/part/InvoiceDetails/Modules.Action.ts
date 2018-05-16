import { ActionBasic } from 'kts-scaffold-framework/modules';
import ModulesState from './Modules.State';
// import { invoiceInput } from 'src/api';
import { transformTypeString } from 'src/entry/Language';

class ModulesAction extends ActionBasic<ModulesState> {
    /**
     * 获取发票详情
     * @param {string} incomeInvoiceBizId -发票id
     */
    public getInvoiceDetails = async (incomeInvoiceBizId: string) => {
        // const res: any = await invoiceInput.querySingleDetail(this, {incomeInvoiceBizId: incomeInvoiceBizId});
        // this.modulesState.invoiceDetails = res.res.info;
        // this.setModulesState(this.modulesState);
    }
    /**
     * 获取发票类型
     * @param {string} type -后端返回发票类型
     */
    public getTransformType = (type) => {
        const str = type.toUpperCase();
        return transformTypeString(str);
    }
    /**
     * 获取城市名
     * @param {string} invoice -城市类型字段
     */
    public getCityName = (invoice) => {
        let citys = [
            { 'code': '1100', 'name': '北京', }, 
            { 'code': '1200', 'name': '天津', }, 
            { 'code': '1300', 'name': '河北', }, 
            { 'code': '1400', 'name': '山西', }, 
            { 'code': '1500', 'name': '内蒙古', }, 
            { 'code': '2100', 'name': '辽宁', }, 
            { 'code': '2102', 'name': '大连', }, 
            { 'code': '2200', 'name': '吉林', }, 
            { 'code': '2300', 'name': '黑龙江', }, 
            { 'code': '3100', 'name': '上海', }, 
            { 'code': '3200', 'name': '江苏', }, 
            { 'code': '3300', 'name': '浙江', }, 
            { 'code': '3302', 'name': '宁波', }, 
            { 'code': '3400', 'name': '安徽', }, 
            { 'code': '3500', 'name': '福建', }, 
            { 'code': '3502', 'name': '厦门', }, 
            { 'code': '3600', 'name': '江西', }, 
            { 'code': '3700', 'name': '山东', }, 
            { 'code': '3702', 'name': '青岛', }, 
            { 'code': '4100', 'name': '河南', }, 
            { 'code': '4200', 'name': '湖北', }, 
            { 'code': '4300', 'name': '湖南', }, 
            { 'code': '4400', 'name': '广东', }, 
            { 'code': '4403', 'name': '深圳', }, 
            { 'code': '4500', 'name': '广西', }, 
            { 'code': '4600', 'name': '海南', }, 
            { 'code': '5000', 'name': '重庆', }, 
            { 'code': '5100', 'name': '四川', }, 
            { 'code': '5200', 'name': '贵州', }, 
            { 'code': '5300', 'name': '云南', }, 
            { 'code': '5400', 'name': '西藏', }, 
            { 'code': '6100', 'name': '陕西', }, 
            { 'code': '6200', 'name': '甘肃', }, 
            { 'code': '6300', 'name': '青海', }, 
            { 'code': '6400', 'name': '宁夏', }, 
            { 'code': '6500', 'name': '新疆', }];
        let cityCode = null;
        let name;

        if (invoice.length === 12) {
            cityCode = invoice.substring(1, 5);
        } else {
            cityCode = invoice.substring(0, 4);
        }
        if (cityCode !== '2102' && cityCode !=='3302' && cityCode !== '3502' && cityCode !== '3702' && cityCode !== '4403') {
            cityCode = cityCode.substring(0, 2) + '00';
        }
        for (var i = 0; i < citys.length; i++) {
            if (cityCode === citys[i].code) {
                name = citys[i].name;
                break;
            }
        }
        return name;
    }
    /**
     * 返回
     */
    public onBack = () => {
        console.log('back');
    }
    /**
     * toggle
     */
    public toggle = () => {
        console.log('toggle');
    }
    /**
     * 下拉框选中
     */
    public onSelectedChanged = () => {
        console.log('toggle');
    }
}
export default new ModulesAction();