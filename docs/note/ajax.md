---
next:
  text: 'Axios'
  link: '/note/axios'
---

# Ajax

## ajax用处

**Ajax 可以用来实现以下功能：**

- 异步更新页面内容（如搜索建议、聊天框等）
- 在页面中特定区域显示动态数据
- 提交表单数据而无需刷新整个页面
- 与服务器进行交互，不会导致页面跳转或刷新

**Ajax 的主要优点包括：**

- 提高用户体验：通过减少页面的重载和刷新，使得网站变得更加灵活和动态。
- 减轻服务器负载：通过使用 Ajax，可以有效减少服务器接收到的求次数和需要响应的数据量，从而减轻服务器的负担。
- 提高响应速度：使用 Ajax 可以异步获取数据并更新页面，从而提高响应速度。
- 增加交互性：通过使用 Ajax，可以使得页面变得更加动态和交互性。

**然而也需要注意一些问题：**

- Ajax 对搜索引擎优化(SEO)劣势较大，对于需要SEO的项目需要谨慎选择使用Ajax技术。

- 在使用 Ajax 时，需要考虑数据安全性和网络安全性问题，并采取相应的措施加以防范。

- 不合适的使用 Ajax，可能会造成降低网站质量和效率的问题，所以需要根据实际需求来决定是否采用该技术。

  

## get 请求

```js
// 创建 XMLHttpRequest 对象
let xhr = new XMLHttpRequest();

// 设置请求参数。包括请求的方法、请求的url
xhr.open('get', 'http://localhost:5000/persons');

// 发送请求
xhr.send();

// 注册事件。onreadystatechange事件，状态改变时就会调用。
// 如果要在数据请求回来的时候才调用，我们需要手动写一些判断逻辑
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        // 服务端响应，进入改判断证明请求成功
        console.log( JSON.parse(xhr.response).data)
    }
}
```

## post 请求

```js
// 创建 XMLHttpRequest 对象
let xhr = new XMLHttpRequest();

// 设置请求参数。 包括请求方法、请求url
xhr.open('post', 'http://localhost:5000/person');

// 如果想要post提交数据，必须添加此行
xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

// 发送请求
xhr.send('name=fox&age=18');

// 注册事件
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(JSON.parse(xhr.response).data)
    }
}
```

## 上传图片

```js
document.querySelector('#file').addEventListener('change', function () {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/api/upload')
    xhr.onload = function () {
        if (xhr.status === 200) {
            document.querySelector('#result').innerText = xhr.responseText
        }
        else {
            console.log('Request failed.  Returned status of ' + xhr.status);
        }
    }

    let file = this.files[0];
    let formData = new FormData();
    formData.append('file', file);
    xhr.send(formData);
})
```

## promise封装

```js
// Promise封装Ajax请求
function myAjax(method, url, data) {
    let xhr = new XMLHttpRequest();
    return new Promise(function (resolve, reject) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject(xhr.status);
            }

        };
        xhr.open(method, url);
        xhr.send(data);
    });
}

myAjax('GET', 'http://localhost:5000/persons').then(function (data) {
    // 返回成功的结果
    console.log(data);
},function (res) {
    // 返回失败的结果
    console.log(res);
});
```

## 封装ajax

```js
function myAjax(options) {
    let xhr;
    let params = formsParams(options.data);

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        // 兼容IE
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }

    if (options.type === "GET") {
        xhr.open(options.type, options.url + "?" + params, options.async);
        xhr.send()
    } else if (options.type === "POST") {
        xhr.open(options.type, options.url, options.async);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            options.success(xhr.responseText);
        }
    }
    // 处理数据
    function formsParams(data) {
        let arr = [];
        for (let prop in data) {
            arr.push(prop + "=" + data[prop]);
        }
        return arr.join("&");
    }
}

myAjax({
    // url:地址
    url: "http://localhost:5000/persons",
    // type : 请求方式
    type: "GET",
    // async: 同步：false，异步：true
    async: true,

    // 返回接受信息
    success: function (data) {
        console.log(JSON.parse(data));
        myAjax({
            // url:地址
            url: "http://localhost:5000/persons",
            // type : 请求方式
            type: "GET",
            // async: 同步：false，异步：true
            async: true,
            success: function (data) {
                console.log(JSON.parse(data))
            }
        })
    }
})
```

## 其他 API

```js
// 中断请求
xhr.abort()
// 并且带有一个中断回调
xhr.addEventListener('abort', function (event) {
    console.log('我被中断了')
})
```

```js
// 设置超时时间
xhr.timeout = 3000
// 并且带有一个超时回调
xhr.addEventListener('timeout', function (event) {
     console.log('超时啦')
})
```

```js
// 获取进度
xhr.addEventListener('progress', function (event) {
	document.querySelector('#progress').innerText = `${(event.loaded / event.total * 100).toFixed(2)}%`
})
```

