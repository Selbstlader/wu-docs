---
prev:
  text: 'JavaScript'
  link: '/interview/javascript'
next: false
---

# vue

## vue的优点

1. 轻量级框架
2. 简单易学
3. 双向数据绑定
4. 组件化
5. 视图，数据，结构分离
6. 虚拟DOM
7. 运行速度更快

## SPA单页面优缺点

### 理解

1. SPA（ single page application ）仅在 Web 页面初始化时加载相应的 HTML、JavaScript 和 CSS。
2. 一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转。
3. 页面的变化是利用路由机制实现 HTML 内容的变换，避免页面的重新加载。

### 优点

1. 用户体验好，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染。
2. 减少了不必要的跳转和重复渲染，这样相对减轻了服务器的压力。
3. 前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理。

### 缺点

1. 初次加载耗时多。
2. 不能使用浏览器的前进后退功能，由于单页应用在一个页面中显示所有的内容，所以，无法前进后退。
3. 不利于搜索引擎检索：由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势。。

## SPA首屏加载速度慢的怎么解决

首屏时间（First Contentful Paint），指的是浏览器从响应用户输入网址地址，到首屏内容渲染完成的时间，此时整个网页不一定要全部渲染完成，但需要展示当前视窗需要的内容；

**加载慢的原因**

1. 网络延时问题。
2. 资源文件体积是否过大。
3. 资源是否重复发送请求加载。
4. 加载脚本的时候，渲染内容堵塞。

### 优化

1. 减小入口文件体积。
2. 静态资源本地缓存。
3. UI框架按需加载。
4. 图片资源的压缩。
5. 组件重复打包。
6. 开启GZip压缩。
7. 使用SSR。

## MVVM理解

MVVM 由 Model、View、ViewModel 三部分构成，Model 层代表数据模型，也可以在Model中定义数据修改和操作的业务逻辑；View 代表UI 组件，它负责将数据模型转化成UI 展现出来；ViewModel 是一个同步View 和 Model的对象。

在MVVM架构下，View 和 Model 之间并没有直接的联系，而是通过ViewModel进行交互，Model 和 ViewModel 之间的交互是双向的， 因此View 数据的变化会同步到Model中，而Model 数据的变化也会立即反应到View 上。

ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作DOM， 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。

## Vue数据双向绑定原理

实现mvvm的数据双向绑定，是采用**数据劫持**结合**发布者-订阅者模式**的方式，通过Object.defineProperty()来给各个属性添加setter，getter并劫持监听，在数据变动时发布消息给订阅者，触发相应的监听回调。

## vue响应式原理

什么是响应式，也即是说，数据发生改变的时候，视图会重新渲染，匹配更新为最新的值。
Object.defineProperty 为对象中的每一个属性，设置 get 和 set 方法，每个声明的属性，都会有一个 专属的依赖收集器 subs，当页面使用到 某个属性时，触发 ObjectdefineProperty - get函数，页面的 watcher 就会被 放到 属性的依赖收集器 subs 中，在 数据变化时，通知更新；
当数据改变的时候，会触发Object.defineProperty - set函数，数据会遍历自己的 依赖收集器 subs，逐个通知 watcher，视图开始更新。

## Vue3.x响应式原理

Vue3.x改用Proxy替代Object.defineProperty。因为Proxy可以直接监听对象和数组的变化，并且有多达13种拦截方法。并且作为新标准将受到浏览器厂商重点持续的性能优化。Proxy只会代理对象的第一层，Vue3是怎样处理这个问题的呢？判断当前Reflect.get的返回值是否为Object，如果是则再通过reactive方法做代理， 这样就实现了深度观测。监测数组的时候可能触发多次get/set，那么如何防止触发多次呢？我们可以判断key是否为当前被代理对象target自身属性，也可以判断旧值与新值是否相等，只有满足以上两个条件之一时，才有可能执行trigger。

## Proxy 与 Object.defineProperty 优劣对比

1. Proxy 可以直接监听对象而非属性；
2. Proxy 可以直接监听数组的变化；
3. Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的；
4. Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改；
5. Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；
6. Object.defineProperty 的优势如下:
   兼容性好，支持 IE9，而 Proxy 的存在浏览器兼容性问题,而且无法用 polyfill 磨平，因此 Vue 的作者才声明需要等到下个大版本( 3.0 )才能用 Proxy 重写。

## vue中组件的data为什么是一个函数？而new Vue 实例里，data 可以直接是一个对象

因为使用对象的话，每个实例（组件）上使用的data数据是相互影响的。对象是对于内存地址的引用，直接定义个对象的话组件之间都会使用这个对象，这样会造成组件之间数据相互影响。使用函数后，使用的是data()函数，data()函数中的this指向的是当前实例本身，就不会相互影响了。而 new Vue 的实例，是不会被复用的，因此不存在引用对象的问题。

## vue中computed与method的区别

**相同点**

​	如果作为模板的数据显示，二者能实现响应的功能，唯一不同的是methods定义的方法需要执行。

**不同点**

1. computed 会基于响应数据缓存，methods不会缓存；
2. diff之前先看data里的数据是否发生变化，如果没有变化computed的方法不会执行，但methods里的方法会执行。
3. computed是属性调用，而methods是函数调用。

## react、vue中的key有什么作用？(key的内部原理)

### 虚拟DOM中的作用：

key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成的【新的虚拟DOM】，
随后Vue进行【新虚拟DOM】和【旧虚拟DOM】的差异比较。

### 对比规则

1. 旧虚拟DOM中找到了与新虚拟DOM相同的key：
       若虚拟DOM中内容没有改变，直接使用之前的虚拟DOM
       若虚拟DOM中的内容改变了，则生成新的真是DOM，随后替换掉页面中之前的真是DOM
2. 旧虚拟DOM中未找到与新虚拟DOM相同的key
       创建新的真是DOM，随后渲染到页面

### 用index作为key可能会引发的问题

1. 若对数据进行：逆序添加，逆序删除等破坏顺序操作：
   会产生没有必要的真是DOM更新 ==> 界面效果没问题，但是效率低
2. 如果结构中还包含输入类的DOM：
   会产生错误DOM更新 ==> 界面有问题

### 开发中如何选择key

1. 最好使用每条数据的唯一标识作为key，比如id，手机号，身份证号，学号等唯一标识。
2. 如果不存在对数据的逆序添加，逆序删除等破坏顺序操作，仅用于渲染列表用于展示。
   使用index作为key是没有问题的。

## $nextTick

在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

Vue更新DOM是异步的。数据变化时将开启一个队列，同一个watcher的多次触发，只会被加入队列一次，这样可以避免不必要的计算和DOM操作。

## vue常用指令

1. v-model指令：用于表单输入，实现表单控件和数据的双向绑定。
2. v-on：简写为@，基础事件绑定。
3. v-bind：简写为：，动态绑定一些元素的属性，类型可以是：字符串、对象或数组。
4. v-if指令：取值为true/false，控制元素是否需要被渲染
5. v-else指令：和v-if指令搭配使用，没有对应的值。当v-if的值false，v-else才会被渲染出来。
6. v-show指令：指令的取值为true/false，分别对应着显示/隐藏。
7. v-for指令：遍历data中存放的数组数据，实现列表的渲染。
8. v-once： 通过使用 v-once 指令，你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。
9. v-pre：跳过其节点的编译过程。可利用跳过没有使用指令语法，没有使用插值语法的节点，会加快编译。
10. v-cloak：本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉v-cloak属性。使用css配合v-cloak可以解决网速慢时页面展示出{{xxx}}的问题。
11. v-text：向其所在的节点渲染文本内容。与插值语法的区别： v-text会替换节点中的内容， {{xx}}不会。
12. v-html：向指定节点渲染包含html结构的内容。v-html会替换掉节点的所有内容，{{xxx}}不会，v-html可以识别html结构。**注意：**在网站上动态渲染任意html时非常危险的，容易导致xss攻击；一定要在可信的内容上使用v-html，永远不要用在用户提交的内容上。

## v-show和v-if指令的共同点和不同点

### 共同点：

v-show和v-if都能控制元素的显示和隐藏。

### 不同点

1. 实现本质方法不同：v-show本质就是通过设置css中的display设置为none；控制隐藏v-if是动态的向DOM树内添加或者删除DOM元素。
2. v-show都会编译，初始值为false，只是将display设为none，但它也编译了；v-if初始值为false，就不会编译了。

**总结**：v-show只编译一次，后面其实就是控制css，而v-if不停的销毁和创建，如果要频繁切换某节点时，故v-show性能更好一点。

## 为什么避免v-if和v-for一起使用

vue2.x版本中，当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级；
vue3.x版本中，当 v-if 与 v-for 一起使用时，v-if 具有比 v-for 更高的优先级。
官网明确指出：避免 v-if 和 v-for 一起使用，永远不要在一个元素上同时使用 v-if 和 v-for。

## Vue.set 改变数组和对象中的属性

在一个组件实例中，只有在data里初始化的数据才是响应的，Vue不能检测到对象属性的添加或删除，没有在data里声明的属性不是响应的,所以数据改变了但是不会在页面渲染；
**解决办法：**使用 Vue.set(object, key, value) / vm.$set(obj, key, val)方法将响应属性添加到嵌套的对象上。

## 第一次页面加载会触发哪几个钩子

第一次页面加载时会触发 beforeCreate, created, beforeMount, mounted 这几个钩子。

## vue组件通信有哪些方式

1. 父传子：props
   父组件通过 props 向下传递数据给子组件。注：组件中的数据共有三种形式：data、props、computed
2. 子传父：通过自定义事件形式
   子组件通过 $emit()给父组件发送消息，父组件通过v-on绑定事件接收数据。
3. 父子、兄弟、跨级：eventBus.js全局事件总线
   这种方法通过一个空的 Vue 实例作为中央事件总线（事件中心）,用它来（e m i t ） 触 发 事 件 和 （ emit）触发事件和（emit）触发事件和（on）监听事件，巧妙而轻量地实现了任何组件间的通信。
4. 通信插件：PubSub.js 消息订阅与发布。
5. vuex
   vuex 是 vue 的状态管理器，存储的数据是响应式的。只需要把共享的值放到vuex中，其他需要的组件直接获取使用即可。

## Computed 和 Watch 的区别

### Computed

**作用**

1. 解决模板中放入过多的逻辑会让模板过重且难以维护的问题。例如两个数据的拼接或字体颜色的判断。
2. 它**支持缓存**，只有依赖的数据发生了变化，才会重新计算。例如模板中多次用到数据拼接可以用计算属性，只执行一次计算，除非数据发生变化。
3. **不支持异步**，如果有异步操作，无法监听数据的变化。
4. 如果属性值是函数，默认使用get方法，函数的返回值就是属性的属性值。还有一个set方法，当数据变化时就会调用set方法。
5. computed的值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的，也就是基于data声明过，或者父组件传递过来的props中的数据进行计算的。

### Watch

**作用**

1. 它不支持缓存，数据变化时，它就会触发相应的操作。
2. 支持异步监听。
3. 接受两个参数，第一个是最新的值，第二个是变化之前的值。
4. 监听data或者props传来的数据，发生变化时会触发相应操作。

### 总结

1. **computed** 计算属性 : 依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值。
2. **watch** 侦听器 : 更多的是观察的作用，无缓存性，类似于某些数据的监听回调，每当监听的数据变化时都会执行回调进行后续操作。

### 场景

1. **computed**：是多对一，多个数据影响一个。当需要进行数值计算,并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时都要重新计算。
2. watch：是一对多，一个数据发生变化，执行相应操作会影响多个数据。当需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许执行异步操作 ( 访问一个 API )，限制执行该操作的频率，并在得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

## 自定义指令

逻辑复用，跟操作DOM有关。对普通DOM元素进行底层操作。

1. bind：指令与元素成功绑定时调用。
2. inserted：指令所在元素被插入页面时调用。
3. update：指令所在模板结构被重新解析时调用。

## router路由

### 路由跳转

1. 声明式路由导航 `<router-link to="/about">About</router-link>`

2. 编程式路由导航 不借助``<router-link> ``实现路由跳转，让路由跳转更加灵活

   ```javascript
   this.$router.push({
      	name:'about',
      	   params:{
      		  id:xxx,
      		  title:xxx
      		}
   })
   this.$router.replace({
      name:'about',
         params:{
            id:xxx,
            title:xxx
         }
   })
   this.$router.forward() //前进
   this.$router.back() //后退
   this.$router.go() //可前进也可后退
   ```

push和replace的区别：
push 跳转到对应的路由，这个方法会向history栈添加一个记录，点击后退会返回到上一个页面。
replace同样是跳转到指定的路由，但是这个方法不会向history里面添加新的记录，而是替换（覆盖）掉当前路由，点击返回，会跳转到上上一个页面。

## 如何区别 $router与 $route

### $router

router是VueRouter的实例方法，相当于一个全局的路由器对象，作用是进行路由跳转的！就像jQuery里的window.location一样，起到的是导航的作用。里面含有很多属性和子对象，例如history对象，导航到不同url，可以使用this。

### $route

route是一个跳转的路由对象，每一个路由都会有一个route对象，是一个局部的对象，可以获取对应的name、meta、path、hash、query、params、fullPath、matched、redirectedFrom等。

## 路由参数

### query参数

**传递参数**

```html
<!-- 跳转并携带query参数，to的字符串写法 -->
<router-link :to="/home/message/detail?id=666&title=你好">跳转</router-link>
            
<!-- 跳转并携带query参数，to的对象写法 -->
<router-link 
   :to="{
      path:'/home/message/detail',
      query:{
         id:666,
         title:'你好'
      }
   }"
>跳转</router-link>
```

**接收参数**

```javascript
$route.query.id
$route.query.title
```

### params参数

```javascript
{
	name:'xiangqing',
    path:'detail/:id/:title', //使用占位符声明接收params参数
    component:Detail
}
```

**传递参数**

```html
<!-- 跳转并携带params参数，to的字符串写法 -->
<router-link :to="/home/message/detail/666/你好">跳转</router-link>
            
<!-- 跳转并携带params参数，to的对象写法 -->
<router-link 
   :to="{
      name:'xiangqing',
      params:{
         id:666,
            title:'你好'
      }
   }"
>跳转</router-link>
```

> 特别注意：路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置！

**接收参数**

```javascript
$route.params.id
$route.params.title
```

## 缓存路由组件

`keep-alive`是Vue的内置组件，当它包裹动态组件时，会缓存不活动的组件实例，而不是销毁。
作用：`keep-alive`用来缓存组件，**避免多次加载相同的组件**，减少性能消耗，提高用户体验。

## 路由器的两种工作模式

1. 对于一个url来说，什么是hash值？—— #及其后面的内容就是hash值。
2. hash值不会包含在 HTTP 请求中，即：hash值不会带给服务器。
3. hash模式：
   - 地址中永远带着#号，不美观 。
   - 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法。
   - 兼容性较好。
4. history模式：
   - 地址干净，美观 。
   - 兼容性和hash模式相比略差。
   - 应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题。

## 路由的生命周期

1. 作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态。
2. 具体名字：
   1. ``activated``路由组件被激活时触发。
   2. ``deactivated``路由组件失活时触发。

## 路由守卫

### 全局路由守卫

**全局前置路由守卫**
router.beforeEach((to,from,next)=>{})
   在路由跳转前触发，主要是用于登录验证

**全局解析路由守卫**
router.beforeResolve((to,from,next)=>{})
   和 router.beforeEach 类似，因为它在每次导航时都会触发，但是确保在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被正确调用。

**全局后置路由守卫**
router.afterEach((to,from,next)=>{})
   路由跳转完成后触发，该钩子只有两个参数to和from。

### 独享路由守卫

router.beforeEnter((to,from,next)=>{})
   路由对象单个路由配置 ，单个路由进入前触发

### 组件内路由守卫

**组件内前置路由守卫**

beforeRouteEnter:(to,from,next)=>{}
   beforeRouteEnter 守卫 不能 访问 this，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建。
   不过，你可以通过传一个回调给 next 来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数：

**组件内更新路由守卫**
beforeRouteUpdate:(to,from,next)=>{}
   在当前路由改变时，并且该组件被复用时调用，可以通过this访问实例。

**组件内后置路由守卫**
beforeRouteLeave:(to,from,next)=>{}
   导航离开该组件的对应路由时调用，可以访问组件实例this。
