---
next:
  text: 'CSS'
  link: '/interview/css'
---

# HTML

## src和href区别

1. href标识超文本引用，用在link和a等元素上，href是引用和页面关联，是在当前元素和引用资源之间建立联系。
2. src表示引用资源，表示替换当前元素，用在img，script，iframe上，src是页面内容不可缺少的一部分。

## link和@import的区别

1. link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS。
2. link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载。
3. link是XHTML标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。
4. link支持使用Javascript控制DOM去改变样式；而@import不支持。

## meta标签

1. `charset`，用来描述HTML文档的编码类型
2. `keywords`，页面关键词
3. `description`，页面描述
4. `refresh`，页面重定向和刷新
5. `viewport`，适配移动端，可以控制视口的大小和比例

## html5

1. 语义化标签：header、footer、section、nav、aside、article
2. 增强型表单：input 的多个 type
3. 新增表单元素：datalist、keygen、output
4. 新增表单属性：placeholder、required、min 和 max
5. 音频视频：audio、video
6. canvas
7. 地理定位
8. 拖拽
9. SVG
10. 本地存储：localStorage - 没有时间限制的数据存储；sessionStorage - 针对一个 session 的数据存储，当用户关闭浏览器窗口后，数据会被删除
11. 新事件：onresize、ondrag、onscroll、onmousewheel、onerror、onplay、onpause
12. WebSocket：单个 TCP 连接上进行全双工通讯的协议

## sessionStorage 、localStorage和 cookie之间的区别

### 共同点：都是保存在浏览器端，且同源的

### 区别：

1.  cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递。而sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下。
2.  存储大小限制也不同，cookie数据不能超过4k，同时因为每次http请求都会携带cookie，所以cookie只适合保存很小的数据，如会话标识。sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。
3.  数据有效期不同，sessionStorage：仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持；localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。
4.  作用域不同，sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面；localStorage 在所有同源窗口中都是共享的；cookie也是在所有同源窗口中都是共享的。

## 渐进增强与优雅降级

渐进增强：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进，达到更好的用户体验。

优雅降级：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。

## iframe的优缺点

iframe 元素会创建包含另外一个文档的内联框架（即行内框架）。

### 优点：

1. 可以用来加载速度较慢的内容（如广告）。
2. 可以使脚本并行下载。
3. 可以实现跨子域tongxin

### 缺点：

1. iframe 会阻塞主页面的 onload 事件。
2. 无法被一些搜索引擎索识别。
3. 会产生很多页面，不容易管理。

## BFC

BFC块级格式化上下文。BFC是一个完全独立的空间（布局环境），让空间里的子元素不会影响到外面的布局。

1. position:absolute或fixed；
2. float:left/right;
3. overflow:hidden; 
4. display:inline-block；

## 严格模式与混杂模式

1. 严格模式：以浏览器支持的最高标准运行。
2. 混杂模式：页面以宽松向下兼容的方式显示，模拟老式浏览器的行为。

## Canvas 和 SVG 有什么区别

Canvas 和 SVG 都允许您在浏览器中创建图形，但是它们在根本上是不同的。

### Canvas

1. 通过 Javascript 来绘制 2D 图形。
2. 是逐像素进行渲染的。
3. 其位置发生改变，会重新进行绘制。

### SVG

1. 一种使用 XML 描述的 2D 图形的语言。
2. SVG 基于 XML 意味着，SVG DOM 中的每个元素都是可用的，可以为某个元素附加 Javascript 事件处理器。
3. 在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。

### 比较

**Canvas**

1. 依赖分辨率
2. 不支持事件处理器
3. 弱的文本渲染能力
4. 能够以 .png 或 .jpg 格式保存结果图像
5. 最适合图像密集型的游戏，其中的许多对象会被频繁重绘

**SVG**

1. 不依赖分辨率
2. 支持事件处理器
3. 最适合带有大型渲染区域的应用程序（比如谷歌地图）
4. 复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快）
5. 不适合游戏应用

### Viewport 属性值

1. width 设置 layout viewport 的宽度，为一个正整数，或字符串"width-device"
2. initial-scale 设置页面的初始缩放值，为一个数字，可以带小数
3. minimum-scale 允许用户的最小缩放值，为一个数字，可以带小数
4. maximum-scale 允许用户的最大缩放值，为一个数字，可以带小数
5. height 设置 layout viewport 的高度，这个属性对我们并不重要，很少使用
6. user-scalable 是否允许用户进行缩放，值为"no"或"yes", no 代表不允许，yes 代表允许这些属性可以同时使用，也可以单独使用或混合使用，多个属性同时使用时用逗号隔开就行了。

## 重排与重绘

**重排：** 渲染对象在创建完成并添加到渲染树时，并不包含位置和大小信息。计算这些值的过程称为布局或重排。"重绘"不一定需要"重排"，比如改变某个网页元素的颜色，就只会触发"重绘"，不会触发"重排"，因为布局没有改变。 但是，"重排"必然导致"重绘"，比如改变一个网页元素的位置，就会同时触发"重排"和"重绘"，因为布局改变了。

**重绘：** 重绘是一个元素外观的改变所触发的浏览器行为，例如改变outline、背景色等属性。浏览器会根据元素的新属性重新绘制， 使元素呈现新的外观。重绘不会带来重新布局，所以并不一定伴随重排。

