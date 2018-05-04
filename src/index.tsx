import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.less';
import 'ant-design-pro/dist/ant-design-pro.css';

try {
  window.document.domain = window['$$_kxl_env']['DOMAIN'];
} catch (er) {
  console.error('domain设置失败。');
}

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);