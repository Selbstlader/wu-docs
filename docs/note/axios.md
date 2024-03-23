---
prev:
  text: 'Ajax'
  link: '/note/ajax'
next:
  text: 'Fetch'
  link: '/note/fetch'
---

# Axios

## 01_axios的基本使用

```js
// 发送GET请求 -- 不携带参数
// 完整版
axios({
    url: 'http://localhost:3000/posts', // 请求地址
    timeout: 2000,
    method: 'GET', // 请求方式
}).then(
    response => {
        console.log("成功", response)},
    error => {
        console.log("失败", error)}
)

// 精简版
axios.get('http://localhost:3000/posts').then(
    response => {
        console.log("成功", response.data)},
    error => {
        console.log("失败", error)}
)


// 发送GET请求获取某个人的信息 -- 携带query参数
// 完整版
axios({
    url: 'http://localhost:3000/posts',
    method: 'GET',
    params: {
        id: text1.value
    } // 写的是params，但是传的是query
}).then(
    response => {
        console.log("成功", response)},
    error => {
        console.log("失败", error)}
)

// 精简版
axios.get('http://localhost:3000/posts', {params: {id: text1.value}}).then(
    response => {
        console.log("成功", response)},
    error => {
        console.log("失败", error)}
)

// 发送POST请求添加一个人信息 -- 携带json编码参数 或urlencoded编码参数
// 完整版
axios({
    url: 'http://localhost:3000/posts',
    method: 'POST',
    data: {
        age: text2.value,
        name: text3.value
    } // 携带请求体参数(json编码)
    // data: `age=${text2.value}&name=${text3.value}` // 携带请求体参数(urlencoded编码)
}).then(
    response => {
        console.log("成功", response)},
    error => {
        console.log("失败", error)}
)

// 精简版
axios.post('http://localhost:3000/posts',{
    title: text2.value,
    author: text3.value
}).then(
    response => {
        console.log("成功", response)},
    error => {
        console.log("失败", error)}
)

// 送法PUT请请请求更新一个人 -- 携带json编码参数 或urlencoded编码参数
// 完整版
axios({
    url:'http://localhost:3000/posts',
    method: 'PUT',
    data: {
        id: text4.value,
        title: text5.value,
        author: text6.value
    }
}).then(
    response => {
        console.log("成功", response)},
    error => {
        console.log("失败", error)}
)

//精简版
axios.put("http://localhost:3000/posts",{
    id: text4.value,
    author: text5.value,
    title: text6.value
}).then(
    response => { console.log('成功了' + response.data); },
    error => { console.log('失败了' + error); }
)

// 发送DELETE请求删除某个人信息 -- 携带params参数
axios({
    url:`http://localhost:3000/posts/${text7.value}`,
    method: 'DELETE',
}).then(
    response => {
        console.log("成功", response)},
    error => {
        console.log("失败", error)}
)
```

## 02_axios常用的配置项

```js
// 配置axios默认属性
axios.defaults.timeout = 2000;
axios.defaults.headers = {demo: 123};
axios.defaults.baseURL = 'http://localhost:3000';

// 完整版 配置项需要使用完整版写法
axios({
    url: '/persons', // 请求地址
    method: 'GET', // 请求方式
    // params: {a:1,b:2}, // 配置query参数
    // data: {c:3,d:4}, // 配置请求体参数(json编码)
    // data: `e=5&f=6`,  // 配置请求体参数(urlencoded编码)
    // timeout: 2000, // 配置超时时间
    // headers: {demo: 123}, // 配置请求头
    // responseType: 'json' // 配置响应数据的格式(默认值)
}).then(
    response => {
        console.log("成功", response)},
    error => {
        console.log("失败", error)}
)
```

## 03_axios_creat方法

```js
/* axios.create(config)
    1. 根据指定配置创建一个新的axios，也就是每个新的axios都有自己的配置
    2. 新axios只是没有取消请求和批量发送请求的方法，其他所有语法都是一致的
    3. 为什么要设计这个语法？
    需求：项目中有部分接口需要的配置与另一部分接口需要的配置不太一样
*/ 

let instance = axios.create({
    baseURL: 'https://s-domain.com/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

// 配置axios默认属性
axios.defaults.timeout = 2000;
axios.defaults.headers = {demo: 123};
axios.defaults.baseURL = 'http://localhost:3000';

instance({
    url: '/posts', // 请求地址
    method: 'GET',
}).then(
    response => {
        console.log("成功", response)},
    error => {
        console.log("失败", error)}
)
```

## 04_axios中的拦截器

```js
/*
axios请求拦截器
    1. 是什么？
    在真正发请求签执行的一个回调函数
    2. 作用：
    对所有的请求做统一的处理：追加请求头、追加参数、界面loading提示等等

axios响应拦截器
    1. 是什么？
    得到响应之后执行的一个回调函数
    2. 作用：
    若请求成功，对成功的数据进行处理
    若请求失败，对失败进行进一步操作
*/

// 请求拦截器
axios.interceptors.request.use((config) => {
    config.headers.token = 'demo';
    // 一定要写 return 否则请求将会在拦截器处被停止！
    return config
})

// 响应拦截器
axios.interceptors.response.use(
    response => {
        console.log('成功', response)
        return response.data
    },
    error => {
        console.log('失败', error)
        return new Promise(() => {})
    }
)

// 移除拦截器
const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);

// 给自定义的 axios 实例添加拦截器
const instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
```

## 05_axios取消请求

```js
// AbortController
// 从 v0.22.0 开始，Axios 支持以 fetch API 方式—— AbortController 取消请求：
const controller = new AbortController();

axios.get('/foo/bar', {
   signal: controller.signal
}).then(function(response) {
   //...
});
// 取消请求
controller.abort()

// CancelToken
// 此 API 从 v0.22.0 开始已被弃用，不应在新项目中使用。

// 可以使用 CancelToken.source 工厂方法创建一个 cancel token
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function (thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // 处理错误
  }
});

axios.post('/user/12345', {
  name: 'new name'
}, {
  cancelToken: source.token
})

// 取消请求（message 参数是可选的）
source.cancel('Operation canceled by the user.');

// 也可以通过传递一个 executor 函数到 CancelToken 的构造函数来创建一个 cancel token：
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  })
});

// 取消请求
cancel();
```

## 06_axios多次请求

```js
axios.all([
    axios.get('http://localhost:5000/test1'),
    axios.get('http://localhost:5000/test2'),
    axios.get('http://localhost:5000/test3'),
]).then(
    response => {
        console.log("成功", response)},
    error => {
        if(isCancel(error)) {
            console.log('用户取消', error.message)
        } else {
            console.log('失败', error)
        }
    }
)
```

**详情请查看[axios中文文档](https://www.axios-http.cn/)**
