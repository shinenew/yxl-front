
//发票字段枚举汇总

/**
 * 发票类型枚举
 */
import React from 'react';
import { Tag,Tooltip } from 'antd';
export function transformType(str:string) {
    if (str) {
        str = str.toUpperCase();
        switch (str) {
            case 'VAT_SPECIAL_INVOICE':
                return '增值税专用发票';
            case 'VAT_INVOICE':
                return '增值税普通发票';
            case 'EINVOICE_VAT':
                return '增值税电子普通发票';
            case 'VAT_SPECIAL_INVOICE_TRANSPORTATION':
                return '货运运输业增值税专用发票';
            case 'VAT_SPECIAL_INVOICE_MOTORVEHICLE':
                return '机动车销售统一发票';
            case 'VAT_INVOICE_ELECTRONIC':
                return '增值税电子普通发票';
            case 'VAT_INVOICE_VOLUME':
                return '增值税普通发票(卷票)';
            case 'UNKOWN_INVOICE_TYPE':
                return '未知发票类型';
            default:
                return '增值税普通发票';
        }
    }
    return '';
}
//获取发票城市
export function getCityName(invoice:string) {
    let citys = [{ 'code': '1100', 'name': '北京', }, { 'code': '1200', 'name': '天津', }, { 'code': '1300', 'name': '河北', }, { 'code': '1400', 'name': '山西', }, { 'code': '1500', 'name': '内蒙古', }, { 'code': '2100', 'name': '辽宁', }, { 'code': '2102', 'name': '大连', }, { 'code': '2200', 'name': '吉林', }, { 'code': '2300', 'name': '黑龙江', }, { 'code': '3100', 'name': '上海', }, { 'code': '3200', 'name': '江苏', }, { 'code': '3300', 'name': '浙江', }, { 'code': '3302', 'name': '宁波', }, { 'code': '3400', 'name': '安徽', }, { 'code': '3500', 'name': '福建', }, { 'code': '3502', 'name': '厦门', }, { 'code': '3600', 'name': '江西', }, { 'code': '3700', 'name': '山东', }, { 'code': '3702', 'name': '青岛', }, { 'code': '4100', 'name': '河南', }, { 'code': '4200', 'name': '湖北', }, { 'code': '4300', 'name': '湖南', }, { 'code': '4400', 'name': '广东', }, { 'code': '4403', 'name': '深圳', }, { 'code': '4500', 'name': '广西', }, { 'code': '4600', 'name': '海南', }, { 'code': '5000', 'name': '重庆', }, { 'code': '5100', 'name': '四川', }, { 'code': '5200', 'name': '贵州', }, { 'code': '5300', 'name': '云南', }, { 'code': '5400', 'name': '西藏', }, { 'code': '6100', 'name': '陕西', }, { 'code': '6200', 'name': '甘肃', }, { 'code': '6300', 'name': '青海', }, { 'code': '6400', 'name': '宁夏', }, { 'code': '6500', 'name': '新疆', }];
    let cityCode = null;
    let name;

    if (invoice.length === 12) {
        cityCode = invoice.substring(1, 5);
    } else {
        cityCode = invoice.substring(0, 4);
    }
    if (cityCode !== '2102' && cityCode !== '3302' && cityCode !== '3502' && cityCode !== '3702' && cityCode !== '4403') {
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
// 验真状态
export function transformReal(record:any) {
    if (record) {
        switch (record.realCheckState) {
            case 'UNCHECK':
                return <Tag color="grey"><Tooltip title="查验状态">待查验</Tooltip></Tag>;
            case 'CHECKING':
                return <Tag color="orange"><Tooltip title="查验状态">查验中</Tooltip></Tag>;
            case 'FAILED':
                return <Tag color="red"><Tooltip title={record.realCheckMsg}>查验异常</Tooltip></Tag>;
            case 'PASS':
                return <Tag color="green"><Tooltip title={record.realCheckMsg}>查验通过</Tooltip></Tag>;
            default:
                return '';
        }
    }
    return '';
}

/**
 * 
 * @param {*合规状态} str 
 */
export function transformStandard(str:string) {
    if (str) {
        str = str.toUpperCase();
        switch (str) {
            case 'UNCHECK':
            case 'CHECKING':
                return '';
            case 'FAILED':
                return <Tag color="red"><Tooltip title="合规状态">不合规</Tooltip></Tag>;
            case 'PASS':
                return <Tag color="green"><Tooltip title="合规状态">合规</Tooltip></Tag>;
            default:
                return '';
        }
    }
    return '';
}
// 重复录票状态
export function transformDuplicate(str:string) {
    if (str) {
        str = str.toUpperCase();
        switch (str) {
            case 'UNCHECK':
            case 'CHECKING':
            case 'PASS':
                return '';
            case 'FAILED':
                return <Tag color="orange">多次录入</Tag>;
            default:
                return '';
        }
    }
    return '';
}
// 财务状态
export function transformFinance(str:string) {
    if (str) {
        str = str.toUpperCase();
        switch (str) {
            case 'UNCHECK':
            case 'CHECKING':
                return '';
            case 'FAILED':
                return <Tag color="red"><Tooltip title="业务状态">已拒绝</Tooltip></Tag>;
            case 'PASS':
                return '';
            default:
                return '';
        }
    }
    return '';
}
//状态对应的样式颜色
export function transformColor(str:string) {
    if (str) {
        str = str.toUpperCase();
        switch (str) {
            case 'UNCHECK':
                return 'grey';
            case 'CHECKING':
                return 'orange';
            case 'FAILED':
                return 'red';
            case 'PASS':
                return 'green';
            default:
                return '';
        }
    }
    return '';
}
// 是否识别状态
export function transformdecodeQRState(str:string) {
    if (str) {
        str = str.toUpperCase();
        switch (str) {
            case 'FAILED':
                return <Tag color="red">未识别</Tag>;
            case 'PASS':
                return '';
            default:
                return '';
        }
    }
    return '';
}
//发票状态
export function transformInvoiceStatus(str:string) {
    if (str) {
        str = str.toUpperCase();
        switch (str) {
            case 'NORMAL':
                return <Tag color="green"><Tooltip title="发票状态">正常</Tooltip></Tag>;
            case 'CANCELLED':
                return <Tag color="red"><Tooltip title="发票状态">作废</Tooltip></Tag>;
            case 'RED':
                return <Tag color="orange"><Tooltip title="发票状态">红冲</Tooltip></Tag>;
            case 'ABNORMAL':
                return <Tag color="orange"><Tooltip title="发票状态">异常</Tooltip></Tag>;
            case 'UNCONTROLLED':
                return <Tag color="red"><Tooltip title="发票状态">失控</Tooltip></Tag>;
            default:
                return '';
        }
    }
    return '';

}
//LoggedStateEnum 是否录入枚举
export function transformLoggedStateEnum(str:string) {
    if (str) {
        str = str.toUpperCase();
        switch (str) {
            case 'LOGGED':
                return <Tag color="green">已录入</Tag>;
            case 'UNLOGGED':
                return <Tag color="red">未录入</Tag>;
            default:
                return '';
        }
    }
    return '';
}
//MatchStateEnum 匹配枚举
export function transformMatchStateEnum(str:string) {
    str = str.toUpperCase();
    switch (str) {
        case 'UNMATCH':
            return <Tag color="red"><Tooltip title="匹配状态">未匹配</Tooltip></Tag>;
        case 'MATCHED':
            return <Tag color="green"><Tooltip title="匹配状态">已匹配</Tooltip></Tag>;
        default:
            return '';
    }
}

//InvoiceAuthStateEnum 认证枚举
export function transformInvoiceAuthStateEnum(str:string) {
    str = str.toUpperCase();
    switch (str) {
        case 'UNCHECK':
            return '';
        case 'CHECKING':
            return '';
        case 'FAILED':
            return <Tag color="red"><Tooltip title="认证状态">认证失败</Tooltip></Tag>;
        case 'PASS':
            return <Tag color="green"><Tooltip title="认证状态">已认证</Tooltip></Tag>;
        default:
            return '';
    }
}
//InvoiceDraftStateEnum 勾选枚举
export function transformInvoiceDraftStateEnum(str:string) {
    str = str.toUpperCase();
    switch (str) {
        case 'DRAFT_UNCOMMIT':
            return <Tag color="orange">未勾选</Tag>;
        case 'DRAFT_COMMIT':
            return <Tag color="orange">勾选未提交</Tag>;
        case 'DRAFT_PUSHED':
            return <Tag color="green">勾选已提交</Tag>;
        default:
            return '';
    }
}
// 录入状态
//private CheckerStateEnum loggedState;

// 收票状态（总状态）
//private CheckerStateEnum receiveState;
export default transformType;
