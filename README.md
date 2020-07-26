# HY_FRAME

（2020-03-10）框架,equipment record


# 目录结构
```javascript
.
├── LICENSE
├── README-zh.md
├── README.md
├── build 项目工程化文件(一般不需要修改)
├── config 项目工程化配置文件
├── favicon.ico
├── index.html
├── package-lock.json
├── package.json
├── node_modules 项目所需的 node 模块包
├── src 项目代码主目录
│   ├── App.vue 根组件
│   ├── main.js 入口文件
│   ├── api 项目中所需的 API
│   │   ├── api.js
│   │   ├── code.js
│   │   ├── config.js 项目中需要的常量设置
│   │   └── index.js
│   ├── assets 资源文件目录
│   │   ├── images
│   │   ├── javascript
│   │   └── styles 样式目录
│   │   ├── base.scss
│   │   ├── common
│   │   ├── element-ui.scss
│   │   ├── mixins
│   │   ├── reset.scss
│   │   ├── style.scss
│   │   ├── transition
│   │   └── variables.scss
│   ├── components 组件目录
│   │   ├── chart
│   │   ├── global.js
│   │   ├── index.js
│   │   ├── nav-menu
│   ├── config 配置目录
│   │   ├── elmComponents.js
│   │   ├── http.js
│   │   ├── index.js
│   │   ├── initEcharts.js  echarts按需加载
│   │   ├── mock.js
│   │   ├── network.js
│   │   ├── proxyTable.js
│   │   └── requireAuth.js
│   ├── directives 指令目录
│   │   └── index.js
│   ├── filters 过滤器目录
│   │   └── index.js
│   ├── mixins 混合文件目录
│   │   └── index.js
│   ├── mock mock 数据规则配置
│   │   └── index.js
│   ├── network 页面网络请求目录
│   ├── pages 路由页面
│   │   ├── 404
│   │   │   ├── index.vue
│   │   │   └── style.scss
│   │   ├── auth
│   │   │   ├── index.vue
│   │   │   └── style.scss
│   ├── plugins 关于 Vue 中的插件
│   │   └── index.js
│   ├── router 路由
│   │   ├── index.js
│   │   └── router.js
│   ├── store 状态管理
│   │   ├── actions.js
│   │   ├── getters.js
│   │   ├── index.js
│   │   ├── modules
│   │   │   ├── app.js
│   │   │   ├── index.js
│   │   │   ├── tabs.js
│   │   │   ├── tagsView.js
│   │   │   └── user.js
│   │   ├── mutations.js
│   │   ├── state.js
│   │   └── types.js
│   ├── utils 工具库
│   │   ├── getAllPagesPath.js
│   │   ├── hy
│   │   │   ├── animate.js
│   │   │   ├── base.js
│   │   │   ├── compute.js
│   │   │   ├── database.js
│   │   │   ├── date.js
│   │   │   ├── encrypt.js
│   │   │   ├── http.js
│   │   │   ├── index.js
│   │   │   ├── prototype.js
│   │   │   ├── regex.js
│   │   │   ├── system.js
│   │   │   ├── tool.js
│   │   │   ├── ui.js
│   │   │   └── untils
│   │   ├── index.js
│   │   └── treeSelectDataFormat.js
│   └── views 布局目录
│   ├── layout
│       ├── index.vue
│       └── style.scss
└── static
├── common
└── dirty-data mock 数据
├── index.js
└── json-data
└── workBenchData.json
```

## 1、项目目录介绍

> 1、Vue 组件方面 主要有三个文件夹 views pages components
> views 负责项目的页面布局
> pages 路由页面
> components 组件

## 2、Vue 函数相关 主要有四个文件夹 directives filters mixins plugins

> directives 指令
> filters 过滤器(管道)
> mixins 混合
> plugins 组件插件化

## 3、API api 目录主要负责配置 项目中的网络请求 API

> api.js 中包含了全部的 api 分为 3 部分 host(服务器地址), prefix(前缀), suffix(后缀)
> code.js 前后端交互中需要的网络状态码信息
> config.js 项目中的常量设置
> index.js 入口文件，(在该文件中也配置了 host, prefix, suffix)

```javascript
Object.keys(commonAPI).map(e => {
  const uuid = "";
  // process.env.NODE_ENV === 'production' ? '' : hy.base.uuid() + '/'
  const special = ["logout", "userInfo"];
  if (special.includes(e)) {
    api[e] = commonAPI[e]("./", uuid);
  } else {
    api[e] = commonAPI[e](host, uuid);
  }
});
```

## 4、network 网络请求

> network 目录主要负责项目中的网络请求部分， 该文件夹下的网络请求文件一般以页面为单元

## 5、mock mock 数据

> 主要负责配项目中具体的网络请求 mock 数据返回

```javascript
import mockData from "res";

const mockDataKeys = Object.keys(mockData);

const mockRuleData = api => {
  const special = ["logout", "userInfo"];
  const direct = [];
  if (special.includes(api)) {
    return {
      success: true,
      code: 2000,
      msg: "请求成功"
    };
  } else if (direct.includes(api)) {
    return {};
  } else if (mockDataKeys.includes(api)) {
    return mockData[api];
  } else {
    return {
      success: true,
      code: 2000,
      msg: "请求成功"
    };
  }
};

export default (Mock, api) => {
  if (process.env.NODE_ENV === "development") {
    const apiKeys = Object.keys(api);
    apiKeys.map(e => {
      Mock.mock(api[e], mockRuleData(e));
    });
  }
};
```

## 6、utils 工具库

> hy 是集成的工具库 主要包含 网络请求 加密 日期处理 正则 系统信息 ui 数据存储 动画 常用的函数等

## 7、config 项目配置目录

> elmComponents.js 项目中使用的组件按需加载
> http.js 项目中使用的 axios 配置
> initEcharts.js echarts.js 按需加载
> mock.js mock 数据配置
> network.js 项目中的网络请求类
> proxyTable.js 网络代理模块
> requireAuth.js 页面权限管理

## 8、main.js 入口文件

```javascript
// 中间件和项目的基础配置
import config from "./config";
Object.keys(config).map(e => {
  if (e === "isMock") {
    /**
     * 第一个参数 是否使用mock数据
     * 第二个参数 网络请求 是否使用 JSON
     */
    Vue.use(config[e], false, true);
  } else {
    Vue.use(config[e]);
  }
});
```

## 9、store 状态管理

> modules
>
> - app.js 和项目有关的状态
> - user.js 和用户有关的状态
