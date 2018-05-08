import * as React from 'react';
import ComponentBasic from 'kts-scaffold-framework/component/ComponentBasic';
import { Icon } from 'antd';

const css = require('./index.scss');

/** 组建的props接口 */
interface IProps {

    /** 侧边栏的宽度（默认300px） */
    width?: number;

    /** 组件是否可见 */
    visible?: boolean;

    /** 标题 */
    title?: JSX.Element | string;

    /** 样式 */
    className?: string;

    /** 点击又上角叉叉 */
    onCancel?: () => void;
}

/** 组建的state接口 */
interface IState {

}

export default class Aside extends ComponentBasic<IProps, IState> {
 
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <div
                style={this.style}
                className={this.classNameAside}
                data-visible={this.visible}
            >
                <header className="kts-aside-title">
                    <span>{this.props.title}</span>
                    <a onClick={this.props.onCancel} className="kts-aside-close">
                        <Icon type="close" />
                    </a>
                </header>
                <div className="kts-aside-container">
                    <div className="kts-aside-panel" >
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }

    /** 组件样式 */
    private get classNameAside(): string {
        if (this.props.className) {
            return `${css.aside} ${this.props.className}`;
        } else {
            return css.aside;
        }
    }

    /** 组件是否可见 */
    private get visible(): boolean {
        return this.props.visible || false;
    }

    /** 顶部样式 */
    private get style(): any {
        return {
            width: this.props.width || 300,
        };
    }
}