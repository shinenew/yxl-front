## 使用技术
  * typescript
  * tslint
  * sass
  * css-modules
  * react
  * react-router
  * react-router-dom
  * redux
  * redux-act
  * react-redux
  * superagent
  * antd
  * moment
  * kts-scaffold-framework （公司自己的底层包）[参看](https://github.com/kingxunlian/kts-scaffold-framework)

### 安装
yarn install 或者 npm install

### 启动
yarn start 或者 npm start

### 编译
yarn build [环境参数] 或者 npm run build [环境参数]
[环境参数]
* dev 开发环境 [查看](http://dev.portal.xltec.cc)
* test 测速环境
* production 生产环境

### 代码生成器
#### 【创建模块】
yarn cre [模块类型] [目录] [模块名称] <br>
或者 <br>
npm run cre [模块类型] [目录] [模块名称] <br>
[模块类型]:
* m 显示模块  默认路径（src/display/modules）<br>
* a api模块  默认路径（src/api/system）<br>
* p 代码片段  默认路径（src/display/part）<br>
* app 内部APP  默认路径（src/display/app<br>
* platform 平台APP  默认路径（src/display/platform<br>

例子
>yarn cre m . demo（在src/display/modules 下创建一个名为 demo的模块）<br>
>yarn cre m /src demo（在src下创建一个名为demo的模块）

### 目录结构
* src
  * api （所有和全局数据以及后端交互但是不和显示层相关的逻辑）
    * system（系统通用api）
    * user（用户相关api）
  * dataModel（数据模型-回重复实例化，并且参与业务逻辑的数据对象）
  * display（显示对象）
    * modules（模块-地理的业务逻辑，通过路由切换）
    * app (系统内部的APP)
    * platform（平台的基础功能包）
    * part（显示片段-可以同时出现多个，有很独立的业务逻辑）
    * components（组件）
  * entry（类似条目的配置）
    * constant（全站用的常量）
    * Routes（路由的跟配置）
  * redux （全局状态管理的扩展）
  * routes (全局路由管理)
  * utils （全站和业务无关的工具类）

<br/><br/>

注意：
> 组件 - 不会有业务逻辑，不和全局数据发生关机。<br/>
> 显示片段 - 有独立的业务逻辑处理能力