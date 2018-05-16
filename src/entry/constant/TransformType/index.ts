/**
 * 发票类型
 */
enum Transformtype {
    增值税专用发票 = 'VAT_SPECIAL_INVOICE',
    增值税普通发票INVOICE = 'VAT_INVOICE',
    增值税电子普通发票VAT = 'EINVOICE_VAT',
    货运运输业增值税专用发票 = 'VAT_SPECIAL_INVOICE_TRANSPORTATION',
    机动车销售统一发票 = 'VAT_SPECIAL_INVOICE_MOTORVEHICLE',
    增值税电子普通发票 = 'VAT_INVOICE_ELECTRONIC',
    增值税普通发票卷票 = 'VAT_INVOICE_VOLUME',
    未知发票类型 = 'UNKOWN_INVOICE_TYPE',
    // EINVOICE_VAT = '增值税普通发票',
}

export default Transformtype;