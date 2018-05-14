import { Icon, message, Upload, Button } from 'antd';
import React from 'react';
import { invoiceImport } from 'src/api';
import { JSString } from 'kts-scaffold-framework/utils/kit';
class Component extends React.Component<any, any>{
    private upload:any;
    constructor(props: any) {
        super(props);
        this.state = {
            callback: null,
            keyPrefix: null,
            token: null,
            uploadUrl: null,
            loop: null,
            fileList: null,
            url: this.props.url && this.props.url.qrtoken
        };
    }
    componentDidMount() {
        this.getToken();
    }
    getToken = () => {
        const url = this.state.url;
        const data = { url };
        invoiceImport.imageImport(this, data).then((response: any) => {
            const err = response.err;
            const res = response.res;
            if (err) {
                message.error(err.status.description);
                return;
            }
            this.setState({
                keyPrefix: res.keyPrefix,
                token: res.token,
                uploadUrl: res.uploadUrl
            });
        });
    }
    render() {
        let { keyPrefix, token, uploadUrl } = this.state;
        const props = {
            name: 'file',
            multiple: true,
            data: { key: keyPrefix + JSString.randomABC(8), token: token },
            action: '//' + uploadUrl,
            showUploadList: { showPreviewIcon: true, showRemoveIcon: false },
            onChange: (info) => {
                const status = info.file.status;
                this.upload.props.data.key = keyPrefix + JSString.randomABC(8);

                if (status === 'one') {
                    message.success(
                        `${info.file.name} 文件上传成功`
                    );
                    window.setTimeout(() => { this.props.fnForceUpdate() ;}, 2000);
                } else if (status === 'error') {
                    message.error(`${info.file.name} 文件上传失败.`);
                }
            },
            beforeUpload: (file) => {
                let fileName = file.name;
                if (fileName.match(/\s/g)) {
                    message.error('上传文件名不能包含空格');
                    return null;
                }

            }
        };
        return (
            <Upload {...props} ref={(upload) => { this.upload = upload; }} accept="image/*">
                <Button>
                    <Icon type="upload" /> 影像上传
                </Button>
            </Upload>
        );
    }
}
export default Component;
