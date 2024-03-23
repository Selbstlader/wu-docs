---
prev:
  text: 'HTML'
  link: '/interview/html'
next:
  text: 'JavaScript'
  link: '/interview/javascript'
---

# css

## 盒子模型

**IE盒子模型  border-box**

IE盒模型：属性width，height包含content、border和padding，指的是content+padding+border。

**W3C盒子模型  content-box** 

W3C标准盒模型：属性width，height只包含内容content，不包含border和paddin

## ::before 和:after 中双冒号和单冒号有什么区别

在css3中使用单冒号来表示伪类，用双冒号来表示伪元素。但是为了兼容已有的伪元素的写法，在一些浏览器中也可以使用单冒号来表示伪元素。

伪类一般匹配的是元素的一些特殊状态，如hover、link等，而伪元素一般匹配的特殊的位置，比如after、before等

## 定位

### absolute

absolute定位的元素，是相对于它的第一个position值不为static的祖先元素的paddingbox来进行定位的。这句话我们可以这样来理解，我们首先需要找到绝对定位元素的一个position的值不为static的祖先元素，然后相对于这个祖先元素的paddingbox来定位，也就是说在计算定位距离的时候，padding的值也要算进去。

### relative

生成相对定位的元素，相对于其元素本身所在正常位置进行定位。

### fixed（老IE不支持）

生成绝对定位的元素，相对于浏览器窗口进行定位。

### static

默认值。没有定位，元素出现在正常的流中（忽略top,bottom,left,right,z-index声明）。

### inherit

规定从父元素继承position属性的值。

## CSS3 有哪些新特性

1. 新增各种CSS选择器    （:not(.input)：所有class不是“input”的节点）
2. 圆角        （border-radius:8px）
3. 多列布局    （multi-columnlayout）
4. 阴影和反射    （Shadow\Reflect）
5. 文字特效        （text-shadow）
6. 文字渲染        （Text-decoration）
7. 线性渐变        （gradient）
8. 旋转            （transform）
9. 缩放，定位，倾斜，动画，多背景
10. 例如：transform:\scale(0.85,0.90)\translate(0px,-30px)\skew(-9deg,0deg)\Animation

## width:auto 和 width:100%的区别

width:100%会使元素box的宽度等于父元素的contentbox的宽度。

width:auto会使元素撑满整个父元素，margin、border、padding、content区域会自动分配水平空间。

## 清除浮动

1.  clear:both
2.  overflow:hidden
3.  after伪元素清除浮动
4.  before和after双伪元素清除浮动
5.  父级div定义 height
