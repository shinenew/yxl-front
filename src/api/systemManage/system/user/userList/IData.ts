import IPagenation from 'src/dataModel/IPageMeta';
/** 
 * 出参数据数据接口
 */
export default interface IData {
    items: [{
        acceptStatus?: string,
        companyId?: string,
        credential?: null,
        departmentId?: string,
        departmentName?: string,
        description?: string,
        email?: string,
        gUserId?: string,
        isActivated?: boolean,
        isDeleted?: boolean,
        lastLoginIp?: string,
        lastLoginTime?: number,
        nickName?: string,
        phone?: string,
        userId?: string,
        userType?: string
    }];
    //
    pageMeta: IPagenation;
}