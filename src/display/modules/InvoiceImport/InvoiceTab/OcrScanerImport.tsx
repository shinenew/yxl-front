import { Icon, message, Button,Form } from 'antd';
import React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { invoiceImport } from 'src/api';
interface IProps extends FormComponentProps {
    url: any;
    fnForceUpdate: () => {};
}
class Component extends React.Component<IProps, any> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            callback: null,
            keyPrefix: null,
            token: null,
            uploadUrl: null,
            loop: null,
            fileList: null,
            url: this.props.url && this.props.url.scanerurl,
            fixUrl: this.props.url && this.props.url.fixUrl,
            message: null,
            params: this.props.url && this.props.url.scanerParams
        };
    }

    getToken = () => {
        this.setState({
            message: ''
        });
        const url = this.state.url;
        let data = {
            ...this.state.params,
            url
        };
        invoiceImport.manualImport(this, data).then((response: any) => {
            const err = response.err;
            const res = response.res;
            if (err) {
                message.error(err.body.message);
                return;
            }
            if (res.ok) {
                this.setState({
                    message: res.body.message
                });
            } else {
                this.setState({
                    message: res.message
                });
            }
        });
    }
    render() {
        return (
            <div>
                <div>{this.state.message}</div>
                <Button onClick={this.getToken}>
                    <Icon type="upload" />扫描仪连接
                </Button>

            </div>
        );
    }
}
const ManualImport = Form.create()(Component);
export default ManualImport;
