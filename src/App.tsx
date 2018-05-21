import * as React from 'react';
import Routes from 'src/entry/Routes';
import { MyStore } from 'src/redux';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
// 设置时区
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
class App extends React.PureComponent {
    render() {
        return (
            <LocaleProvider locale={zhCN}>
                <Provider store={MyStore.instance.store}>
                    <Routes />
                </Provider>
            </LocaleProvider>
        );
    }
}

export default App;