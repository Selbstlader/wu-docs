import{_ as s,c as a,o as n,a4 as p}from"./chunks/framework.DLF8A2I8.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"Vue/index.md","filePath":"Vue/index.md"}'),e={name:"Vue/index.md"},l=p(`<h2 id="基于smatradmin的vue-js后台管理系统" tabindex="-1">基于SmatrAdmin的Vue.js后台管理系统 <a class="header-anchor" href="#基于smatradmin的vue-js后台管理系统" aria-label="Permalink to &quot;基于SmatrAdmin的Vue.js后台管理系统&quot;">​</a></h2><h2 id="项目目录" tabindex="-1">项目目录 <a class="header-anchor" href="#项目目录" aria-label="Permalink to &quot;项目目录&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>src                               源码目录</span></span>
<span class="line"><span>|-- api                              所有api接口，按照\`business、system、support\`拆分子目录</span></span>
<span class="line"><span>|-- assets                           静态资源，images, icons, styles等</span></span>
<span class="line"><span>|-- components                       公用组件，按照\`business、system、support\`拆分子目录</span></span>
<span class="line"><span>|-- config                           配置信息（项目配置）</span></span>
<span class="line"><span>|-- constants                        常量信息，项目所有Enum, 全局常量等，按照\`business、system、support\`拆分子目录</span></span>
<span class="line"><span>|-- directives                       自定义指令</span></span>
<span class="line"><span>|-- i18n                             国际化</span></span>
<span class="line"><span>|-- lib                              外部引用的插件存放及修改文件</span></span>
<span class="line"><span>|-- plugins                          插件，全局使用</span></span>
<span class="line"><span>|-- router                           路由，统一管理</span></span>
<span class="line"><span>|-- layout                           外层布局      </span></span>
<span class="line"><span>|-- store                            pinia状态, 按照\`business、system、support\`拆分子目录</span></span>
<span class="line"><span>|-- theme                            自定义样式主题</span></span>
<span class="line"><span>|-- utils                            工具类</span></span>
<span class="line"><span>|-- views                            视图目录，按照\`business、system、support\`拆分子目录</span></span>
<span class="line"><span>|   |-- business                     业务目录</span></span>
<span class="line"><span>|   |-- support                      支撑目录</span></span>
<span class="line"><span>|   |-- system                       系统目录</span></span></code></pre></div><h2 id="不同环境配置和打包" tabindex="-1">不同环境配置和打包 <a class="header-anchor" href="#不同环境配置和打包" aria-label="Permalink to &quot;不同环境配置和打包&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>本地环境（localhost,用于本地开发，连接本地api）</span></span>
<span class="line"><span>开发环境（dev,用于本地开发，连接开发环境的api）</span></span>
<span class="line"><span>测试环境（test，测试人员测试）</span></span>
<span class="line"><span>预发布环境（pre, 真实的数据，最真实的生产环境）</span></span>
<span class="line"><span>生产环境（prod, 生产环境）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>为了满足多个环境，我们需要利用vite3的env多环境配置import.meta.env 来解决</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&quot;scripts&quot;: {</span></span>
<span class="line"><span>  &quot;dev&quot;: &quot;vite&quot;,</span></span>
<span class="line"><span>  &quot;test&quot;: &quot;vite build  --mode test&quot;, 测试环境暂时没有使用</span></span>
<span class="line"><span>  &quot;pre&quot;: &quot;vite build  --mode pre&quot;,</span></span>
<span class="line"><span>  &quot;prod&quot;: &quot;vite build  --mode production&quot;,</span></span>
<span class="line"><span>  &quot;local&quot;: &quot;vite --mode localhost&quot;,</span></span>
<span class="line"><span>  &quot;build&quot;: &quot;vue-tsc --noEmit &amp;&amp; vite build&quot;,</span></span>
<span class="line"><span>  &quot;serve&quot;: &quot;vite preview&quot;</span></span>
<span class="line"><span>},</span></span></code></pre></div><h2 id="项目基本配置-types-config-ts-config-app-config-ts" tabindex="-1">项目基本配置 types/config.ts config/app-config.ts <a class="header-anchor" href="#项目基本配置-types-config-ts-config-app-config-ts" aria-label="Permalink to &quot;项目基本配置 types/config.ts config/app-config.ts&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>import { AppConfig } from &#39;/@/types/config&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/**</span></span>
<span class="line"><span> * 应用默认配置 </span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>export const appDefaultConfig: AppConfig = {</span></span>
<span class="line"><span>  // i18n 语言选择</span></span>
<span class="line"><span>  language: &#39;zh_CN&#39;,</span></span>
<span class="line"><span>  // 布局: side 或者 side-expand 或者 top</span></span>
<span class="line"><span>  layout: &#39;side&#39;,</span></span>
<span class="line"><span>  // 侧边菜单宽度 ， 默认为200px</span></span>
<span class="line"><span>  sideMenuWidth: 200,</span></span>
<span class="line"><span>  // 菜单主题</span></span>
<span class="line"><span>  sideMenuTheme: &#39;light&#39;,</span></span>
<span class="line"><span>  // 主题颜色索引</span></span>
<span class="line"><span>  colorIndex: 0,</span></span>
<span class="line"><span>  // 顶部菜单页面宽度</span></span>
<span class="line"><span>  pageWidth: &#39;99%&#39;,</span></span>
<span class="line"><span>  // 圆角</span></span>
<span class="line"><span>  borderRadius: 6,</span></span>
<span class="line"><span>  // 标签页</span></span>
<span class="line"><span>  pageTagFlag: true,</span></span>
<span class="line"><span>  // 标签页样式: default、 antd</span></span>
<span class="line"><span>  pageTagStyle: &#39;default&#39;,</span></span>
<span class="line"><span>  // 面包屑</span></span>
<span class="line"><span>  breadCrumbFlag: true,</span></span>
<span class="line"><span>  // 页脚</span></span>
<span class="line"><span>  footerFlag: true,</span></span>
<span class="line"><span>  // 帮助文档</span></span>
<span class="line"><span>  helpDocFlag: true,</span></span>
<span class="line"><span>  // 水印</span></span>
<span class="line"><span>  watermarkFlag: true,</span></span>
<span class="line"><span>  // 网站名称</span></span>
<span class="line"><span>  websiteName: &#39;SmartAdmin 3.X&#39;,</span></span>
<span class="line"><span>  // 主题颜色</span></span>
<span class="line"><span>  primaryColor: &#39;#1677ff&#39;,</span></span>
<span class="line"><span>  // 紧凑</span></span>
<span class="line"><span>  compactFlag: false,</span></span>
<span class="line"><span>};</span></span></code></pre></div><h2 id="项目常用方法-utils文件夹" tabindex="-1">项目常用方法 utils文件夹 <a class="header-anchor" href="#项目常用方法-utils文件夹" aria-label="Permalink to &quot;项目常用方法 utils文件夹&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>框架自带有</span></span>
<span class="line"><span>|-- cookie-util.ts 操作cookie</span></span>
<span class="line"><span>|-- local-util.ts 操作localStorage</span></span>
<span class="line"><span>|-- str-util.ts 字符串操作</span></span></code></pre></div><h2 id="布局" tabindex="-1">布局 <a class="header-anchor" href="#布局" aria-label="Permalink to &quot;布局&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>|-- layout/index.vue    菜单</span></span>
<span class="line"><span>|-- layout/smart-header.vue 外层页面顶部</span></span>
<span class="line"><span>|-- layout/smart-layout.vue   二级菜单 里面有两种菜单模式，可以通过修改config中的layout的参数实现切换</span></span>
<span class="line"><span>|-- layout/smart-side-expand-layout.vue  左侧展开菜单模式 </span></span>
<span class="line"><span>|-- layout/smart-side-layout.vue  左侧菜单模式</span></span>
<span class="line"><span>|-- layout/components/side-expand-menu/index 展开菜单 </span></span>
<span class="line"><span>|-- layout/components/side-expand-menu/recursion-menu.vue  递归展示菜单</span></span>
<span class="line"><span>|-- layout/components/header-user-space/header-avatar 头像信息集成了刷新权限，修改密码，退出登录 </span></span>
<span class="line"><span>|-- layout/components/header-user-space/header-setting 用户设置模块,图形化修改系统配置 </span></span>
<span class="line"><span>|-- layout/components/menu-location-breadcrumb 面包屑</span></span></code></pre></div><h2 id="主题-theme" tabindex="-1">主题 theme <a class="header-anchor" href="#主题-theme" aria-label="Permalink to &quot;主题 theme&quot;">​</a></h2><p>里面集成了antd原有样式替换，设置了大部分常用颜色和字体样式 如果需要自己添加自定义样式，按照规范在theme/color文件夹中添加引用即可</p><h2 id="枚举-constants" tabindex="-1">枚举 constants <a class="header-anchor" href="#枚举-constants" aria-label="Permalink to &quot;枚举 constants&quot;">​</a></h2><p>项目集成了常用枚举，按照业务模块拆分</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>|-- constants/index.ts 枚举入口 </span></span>
<span class="line"><span>|-- constants/common-const.ts 常用常量 包括但不限于页码、登录路径、404路径、支持扩展</span></span>
<span class="line"><span>|-- constants/layout-const.ts 布局格式</span></span>
<span class="line"><span>|-- constants/local-storage-key-const.ts 常用key</span></span>
<span class="line"><span>|-- constants/regular-const.ts 常用正则</span></span></code></pre></div><h2 id="静态资源-assets" tabindex="-1">静态资源 assets <a class="header-anchor" href="#静态资源-assets" aria-label="Permalink to &quot;静态资源  assets&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>|-- assets/images 图片资源</span></span></code></pre></div><h2 id="plugins-插件" tabindex="-1">plugins 插件 <a class="header-anchor" href="#plugins-插件" aria-label="Permalink to &quot;plugins 插件&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>|-- plugins/privilege-plugin.ts 权限插件</span></span>
<span class="line"><span>|-- plugins/smart-enums-plugin.ts 枚举插件</span></span></code></pre></div><h2 id="lib-第三方插件" tabindex="-1">lib 第三方插件 <a class="header-anchor" href="#lib-第三方插件" aria-label="Permalink to &quot;lib 第三方插件&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>|-- lib/axios.ts 框架自带的封装ajax请求 是否需要改造待定</span></span>
<span class="line"><span>|-- lib/default-time-ranges.ts 时间选择框快捷选择</span></span>
<span class="line"><span>|-- lib/encrypt.ts 加解密</span></span>
<span class="line"><span>|-- lib/smart-wartermark.ts 水印</span></span></code></pre></div>`,22),t=[l];function i(o,c,u,r,d,h){return n(),a("div",null,t)}const b=s(e,[["render",i]]);export{m as __pageData,b as default};
