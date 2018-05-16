/**
 * 发票类型
 */
enum InvoiceType {
    专票 = 'VAT_SPECIAL_INVOICE',
    普票 = 'VAT_INVOICE',
    机票 = 'VAT_SPECIAL_INVOICE_MOTORVEHICLE',
    电票 = 'VAT_INVOICE_ELECTRONIC',
    卷票 = 'VAT_INVOICE_VOLUME',
    货票 = 'VAT_SPECIAL_INVOICE_TRANSPORTATION',
}

export default InvoiceType;