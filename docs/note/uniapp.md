---
prev:
  text: 'Webpack'
  link: '/note/webpack'
next:
  text: 'Ts'
  link: '/note/ts'
---

# Uni-App从入门到实战

## 介绍项目目录和文件作用

1. **pages.json**  文件用来对 uni-app 进行全局配置，决定页面文件的路径、窗口样式、原生的导航栏、底部的原生tabbar 等
2. **manifest.json**  文件是应用的配置文件，用于指定应用的名称、图标、权限等。
3. **App.vue** 是我们的跟组件，所有页面都是在App.vue下进行切换的，是页面入口文件，可以调用应用的生命周期函数。
4. **main.js** 是我们的项目入口文件，主要作用是初始化vue实例并使用需要的插件。
5. **uni.scss** 文件的用途是为了方便整体控制应用的风格。比如按钮颜色、边框风格，uni.scss文件里预置了一批scss变量预置。
6. **unpackage**  就是打包目录，在这里有各个平台的打包文件
7. **pages ** 所有的页面存放目录
8. **static**  静态资源目录，例如图片等
9. **components**  组件存放目录

## 全局配置和页面配置

| 属性                         | 类型     | 默认值   | **描述**                                           |
| ---------------------------- | -------- | -------- | -------------------------------------------------- |
| navigationBarBackgroundColor | HexColor | #F7F7F7  | 导航栏背景颜色（同状态栏背景色）                   |
| navigationBarTextStyle       | String   | white    | 导航栏标题颜色及状态栏前景颜色，仅支持 black/white |
| navigationBarTitleText       | String   |          | 导航栏标题文字内容                                 |
| backgroundColor              | HexColor | \#ffffff | 窗口的背景色                                       |
| backgroundTextStyle          | String   | dark     | 下拉 loading 的样式，仅支持 dark / light           |
| enablePullDownRefresh        | Boolean  | false    | 是否开启下拉刷新                                   |
| onReachBottomDistance        | Number   | 50       | 页面上拉触底事件触发时距页面底部距离，单位只支持px |

## 配置tabbar

如果应用是一个多 tab 应用，可以通过 tabBar 配置项指定 tab 栏的表现，以及 tab 切换时显示的对应页。

**Tips**

- 当设置 position 为 top 时，将不会显示 icon
- tabBar 中的 list 是一个数组，只能配置最少2个、最多5个 tab，tab 按数组的顺序排序。

| **属性**        | **类型** | **必填** | **默认值** | **描述**                                             | **平台差异说明**          |
| --------------- | -------- | -------- | ---------- | ---------------------------------------------------- | ------------------------- |
| color           | HexColor | 是       |            | tab 上的文字默认颜色                                 |                           |
| selectedColor   | HexColor | 是       |            | tab 上的文字选中时的颜色                             |                           |
| backgroundColor | HexColor | 是       |            | tab 的背景色                                         |                           |
| borderStyle     | String   | 否       | black      | tabbar 上边框的颜色，仅支持 black/white              | App 2.3.4+ 支持其他颜色值 |
| list            | Array    | 是       |            | tab 的列表，详见 list 属性说明，最少2个、最多5个 tab |                           |
| position        | String   | 否       | bottom     | 可选值 bottom、top                                   | top 值仅微信小程序支持    |

其中 list 接收一个数组，数组中的每个项都是一个对象，其属性值如下：

| **属性**         | **类型** | **必填** | **说明**                                                     |
| ---------------- | -------- | -------- | ------------------------------------------------------------ |
| pagePath         | String   | 是       | 页面路径，必须在 pages 中先定义                              |
| text             | String   | 是       | tab 上按钮文字，在 5+APP 和 H5 平台为非必填。例如中间可放一个没有文字的+号图标 |
| iconPath         | String   | 否       | 图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px，当 postion 为 top 时，此参数无效，不支持网络图片，不支持字体图标 |
| selectedIconPath | String   | 否       | 选中时的图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px ，当 postion 为 top 时，此参数无效 |

## uni-app中的样式

- rpx 即响应式px，一种根据屏幕宽度自适应的动态单位。以750宽的屏幕为基准，750rpx恰好为屏幕宽度。屏幕变宽，rpx 实际显示效果会等比放大。
- 使用`@import`语句可以导入外联样式表，`@import`后跟需要导入的外联样式表的相对路径，用`;`表示语句结束。
- 支持基本常用的选择器class、id、element等。
- 在 `uni-app` 中不能使用 `*` 选择器。
- `page` 相当于 `body` 节点。
- 定义在 App.vue 中的样式为全局样式，作用于每一个页面。在 pages 目录下 的 vue 文件中定义的样式为局部样式，只作用在对应的页面，并会覆盖 App.vue 中相同的选择器。
- `uni-app` 支持使用字体图标，使用方式与普通 `web` 项目相同，需要注意以下几点：
  - 字体文件小于 40kb，`uni-app` 会自动将其转化为 base64 格式；
  - 字体文件大于等于 40kb， 需开发者自己转换，否则使用将不生效；
  - 字体文件的引用路径推荐使用以 ~@ 开头的绝对路径。

## uni的生命周期

### 应用的生命周期

生命周期的概念：一个对象从创建、运行、销毁的整个过程被成为生命周期。

生命周期函数：在生命周期中每个阶段会伴随着每一个函数的触发，这些函数被称为生命周期函数

`uni-app` 支持如下应用生命周期函数：

| 函数名   | **说明**                                       |
| -------- | ---------------------------------------------- |
| onLaunch | 当`uni-app` 初始化完成时触发（全局只触发一次） |
| onShow   | 当 `uni-app` 启动，或从后台进入前台显示        |
| onHide   | 当 `uni-app` 从前台进入后台                    |
| onError  | 当 `uni-app` 报错时触发                        |

### 页面的生命周期

`uni-app` 支持如下页面生命周期函数：

| 函数名   | **说明**                                                     |
| -------- | ------------------------------------------------------------ |
| onLoad   | 监听页面加载，其参数为上个页面传递的数据，参数类型为Object（用于页面传参） |
| onShow   | 监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面 |
| onReady  | 监听页面初次渲染完成                                         |
| onHide   | 监听页面隐藏                                                 |
| onUnload | 监听页面卸载                                                 |

## 下拉刷新

在uni-app中有两种方式开启下拉刷新

- 需要在 `pages.json` 里，找到的当前页面的pages节点，并在 `style` 选项中开启 `enablePullDownRefresh`
- 通过调用uni.startPullDownRefresh方法来开启下拉刷新

## 监听下拉刷新

通过onPullDownRefresh可以监听到下拉刷新的动作

```js
export default {
  data () {
    return {
      arr: ['前端','java','ui','大数据']
    }
  },
  methods: {
    startPull () {
      uni.startPullDownRefresh()
    }
  },
  onPullDownRefresh () {
    console.log('触发下拉刷新了')
  }
}
```

## 关闭下拉刷新

```js
uni.stopPullDownRefresh()
```

## 上拉加载

通过在pages.json文件中找到当前页面的pages节点下style中配置onReachBottomDistance可以设置距离底部开启加载的距离，默认为50px。

## 网络请求

在uni中可以调用uni.request方法进行请求网络请求

需要注意的是：在小程序中网络相关的 API 在使用前需要配置域名白名单。

```js
export default {
    methods: {
        sendGet () {
            uni.request({
                url: 'http://localhost:8082/api/getlunbo',
                success(res) {
                    console.log(res)
                }
            })
        }
    }
}
```

## 数据缓存

1. **uni.setStorage**
2. **uni.setStorage**
3. **uni.getStorage**
4. **uni.getStorageSync**
5. **uni.removeStorage**
6. **uni.removeStorageSync**

## 上传图片、预览图片

uni.chooseImage方法从本地相册选择图片或使用相机拍照。

```html
<template>
    <view>
        <button @click="chooseImg" type="primary">上传图片</button>
        <view>
            <image v-for="item in imgArr" :src="item" :key="index"></image>
        </view>
    </view>
</template>

<script>
    export default {
        data () {
            return {
                imgArr: []
            }
        },
        methods: {
            chooseImg () {
                uni.chooseImage({
                    count: 9,
                    success: res=>{
                        this.imgArr = res.tempFilePaths
                    }
                })
            }
        }
    }
</script>
```

uni.previewImage预览图片

```html
<template>
	<view>
		<image v-for="item in imgArr" :src="item" @click="previewImg(item)" :key="item"></image>
	</view>
</template>
 
<script>
	export default {
		data () {
			return {
				imgArr: []
			}
		},
		methods: {
            previewImg (current) {
                uni.previewImage({
                    urls: this.imgArr,
                    current
                })
            }
		}
	}
</script>
```

## 条件注释实现跨段兼容

条件编译是用特殊的注释作为标记，在编译时根据这些特殊的注释，将注释里面的代码编译到不同平台。

**写法：**以 #ifdef 加平台标识 开头，以 #endif 结尾。

## uni中的导航跳转

### 利用navigator进行跳转

**跳转到普通页面**

```html
<navigator url="/pages/about/about" hover-class="navigator-hover">
 	<button type="default">跳转到关于页面</button>
</navigator>
```

**跳转到tabbar页面**

```html
<navigator url="/pages/message/message" open-type="switchTab">
  <button type="default">跳转到message页面</button>
</navigator>
```

### 利用编程式导航进行跳转

**利用navigateTo进行导航跳转**

保留当前页面，跳转到应用内的某个页面，使用`uni.navigateBack`可以返回到原页面。

```html
<button type="primary" @click="goAbout">跳转到关于页面</button>

<script>
	export default {
		data () {
			return {
				imgArr: []
			}
		},
		methods: {
            goAbout () {
                uni.navigateTo({
                    url: '/pages/about/about',
                })
            }
		}
	}
</script>
```

**通过switchTab跳转到tabbar页面**

```html
<button type="primary" @click="goMessage">跳转到message页面</button>

<script>
	export default {
		data () {
			return {
				imgArr: []
			}
		},
		methods: {
            goMessage () {
                uni.switchTab({
                    url: '/pages/message/message'
                })
            }
		}
	}
</script>
```

**redirectTo进行跳转**

关闭当前页面，跳转到应用内的某个页面。

```html
<button type="primary" @click="goMessage">跳转到message页面</button>

<script>
	export default {
		data () {
			return {
				imgArr: []
			}
		},
		methods: {
            goMessage () {
                uni.redirectTo({
                    url: '/pages/message/message'
                })
            }
		}
	}
</script>
```

