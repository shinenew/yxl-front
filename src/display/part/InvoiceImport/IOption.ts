export default interface IOption {
    //扫描上传和手工上传
    key4?: string;
    //文件上传 获取token
    qrtoken?: string;
    //扫描仪
    scanerurl?: string;
    //excel 下载url
    downloadurl?:string;
    //excel 上传地址
    url?:string;
}

