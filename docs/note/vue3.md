---
prev:
  text: 'Vue2'
  link: '/note/vue2'
next:
  text: 'React'
  link: '/note/react'
---

# Vue3

## Vue3简介

- 2020年9月18日，Vue.js发布3.0版本，代号：One Piece（海贼王）
- 耗时2年多、2600+次提交、30+个RFC、600+次PR、99位贡献者

## Vue3带来了什么

### 1. 性能的提升

- 打包大小减少41%

- 初次渲染快55%, 更新渲染快133%

- 内存减少54%

  ......

### 2. 源码的升级

- 使用Proxy代替defineProperty实现响应式

- 重写虚拟DOM的实现和Tree-Shaking

  ......

### 3. 拥抱TypeScript

- Vue3可以更好的支持TypeScript

### 4. 新的特性

1. Composition API（组合API）

   - setup配置
   - ref与reactive
   - watch与watchEffect
   - provide与inject
   - ......
2. 新的内置组件
   - Fragment 
   - Teleport
   - Suspense
3. 其他改变

   - 新的生命周期钩子
   - data 选项应始终被声明为一个函数
   - 移除keyCode支持作为 v-on 的修饰符
   - ......

## 创建Vue3.0工程

### 1. 使用 vue-cli 创建

```bash
## 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上
vue --version
## 安装或者升级你的@vue/cli
npm install -g @vue/cli
## 创建
vue create vue_test
## 启动
cd vue_test
npm run serve
```

### 2. 使用 vite 创建

- 什么是vite？—— 新一代前端构建工具。
- 优势如下：
  - 开发环境中，无需打包操作，可快速的冷启动。
  - 轻量快速的热重载（HMR）。
  - 真正的按需编译，不再等待整个应用编译完成。
- 传统构建 与 vite构建对比图

```bash
## 创建工程
npm init vite-app <project-name>
## 进入工程目录
cd <project-name>
## 安装依赖
npm install
## 运行
npm run dev
```

## 常用 Composition API

### 1. 拉开序幕的setup

1. 理解：Vue3.0中一个新的配置项，值为一个函数。
2. setup是所有 Composition API（组合API“ 表演的舞台 ”。
4. 组件中所用到的：数据、方法等等，均要配置在setup中。
5. setup函数的两种返回值：
   1. 若返回一个对象，则对象中的属性、方法, 在模板中均可以直接使用。（重点关注！）
   2. 若返回一个渲染函数：则可以自定义渲染内容。（了解）
6. 注意点：
   1. 尽量不要与Vue2.x配置混用
      - Vue2.x配置（data、methos、computed...）中**可以访问**到setup中的属性、方法。
      - 但在setup中**不能访问**到Vue2.x配置（data、methos、computed...）。
      - 如果有重名, setup优先。
   2. setup不能是一个async函数，因为返回值不再是return的对象, 而是promise, 模板看不到return对象中的属性。（后期也可以返回一个Promise实例，但需要Suspense和异步组件的配合）

###  2. ref函数

- 作用: 定义一个响应式的数据
- 语法: ```const xxx = ref(initValue)``` 
  - 创建一个包含响应式数据的**引用对象（reference对象，简称ref对象）**。
  - JS中操作数据： ```xxx.value```
  - 模板中读取数据: 不需要.value，直接：```<div>{{xxx}}</div>```
- 备注：
  - 接收的数据可以是：基本类型、也可以是对象类型。
  - 基本类型的数据：响应式依然是靠``Object.defineProperty()``的```get```与```set```完成的。
  - 对象类型的数据：内部 “ 求助 ” 了Vue3.0中的一个新函数—— ```reactive```函数。

### 3. reactive函数

- 作用: 定义一个**对象类型**的响应式数据（基本类型不要用它，要用```ref```函数）
- 语法：```const 代理对象= reactive(源对象)```接收一个对象（或数组），返回一个代理对象（Proxy的实例对象，简称proxy对象）
- reactive定义的响应式数据是“深层次的”。
- 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据进行操作。

### 4. Vue3.0中的响应式原理

#### vue2.x的响应式

- 实现原理：
  - 对象类型：通过```Object.defineProperty()```对属性的读取、修改进行拦截（数据劫持）。
  
  - 数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）。
  
    ```js
    Object.defineProperty(data, 'count', {
        get () {}, 
        set () {}
    })
    ```

- 存在问题：
  - 新增属性、删除属性, 界面不会更新。
  - 直接通过下标修改数组, 界面不会自动更新。

#### Vue3.0的响应式

- 实现原理: 
  - 通过Proxy（代理）:  拦截对象中任意属性的变化, 包括：属性值的读写、属性的添加、属性的删除等。
  - 通过Reflect（反射）:  对源对象的属性进行操作。
  - MDN文档中描述的Proxy与Reflect：
    ```js
    new Proxy(data, {
    	// 拦截读取属性值
        get (target, prop) {
        	return Reflect.get(target, prop)
        },
        // 拦截设置属性值或添加新属性
        set (target, prop, value) {
        	return Reflect.set(target, prop, value)
        },
        // 拦截删除属性
        deleteProperty (target, prop) {
        	return Reflect.deleteProperty(target, prop)
        }
    })
    
    proxy.name = 'tom'   
    ```

### 5. reactive对比ref

-  从定义数据角度对比：
   -  ref用来定义：基本类型数据。
   -  reactive用来定义：对象（或数组）类型数据。
   -  备注：ref也可以用来定义对象（或数组）类型数据, 它内部会自动通过```reactive```转为代理对象。
-  从原理角度对比：
   -  ref通过``Object.defineProperty()``的```get```与```set```来实现响应式（数据劫持）。
   -  reactive通过使用Proxy来实现响应式（数据劫持）, 并通过Reflect操作源对象内部的数据。
-  从使用角度对比：
   -  ref定义的数据：操作数据需要```.value```，读取数据时模板中直接读取不需要```.value```。
   -  reactive定义的数据：操作数据与读取数据：均不需要```.value```。

### 6. setup的两个注意点

- setup执行的时机
  - 在beforeCreate之前执行一次，this是undefined。
  
- setup的参数
  - props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。
  - context：上下文对象
    - attrs: 值为对象，包含：组件外部传递过来，但没有在props配置中声明的属性, 相当于 ```this.$attrs```。
    - slots: 收到的插槽内容, 相当于 ```this.$slots```。
    - emit: 分发自定义事件的函数, 相当于 ```this.$emit```。

### 7. 计算属性与监视

#### 1. computed函数

- 与Vue2.x中computed配置功能一致

- 写法

  ```js
  import {computed} from 'vue'
  
  setup(){
      ...
  	//计算属性——简写
      let fullName = computed(()=>{
          return person.firstName + '-' + person.lastName
      })
      //计算属性——完整
      let fullName = computed({
          get(){
              return person.firstName + '-' + person.lastName
          },
          set(value){
              const nameArr = value.split('-')
              person.firstName = nameArr[0]
              person.lastName = nameArr[1]
          }
      })
  }
  ```

#### 2. watch函数

- 与Vue2.x中watch配置功能一致

- 两个小“坑”：

  - 监视reactive定义的响应式数据时：oldValue无法正确获取、强制开启了深度监视（deep配置失效）。
  - 监视reactive定义的响应式数据中某个属性时：deep配置有效。
  
  ```js
  //情况一：监视ref定义的响应式数据
  watch(sum,(newValue,oldValue)=>{
  	console.log('sum变化了',newValue,oldValue)
  },{immediate:true})
  
  //情况二：监视多个ref定义的响应式数据
  watch([sum,msg],(newValue,oldValue)=>{
  	console.log('sum或msg变化了',newValue,oldValue)
  }) 
  
  /* 情况三：监视reactive定义的响应式数据
  			若watch监视的是reactive定义的响应式数据，则无法正确获得oldValue！！
  			若watch监视的是reactive定义的响应式数据，则强制开启了深度监视 
  */
  watch(person,(newValue,oldValue)=>{
  	console.log('person变化了',newValue,oldValue)
  },{immediate:true,deep:false}) //此处的deep配置不再奏效
  
  //情况四：监视reactive定义的响应式数据中的某个属性
  watch(()=>person.job,(newValue,oldValue)=>{
  	console.log('person的job变化了',newValue,oldValue)
  },{immediate:true,deep:true}) 
  
  //情况五：监视reactive定义的响应式数据中的某些属性
  watch([()=>person.job,()=>person.name],(newValue,oldValue)=>{
  	console.log('person的job变化了',newValue,oldValue)
  },{immediate:true,deep:true})
  
  //特殊情况
  watch(()=>person.job,(newValue,oldValue)=>{
      console.log('person的job变化了',newValue,oldValue)
  },{deep:true}) //此处由于监视的是reactive素定义的对象中的某个属性，所以deep配置有效
  ```

#### 3. watchEffect函数

- watch的套路是：既要指明监视的属性，也要指明监视的回调。

- watchEffect的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性。

- watchEffect有点像computed：

  - 但computed注重的计算出来的值（回调函数的返回值），所以必须要写返回值。
  - 而watchEffect更注重的是过程（回调函数的函数体），所以不用写返回值。

  ```js
  //watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。
  watchEffect(()=>{
      const x1 = sum.value
      const x2 = person.age
      console.log('watchEffect配置的回调执行了')
  })
  ```

- 清除副作用。

  ```js
  // 触发监听之前会调用一个函数可以处理你的逻辑例如防抖
  
  let message = ref<string>('')
  let message2 = ref<string>('')
  watchEffect((oninvalidate) => {
      //console.log('message', message.value);
      oninvalidate(()=>{
  
      })
      console.log('message2', message2.value);
  })
  ```

- 停止跟踪 watchEffect 返回一个函数 调用之后将停止更新。

  ```js
  const stop =  watchEffect((oninvalidate) => {
      //console.log('message', message.value);
      oninvalidate(()=>{
   
      })
      console.log('message2', message2.value);
  },{
      flush:"post",
      onTrigger () {
   
      }
  })
  stop()
  ```

- 副作用刷新时机 flush 一般使用post

  |          | pre                | sync                 | **post**           |
  | -------- | ------------------ | -------------------- | ------------------ |
  | 更新时机 | 组件**更新前**执行 | 强制效果始终同步触发 | 组件**更新后**执行 |

### 8. 生命周期

- Vue3.0中可以继续使用Vue2.x中的生命周期钩子，但有有两个被更名：
  - ```beforeDestroy```改名为 ```beforeUnmount```
  - ```destroyed```改名为 ```unmounted```
- Vue3.0也提供了 Composition API 形式的生命周期钩子，与Vue2.x中钩子对应关系如下：
  - `beforeCreate`===>`setup()`
  - `created`=======>`setup()`
  - `beforeMount` ===>`onBeforeMount`
  - `mounted`=======>`onMounted`
  - `beforeUpdate`===>`onBeforeUpdate`
  - `updated` =======>`onUpdated`
  - `beforeUnmount` ==>`onBeforeUnmount`
  - `unmounted` =====>`onUnmounted`

### 9. 自定义hook函数

- 什么是hook？—— 本质是一个函数，把setup函数中使用的Composition API进行了封装。

- 类似于vue2.x中的mixin。

- 自定义hook的优势: 复用代码, 让setup中的逻辑更清楚易懂。



### 10. toRef

- 作用：创建一个 ref 对象，其value值指向另一个对象中的某个属性。
- 语法：```const name = toRef(person,'name')```
- 应用:   要将响应式对象中的某个属性单独提供给外部使用时。


- 扩展：```toRefs``` 与```toRef```功能一致，但可以批量创建多个 ref 对象，语法：```toRefs(person)```

### 11. v-model

v-model 其实是一个语法糖 通过props 和 emit组合而成的。

1. 子组件绑定 v-model

   ```html
   <template>
     <button @click="show = !show">开关{{show}}</button>
     // 给子组件绑定 v-model
     <Dialog v-model="show"></Dialog>
   </template>
    
   <script setup lang='ts'>
   import Dialog from "./components/Dialog/index.vue";
   import {ref} from 'vue'
   const show = ref(false)
   </script>
   ```

   ```html
   <template>
        <div v-if='propData.modelValue ' class="dialog">
            <div class="dialog-header">
                <div>标题</div><div @click="close">x</div>
            </div>
            <div class="dialog-content">
               内容
            </div>      
        </div>
   </template>
    
   <script setup lang='ts'>
    
   type Props = {
      // 固定写法
      modelValue:boolean
   }
       
   // 接收父组件通过 v-model 传递给子组件的值
   const propData = defineProps<Props>()
   
   // update:modelValue 固定写法
   const emit = defineEmits(['update:modelValue'])
    
   // 通过 emit 将v-model 绑定的值回传给子组件
   const close = () => {
        emit('update:modelValue',false)
   }
    
   </script>
   ```

2. 绑定多个 v-model

   ```html
   <template>
     <button @click="show = !show">开关{{show}} ----- {{title}}</button>
     // 子组件绑定多个 v-model
     <Dialog v-model:title='title' v-model="show"></Dialog>
   </template>
    
   <script setup lang='ts'>
   import Dialog from "./components/Dialog/index.vue";
   import {ref} from 'vue'
   const show = ref(false)
   const title = ref('我是标题')
   </script>
    
   <style>
   </style>
   ```

   ```html
   <template>
        <div v-if='modelValue ' class="dialog">
            <div class="dialog-header">
                <div>标题---{{title}}</div><div @click="close">x</div>
            </div>
            <div class="dialog-content">
               内容
            </div>
            
        </div>
   </template>
    
   <script setup lang='ts'>
    
   type Props = {
      modelValue:boolean,
      title:string
   }
    
   const propData = defineProps<Props>()
    
   const emit = defineEmits(['update:modelValue','update:title'])
    
   const close = () => {
        emit('update:modelValue',false)
        emit('update:title','我要改变')
   }
    
   </script>
   ```

3. 自定义修饰符

   ```html
   <script setup lang='ts'>
    
   type Props = {
       modelValue: boolean,
       title?: string,
       // 自定义修饰符固定写法 model + Modifiers
       modelModifiers?: {
           default: () => {}
       }
       // 自定义修饰符固定写法 值 + Modifiers
       titleModifiers?: {
           default: () => {}
       }
    
   }
    
   const propData = defineProps<Props>()
    
   const emit = defineEmits(['update:modelValue', 'update:title'])
    
   const close = () => {
       console.log(propData.modelModifiers);
    
       emit('update:modelValue', false)
       emit('update:title', '我要改变')
   }
   ```

### 12. 全局变量和函数

#### globalProperties

Vue3 没有Prototype 属性 使用 app.config.globalProperties 代替 然后去定义变量和函数。

```ts
import { createApp } from 'vue'
import App from './App.vue'
 
const app = createApp(App)
 
//Vue3挂载全局API
app.config.globalProperties.$Bus = () => {}
app.config.globalProperties.$Http = 'http'
 
app.mount('#app')
```

```ts
// 声明文件 不然TS无法正确类型 推导
app.config.globalProperties.$Http = 'http'
app.config.globalProperties.$filters = {
    format<T extends any>(str: T): string {
        return `$${str}`
    }
}

type Filter = {
    format<T>(str: T): string
}

// 声明要扩充@vue/runtime-core包的声明.
// 这里扩充"ComponentCustomProperties"接口, 因为他是vue3中实例的属性的类型.
declare module 'vue' {
    export interface ComponentCustomProperties {
        $http: string
        $filters: Filter
    }
}
```

**取值**

```ts
// getCurrentInstance 获取当前实例
import { getCurrentInstance, ComponentInternalInstance } from 'vue';
 
const { appContext } = <ComponentInternalInstance>getCurrentInstance()
 
console.log(appContext.config.globalProperties.$env);
 
推荐第二种方式
 
import {ref,reactive,getCurrentInstance} from 'vue'
const app = getCurrentInstance()
console.log(app?.proxy?.$filters.format('js'))
```




## 其它 Composition API

### 1. shallowReactive 与 shallowRef

- shallowReactive：只处理对象最外层属性的响应式（浅响应式）。
- shallowRef：只处理基本数据类型的响应式, 不进行对象的响应式处理。

- 什么时候使用?
  -  如果有一个对象数据，结构比较深, 但变化时只是外层属性变化 ===> shallowReactive。
  -  如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换 ===> shallowRef。

### 2. readonly 与 shallowReadonly

- readonly: 让一个响应式数据变为只读的（深只读）。
- shallowReadonly：让一个响应式数据变为只读的（浅只读）。
- 应用场景: 不希望数据被修改时。

### 3. toRaw 与 markRaw

- toRaw：
  - 作用：将一个由```reactive```生成的响应式对象转为普通对象。
  - 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。
- markRaw：
  - 作用：标记一个对象，使其永远不会再成为响应式对象。
  - 应用场景:
    1. 有些值不应被设置为响应式的，例如复杂的第三方类库等。
    2. 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。

### 4. customRef

- 作用：创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。

- 实现防抖效果：

  ```vue
  <template>
  	<input type="text" v-model="keyword">
  	<h3>{{keyword}}</h3>
  </template>
  
  <script>
  	import {ref,customRef} from 'vue'
  	export default {
  		name:'Demo',
  		setup(){
  			// let keyword = ref('hello') //使用Vue准备好的内置ref
  			//自定义一个myRef
  			function myRef(value,delay){
  				let timer
  				//通过customRef去实现自定义
  				return customRef((track,trigger)=>{
  					return{
  						get(){
  							track() //告诉Vue这个value值是需要被“追踪”的
  							return value
  						},
  						set(newValue){
  							clearTimeout(timer)
  							timer = setTimeout(()=>{
  								value = newValue
  								trigger() //告诉Vue去更新界面
  							},delay)
  						}
  					}
  				})
  			}
  			let keyword = myRef('hello',500) //使用程序员自定义的ref
  			return {
  				keyword
  			}
  		}
  	}
  </script>
  ```

  

### 5. provide 与 inject

- 作用：实现**祖与后代组件间**通信

- 套路：父组件有一个 `provide` 选项来提供数据，后代组件有一个 `inject` 选项来开始使用这些数据

- 具体写法：

  1. 祖组件中：

     ```js
     setup(){
     	......
         let car = reactive({name:'奔驰',price:'40万'})
         provide('car',car)
         ......
     }
     ```

  2. 后代组件中：

     ```js
     setup(props,context){
     	......
         const car = inject('car')
         return {car}
     	......
     }
     ```

### 6. 响应式数据的判断

- isRef: 检查一个值是否为一个 ref 对象
- isReactive: 检查一个对象是否是由 `reactive` 创建的响应式代理
- isReadonly: 检查一个对象是否是由 `readonly` 创建的只读代理
- isProxy: 检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理

### 7. 父子组件传参

1. 父组件通过v-bind绑定一个数据，然后子组件通过defineProps接受传过来的值。

   ```html
   // ts
   <template>
       <div class="menu">
           菜单区域 {{ title }}
           <div>{{ data }}</div>
       </div>
   </template>
    
   <script setup lang="ts">
   defineProps<{
       title:string,
       data:number[]
   }>()
   </script>
   
   // js
   <script>
   defineProps({
       title:{
           default:"",
           type:string
       },
       data:Array
   })
   </script>
   ```

2. withDefaults是个函数也是无须引入开箱即用接受一个props函数第二个参数是一个对象设置默认值。

   ```js
   type Props = {
       title?: string,
       data?: number[]
   }
   withDefaults(defineProps<Props>(), {
       title: "张三",
       data: () => [1, 2, 3]
   })
   ```

3. defineEmits派发事件

   ```html
   // 子组件
   <template>
       <div class="menu">
           <button @click="clickTap">派发给父组件</button>
       </div>
   </template>
    
   <script setup lang="ts">
   import { reactive } from 'vue'
   const list = reactive<number[]>([4, 5, 6])
    
   const emit = defineEmits(['on-click'])
    
   //如果用了ts可以这样两种方式
   // const emit = defineEmits<{
   //     (e: "on-click", name: string): void
   // }>()
   const clickTap = () => {
       emit('on-click', list)
   }
    
   </script>
   ```

   ```html
   // 父组件
   <template>
       <div class="layout">
           <Menu @on-click="getList"></Menu>
           <div class="layout-right">
               <Header></Header>
               <Content></Content>
           </div>
       </div>
   </template>
    
   <script setup lang="ts">
   import Menu from './Menu/index.vue'
   import Header from './Header/index.vue'
   import Content from './Content/index.vue'
   import { reactive } from 'vue';
    
   const data = reactive<number[]>([1, 2, 3])
    
   const getList = (list: number[]) => {
       console.log(list,'父组件接受子组件');
   }
   </script>
   ```

4. defineExpose

   ```html
   // 父组件获取子组件实例通过ref
   <Menu ref="refMenu"></Menu>
   //这样获取是有代码提示的
   <script setup lang="ts">
   import MenuCom from '../xxxxxxx.vue'
   //注意这儿的typeof里面放的是组件名字(MenuCom)不是ref的名字 ref的名字对应开头的变量名(refMenu)
   const refMenu = ref<InstanceType<typeof MenuCom>>()
   </script>
   // 子组件
   <script>
   const list = reactive<number[]>([4, 5, 6])
    
   defineExpose({
       list
   })
   </script>
   ```


### 8. 自定义 eventbus

`bus.ts`

```ts
// bus.js
class Bus {
    constructor() {
        this.list = {};  // 收集订阅
    }
    // 订阅
    $on(name, fn) {
        this.list[name] = this.list[name] || [];
        this.list[name].push(fn);
    }
    // 发布
    $emit(name, data) {
        if (this.list[name]) {
              this.list[name].forEach((fn) => {    fn(data);   });
        }
    }
    // 取消订阅
    $off(name) {
        if (this.list[name]) {
            delete this.list[name];
        }
    }
}
export default new Bus;
```

`订阅`

```html
<template>
  <div>
     {{ name }} --- {{ age }}
  </div>
</template>
<script>
import {ref , onUnmounted} from 'vue';
import Bus from '../bus/bus.js';
export default {
  setup() {
       const name = '张三';
       const age = ref(18)
       Bus.$on('addAge',({ num })=>{    age.value = num;    })
       
       //组件卸载时，取消订阅
       onUnmounted( () => { Bus.$off('addAge') } )
     }
 }
</script>
```

`发布`

```html
<template>
    <button @click="fabu">发布</button>
</template>
<script>
import Bus from '../bus/bus.js';
export default {
  setup() {
     function fabu(){
         Bus.$emit('addAge',{age:'19'});
     }
   }
 }
</script>
```

### 9. mitt

在vue3中$on，$off 和 $once 实例方法已被移除，组件实例不再实现事件触发接口，因此大家熟悉的EventBus便无法使用了。然而我们习惯了使用EventBus，对于这种情况我们可以使用Mitt库（其实就是我们视频中讲的发布订阅模式的设计）。

1. 安装 `npm install mitt -S`

2. main.ts 初始化。全局总线，vue 入口文件 main.ts 中挂载全局属性。

   ```ts
   import { createApp } from 'vue'
   import App from './App.vue'
   import mitt from 'mitt'
    
   const Mit = mitt()
    
   //TypeScript注册
   // 由于必须要拓展ComponentCustomProperties类型才能获得类型提示
   declare module "vue" {
       export interface ComponentCustomProperties {
           $Bus: typeof Mit
       }
   }
    
   const app = createApp(App)
    
   //Vue3挂载全局API
   app.config.globalProperties.$Bus = Mit
    
   app.mount('#app')
   ```

3. 使用方法通过emit派发， on 方法添加事件，off 方法移除，clear 清空所有。

   ```html
   <template>
       <div>
           <h1>我是A</h1>
           <button @click="emit1">emit1</button>
           <button @click="emit2">emit2</button>
       </div>
   </template>
    
   <script setup lang='ts'>
   import { getCurrentInstance } from 'vue'
   // 获取组件实例
   const instance = getCurrentInstance();
   const emit1 = () => {
       instance?.proxy?.$Bus.emit('on-num', 100)
   }
   const emit2 = () => {
       instance?.proxy?.$Bus.emit('*****', 500)
   }
   </script>
    
   <style>
   </style>
   ```

   ```html
   <template>
       <div>
           <h1>我是B</h1>
       </div>
   </template>
    
   <script setup lang='ts'>
   import { getCurrentInstance } from 'vue'
   const instance = getCurrentInstance()
   instance?.proxy?.$Bus.on('on-num', (num) => {
       console.log(num,'===========>B')
   })
   </script>
    
   <style>
   </style>
   ```

   `监听所有事件（ on("*") ）`

   ```ts
   instance?.proxy?.$Bus.on('*',(type,num)=>{
       console.log(type,num,'===========>B')
   })
   ```

   `移除监听事件（off）`

   ```ts
   const Fn = (num: any) => {
       console.log(num, '===========>B')
   }
   instance?.proxy?.$Bus.on('on-num',Fn)//listen
   instance?.proxy?.$Bus.off('on-num',Fn)//unListen
   ```

   `清空所有监听（clear）`

   ```ts
   instance?.proxy?.$Bus.all.clear() 
   ```

### 10. 环境变量

**环境变量：他的主要作用就是让开发者区分不同的运行环境，来实现 兼容开发和生产**

**例如 npm run dev 就是开发环境 npm run build 就是生产环境等等**

Vite在一个特殊的 **`import.meta.env`** 对象上暴露环境变量。这里有一些在所有情况下都可以使用的内建变量。

```json
{
    "BASE_URL":"/", //部署时的URL前缀
    "MODE":"development", //运行模式
    "DEV":true,"  //是否在dev环境
    PROD":false, //是否是build 环境
    "SSR":false //是否是SSR 服务端渲染模式
}
```

**配置额外的环境变量**

新建文件目录下新建文件夹`.env.development` 或 ``.env.production``。修改启动命令，在 package json 配置 --mode env文件名称：

`"dev":"vite --mode development"`。即可通过`import.meta.env`打印得到。

```ts
import { fileURLToPath, URL } from 'node:url'
 
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
 
 
 
// https://vitejs.dev/config/
export default ({mode}:any) => {
 // 通过该方法可以得到内容
  console.log(loadEnv(mode,process.cwd()))
  
  return defineConfig({
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  })
} 
```

## Composition API 的优势

### 1. Options API 存在的问题

使用传统OptionsAPI中，新增或者修改一个需求，就需要分别在data，methods，computed里修改 。

### 2. Composition API 的优势

我们可以更加优雅的组织我们的代码，函数。让相关功能的代码更加有序的组织在一起。

## 新的组件

### 1. Fragment

- 在Vue2中: 组件必须有一个根标签
- 在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中
- 好处: 减少标签层级, 减小内存占用

### 2. Teleport

- 什么是Teleport？—— `Teleport` 是一种能够将我们的组件html结构移动到指定位置的技术。

  ```vue
  <teleport to="移动位置">
  	<div v-if="isShow" class="mask">
  		<div class="dialog">
  			<h3>我是一个弹窗</h3>
  			<button @click="isShow = false">关闭弹窗</button>
  		</div>
  	</div>
  </teleport>
  ```

### 3. Suspense

- 等待异步组件时渲染一些额外内容，让应用有更好的用户体验

- 使用步骤：

  - 异步引入组件

    ```js
    import {defineAsyncComponent} from 'vue'
    const Child = defineAsyncComponent(()=>import('./components/Child.vue'))
    ```

  - 使用```Suspense```包裹组件，并配置好```default``` 与 ```fallback```

    ```vue
    <template>
    	<div class="app">
    		<h3>我是App组件</h3>
    		<Suspense>
    			<template v-slot:default>
    				<Child/>
    			</template>
    			<template v-slot:fallback>
    				<h3>加载中.....</h3>
    			</template>
    		</Suspense>
    	</div>
    </template>
    ```

## 其他

### 1. 全局API的转移

- Vue 2.x 有许多全局 API 和配置。
  - 例如：注册全局组件、注册全局指令等。

    ```js
    //注册全局组件
    Vue.component('MyButton', {
      data: () => ({
        count: 0
      }),
      template: '<button @click="count++">Clicked {{ count }} times.</button>'
    })
    
    //注册全局指令
    Vue.directive('focus', {
      inserted: el => el.focus()
    }
    ```

- Vue3.0中对这些API做出了调整：

  - 将全局的API，即：```Vue.xxx```调整到应用实例（```app```）上

    | 2.x 全局 API（```Vue```） | 3.x 实例 API (`app`)        |
    | ------------------------- | --------------------------- |
    | Vue.config.xxxx           | app.config.xxxx             |
    | Vue.config.productionTip  | **移除**                    |
    | Vue.component             | app.component               |
    | Vue.directive             | app.directive               |
    | Vue.mixin                 | app.mixin                   |
    | Vue.use                   | app.use                     |
    | Vue.prototype             | app.config.globalProperties |
  

### 2. 其他改变

- data选项应始终被声明为一个函数。

- 过度类名的更改：

  - Vue2.x写法

    ```css
    .v-enter,
    .v-leave-to {
      opacity: 0;
    }
    .v-leave,
    .v-enter-to {
      opacity: 1;
    }
    ```

  - Vue3.x写法

    ```css
    .v-enter-from,
    .v-leave-to {
      opacity: 0;
    }
    
    .v-leave-from,
    .v-enter-to {
      opacity: 1;
    }
    ```

- **移除**keyCode作为 v-on 的修饰符，同时也不再支持```config.keyCodes```

- **移除**```v-on.native```修饰符

  - 父组件中绑定事件

    ```vue
    <my-component
      v-on:close="handleComponentEvent"
      v-on:click="handleNativeClickEvent"
    />
    ```

  - 子组件中声明自定义事件

    ```vue
    <script>
      export default {
        emits: ['close']
      }
    </script>
    ```

- **移除**过滤器（filter）

  > 过滤器虽然这看起来很方便，但它需要一个自定义语法，打破大括号内表达式是 “只是 JavaScript” 的假设，这不仅有学习成本，而且有实现成本！建议用方法调用或计算属性去替换过滤器。

- ......

## pinia

### 1. 特点

1. 完整的 ts 的支持；
2. 足够轻量，压缩后的体积只有1kb左右;
3. 去除 mutations，只有 state，getters，actions；
4. actions 支持同步和异步；
5. 代码扁平化没有模块嵌套，只有 store 的概念，store 之间可以自由使用，每一个store都是独立的
   无需手动添加 store，store 一旦创建便会自动添加；
6. 支持Vue3 和 Vue2

### 2. 使用

`npm install pinia`

```ts
import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
 
const store = createPinia()
let app = createApp(App)
 
 
app.use(store)
 
app.mount('#app')
```

### 3. 初始化仓库

```ts
import { defineStore } from 'pinia'
import { Names } from './store-namespace'
const enum Names {
    Test = 'TEST'
}
 
export const useTestStore = defineStore(Names.Test, {
 	state: () => {
        return: {
            data: 1,
            current: 2
        }
    },
    getters: {
        
    },
    actions: {
        setCurrent() {
            // 通过 this 指向 state 仓库中的数据，前提是该函数不能是箭头函数，否则没有this
            this.current++
        }
    }
})
```

### 4. 使用

```ts
import { useTestStore } from './store'

const Test = useTestStore()

// 修改 state 值
// 1. 直接通过 Test.current = 11 修改
// 2. 通过 $patch 方法修改，可以一次性修改多个值
const change = () => {
    Test.$patch({
        current: 11,
        data: 22
    })
}
// 3. 通过 $patch 函数形式修改
const change () => {
    Test.$patch((state) => {
        state.current++
    })
}
// 4. 通过 $state 修改，但前提是必须修改所有值
const change () => {
    Test.$state = {
        current: 10,
        data: 20
    }
}
// 5. 通过 actions 修改
// 直接调用 Test.setCurrent() 即可通过规则修改
```

### 5. 解构store

pinia是不允许直接解构的，会失去响应式

```ts
import { useTestStore } from './store'

const Test = useTestStore()

const { current, name } = Test
// 此current 和 name 不具备响应式，修改值页面不会更改
console.log(current, name)
// 通过 storeToRefs  将解构出来的值重新响应
import { storeToRefs } from 'pinia'

const { current, name } = storeToRefs(Test)
// 因此你可以选择直接 Test.current 调用
// 或者通过 current.value 调用
```

### 6. getter 和 actions

**actions 支持同步和异步**

```ts
// 同步
import { defineStore } from 'pinia'
import { Names } from './store-naspace'
export const useTestStore = defineStore(Names.TEST, {
    state: () => ({
        counter: 0,
    }),
    actions: {
        increment() {
            this.counter++
        },
        randomizeCounter() {
            this.counter = Math.round(100 * Math.random())
        },
    },
})
```

```ts
// 异步 可以结合 async 和 await
import { defineStore } from 'pinia'
import { Names } from './store-naspace'
 
type Result = {
    name: string
    isChu: boolean
}
 
const Login = (): Promise<Result> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: '小满',
                isChu: true
            })
        }, 3000)
    })
}
 
export const useTestStore = defineStore(Names.TEST, {
    state: () => ({
        user: <Result>{},
        name: "123"
    }),
    actions: {
        async getLoginInfo() {
            const result = await Login()
            this.user = result;
        }
    },
})
```

**getter**

```ts
// 使用普通函数可以使用 this 指向 store
getters:{
    newCurrent ():number {
        return ++this.current
    }
},
    
// 箭头函数没有 this 因此调用 state
getters:{
	newPrice:(state) =>  `$${state.user.price}`
},
```

### 7. API

**$reset**

```ts
// 重置 state 初始状态
Test.$reset
```

**$subscribe**

```ts
// 只要state 有变化就会触发
// 第二个参数 dateched 组件卸载后还想继续调用可以设置第二个参数
Test.$subscribe((args, state) => {
    
}, {
    dateched: true
})
```

**$onAction**

```ts
// 只要 actions 被调用就会触发
Test.actions((args) => {
    
})
```

### 8. 持久化

`npm install pinia-plugin-persist --save`

```ts
// store/index.ts
import { createPinia } from "pinia"
import piniaPluginPersist from 'pinia-plugin-persist'

const store = createPinia()
store.use(piniaPluginPersist)

export default store
```

```ts
import {defineStore} from "pinia"

export const useUserStore = defineStore({
    id: "user",
    state: () => {
        return {
            name: '',
            age: 0
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'user',
                storage: localStorage,
                path: ['name']
            }
        ]
    }
})
```

### 9. 模块化

**vuex 模块化**

`store/menu/index.js`

```js
const MenuStore = {
  namespaced: true,
  state: {
    menu: []
  },
  getters: {
  },
  mutations: {
    setMenu (state, payload) {
      state.menu = payload
    }
  },
  actions: {
    setMenu (context, payload) {
      setTimeout(() => {
        context.commit('setMenu', payload)
      }, 1000)
    }
  }
}
export default MenuStore
```

`store/user/index.js`

```js
const UserStore = {
  namespaced: true,
  state: {
    user: {}
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    setUser (context, payload) {
      setTimeout(() => {
        context.commit('setUser', payload) // 通过context去触发mutions中的sum
      }, 1000)
    }
  }
}
export default UserStore
```

`store/index.js`

```js
import Vue from 'vue'
import Vuex from 'vuex'
import UserStore from './user'
import MenuStore from './menu'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    'menu': MenuStore,
    'user': UserStore
  }
})
export default store
```

`main.js`

```js
import Vue from "vue"
import App from "./App.vue"
import router from "@/router"
import store from "@/store"
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
```

**pinia 模块化**

`store/modules/common.ts`

```ts
import { defineStore } from "pinia"
import { getStore } from "@/utils/storage"
const useCommonStore = defineStore("/common", {
  state: () => ({
    yearNow: new Date(),
  }),
  getters: {},
  actions: {},
})
export default useCommonStore
```

`store/modules/user.ts`

```ts
import { defineStore } from "pinia"

const useAuthUserStore = defineStore("/user", {
  state: () => ({
    userInfo: JSON.parse(window.localStorage.getItem("userInfo") || "{}"),
    isLogged: false,
  }),
  getters: {},
  actions: {
    setUserInfo() {
       console.log("getUserInfo")
    },
  },
})
export default useAuthUserStore
```

`store/index.ts`

```ts
import useCommonStore from './modules/demo';
import useUserStore from './modules/useNumberStore';

const useStore = () => ({
    useCommonStore: useCommonStore(),
    useUserStore: useUserStore(),
})

export default useStore;
```

`index.vue`

```ts
import useStore from '@/store/index'
const store = useStore()
const { useCommonStore, useUserStore } = store;q
```

## router

### 1. 使用

`npm in*stall vue-router@4`

```ts
//引入路由对象
import { createRouter, createWebHistory, createWebHashHistory, createMemoryHistory, RouteRecordRaw } from 'vue-router'
 
//vue2 mode history vue3 createWebHistory
//vue2 mode  hash  vue3  createWebHashHistory
//vue2 mode abstact vue3  createMemoryHistory
 
//路由数组的类型 RouteRecordRaw
// 定义一些路由
// 每个路由都需要映射到一个组件。
const routes: Array<RouteRecordRaw> = [{
    path: '/',
    component: () => import('../components/a.vue')
},{
    path: '/register',
    component: () => import('../components/b.vue')
}]
 
 
 
const router = createRouter({
    history: createWebHistory(),
    routes
})
 
//导出router
export default router
```

```ts
// 组件中路由使用
import { useRoute } from 'vue-router';
const route = useRoute()
```

```ts
// createWebHashHistory 实现原理 使用 hashchange 可以监听左右箭头的变化 
window.addEventListener('hashchange',(e) => {
    console.log(e)
})

// createWebHistory 实现原理
window.addEventListener('popstate',(e) => {
    console.log(e)
})
// 通过 history.pushState() 跳转
```

### 2. 历史记录

```html
// 添加 replace 不会保留历史记录
 <router-link replace to="/">Login</router-link>
// 或 router.replace()
// router.go()
// router.back()
// router.go(-1)
```

### 3. 路由元信息

```ts
// 通过 meta 设置

const routes: Array<RouteRecordRaw> = [{
    path: '/',
    component: () => import('../components/a.vue'),
    meta: 'a'
},{
    path: '/register',
    component: () => import('../components/b.vue'),
    meta: 'a'
}]
```

### 4. 路由过渡动效

```html
<router-view v-slot="{route,Component}">
    <transition  :enter-active-class="`animate__animated ${route.meta.transition}`">
    	<component :is="Component"></component>
    </transition>
</router-view>
```

### 5. 路由滚动

```ts
const router = createRouter({
    history: createWebHistory(),
    scrollBehavior: (to, from, savePosition) => {
        // savePosition 记录当前滚动条位置
        console.log(to, '==============>', savePosition);
        if (savePosition) {
            return savePosition
        } else {
            top: 0
        }
    },
})
```

### 6. 动态路由

```s
// 添加路由
router.addRoute({ path: '/about', component: About })

// 删除路由
router.addRoute({ path: '/about', name: 'about', component: About })
// 这将会删除之前已经添加的路由，因为他们具有相同的名字且名字必须是唯一的
router.addRoute({ path: '/other', name: 'about', component: Other })

// 删除路由
const removeRoute = router.addRoute(routeRecord)
removeRoute() // 删除路由如果存在的话

// 查看路由
router.hasRoute()：检查路由是否存在。
router.getRoutes()：获取一个包含所有路由记录的数组。
```

