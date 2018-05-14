import { Form, } from 'antd';
import React from 'react';
import { FormComponentProps } from 'antd/lib/form';

const create = () => {
    return (dom: any): any => {
        return Form.create()(dom);
    };
};

interface IProps extends FormComponentProps {
    url: any;
    fnForceUpdate: () => void;
}

class Component<P extends IProps, S> extends React.Component<P, S>{
    constructor(props: P) {
        super(props);
        this.callback = this.callback.bind(this);
    }
    public callback() {
        if (this.props.fnForceUpdate) {
            this.props.fnForceUpdate();
        }
    }
}

export default Component;
export {
    create,
    IProps
};
