import{_ as s,c as n,o as a,a4 as p}from"./chunks/framework.DLF8A2I8.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"Vue/index.md","filePath":"Vue/index.md"}'),e={name:"Vue/index.md"},l=p(`<h2 id="基于smatradmin的vue-js后台管理系统" tabindex="-1">基于SmatrAdmin的Vue.js后台管理系统 <a class="header-anchor" href="#基于smatradmin的vue-js后台管理系统" aria-label="Permalink to &quot;基于SmatrAdmin的Vue.js后台管理系统&quot;">​</a></h2><h2 id="项目目录" tabindex="-1">项目目录 <a class="header-anchor" href="#项目目录" aria-label="Permalink to &quot;项目目录&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>src                               源码目录</span></span>
<span class="line"><span>├─ api                              所有api接口，按照\`business、system、support\`拆分子目录</span></span>
<span class="line"><span>├─ assets                           静态资源，images, icons, styles等</span></span>
<span class="line"><span>├─ components                       公用组件，按照\`business、system、support\`拆分子目录</span></span>
<span class="line"><span>├─ config                           配置信息（项目配置）</span></span>
<span class="line"><span>├─ constants                        常量信息，项目所有Enum, 全局常量等，按照\`business、system、support\`拆分子目录</span></span>
<span class="line"><span>├─ directives                       自定义指令</span></span>
<span class="line"><span>├─ i18n                             国际化</span></span>
<span class="line"><span>├─ lib                              外部引用的插件存放及修改文件</span></span>
<span class="line"><span>├─ plugins                          插件，全局使用</span></span>
<span class="line"><span>├─ router                           路由，统一管理</span></span>
<span class="line"><span>├─ layout                           外层布局      </span></span>
<span class="line"><span>├─ store                            pinia状态, 按照\`business、system、support\`拆分子目录</span></span>
<span class="line"><span>├─ theme                            自定义样式主题</span></span>
<span class="line"><span>├─ utils                            工具类</span></span>
<span class="line"><span>├─ views                            视图目录，按照\`business、system、support\`拆分子目录</span></span>
<span class="line"><span>|   ├─ business                     业务目录</span></span>
<span class="line"><span>|   ├─ support                      支撑目录</span></span>
<span class="line"><span>|   ├─ system                       系统目录</span></span></code></pre></div><h2 id="不同环境配置和打包" tabindex="-1">不同环境配置和打包 <a class="header-anchor" href="#不同环境配置和打包" aria-label="Permalink to &quot;不同环境配置和打包&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>本地环境（localhost,用于本地开发，连接本地api）</span></span>
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
<span class="line"><span>├─ cookie-util.ts 操作cookie</span></span>
<span class="line"><span>├─ local-util.ts 操作localStorage</span></span>
<span class="line"><span>├─ str-util.ts 字符串操作</span></span></code></pre></div><h2 id="布局" tabindex="-1">布局 <a class="header-anchor" href="#布局" aria-label="Permalink to &quot;布局&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>├─ layout/index.vue    菜单</span></span>
<span class="line"><span>├─ layout/smart-header.vue 外层页面顶部</span></span>
<span class="line"><span>├─ layout/smart-layout.vue   二级菜单 里面有两种菜单模式，可以通过修改config中的layout的参数实现切换</span></span>
<span class="line"><span>├─ layout/smart-side-expand-layout.vue  左侧展开菜单模式 </span></span>
<span class="line"><span>├─ layout/smart-side-layout.vue  左侧菜单模式</span></span>
<span class="line"><span>├─ layout/components/side-expand-menu/index 展开菜单 </span></span>
<span class="line"><span>├─ layout/components/side-expand-menu/recursion-menu.vue  递归展示菜单</span></span>
<span class="line"><span>├─ layout/components/header-user-space/header-avatar 头像信息集成了刷新权限，修改密码，退出登录 </span></span>
<span class="line"><span>├─ layout/components/header-user-space/header-setting 用户设置模块,图形化修改系统配置 </span></span>
<span class="line"><span>├─ layout/components/menu-location-breadcrumb 面包屑</span></span></code></pre></div><h2 id="主题-theme" tabindex="-1">主题 theme <a class="header-anchor" href="#主题-theme" aria-label="Permalink to &quot;主题 theme&quot;">​</a></h2><p>里面集成了antd原有样式替换，设置了大部分常用颜色和字体样式 如果需要自己添加自定义样式，按照规范在theme/color文件夹中添加引用即可</p><h2 id="枚举-constants" tabindex="-1">枚举 constants <a class="header-anchor" href="#枚举-constants" aria-label="Permalink to &quot;枚举 constants&quot;">​</a></h2><p>项目集成了常用枚举，按照业务模块拆分</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>├─ constants/index.ts 枚举入口 </span></span>
<span class="line"><span>├─ constants/common-const.ts 常用常量 包括但不限于页码、登录路径、404路径、支持扩展</span></span>
<span class="line"><span>├─ constants/layout-const.ts 布局格式</span></span>
<span class="line"><span>├─ constants/local-storage-key-const.ts 常用key</span></span>
<span class="line"><span>├─ constants/regular-const.ts 常用正则</span></span></code></pre></div><h2 id="静态资源-assets" tabindex="-1">静态资源 assets <a class="header-anchor" href="#静态资源-assets" aria-label="Permalink to &quot;静态资源  assets&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>├─ assets/images 图片资源</span></span></code></pre></div><h2 id="plugins-插件" tabindex="-1">plugins 插件 <a class="header-anchor" href="#plugins-插件" aria-label="Permalink to &quot;plugins 插件&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>├─ plugins/privilege-plugin.ts 权限插件</span></span>
<span class="line"><span>├─ plugins/smart-enums-plugin.ts 枚举插件</span></span></code></pre></div><h2 id="lib-第三方插件" tabindex="-1">lib 第三方插件 <a class="header-anchor" href="#lib-第三方插件" aria-label="Permalink to &quot;lib 第三方插件&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>├─ lib/axios.ts 框架自带的封装ajax请求 是否需要改造待定</span></span>
<span class="line"><span>├─ lib/default-time-ranges.ts 时间选择框快捷选择</span></span>
<span class="line"><span>├─ lib/encrypt.ts 加解密</span></span>
<span class="line"><span>├─ lib/smart-wartermark.ts 水印</span></span></code></pre></div><h2 id="网络请求" tabindex="-1">网络请求 <a class="header-anchor" href="#网络请求" aria-label="Permalink to &quot;网络请求&quot;">​</a></h2><ul><li>项目封装了Axios来做网络请求，包括错误处理、取消请求等功能</li><li>接口配置化处理 结合.env 配置文件使用</li></ul><h3 id="目录结构" tabindex="-1">目录结构 <a class="header-anchor" href="#目录结构" aria-label="Permalink to &quot;目录结构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>├─ api</span></span>
<span class="line"><span>│  ├─ common</span></span>
<span class="line"><span>│  │  │ commonInfo.ts  公共信息</span></span>
<span class="line"><span>│  │  │ commonReq.ts 公共请求</span></span>
<span class="line"><span>│  │  │ commonRes.ts  公共返回</span></span>
<span class="line"><span>│  │  │ commonSave.ts 公共保存</span></span>
<span class="line"><span>│  │  │ commonTableSearch.ts 表格查询</span></span>
<span class="line"><span>│  │  │ ocr.ts OCR识别</span></span>
<span class="line"><span>│  │  └─ index.ts 模块入口 根据模块拆分 可以直接拓展</span></span>
<span class="line"><span>│  ├─ api.ts    封装request</span></span>
<span class="line"><span>│  ├─ axios.ts  封装axios</span></span>
<span class="line"><span>│  ├─ index.ts  api入口 配置接口地址</span></span>
<span class="line"><span>│  ├─ pending.ts</span></span></code></pre></div><h3 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-label="Permalink to &quot;配置&quot;">​</a></h3><p>接口地址是通过环境变量加载的，可以通过项目根目录下的.env.***文件中修改VITE_APP_BASE_API，而不是在此处直接修改。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 接口地址</span></span>
<span class="line"><span>export const Host = import.meta.env.VITE_APP_BASE_API;</span></span>
<span class="line"><span>// COS地址</span></span>
<span class="line"><span>export const COSHost = import.meta.env.VITE_APP_COS_URL;</span></span>
<span class="line"><span>// COS储存桶</span></span>
<span class="line"><span>export const Bucket = &#39;yingjia-1304963394&#39;;</span></span>
<span class="line"><span>// 高拍仪地址</span></span>
<span class="line"><span>export const CameraHost = &#39;http://127.0.0.1:38088/&#39;;</span></span></code></pre></div><h3 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h3><p>写一个role列表查询</p><ul><li>api-&gt; 对应模块的文件夹 -&gt;role.ts</li><li>在role.ts中引入封装后的axios</li><li>编写请求函数</li><li>给请求函数的入参和返回值加上TS类型限制</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>// 方法引入</span></span>
<span class="line"><span>import * as Api from &#39;..&#39;</span></span>
<span class="line"><span>import * as Utils from &#39;../../utils&#39;</span></span>
<span class="line"><span>import { postRequest } from &#39;../../lib/axios&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* #region *************************************************************** 角色管理******************************************************************  */</span></span>
<span class="line"><span>// 类型限制</span></span>
<span class="line"><span>export interface RoleList extends Api.Common.CommonTableSearch {</span></span>
<span class="line"><span>   /**</span></span>
<span class="line"><span>    * 企业名称</span></span>
<span class="line"><span>    */</span></span>
<span class="line"><span>   enterpriseName?: string;</span></span>
<span class="line"><span>   /**</span></span>
<span class="line"><span>      * 统一社会信用代码</span></span>
<span class="line"><span>      */</span></span>
<span class="line"><span>   unifiedSocialCreditCode?: string;</span></span>
<span class="line"><span>   /**</span></span>
<span class="line"><span>      * 企业类型</span></span>
<span class="line"><span>      */</span></span>
<span class="line"><span>   type?: string;</span></span>
<span class="line"><span>   /**</span></span>
<span class="line"><span>    * 联系人</span></span>
<span class="line"><span>    */</span></span>
<span class="line"><span>   contact?: string</span></span>
<span class="line"><span>   /**</span></span>
<span class="line"><span>      * 联系人电话</span></span>
<span class="line"><span>      */</span></span>
<span class="line"><span>   contactPhone?: Number</span></span>
<span class="line"><span>   /**</span></span>
<span class="line"><span>      * 邮箱</span></span>
<span class="line"><span>      */</span></span>
<span class="line"><span>   email?: string</span></span>
<span class="line"><span>   /**</span></span>
<span class="line"><span>      * 状态</span></span>
<span class="line"><span>      */</span></span>
<span class="line"><span>   disabledFlag?: boolean</span></span>
<span class="line"><span>   /**</span></span>
<span class="line"><span>      * 创建人</span></span>
<span class="line"><span>      */</span></span>
<span class="line"><span>   createUserName?: string</span></span>
<span class="line"><span>   /**</span></span>
<span class="line"><span>      * 创建时间</span></span>
<span class="line"><span>      */</span></span>
<span class="line"><span>   createTime?: string</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>/* #endregion */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* #region *************************************************************** 查询角色管理列表 ************************************************************  */</span></span>
<span class="line"><span>// 请求 request</span></span>
<span class="line"><span>export class QueryRoleListReq extends Api.Common.CommonReq {</span></span>
<span class="line"><span>   constructor(param: { [key: string]: any }) {</span></span>
<span class="line"><span>      super(param)</span></span>
<span class="line"><span>      Utils.DataTools.NewMap.ConstructorObjDefault(this, param);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 返回 response</span></span>
<span class="line"><span>export interface QueryRoleListRes extends Api.Common.HttpResponse {</span></span>
<span class="line"><span>   RoleList?: RoleList[];                   // 角色管理列表</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 接口地址 api</span></span>
<span class="line"><span>// 查询角色列表</span></span>
<span class="line"><span>export const QueryRoleList = async (param: QueryRoleListReq): Promise&lt;QueryRoleListRes&gt; =&gt; {</span></span>
<span class="line"><span>   return postRequest(&#39;/oa/enterprise/page/query&#39;, param);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>export const QueryAddRole = async (param: any): Promise&lt;QueryRoleListRes&gt; =&gt; {</span></span>
<span class="line"><span>   return postRequest(&#39;/oa/enterprise/create&#39;, param);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="使用api函数" tabindex="-1">使用api函数 <a class="header-anchor" href="#使用api函数" aria-label="Permalink to &quot;使用api函数&quot;">​</a></h3><ul><li>在对应的views页面中引入api函数</li><li>创建对应的model文件，编写对应的class实例和方法</li><li>views页面中引入对应的方法</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>model.ts</span></span>
<span class="line"><span>import * as Api from &#39;/@/api&#39;;</span></span>
<span class="line"><span>import * as Utils from &#39;/@/utils&#39;;</span></span>
<span class="line"><span>import { Table } from &#39;/@/components&#39;;</span></span>
<span class="line"><span>import { ElMessage } from &#39;element-plus&#39;;</span></span>
<span class="line"><span>/* #region ********************************** 人员管理展示 ****************************************** */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 角色管理实例</span></span>
<span class="line"><span>export class ShowRoleList {</span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>   * 企业名称</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span>  enterpriseName?: string;</span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>     * 统一社会信用代码</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>  unifiedSocialCreditCode?: string;</span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>     * 企业类型</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>  type?: string;</span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>   * 联系人</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span>  contact?: string</span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>     * 联系人电话</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>  contactPhone?: Number</span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>     * 邮箱</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>  email?: string</span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>     * 状态</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>  disabledFlag?: boolean</span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>     * 创建人</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>  createUserName?: string</span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>     * 创建时间</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>  createTime?: string</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  constructor(item?: Api.RoleApi.QueryRoleListReq) {</span></span>
<span class="line"><span>    if (item) for (const key in this) this[key] = Utils.DataTools.NewMap.ConstructorObjDefault(this, item);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>export class roleList extends Table.ZlVXETableData&lt;ShowRoleList&gt; {</span></span>
<span class="line"><span>  constructor() { super(); }</span></span>
<span class="line"><span>  // 获取查询参数</span></span>
<span class="line"><span>  search(params: any, isReset?: boolean): roleList {</span></span>
<span class="line"><span>    this.searchTable?.getSearch(params, isReset);</span></span>
<span class="line"><span>    return this;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // 搜索 处理数据 根据具体业务操作</span></span>
<span class="line"><span>  async query(): Promise&lt;boolean&gt; {</span></span>
<span class="line"><span>    this.searchTable.loading = true;</span></span>
<span class="line"><span>    let params = new Api.RoleApi.QueryRoleListReq(this.searchTable);</span></span>
<span class="line"><span>    params.pageNum = 1;</span></span>
<span class="line"><span>    const res = await Api.RoleApi.QueryRoleList(params);</span></span>
<span class="line"><span>    const { code, data, msg } = res;</span></span>
<span class="line"><span>    if (code === 0) {</span></span>
<span class="line"><span>      data.list as Api.RoleApi.RoleList[];</span></span>
<span class="line"><span>      this.tableData = data.list;</span></span>
<span class="line"><span>      this.count = data.total || 0;</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>      ElMessage.error(msg);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return true;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>views页面 根据业务进行具体操作</span></span>
<span class="line"><span>import { roleList } from &#39;/@/views/system/employee/role/model&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const queryData = async (params?: any, isReset?: boolean) =&gt; {</span></span>
<span class="line"><span>  state.table.search(params, isReset).query();</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// vue生命周期调用</span></span>
<span class="line"><span>onMounted(() =&gt; {</span></span>
<span class="line"><span>  state.table = new roleList();</span></span>
<span class="line"><span>  queryData({ pageNum: 1 });</span></span>
<span class="line"><span>});</span></span></code></pre></div><h2 id="组件-components" tabindex="-1">组件 components <a class="header-anchor" href="#组件-components" aria-label="Permalink to &quot;组件 components&quot;">​</a></h2><h2 id="表单组件" tabindex="-1">表单组件 <a class="header-anchor" href="#表单组件" aria-label="Permalink to &quot;表单组件&quot;">​</a></h2><h3 id="文件结构" tabindex="-1">文件结构 <a class="header-anchor" href="#文件结构" aria-label="Permalink to &quot;文件结构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>├─ components</span></span>
<span class="line"><span>│  ├─ form          </span></span>
<span class="line"><span>|  |  | module      公共表单类型</span></span>
<span class="line"><span>│  │  │ form.vue    表单组件</span></span>
<span class="line"><span>│  │  │ model.ts    封装的表单方法</span></span>
<span class="line"><span>│  │  └─ index.ts   入口文件</span></span></code></pre></div><h3 id="表单示例" tabindex="-1">表单示例 <a class="header-anchor" href="#表单示例" aria-label="Permalink to &quot;表单示例&quot;">​</a></h3><ul><li></li><li>在module文件夹创建对应表单实例</li><li>引入表单组件</li><li>创建表单实例</li><li>根据业务编写对应的方法</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>module</span></span>
<span class="line"><span>import * as Api from &#39;/@/api&#39;;</span></span>
<span class="line"><span>import { Form } from &#39;/@/components/index&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* #region ************************************************************* 企业管理单数据*************************************************************  */</span></span>
<span class="line"><span>// 表单实例</span></span>
<span class="line"><span>export class RoleFormData {</span></span>
<span class="line"><span>  enterpriseName?: string;</span></span>
<span class="line"><span>  type?: string;</span></span>
<span class="line"><span>  contact?: string;</span></span>
<span class="line"><span>  contactPhone?: string;</span></span>
<span class="line"><span>  unifiedSocialCreditCode?: string;</span></span>
<span class="line"><span>  email?: string;</span></span>
<span class="line"><span>  // 启用状态</span></span>
<span class="line"><span>  disabledFlag?: boolean;</span></span>
<span class="line"><span>  constructor(item?: any) {</span></span>
<span class="line"><span>    // Utils.DataTools.NewMap.ConstructorObjDefault(this, item);</span></span>
<span class="line"><span>    // let cySlot = [] as any</span></span>
<span class="line"><span>    // if (item.courseName) cySlot[0] = item.courseName</span></span>
<span class="line"><span>    // if (item.courseId) cySlot[1] = item.courseId+&#39;&#39;</span></span>
<span class="line"><span>    // this.cySlot = cySlot</span></span>
<span class="line"><span>    // console.log(&#39;cySlot&#39;, cySlot, item)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>// 根据业务编写的方法 这里已新增为例</span></span>
<span class="line"><span>export class RoleForm extends Form.ZlForm&lt;RoleFormData&gt; {</span></span>
<span class="line"><span>  constructor() { super() }</span></span>
<span class="line"><span>  async add(params: RoleFormData) {</span></span>
<span class="line"><span>    return new Promise((resolve, reject) =&gt; {</span></span>
<span class="line"><span>      Api.RoleApi.QueryAddRole(params).then(res =&gt; {</span></span>
<span class="line"><span>        if (res.code === 0) {</span></span>
<span class="line"><span>          resolve(true);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      })</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>/* #endregion */</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>views</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;RoleForm :visible=&quot;form.visible&quot; :formConfig=&quot;form&quot; @submit=&quot;submit&quot; /&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import { FormData } from &#39;/@/components/form/module/index&#39;;</span></span>
<span class="line"><span>const state = reactive({</span></span>
<span class="line"><span>  form: {</span></span>
<span class="line"><span>    title: &#39;企业类型&#39;,</span></span>
<span class="line"><span>    visible: false,</span></span>
<span class="line"><span>    type: &#39;&#39;,</span></span>
<span class="line"><span>    formData: {} as any,</span></span>
<span class="line"><span>    showSubmit: true,</span></span>
<span class="line"><span>    showDelete: false,</span></span>
<span class="line"><span>  } as FormData,</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const { form } = toRefs(state);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const addRole = () =&gt; {</span></span>
<span class="line"><span>  state.form.visible = true;</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>RoleForm </span></span>
<span class="line"><span> &lt;Form.Form</span></span>
<span class="line"><span>    :visible=&quot;form.visible&quot;</span></span>
<span class="line"><span>    labelWidth=&quot;140px&quot;</span></span>
<span class="line"><span>    :zlvalue=&quot;form&quot;</span></span>
<span class="line"><span>    :width=&quot;900&quot;</span></span>
<span class="line"><span>    :showDelete=&quot;form.showDelete&quot;</span></span>
<span class="line"><span>    @submit=&quot;submitForm&quot;</span></span>
<span class="line"><span>    @close=&quot;closeForm&quot;</span></span>
<span class="line"><span>  /&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import { Form } from &#39;/@/components/index&#39;;</span></span>
<span class="line"><span>import { RoleForm } from &#39;./module/roleForm&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 数据</span></span>
<span class="line"><span>const state = reactive({</span></span>
<span class="line"><span>  // 新增/编辑</span></span>
<span class="line"><span>  form: new RoleForm()</span></span>
<span class="line"><span>    .createColumns(&#39;enterpriseName&#39;, &#39;企业名称&#39;, &#39;input&#39;, &#39;无内容&#39;, { span: 24, rule: true, autosize: { minRows: 3 } })</span></span>
<span class="line"><span>    .createColumns(&#39;type&#39;, &#39;企业类型&#39;, &#39;select&#39;, &#39;企业类型&#39;, {</span></span>
<span class="line"><span>      span: 24,</span></span>
<span class="line"><span>      rule: true,</span></span>
<span class="line"><span>      filterable: true,</span></span>
<span class="line"><span>      options: [</span></span>
<span class="line"><span>        { label: &#39;在线&#39;, value: 1, original: undefined },</span></span>
<span class="line"><span>        { label: &#39;离线&#39;, value: 0, original: undefined },</span></span>
<span class="line"><span>      ],</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>    .createColumns(&#39;unifiedSocialCreditCode&#39;, &#39;统一社会信用代码&#39;, &#39;input&#39;, &#39;统一社会信用代码&#39;, { span: 24, rule: true })</span></span>
<span class="line"><span>    .createColumns(&#39;contact&#39;, &#39;联系人&#39;, &#39;input&#39;, &#39;联系人&#39;, { span: 24, rule: true })</span></span>
<span class="line"><span>    .createColumns(&#39;contactPhone&#39;, &#39;联系人电话&#39;, &#39;input&#39;, &#39;电话&#39;, { span: 24, rule: true })</span></span>
<span class="line"><span>    .createColumns(&#39;email&#39;, &#39;邮箱&#39;, &#39;input&#39;, &#39;邮箱&#39;, { span: 24, rule: true })</span></span>
<span class="line"><span>    .createColumns(&#39;disabledFlag&#39;, &#39;状态&#39;, &#39;select&#39;, &#39;邮箱&#39;, {</span></span>
<span class="line"><span>      span: 24,</span></span>
<span class="line"><span>      rule: true,</span></span>
<span class="line"><span>      options: [</span></span>
<span class="line"><span>        { label: &#39;在线&#39;, value: 1, original: undefined },</span></span>
<span class="line"><span>        { label: &#39;离线&#39;, value: 0, original: undefined },</span></span>
<span class="line"><span>      ],</span></span>
<span class="line"><span>    }) </span></span>
<span class="line"><span>    .createColumns(&#39;upload&#39;, &#39;图片上传&#39;, &#39;ZlSingleUpload&#39;, &#39;启动高拍仪&#39;, { span: 24, rule: true })  </span></span>
<span class="line"><span>    .createColumns(&#39;uploads&#39;, &#39;批量上传&#39;, &#39;ZlFileListUpload&#39;, &#39;批量上传&#39;, { span: 24, rule: true })</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span>const { form } = toRefs(state);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//初始化 </span></span>
<span class="line"><span>// 监听是否打开表单</span></span>
<span class="line"><span>watch(</span></span>
<span class="line"><span>  () =&gt; props.visible,</span></span>
<span class="line"><span>  async (nl, ol) =&gt; {</span></span>
<span class="line"><span>    if (!nl) return state.form.close();</span></span>
<span class="line"><span>    console.log(&#39;nl&#39;, props.formConfig);</span></span>
<span class="line"><span>    // 设置表格</span></span>
<span class="line"><span>    state.form.open(props.formConfig.title, props.formConfig.type, {</span></span>
<span class="line"><span>      formData: props.formConfig.formData,</span></span>
<span class="line"><span>      showDelete: props.formConfig.showDelete,</span></span>
<span class="line"><span>      showSubmit: props.formConfig.showSubmit,</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* #region *************************************************************** 表单操作 **************************************************************  */</span></span>
<span class="line"><span>const submitForm = () =&gt; {</span></span>
<span class="line"><span>  let result: any;</span></span>
<span class="line"><span>  result = state.form.add(state.form.formData!);</span></span>
<span class="line"><span>  if (result) emit(&#39;submit&#39;);</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>const closeForm = () =&gt; {</span></span>
<span class="line"><span>  emit(&#39;submit&#39;);</span></span>
<span class="line"><span>};</span></span></code></pre></div><h3 id="表单参数" tabindex="-1">表单参数 <a class="header-anchor" href="#表单参数" aria-label="Permalink to &quot;表单参数&quot;">​</a></h3><table><thead><tr><th>属性名</th><th>说明</th><th>类型</th></tr></thead><tbody><tr><td>formID</td><td>表单ID</td><td>String</td></tr><tr><td>visible</td><td>是否打开表格</td><td>Boolean</td></tr><tr><td>zlvalue</td><td>表格数据</td><td>Object</td></tr><tr><td>menuData</td><td>待切换的表格</td><td>Array</td></tr><tr><td>width</td><td>表格宽度</td><td>Number</td></tr><tr><td>labelWidth</td><td>label的长度</td><td>String</td></tr><tr><td>rowGutter</td><td>行宽</td><td>Number</td></tr><tr><td>formPadding</td><td>表单行的Padding</td><td>String</td></tr><tr><td>showDelete</td><td>是否展示删除按钮</td><td>Boolean</td></tr><tr><td>deleteContent</td><td>删除按钮展示</td><td>String</td></tr><tr><td>deleteDetail</td><td>删除确认框中间提示的内容</td><td>String</td></tr><tr><td>canEsc</td><td>是否能够通过ESC关闭</td><td>Boolean</td></tr><tr><td>submitContent</td><td>提交按钮的内容</td><td>String</td></tr><tr><td>submitDisabled</td><td>提交按钮禁用</td><td>Boolean</td></tr><tr><td>closeContent</td><td>提交按钮的内容</td><td>String</td></tr><tr><td>change</td><td>刷新</td><td>Boolean</td></tr></tbody></table><h2 id="表格组件" tabindex="-1">表格组件 <a class="header-anchor" href="#表格组件" aria-label="Permalink to &quot;表格组件&quot;">​</a></h2><h3 id="文件结构-1" tabindex="-1">文件结构 <a class="header-anchor" href="#文件结构-1" aria-label="Permalink to &quot;文件结构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>├─ components</span></span>
<span class="line"><span>│  ├─ table         </span></span>
<span class="line"><span>│  │  │ table.vue   表格组件</span></span>
<span class="line"><span>│  │  │ model.ts    封装的表格方法</span></span>
<span class="line"><span>│  │  └─ index.ts   入口文件</span></span></code></pre></div><h3 id="表格示例" tabindex="-1">表格示例 <a class="header-anchor" href="#表格示例" aria-label="Permalink to &quot;表格示例&quot;">​</a></h3><ul><li>在module文件夹创建对应表格实例,根据业务编写对应的方法</li><li>引入并创建表格实例</li><li>根据业务调用实例中的方法</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>module </span></span>
<span class="line"><span>import * as Api from &#39;/@/api&#39;;</span></span>
<span class="line"><span>import * as Utils from &#39;/@/utils&#39;;</span></span>
<span class="line"><span>import { Table } from &#39;/@/components&#39;;</span></span>
<span class="line"><span>import { ElMessage } from &#39;element-plus&#39;;</span></span>
<span class="line"><span>/* #region ********************************** 人员管理展示 ****************************************** */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 角色管理实例</span></span>
<span class="line"><span>export class ShowRoleList {</span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>   * 企业名称</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span>  enterpriseName?: string;</span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>     * 统一社会信用代码</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>  unifiedSocialCreditCode?: string;</span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>     * 企业类型</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>  type?: string;</span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>   * 联系人</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span>  contact?: string</span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>     * 联系人电话</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>  contactPhone?: Number</span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>     * 邮箱</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>  email?: string</span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>     * 状态</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>  disabledFlag?: boolean</span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>     * 创建人</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>  createUserName?: string</span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>     * 创建时间</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>  createTime?: string</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  constructor(item?: Api.RoleApi.QueryRoleListReq) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (item) for (const key in this) this[key] = Utils.DataTools.NewMap.ConstructorObjDefault(this, item);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>export class roleList extends Table.ZlVXETableData&lt;ShowRoleList&gt; {</span></span>
<span class="line"><span>  constructor() { super(); }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // 获取查询参数</span></span>
<span class="line"><span>  search(params: any, isReset?: boolean): roleList {</span></span>
<span class="line"><span>    this.searchTable?.getSearch(params, isReset);</span></span>
<span class="line"><span>    return this;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // 搜索</span></span>
<span class="line"><span>  async query(): Promise&lt;boolean&gt; {</span></span>
<span class="line"><span>    this.searchTable.loading = true;</span></span>
<span class="line"><span>    let params = new Api.RoleApi.QueryRoleListReq(this.searchTable);</span></span>
<span class="line"><span>    params.pageNum = 1;</span></span>
<span class="line"><span>    const res = await Api.RoleApi.QueryRoleList(params);</span></span>
<span class="line"><span>    const { code, data, msg } = res;</span></span>
<span class="line"><span>    if (code === 0) {</span></span>
<span class="line"><span>      data.list as Api.RoleApi.RoleList[];</span></span>
<span class="line"><span>      this.tableData = data.list;</span></span>
<span class="line"><span>      this.count = data.total || 0;</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>      ElMessage.error(msg);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return true;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>views </span></span>
<span class="line"><span> &lt;Table.Table :zlvalue=&quot;{ ...table, ...tableConfig }&quot; :showSearch=&quot;true&quot; :allSelect=&quot;true&quot; @getSearch=&quot;queryData&quot;&gt;</span></span>
<span class="line"><span>    &lt;template #left&gt;</span></span>
<span class="line"><span>      &lt;div class=&quot;default&quot;&gt;</span></span>
<span class="line"><span>        &lt;div class=&quot;flex-center&quot;&gt;</span></span>
<span class="line"><span>          &lt;ZlTag style=&quot;margin-right: 12px&quot; tagType=&quot;button&quot; type=&quot;search&quot; effect=&quot;light&quot; size=&quot;small&quot; @click=&quot;addRole&quot;</span></span>
<span class="line"><span>            &gt;&lt;el-icon style=&quot;margin-right: 6px&quot;&gt;</span></span>
<span class="line"><span>              &lt;el-icon&gt;&lt;Plus /&gt;&lt;/el-icon&gt; &lt;/el-icon</span></span>
<span class="line"><span>            &gt;新增岗位&lt;/ZlTag</span></span>
<span class="line"><span>          &gt;</span></span>
<span class="line"><span>        &lt;/div&gt;</span></span>
<span class="line"><span>      &lt;/div&gt;</span></span>
<span class="line"><span>    &lt;/template&gt;</span></span>
<span class="line"><span>    &lt;template #showIsChecke=&quot;{ row }&quot;&gt;</span></span>
<span class="line"><span>      &lt;div style=&quot;display: flex; justify-content: flex-start&quot;&gt;</span></span>
<span class="line"><span>        &lt;ZlTag v-if=&quot;row.enterpriseId == &#39;1&#39;&quot; type=&quot;success&quot;&gt;&lt;span class=&quot;successColor&quot;&gt;在线&lt;/span&gt;&lt;/ZlTag&gt;</span></span>
<span class="line"><span>        &lt;ZlTag v-if=&quot;row.enterpriseId == &#39;2&#39;&quot; type=&quot;danger&quot;&gt;&lt;span class=&quot;dangerColor&quot;&gt;离线&lt;/span&gt;&lt;/ZlTag&gt;</span></span>
<span class="line"><span>      &lt;/div&gt;</span></span>
<span class="line"><span>    &lt;/template&gt;</span></span>
<span class="line"><span>    &lt;template #operation=&quot;{ row }&quot;&gt;</span></span>
<span class="line"><span>      &lt;el-button link type=&quot;primary&quot; @click=&quot;roleEdit(row)&quot;&gt;编辑&lt;/el-button&gt;</span></span>
<span class="line"><span>      &lt;el-button link type=&quot;danger&quot; @click=&quot;roleDel(row)&quot;&gt;删除&lt;/el-button&gt;</span></span>
<span class="line"><span>    &lt;/template&gt;</span></span>
<span class="line"><span>  &lt;/Table.Table&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const state = reactive({</span></span>
<span class="line"><span>  tableConfig: new Table.ZlVXETable(&#39;index&#39;, &#39;roleIndex&#39;)</span></span>
<span class="line"><span>    .createColumns(&#39;enterpriseName&#39;, &#39;企业名称&#39;, &#39;180&#39;, { searchType: &#39;input&#39; })</span></span>
<span class="line"><span>    .createColumns(&#39;unifiedSocialCreditCode&#39;, &#39;统一社会信用代码&#39;, &#39;170&#39;)</span></span>
<span class="line"><span>    .createColumns(&#39;type&#39;, &#39;企业类型&#39;, &#39;100&#39;)</span></span>
<span class="line"><span>    .createColumns(&#39;contact&#39;, &#39;联系人&#39;, &#39;100&#39;)</span></span>
<span class="line"><span>    .createColumns(&#39;contactPhone&#39;, &#39;联系人电话&#39;, &#39;100&#39;)</span></span>
<span class="line"><span>    .createColumns(&#39;email&#39;, &#39;邮箱&#39;, &#39;100&#39;)</span></span>
<span class="line"><span>    .createColumns(&#39;disabledFlag&#39;, &#39;状态&#39;, &#39;100&#39;, {</span></span>
<span class="line"><span>      slots: { default: &#39;showIsChecke&#39; },</span></span>
<span class="line"><span>      searchField: &#39;isCheckList&#39;,</span></span>
<span class="line"><span>      options: [</span></span>
<span class="line"><span>        { name: &#39;在线&#39;, value: &#39;1&#39;, check: true },</span></span>
<span class="line"><span>        { name: &#39;离线&#39;, value: &#39;0&#39;, check: true },</span></span>
<span class="line"><span>      ],</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>    .createColumns(&#39;createUserName&#39;, &#39;创建人&#39;, &#39;100&#39;)</span></span>
<span class="line"><span>    .createColumns(&#39;createTime&#39;, &#39;创建时间&#39;, &#39;100&#39;)</span></span>
<span class="line"><span>    .createColumns(&#39;&#39;, &#39;操作&#39;, &#39;120&#39;, {</span></span>
<span class="line"><span>      slots: { default: &#39;operation&#39; },</span></span>
<span class="line"><span>      fixed: &#39;right&#39;,</span></span>
<span class="line"><span>    }),</span></span>
<span class="line"><span>  table: {} as roleList,</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const { table, tableConfig } = toRefs(state);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 获取list</span></span>
<span class="line"><span>const queryData = async (params?: any, isReset?: boolean) =&gt; {  </span></span>
<span class="line"><span>  state.table.search(params, isReset).query();</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>onMounted(() =&gt; {</span></span>
<span class="line"><span>  state.table = new roleList();</span></span>
<span class="line"><span>  queryData();</span></span>
<span class="line"><span>});</span></span></code></pre></div><h3 id="表格参数" tabindex="-1">表格参数 <a class="header-anchor" href="#表格参数" aria-label="Permalink to &quot;表格参数&quot;">​</a></h3><table><thead><tr><th>属性名</th><th>说明</th><th>类型</th></tr></thead><tbody><tr><td>zlvalue</td><td>表格数据</td><td>Object</td></tr><tr><td>showTable</td><td>是否显示表格</td><td>Boolean</td></tr><tr><td>showSearch</td><td>是否显示搜索区域</td><td>Boolean</td></tr><tr><td>custom</td><td>是否显示列配置图标</td><td>Boolean</td></tr><tr><td>pager</td><td>是否显示分页器</td><td>Boolean</td></tr><tr><td>tools</td><td>是否显示工具条</td><td>Boolean</td></tr><tr><td>more</td><td>是否显示更多按钮</td><td>Boolean</td></tr><tr><td>export</td><td>显示导出</td><td>Boolean</td></tr><tr><td>import</td><td>显示导入</td><td>Boolean</td></tr><tr><td>exportDisabled</td><td>禁用导出</td><td>Boolean</td></tr><tr><td>importDisabled</td><td>禁用导出</td><td>Boolean</td></tr><tr><td>pageSize</td><td>分页器的初始数据</td><td>Array</td></tr><tr><td>highLightFirst</td><td>是否进来高亮第一行</td><td>Boolean</td></tr><tr><td>getHeader</td><td>是否加载Header</td><td>Boolean</td></tr><tr><td>reset</td><td>是否重置</td><td>Boolean</td></tr><tr><td>refresh</td><td>刷新</td><td>Boolean</td></tr><tr><td>setSearchValue</td><td>是否修改某个搜索参数</td><td>Object</td></tr><tr><td>rowConfig</td><td>VXE行配置</td><td>Object</td></tr><tr><td>columnConfig</td><td>VXE列配置</td><td>Object</td></tr><tr><td>treeConfig</td><td>VXE树配置</td><td>Object</td></tr><tr><td>exportOut</td><td>监听导入</td><td>Boolean</td></tr><tr><td>getTableColumns</td><td>是否加载的时候读取排序</td><td>Boolean</td></tr><tr><td>merge</td><td>合并行的配置</td><td>Object</td></tr><tr><td>empty</td><td>没有数据的文字</td><td>String</td></tr><tr><td>showFooter</td><td>显示合计栏</td><td>Boolean</td></tr><tr><td>footerNumber</td><td>合计栏，合计显示在哪一列</td><td>Number</td></tr><tr><td>canDrop</td><td>能否拖动列</td><td>Boolean</td></tr><tr><td>canWidth</td><td>能否拖动宽度</td><td>Boolean</td></tr><tr><td>haveMenu</td><td>是否带有menu，左上角的圆角干掉</td><td>Boolean</td></tr><tr><td>mergeCells</td><td>合并规则</td><td>Array</td></tr><tr><td>tableID</td><td>tableID</td><td>String</td></tr><tr><td>topPosition</td><td>是否搜索悬浮</td><td>Boolean</td></tr><tr><td>allSelect</td><td>多选框是否全选</td><td>Boolean</td></tr><tr><td>showSearchRight</td><td>是否显示右边的搜索操作按钮</td><td>Boolean</td></tr></tbody></table>`,56),t=[l];function i(o,c,r,d,u,m){return a(),n("div",null,t)}const b=s(e,[["render",i]]);export{g as __pageData,b as default};
