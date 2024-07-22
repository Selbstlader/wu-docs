## 基于SmatrAdmin的Vue.js后台管理系统

## 项目目录

```
src                               源码目录
|-- api                              所有api接口，按照`business、system、support`拆分子目录
|-- assets                           静态资源，images, icons, styles等
|-- components                       公用组件，按照`business、system、support`拆分子目录
|-- config                           配置信息（项目配置）
|-- constants                        常量信息，项目所有Enum, 全局常量等，按照`business、system、support`拆分子目录
|-- directives                       自定义指令
|-- i18n                             国际化
|-- lib                              外部引用的插件存放及修改文件
|-- plugins                          插件，全局使用
|-- router                           路由，统一管理
|-- layout                           外层布局      
|-- store                            pinia状态, 按照`business、system、support`拆分子目录
|-- theme                            自定义样式主题
|-- utils                            工具类
|-- views                            视图目录，按照`business、system、support`拆分子目录
|   |-- business                     业务目录
|   |-- support                      支撑目录
|   |-- system                       系统目录
```

## 不同环境配置和打包

```
本地环境（localhost,用于本地开发，连接本地api）
开发环境（dev,用于本地开发，连接开发环境的api）
测试环境（test，测试人员测试）
预发布环境（pre, 真实的数据，最真实的生产环境）
生产环境（prod, 生产环境）

为了满足多个环境，我们需要利用vite3的env多环境配置import.meta.env 来解决

"scripts": {
  "dev": "vite",
  "test": "vite build  --mode test", 测试环境暂时没有使用
  "pre": "vite build  --mode pre",
  "prod": "vite build  --mode production",
  "local": "vite --mode localhost",
  "build": "vue-tsc --noEmit && vite build",
  "serve": "vite preview"
},
```

## 项目基本配置 types/config.ts config/app-config.ts

```
import { AppConfig } from '/@/types/config';

/**
 * 应用默认配置 
 */
export const appDefaultConfig: AppConfig = {
  // i18n 语言选择
  language: 'zh_CN',
  // 布局: side 或者 side-expand 或者 top
  layout: 'side',
  // 侧边菜单宽度 ， 默认为200px
  sideMenuWidth: 200,
  // 菜单主题
  sideMenuTheme: 'light',
  // 主题颜色索引
  colorIndex: 0,
  // 顶部菜单页面宽度
  pageWidth: '99%',
  // 圆角
  borderRadius: 6,
  // 标签页
  pageTagFlag: true,
  // 标签页样式: default、 antd
  pageTagStyle: 'default',
  // 面包屑
  breadCrumbFlag: true,
  // 页脚
  footerFlag: true,
  // 帮助文档
  helpDocFlag: true,
  // 水印
  watermarkFlag: true,
  // 网站名称
  websiteName: 'SmartAdmin 3.X',
  // 主题颜色
  primaryColor: '#1677ff',
  // 紧凑
  compactFlag: false,
};

```

## 项目常用方法 utils文件夹

```
框架自带有
|-- cookie-util.ts 操作cookie
|-- local-util.ts 操作localStorage
|-- str-util.ts 字符串操作
```

## 布局

```
|-- layout/index.vue    菜单
|-- layout/smart-header.vue 外层页面顶部
|-- layout/smart-layout.vue   二级菜单 里面有两种菜单模式，可以通过修改config中的layout的参数实现切换
|-- layout/smart-side-expand-layout.vue  左侧展开菜单模式 
|-- layout/smart-side-layout.vue  左侧菜单模式
|-- layout/components/side-expand-menu/index 展开菜单 
|-- layout/components/side-expand-menu/recursion-menu.vue  递归展示菜单
|-- layout/components/header-user-space/header-avatar 头像信息集成了刷新权限，修改密码，退出登录 
|-- layout/components/header-user-space/header-setting 用户设置模块,图形化修改系统配置 
|-- layout/components/menu-location-breadcrumb 面包屑
```

## 主题 theme

里面集成了antd原有样式替换，设置了大部分常用颜色和字体样式
如果需要自己添加自定义样式，按照规范在theme/color文件夹中添加引用即可

## 枚举 constants
项目集成了常用枚举，按照业务模块拆分
```
|-- constants/index.ts 枚举入口 
|-- constants/common-const.ts 常用常量 包括但不限于页码、登录路径、404路径、支持扩展
|-- constants/layout-const.ts 布局格式
|-- constants/local-storage-key-const.ts 常用key
|-- constants/regular-const.ts 常用正则
```

## 静态资源  assets
```
|-- assets/images 图片资源
```

## plugins 插件
```
|-- plugins/privilege-plugin.ts 权限插件
|-- plugins/smart-enums-plugin.ts 枚举插件
```

## lib 第三方插件
```
|-- lib/axios.ts 框架自带的封装ajax请求 是否需要改造待定
|-- lib/default-time-ranges.ts 时间选择框快捷选择
|-- lib/encrypt.ts 加解密
|-- lib/smart-wartermark.ts 水印
```