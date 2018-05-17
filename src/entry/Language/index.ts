import { UserType, TransformType } from '../constant';


/** 用户类型中文 */
const userTypeToString: Map<UserType, string> = new Map<UserType, string>();
userTypeToString.set(UserType.公司管理员, '公司管理员');
userTypeToString.set(UserType.普通用户, '普通用户');
userTypeToString.set(UserType.超级管理员, '超级管理员');

/**  */
const transformTypeString = (type:TransformType): string => {
    switch (type) {
        case TransformType.增值税专用发票:
            return '增值税专用发票';
        case TransformType.增值税普通发票INVOICE:
            return '增值税普通发票';
        case TransformType.增值税普通发票卷票:
            return '增值税普通发票(卷票)';
        case TransformType.增值税电子普通发票:
            return '增值税电子普通发票';
        case TransformType.增值税电子普通发票VAT:
            return '增值税电子普通发票';
        case TransformType.未知发票类型:
            return '未知发票类型';
        case TransformType.机动车销售统一发票:
            return '机动车销售统一发票';
        case TransformType.货运运输业增值税专用发票:
            return '货运运输业增值税专用发票';
        default:
            return '增值税普通发票';
    }
};
const transformTypeStringShort = (type:TransformType): string => {
    switch (type) {
        case TransformType.增值税专用发票:
            return '专票';
        case TransformType.增值税普通发票INVOICE:
            return '普票';
        case TransformType.增值税普通发票卷票:
            return '卷票';
        case TransformType.增值税电子普通发票:
            return '电票';
        case TransformType.机动车销售统一发票:
            return '机票';
        case TransformType.货运运输业增值税专用发票:
            return '货票';
        default:
            return '增值税普通发票';
    }
};

export default {
    /** 用户类型中文 */
    userTypeToString,

    /**  */
    transformTypeString,
};

export {

    /**  */
    transformTypeString,
    transformTypeStringShort
};