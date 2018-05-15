import React from 'react';
import { Modal, message, Upload } from 'antd';
import MyStore from 'src/redux/MyStore';
const uploadImage =require('../upload.png');
const downloadImage= require('../download.png');
const css=require('../index.scss');
class Component extends React.Component<any, any>{
    constructor(props:any) {
        super(props);
        this.state = {
            downloadUrl: '',
            data: this.props.url,
            excel: true,
            errorModal: false,
            errorInfo: '',
            downloadFilePath: ''
        };
    }
    handleCancel = () => {
        this.setState({
            errorModal: false
        });
    }
    handleOk = () => {
        window.open(this.state.downloadFilePath);
    }
    render() {
        const { user } = MyStore.instance.getState();
        const propsData = this.state.data;
        const url = '//'+user.zoneUrl+propsData.url;
        const downloadUrl ='//'+ user.zoneUrl+propsData.downloadurl;
        
        const data = {
            id: propsData.id
        };
        const headers = {
            Authorization: user.cToken
        };
        const props = {
            name: 'file',
            multiple: false,
            action: url,
            data: data,
            headers: headers,
            onChange: info => {
                const status = info.file.status;

                if (status === 'done') {
                    const returnCode = info.file.response.status.returnCode;
                    if (returnCode === '99999') {
                        message.warning('系统异常', 2);
                    } else {
                        if (info.file.response.ok) {
                            if (info.file.response.body.allSuccess) {
                                message.success('上传成功！');
                            } else {
                                const downloadFilePath = info.file.response.body.downloadFilePath;
                                const errorCount = info.file.response.body.errorCount;
                                const successCount = info.file.response.body.successCount;
                                this.setState({
                                    excel: false,
                                    errorModal: true,
                                    errorInfo: `录入成功${successCount} 条,失败${errorCount} 条!`,
                                    downloadFilePath: downloadFilePath
                                });
                            }
                        } else {
                            message.error(info.file.response.status.description);
                        }

                    }
                } else if (status === 'error') {
                    message.error(`${info.file.name} 文件上传失败.`);
                }
            }
        };
        return (
            <div>
                <div className={css['auth-excel']}>
                    <div>
                        <a href={downloadUrl} className={css.bn} target="_blank">
                            <img src={downloadImage} alt="" />
                        </a>
                        <h3>Excel 模板下载</h3>
                        <p>点击图标下载模板</p>
                    </div>

                    <div>
                        <Upload {...props}>
                            <span className={css.bn}>
                                <img src={uploadImage} alt="" />
                            </span>
                        </Upload>
                        <h3>Excel 上传</h3>
                        <p>点击图标上传Excel文件</p>
                    </div>
                </div>
                <Modal
                    title={'提示'}
                    okText={'下载'}
                    visible={this.state.errorModal}
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                >
                    {this.state.errorInfo} 点击下载按钮下载录入失败记录。
                </Modal>
            </div>
        );
    }
}

export default Component;
