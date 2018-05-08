import * as React from 'react';
import ComponentBasic from 'kts-scaffold-framework/component/ComponentBasic';
import { Select } from 'antd';
import { SelectProps, SelectValue, OptionProps } from 'antd/lib/select';

interface IOptionProps extends OptionProps {
    isOnChang?: boolean;
    onClick?: (value: SelectValue, option?: React.ReactElement<any> | React.ReactElement<any>[]) => void;
}

export default class SelectBox extends ComponentBasic<SelectProps> {

    /** 创建下拉菜单子项目 */
    public static createOption(propsList: IOptionProps[]): JSX.Element[] {
        
        const list: JSX.Element[] = [];
        
        propsList.forEach((value: any, index: number) => {
            const children = value.children;
            const props = { ...value, children: undefined };
            list.push(<Select.Option key={index} {...props}>{children}</Select.Option>);
        });

        return list;
    }

    constructor(props: SelectProps) {
        super(props);
    }

    render() {
        return (
            <Select {...this.props} onChange={this.onChange}>
                {this.props.children}
            </Select>
        );
    }

    private onChange = (value: SelectValue, option: any): void => {
        if (option.props.onClick) {
            option.props.onClick(value, option);
        }

        if (this.props.onChange && option.props.isOnChang) {
            this.props.onChange(value, option);
        }
    }
}