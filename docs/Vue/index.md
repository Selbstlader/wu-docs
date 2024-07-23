## 基于SmatrAdmin的Vue.js后台管理系统

## 项目目录

```
src                               源码目录
├─ api                              所有api接口，按照`business、system、support`拆分子目录
├─ assets                           静态资源，images, icons, styles等
├─ components                       公用组件，按照`business、system、support`拆分子目录
├─ config                           配置信息（项目配置）
├─ constants                        常量信息，项目所有Enum, 全局常量等，按照`business、system、support`拆分子目录
├─ directives                       自定义指令
├─ i18n                             国际化
├─ lib                              外部引用的插件存放及修改文件
├─ plugins                          插件，全局使用
├─ router                           路由，统一管理
├─ layout                           外层布局      
├─ store                            pinia状态, 按照`business、system、support`拆分子目录
├─ theme                            自定义样式主题
├─ utils                            工具类
├─ views                            视图目录，按照`business、system、support`拆分子目录
|   ├─ business                     业务目录
|   ├─ support                      支撑目录
|   ├─ system                       系统目录
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
├─ cookie-util.ts 操作cookie
├─ local-util.ts 操作localStorage
├─ str-util.ts 字符串操作
```

## 布局

```
├─ layout/index.vue    菜单
├─ layout/smart-header.vue 外层页面顶部
├─ layout/smart-layout.vue   二级菜单 里面有两种菜单模式，可以通过修改config中的layout的参数实现切换
├─ layout/smart-side-expand-layout.vue  左侧展开菜单模式 
├─ layout/smart-side-layout.vue  左侧菜单模式
├─ layout/components/side-expand-menu/index 展开菜单 
├─ layout/components/side-expand-menu/recursion-menu.vue  递归展示菜单
├─ layout/components/header-user-space/header-avatar 头像信息集成了刷新权限，修改密码，退出登录 
├─ layout/components/header-user-space/header-setting 用户设置模块,图形化修改系统配置 
├─ layout/components/menu-location-breadcrumb 面包屑
```

## 主题 theme

里面集成了antd原有样式替换，设置了大部分常用颜色和字体样式
如果需要自己添加自定义样式，按照规范在theme/color文件夹中添加引用即可

## 枚举 constants
项目集成了常用枚举，按照业务模块拆分
```
├─ constants/index.ts 枚举入口 
├─ constants/common-const.ts 常用常量 包括但不限于页码、登录路径、404路径、支持扩展
├─ constants/layout-const.ts 布局格式
├─ constants/local-storage-key-const.ts 常用key
├─ constants/regular-const.ts 常用正则
```

## 静态资源  assets
```
├─ assets/images 图片资源
```

## plugins 插件
```
├─ plugins/privilege-plugin.ts 权限插件
├─ plugins/smart-enums-plugin.ts 枚举插件
```

## lib 第三方插件
```
├─ lib/axios.ts 框架自带的封装ajax请求 是否需要改造待定
├─ lib/default-time-ranges.ts 时间选择框快捷选择
├─ lib/encrypt.ts 加解密
├─ lib/smart-wartermark.ts 水印
```

## 网络请求
* 项目封装了Axios来做网络请求，包括错误处理、取消请求等功能
* 接口配置化处理 结合.env 配置文件使用
### 目录结构
```
├─ api
│  ├─ common
│  │  │ commonInfo.ts  公共信息
│  │  │ commonReq.ts 公共请求
│  │  │ commonRes.ts  公共返回
│  │  │ commonSave.ts 公共保存
│  │  │ commonTableSearch.ts 表格查询
│  │  │ ocr.ts OCR识别
│  │  └─ index.ts 模块入口 根据模块拆分 可以直接拓展
│  ├─ api.ts    封装request
│  ├─ axios.ts  封装axios
│  ├─ index.ts  api入口 配置接口地址
│  ├─ pending.ts 
```
### 配置
接口地址是通过环境变量加载的，可以通过项目根目录下的.env.***文件中修改VITE_APP_BASE_API，而不是在此处直接修改。
```
// 接口地址
export const Host = import.meta.env.VITE_APP_BASE_API;
// COS地址
export const COSHost = import.meta.env.VITE_APP_COS_URL;
// COS储存桶
export const Bucket = 'yingjia-1304963394';
// 高拍仪地址
export const CameraHost = 'http://127.0.0.1:38088/';
```
### 示例
写一个role列表查询
* api-> 对应模块的文件夹 ->role.ts
* 在role.ts中引入封装后的axios
* 编写请求函数
* 给请求函数的入参和返回值加上TS类型限制
```
// 方法引入
import * as Api from '..'
import * as Utils from '../../utils'
import { postRequest } from '../../lib/axios';

/* #region *************************************************************** 角色管理******************************************************************  */
// 类型限制
export interface RoleList extends Api.Common.CommonTableSearch {
   /**
    * 企业名称
    */
   enterpriseName?: string;
   /**
      * 统一社会信用代码
      */
   unifiedSocialCreditCode?: string;
   /**
      * 企业类型
      */
   type?: string;
   /**
    * 联系人
    */
   contact?: string
   /**
      * 联系人电话
      */
   contactPhone?: Number
   /**
      * 邮箱
      */
   email?: string
   /**
      * 状态
      */
   disabledFlag?: boolean
   /**
      * 创建人
      */
   createUserName?: string
   /**
      * 创建时间
      */
   createTime?: string
}
/* #endregion */

/* #region *************************************************************** 查询角色管理列表 ************************************************************  */
// 请求 request
export class QueryRoleListReq extends Api.Common.CommonReq {
   constructor(param: { [key: string]: any }) {
      super(param)
      Utils.DataTools.NewMap.ConstructorObjDefault(this, param);
   }
}

// 返回 response
export interface QueryRoleListRes extends Api.Common.HttpResponse {
   RoleList?: RoleList[];                   // 角色管理列表
}

// 接口地址 api
// 查询角色列表
export const QueryRoleList = async (param: QueryRoleListReq): Promise<QueryRoleListRes> => {
   return postRequest('/oa/enterprise/page/query', param);
}
export const QueryAddRole = async (param: any): Promise<QueryRoleListRes> => {
   return postRequest('/oa/enterprise/create', param);
}
```
### 使用api函数
* 在对应的views页面中引入api函数
* 创建对应的model文件，编写对应的class实例和方法
* views页面中引入对应的方法
```
model.ts
import * as Api from '/@/api';
import * as Utils from '/@/utils';
import { Table } from '/@/components';
import { ElMessage } from 'element-plus';
/* #region ********************************** 人员管理展示 ****************************************** */

// 角色管理实例
export class ShowRoleList {
  /**
   * 企业名称
   */
  enterpriseName?: string;
  /**
     * 统一社会信用代码
     */
  unifiedSocialCreditCode?: string;
  /**
     * 企业类型
     */
  type?: string;
  /**
   * 联系人
   */
  contact?: string
  /**
     * 联系人电话
     */
  contactPhone?: Number
  /**
     * 邮箱
     */
  email?: string
  /**
     * 状态
     */
  disabledFlag?: boolean
  /**
     * 创建人
     */
  createUserName?: string
  /**
     * 创建时间
     */
  createTime?: string

  constructor(item?: Api.RoleApi.QueryRoleListReq) {
    if (item) for (const key in this) this[key] = Utils.DataTools.NewMap.ConstructorObjDefault(this, item);
  }
}
export class roleList extends Table.ZlVXETableData<ShowRoleList> {
  constructor() { super(); }
  // 获取查询参数
  search(params: any, isReset?: boolean): roleList {
    this.searchTable?.getSearch(params, isReset);
    return this;
  }
  // 搜索 处理数据 根据具体业务操作
  async query(): Promise<boolean> {
    this.searchTable.loading = true;
    let params = new Api.RoleApi.QueryRoleListReq(this.searchTable);
    params.pageNum = 1;
    const res = await Api.RoleApi.QueryRoleList(params);
    const { code, data, msg } = res;
    if (code === 0) {
      data.list as Api.RoleApi.RoleList[];
      this.tableData = data.list;
      this.count = data.total || 0;
    } else {
      ElMessage.error(msg);
    }
    return true;
  }

}
```
```
views页面 根据业务进行具体操作
import { roleList } from '/@/views/system/employee/role/model';

const queryData = async (params?: any, isReset?: boolean) => {
  state.table.search(params, isReset).query();
};

// vue生命周期调用
onMounted(() => {
  state.table = new roleList();
  queryData({ pageNum: 1 });
});
```
## 组件 components
## 表单组件
### 文件结构
```
├─ components
│  ├─ form          
|  |  | module      公共表单类型
│  │  │ form.vue    表单组件
│  │  │ model.ts    封装的表单方法
│  │  └─ index.ts   入口文件
```
### 表单示例

* 
* 在module文件夹创建对应表单实例
* 引入表单组件 
* 创建表单实例
* 根据业务编写对应的方法
```
module
import * as Api from '/@/api';
import { Form } from '/@/components/index'

/* #region ************************************************************* 企业管理单数据*************************************************************  */
// 表单实例
export class RoleFormData {
  enterpriseName?: string;
  type?: string;
  contact?: string;
  contactPhone?: string;
  unifiedSocialCreditCode?: string;
  email?: string;
  // 启用状态
  disabledFlag?: boolean;
  constructor(item?: any) {
    // Utils.DataTools.NewMap.ConstructorObjDefault(this, item);
    // let cySlot = [] as any
    // if (item.courseName) cySlot[0] = item.courseName
    // if (item.courseId) cySlot[1] = item.courseId+''
    // this.cySlot = cySlot
    // console.log('cySlot', cySlot, item)
  }
}
// 根据业务编写的方法 这里已新增为例
export class RoleForm extends Form.ZlForm<RoleFormData> {
  constructor() { super() }
  async add(params: RoleFormData) {
    return new Promise((resolve, reject) => {
      Api.RoleApi.QueryAddRole(params).then(res => {
        if (res.code === 0) {
          resolve(true);
        }
      })
    })
  }
}
/* #endregion */
```

```
views

<RoleForm :visible="form.visible" :formConfig="form" @submit="submit" />

import { FormData } from '/@/components/form/module/index';
const state = reactive({
  form: {
    title: '企业类型',
    visible: false,
    type: '',
    formData: {} as any,
    showSubmit: true,
    showDelete: false,
  } as FormData,
});

const { form } = toRefs(state);

const addRole = () => {
  state.form.visible = true;
};

RoleForm 
 <Form.Form
    :visible="form.visible"
    labelWidth="140px"
    :zlvalue="form"
    :width="900"
    :showDelete="form.showDelete"
    @submit="submitForm"
    @close="closeForm"
  />

import { Form } from '/@/components/index';
import { RoleForm } from './module/roleForm';

// 数据
const state = reactive({
  // 新增/编辑
  form: new RoleForm()
    .createColumns('enterpriseName', '企业名称', 'input', '无内容', { span: 24, rule: true, autosize: { minRows: 3 } })
    .createColumns('type', '企业类型', 'select', '企业类型', {
      span: 24,
      rule: true,
      filterable: true,
      options: [
        { label: '在线', value: 1, original: undefined },
        { label: '离线', value: 0, original: undefined },
      ],
    })
    .createColumns('unifiedSocialCreditCode', '统一社会信用代码', 'input', '统一社会信用代码', { span: 24, rule: true })
    .createColumns('contact', '联系人', 'input', '联系人', { span: 24, rule: true })
    .createColumns('contactPhone', '联系人电话', 'input', '电话', { span: 24, rule: true })
    .createColumns('email', '邮箱', 'input', '邮箱', { span: 24, rule: true })
    .createColumns('disabledFlag', '状态', 'select', '邮箱', {
      span: 24,
      rule: true,
      options: [
        { label: '在线', value: 1, original: undefined },
        { label: '离线', value: 0, original: undefined },
      ],
    }) 
    .createColumns('upload', '图片上传', 'ZlSingleUpload', '启动高拍仪', { span: 24, rule: true })  
    .createColumns('uploads', '批量上传', 'ZlFileListUpload', '批量上传', { span: 24, rule: true })
});
const { form } = toRefs(state);

//初始化 
// 监听是否打开表单
watch(
  () => props.visible,
  async (nl, ol) => {
    if (!nl) return state.form.close();
    console.log('nl', props.formConfig);
    // 设置表格
    state.form.open(props.formConfig.title, props.formConfig.type, {
      formData: props.formConfig.formData,
      showDelete: props.formConfig.showDelete,
      showSubmit: props.formConfig.showSubmit,
    });
  }
);

/* #region *************************************************************** 表单操作 **************************************************************  */
const submitForm = () => {
  let result: any;
  result = state.form.add(state.form.formData!);
  if (result) emit('submit');
};
const closeForm = () => {
  emit('submit');
};

```
### 表单参数
| 属性名 | 说明 | 类型 |
| --- | --- | --- |
| formID | 表单ID | String |
| visible | 是否打开表格 | Boolean |
| zlvalue | 表格数据 | Object |
| menuData | 待切换的表格 | Array |
| width | 表格宽度 | Number |
| labelWidth | label的长度  | String |
| rowGutter | 行宽 | Number |
| formPadding | 表单行的Padding | String |
| showDelete | 是否展示删除按钮 | Boolean |
| deleteContent | 删除按钮展示 | String |
| deleteDetail | 删除确认框中间提示的内容 | String |
| canEsc | 是否能够通过ESC关闭 | Boolean |
| submitContent | 提交按钮的内容 | String |
| submitDisabled | 提交按钮禁用 | Boolean |
| closeContent | 提交按钮的内容 | String |
| change | 刷新 | Boolean |


## 表格组件
### 文件结构
```
├─ components
│  ├─ table         
│  │  │ table.vue   表格组件
│  │  │ model.ts    封装的表格方法
│  │  └─ index.ts   入口文件
```
### 表格示例
* 在module文件夹创建对应表格实例,根据业务编写对应的方法
* 引入并创建表格实例
* 根据业务调用实例中的方法
```
module 
import * as Api from '/@/api';
import * as Utils from '/@/utils';
import { Table } from '/@/components';
import { ElMessage } from 'element-plus';
/* #region ********************************** 人员管理展示 ****************************************** */

// 角色管理实例
export class ShowRoleList {
  /**
   * 企业名称
   */
  enterpriseName?: string;
  /**
     * 统一社会信用代码
     */
  unifiedSocialCreditCode?: string;
  /**
     * 企业类型
     */
  type?: string;
  /**
   * 联系人
   */
  contact?: string
  /**
     * 联系人电话
     */
  contactPhone?: Number
  /**
     * 邮箱
     */
  email?: string
  /**
     * 状态
     */
  disabledFlag?: boolean
  /**
     * 创建人
     */
  createUserName?: string
  /**
     * 创建时间
     */
  createTime?: string

  constructor(item?: Api.RoleApi.QueryRoleListReq) {

    if (item) for (const key in this) this[key] = Utils.DataTools.NewMap.ConstructorObjDefault(this, item);
  }
}
export class roleList extends Table.ZlVXETableData<ShowRoleList> {
  constructor() { super(); }

  // 获取查询参数
  search(params: any, isReset?: boolean): roleList {
    this.searchTable?.getSearch(params, isReset);
    return this;
  }
  // 搜索
  async query(): Promise<boolean> {
    this.searchTable.loading = true;
    let params = new Api.RoleApi.QueryRoleListReq(this.searchTable);
    params.pageNum = 1;
    const res = await Api.RoleApi.QueryRoleList(params);
    const { code, data, msg } = res;
    if (code === 0) {
      data.list as Api.RoleApi.RoleList[];
      this.tableData = data.list;
      this.count = data.total || 0;
    } else {
      ElMessage.error(msg);
    }
    return true;
  }
}
```
```
views 
 <Table.Table :zlvalue="{ ...table, ...tableConfig }" :showSearch="true" :allSelect="true" @getSearch="queryData">
    <template #left>
      <div class="default">
        <div class="flex-center">
          <ZlTag style="margin-right: 12px" tagType="button" type="search" effect="light" size="small" @click="addRole"
            ><el-icon style="margin-right: 6px">
              <el-icon><Plus /></el-icon> </el-icon
            >新增岗位</ZlTag
          >
        </div>
      </div>
    </template>
    <template #showIsChecke="{ row }">
      <div style="display: flex; justify-content: flex-start">
        <ZlTag v-if="row.enterpriseId == '1'" type="success"><span class="successColor">在线</span></ZlTag>
        <ZlTag v-if="row.enterpriseId == '2'" type="danger"><span class="dangerColor">离线</span></ZlTag>
      </div>
    </template>
    <template #operation="{ row }">
      <el-button link type="primary" @click="roleEdit(row)">编辑</el-button>
      <el-button link type="danger" @click="roleDel(row)">删除</el-button>
    </template>
  </Table.Table>

const state = reactive({
  tableConfig: new Table.ZlVXETable('index', 'roleIndex')
    .createColumns('enterpriseName', '企业名称', '180', { searchType: 'input' })
    .createColumns('unifiedSocialCreditCode', '统一社会信用代码', '170')
    .createColumns('type', '企业类型', '100')
    .createColumns('contact', '联系人', '100')
    .createColumns('contactPhone', '联系人电话', '100')
    .createColumns('email', '邮箱', '100')
    .createColumns('disabledFlag', '状态', '100', {
      slots: { default: 'showIsChecke' },
      searchField: 'isCheckList',
      options: [
        { name: '在线', value: '1', check: true },
        { name: '离线', value: '0', check: true },
      ],
    })
    .createColumns('createUserName', '创建人', '100')
    .createColumns('createTime', '创建时间', '100')
    .createColumns('', '操作', '120', {
      slots: { default: 'operation' },
      fixed: 'right',
    }),
  table: {} as roleList,
});

const { table, tableConfig } = toRefs(state);

// 获取list
const queryData = async (params?: any, isReset?: boolean) => {  
  state.table.search(params, isReset).query();
};

onMounted(() => {
  state.table = new roleList();
  queryData();
});
```
### 表格参数
| 属性名 | 说明 | 类型 |
| --- | --- | --- |
| zlvalue | 表格数据 | Object |
| showTable | 是否显示表格 | Boolean |
| showSearch | 是否显示搜索区域 | Boolean |
| custom | 是否显示列配置图标 | Boolean |
| pager | 是否显示分页器 | Boolean |
| tools | 是否显示工具条  | Boolean |
| more | 是否显示更多按钮 | Boolean |
| export | 显示导出 | Boolean |
| import | 显示导入 | Boolean |
| exportDisabled | 禁用导出 | Boolean |
| importDisabled | 禁用导出 | Boolean |
| pageSize | 分页器的初始数据 | Array |
| highLightFirst | 是否进来高亮第一行 | Boolean |
| getHeader | 是否加载Header | Boolean |
| reset | 是否重置 | Boolean |
| refresh | 刷新 | Boolean |
| setSearchValue|是否修改某个搜索参数| Object|
| rowConfig|VXE行配置|Object|
| columnConfig| VXE列配置| Object|
| treeConfig| VXE树配置|Object|
| exportOut| 监听导入|Boolean|
| getTableColumns|是否加载的时候读取排序|Boolean|
| merge|合并行的配置| Object|
| empty|没有数据的文字|String|
| showFooter|显示合计栏| Boolean|
| footerNumber|合计栏，合计显示在哪一列 | Number|
| canDrop|能否拖动列|Boolean|
| canWidth|能否拖动宽度|Boolean|
| haveMenu|是否带有menu，左上角的圆角干掉|Boolean|
| mergeCells|合并规则|Array|
| tableID|tableID|String|
| topPosition|是否搜索悬浮|Boolean|
| allSelect|多选框是否全选|Boolean|
| showSearchRight|是否显示右边的搜索操作按钮 | Boolean|