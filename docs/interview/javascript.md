---
prev:
  text: 'JavaScript'
  link: '/interview/javascript'
next:
  text: 'Vue'
  link: '/interview/vue'
---

# JavaScript

## js事件循环机制(event loop)

同步和异步任务分别进入不同的执行"场所"，同步的进入主
程，异步的进入Event Table并注册函数。

```js
console.log(1);
setTimeout(()=>{
  console.log(3);
},100)
console.log(2); // 1 2 3
```

## 微任务与宏任务

宏任务（macrotask ）和微任务（microtask ）表示异步任务的两种分类。常见宏任务：I/O 、setTimeout、  setInterval、setImmediate、requestAnimationFrame；
任务：Promise.then catch finally、process.nextTick

```js
setTimeout(()=>{
  console.log(4)
})
new Promise((res,rej)=>{
  console.log(1)
  res()
})
.then(()=>{
  console.log(3)
})
console.log(2)
```

每次宏任务执行完后都会清空队列里的微任务，微任务执行优先级高于宏任务。

## 普通函数可以new吗

可以，但是没有什么意义。（返回一个空的this有何用？）

```js
function a(){}
console.log(new a());//a{}
```

## addEventListener中第三个参数

addEventListener(type, listener, useCapture);
控制函数是在捕获阶段执行还是在冒泡阶段执行,默认冒泡阶段false

## js垃圾回收机制

当一个变量的生命周期结束之后它所指向的内存就应该被释放。JS有两种变量，全局变量和局部变量。局部变量的生命周期在函数执行过后就结束了，此时便可将它引用的内存释放（即垃圾回收），但全局变量生命周期会持续到浏览器关闭页面。
回收有两种方式：标记清除、引用计数。

标记清除：大部分浏览器以此方式进行垃圾回收，当变量进入执行环境（函数中声明变量）的时候，垃圾回收器将其标记为“进入环境”，当变量离开环境的时候（函数执行结束）将其标记为“离开环境”，在离开环境之后还有的变量则是需要被删除的变量。

引用计数：机制就是跟踪一个值的引用次数，当声明一个变量并将一个引用类型赋值给该变量时该值引用次数加1，当这个变量指向其他一个时该值的引用次数便减一。当该值引用次数为0时就会被回收。

## 闭包

闭包函数：声明在一个函数中的函数，叫做闭包函数。

闭包：内部函数总是可以访问其所在的外部函数中声明的参数和变量，即使在其外部函数被返回（寿命终结）了之后。

特点：
让外部访问函数内部变量成为可能；

局部变量会常驻在内存中；

可以避免使用全局变量，防止全局变量污染；

会造成内存泄漏（有一块内存空间被长期占用，而不被释放）

```js
var name = '余光';

function foo() {
  console.log(name); // 余光 
}

foo(); //余光
```

## call、apply和bind的区别

相同点：
作用相同，都是动态修改this指向；都不会修改原先函数的this指向。

异同点：
(1)执行方式不同：

call和apply是改变后页面加载之后就立即执行，是同步代码。

bind是异步代码，改变后不会立即执行；而是返回一个新的函数。

(2)传参方式不同：

call和bind传参是一个一个逐一传入，不能使用剩余参数的方式传参。

apply可以使用数组的方式传入的，只要是数组方式就可以使用剩余参数的方式传入。

```js
const arr = [1, 2, 3, 4, 5, 6];
function fn(...b) {
  let a = b.reduce((sum, item) => sum += item, 0);
  console.log(this, b, a); // Window Array(6) 21
};
fn(...arr); 

const obj = {
  name: '张三',
};

fn.call(obj, 1, 2); // Object Array(2) 3
```

```js
function fn(a, b) {
  console.log(this, a + b); // Window 3
};
fn(1, 2); //window

const obj = {
  name: '张三',
};

fn.apply(obj, [3, 4]); //Object 7
```

```js
function fn(a, b) {
  console.log(this, a + b);
};
fn(1, 2); //Window 3 

const obj = {
  name: '张三',
};

let newfn = fn.bind(obj); 
newfn(5, 6); //Object 11
```

(3)修改this的性质不同：

call、apply只是临时的修改一次，也就是call和apply方法的那一次；当再次调用原函数的时候，它的指向还是原来的指向。

```js
function fn() {
  console.log(this);
};
fn(); //window

const obj = {
  name: '张三',
};

fn.call(obj); // Object
fn.apply(obj); // Object
fn(); //window
```

```js
function fn() {
  console.log(this);
};
fn(); //Window

const obj = {
  name: '张三',
};

let newfn = fn.bind(obj); 
newfn(); //Object
fn(); //Window 返回的是一个新的函数
```

## 普通函数this指向

1. this指向直接调用者；
2. 找不到调用者时即为window；

```js
function fun(){
console.log(this.num);
}
var obj = {
num:'1',
f:fun
}
var num = 2;
obj.f(); // 1 此处是obj调用了函数fun,所以fun函数内this指向obj,故而输出1
fun(); // 2 此处无明显调用者，顾指向window,所以输出2
```

```js
function foo() {
  console.log(this.a);
}
var obj2 = {
  a: 2,
  fn: foo
};
var obj1 = {
  a: 1,
  o1: obj2
};
obj1.o1.fn(); //2 此处fn的直接调用者是o1,即obj2；
```

```js
var a = 1;
setTimeout(function(){
  console.log(this.a) //1 定时器中的this指向window
},100)
```

```js
var a = 1;
function(){
  console.log(this.a) //1 匿名函数的this指向window
}()
```

## 箭头函数this指向

指向箭头函数定义的时候所处的对象，而不是其所使用的时候所处的对象，默认指向父级的this。

```js
const global = () => {
	console.log(this);
}
global(); // window
```

```js
const Person = {
    realname: '张三',
    age: 19,
    say: () => {
        console.log(this);
    }
}
Person.say(); //window
```

## 原型与原型链

原型：
①所有引用类型都有一个__proto__(隐式原型)属性，属性值是一个普通的对象
②所有函数都有一个prototype(原型)属性，属性值是一个普通的对象
③所有引用类型的__proto__属性指向它构造函数的prototype

原型链：
当访问一个对象的某个属性时，会先在这个对象本身属性上查找，如果没有找到，则会去它的__proto__隐式原型上查找，即它的构造函数的prototype，如果还没有找到就会再在构造函数的prototype的__proto__中查找，这样一层一层向上查找就会形成一个链式结构，我们称为原型链。

①一直往上层查找，直到到null还没有找到，则返回undefined
②Object.prototype.__proto__ === null
③所有从原型或更高级原型中的得到、执行的方法，其中的this在执行时，指向当前这个触发事件执行的对象

Vue.prototype.axios = axios 在组件的实例对象this上挂载axios。

## 类型判定

```js
//typeof
typeof "";  //string
typeof 1;   //number
typeof false; //boolean
typeof undefined; //undefined
typeof function(){}; //function
typeof []; //object
typeof {}; //object
typeof Symbol(); //symbol
typeof null; //object
typeof NaN; // number
typeof new Date(); //object
typeof new RegExp(); //object

//instanceof
// instanceof 运算符用来检测 constructor.prototype 是否存在于参数 object 的原型链上。
{} instanceof Object; //true
[] instanceof Array;  //true
[] instanceof Object; //true
"123" instanceof String; //false
new String(123) instanceof String; //true

//constructor
"".constructor //ƒ String() { [native code] }
"".constructor == String //true
1.constructor //报错 Invalid or unexpected token
new Number(1).constructor //ƒ Function() { [native code] }
new Number(1).constructor == Number //false
new Date().constructor //ƒ Date() { [native code] }
new RegExp().constructor //ƒ RegExp() { [native code] }

//Object.prototype.toString()
Object.prototype.toString.call(""); //[object String]
Object.prototype.toString.call(1); //[object Number]
Object.prototype.toString.call(false); //[object Boolean]
Object.prototype.toString.call(undefined); //[object Undefined]
Object.prototype.toString.call(function(){}); //[object Function]
Object.prototype.toString.call([]); //[object Array]
Object.prototype.toString.call({}); //[object Object]
Object.prototype.toString.call(Symbol()); //[object Symbol]
Object.prototype.toString.call(null); //[object Null]
Object.prototype.toString.call(new Date()); //[object Date]
Object.prototype.toString.call(new RegExp()); //[object RegExp]
```

## null和undefined的区别

null是一个表示"无"的对象，转为数值时为0；undefined是一个表示"无"的原始值，转为数值时为NaN。当声明的变量还未被初始化时，变量的默认值为undefined。

null用来表示尚未存在的对象。

undefined表示"缺少值"，就是此处应该有一个值，但是还没有定义。典型用法是：
（1）变量被声明了，但没有赋值时，就等于undefined。
（2）调用函数时，应该提供的参数没有提供，该参数等于undefined。
（3）对象没有赋值的属性，该属性的值为undefined。
（4）函数没有返回值时，默认返回undefined。

null表示"没有对象"，即该处不应该有值。典型用法是：
（1）作为函数的参数，表示该函数的参数不是对象。
（2）作为对象原型链的终点。

## new操作符具体干了什么

1、创建一个空的对象

```js
var obj = {};
```

2、让空对象的原型属性指向原型链，设置原型链

```js
obj.__proto___ = Func.prototype;
```

3、让构造函数的this指向obj，并执行函数体

```js
var result = Func.call(obj);
```

4、判断返回类型，如果是值就返回这个obj，如果是引用类型，返回这个引用对象。

```js
if (typeof(result) == "object"){
  func = result;
}
else{
    func = obj;
}
```

## ajax原理

1、创建对象

```js
var xhr = new XMLHttpRequest();
```

2、打开请求

```js
xhr.open('GET', 'example.txt', true);
```

3、发送请求

```js
xhr.send(); //发送请求到服务器
```

4、接收响应

```js
xhr.onreadystatechange = function(){}
```

(1)当readystate值从一个值变为另一个值时，都会触发readystatechange事件。
(2)当readystate==4时，表示已经接收到全部响应数据。
(3)当status ==200时，表示服务器成功返回页面和数据。
(4)如果(2)和(3)内容同时满足，则可以通过xhr.responseText，获得服务器返回的内容。

## 防抖和节流

1.防抖(debounce)：触发高频事件 n 秒后函数只会执行一次，如果 n 秒内高频事件再次被触发，则重新计算时间
举例：就好像在百度搜索时，每次输入之后都有联想词弹出，这个控制联想词的方法就不可能是输入框内容一改变就触发的，他一定是当你结束输入一段时间之后才会触发。

通过定时器，如果定时器还没结束触发第二次，则将上一次定时器清空，执行新的一个定时器，直到事件完成。

2.节流(thorttle)：高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执行频率。也可以是轮询的稀释，不需要在请求成功后立马再次发出请求。
举例：就比如抢购时，明明显示的是有产品，购买时却一直提示库存不足，过一会眼睁睁的看着它数值变成了0 。

利用时间戳，将此时的时间戳减去上一次执行的时间戳，如果时间没大于规定时间，则无法执行事件。

### 区别

防抖动是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行。

## Symbol

Symbol 是 ES6 新推出的一种基本类型，它表示独一无二的值。它最大的用途就是用来定义对象唯一的属性名，就能保证不会出现同名的属性，还能防止某一个属性被不小心覆盖。

### 用法

通过Symbol()方法可以生成一个symbol，里面可以带参数，也可以不带参数。

### Symbol 类型的注意点

- Symbol 函数前不能使用 new 命令，否则会报错。
- Symbol 函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。
- Symbol值不能与其他类型值运算，不能转数值；可以转字符串和布尔值
  不能用.运算符，要用方括号
- Symbol 作为属性名时，该属性不会出现在 for…in、for…of 循环中，也不会被 Object.keys() 返回。
- Object.getOwnPropertySymbols 方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。
- Symbol.for 接受一个字符串作为参数，首先在全局中搜索有没有以该参数为名称的Symbol值。如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。

## javaScript常用的字符串方法

1. length 属性返回字符串的长度

2. toLowerCase(): 把字符串转为小写，返回新的字符串

3. toUpperCase(): 把字符串转为大写，返回新的字符串

4. charAt(): 返回指定下标位置的字符。如果index不在0-str.length(不包含str.length)之间，返回空字符串

5. charCodeAt() 方法返回字符串中指定索引的字符 unicode 编码,这个返回值是 0 - 65535 之间的整数

   **注意**：如果index不在0-str.length(不包含str.length)之间，返回NaN。

6. indexOf(): 返回某个指定的子字符串在字符串中第一次出现的位置

   **注意**：indexOf()方法对大小写敏感，如果子字符串没有找到，返回-1。第二个参数表示从哪个下标开始查找，没有写则默认从下标0开始查找。

7. lastIndexOf(): 返回某个指定的子字符串在字符串中最后出现的位置

   **注意**：lastIndexOf()方法对大小写敏感，如果子字符串没有找到，返回-1。第二个参数表示从哪个下标开始查找，没有写则默认从最后一个字符处开始查找。

8. search执行一个正则表达式匹配查找。如果查找成功，返回字符串中匹配的索引值。否则返回 -1 。

9. replace(): 在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串

10. concat() 将两个或多个字符的文本组合起来，返回一个新的字符串。

11. match(): 返回所有查找的关键字内容的数组

12. trim() 方法删除字符串两端的空白符

13. slice(): 返回字符串中提取的子字符串

    ```js
    var str = "Hello World";
    var str1 = str.slice(2); // 如果只有一个参数，则提取开始下标到结尾处的所有字符串
    var str2 = str.slice(2,7); // 两个参数，提取下标为2，到下标为7但不包含下标为7的字符串
    var str3 = str.slice(-7,-2); // 如果是负数，-1为字符串的最后一个字符。提取从下标-7开始到下标-2但不包含下标-2的字符串。前一个数要小于后一个数，否则返回空字符串
    
    console.log(str1); // llo World
    console.log(str2); // llo W
    console.log(str3); // o Wor
    ```

14. substring(): 提取字符串中介于两个指定下标之间的字符

    ```js
    var str = "Hello World";
    var str1 = str.substring(2)
    var str2 = str.substring(2,2);
    var str3 = str.substring(2,7);
    console.log(str1); //llo World
    console.log(str2); //如果两个参数相等，返回长度为0的空串
    console.log(str3); //llo W
    ```

15. substr(): 返回从指定下标开始指定长度的的子字符串

    ```js
    var str = "Hello World";
    var str1 = str.substr(1) // 如果没有指定length,返回从下标开始处结尾处的所有字符串
    var str2 = str.substr(1,3);
    var str3 = str.substr(-3,2);
    console.log(str1); //ello World 
    console.log(str2); //ell
    console.log(str3); //rl
    ```

16. split(): 把字符串分割成字符串数组

    ```js
    var str = "AA BB CC DD";
    var string1 = "1:2:3:4:5";
    var str1 = str.split("");// 如果把空字符串 ("")用作分割符，那么字符串的每个字符之间都会被分割
    var str2 = str.split(" "); // 以空格为分隔符
    var str3 = str.split("",4); // 4指定返回数组的最大长度
    var str4 = string1.split(":");
    console.log(str1); // ["A", "A", " ", "B", "B", " ", "C", "C", " ", "D", "D"]
    console.log(str2); // ["AA" "BB" "CC" "DD"]
    console.log(str3); // ["A", "A", " ", "B"]
    console.log(str4); // ["1", "2", "3", "4", "5"]
    ```

## javaScript常用数组方法

### posh()

功能: 在数组最后一位添加一个或多个元素,并返回新数组的长度,改变原数组.(添加多个元素用逗号隔开)

```js
var arr = [1, 2, "c"];
var rel = arr.push("A", "B");
console.log(arr); // [1, 2, "c", "A", "B"]
console.log(rel); //  5  (数组长度)
```

### pop()

功能：删除数组的最后一位，并且返回删除的数据，会改变原来的数组。(该方法不接受参数,且每次只能删除最后一个)

```js
var arr = [1, 2, "c"];
var rel = arr.pop();
console.log(arr); // [1, 2]
console.log(rel); // c
```

### shift()

功能：删除数组的第一位数据，并且返回被删除的数据，会改变原来的数组。(该方法同pop()；一样不接受参数,且每次只能删除数组第一个)

```js
var arr = ["a","b", "c"];
var rel = arr.shift();
console.log(arr); // ['b', "c"]
console.log(rel); // a
```

### unshift()

功能： 在数组第一位添加一个或多个元素，并返回新数组的长度，改变原数组。(添加多个元素用逗号隔开)

```js
var arr = [1, 2, "c"];
var rel = arr.unshift("A", "B");
console.log(arr); // [ "A", "B",1, 2, "c"]
console.log(rel); //  5  (数组长度)
```

### sort()

功能：方法用于对数组的元素进行排序,并返回数组。默认排序顺序是根据字符串Unicode码点。

```js
var arr1 = [10, 1, 5, 2, 3];
arr1.sort();
console.log(arr1); // 1 10 2 3 5
```

如果 function(a, b) {return: a - b;} ，=> a - b < 0 那么 a 会被排列到 b 之前; (从小到大排序)
如果 function(a, b) {return: b - a;} ，=> b - a > 0 那么 b 会被排列到 a 之前; (从大到小排序)

```js
var arr = [10, 1, 5, 2, 3];
arr.sort(function (a, b) {
  return a - b;
});
console.log(arr); // 1 2 3 5 10
```

### reverse()

功能：将数组的数据进行反转，并且返回反转后的数组，会改变原数组。

```js
var arr = [1, 2, 3, "a", "b", "c"];
var rel = arr.reverse();
console.log(arr); //    ["c", "b", "a", 3, 2, 1]
console.log(rel); //    ["c", "b", "a", 3, 2, 1]
```

### splice()

功能：向数组中添加，或从数组删除，或替换数组中的元素，然后返回被删除/替换的元素所组成的数组。可以实现数组的增删改。

arrayObject.splice(index,howmany,item1,…,itemX)
index 必需。整数，规定添加/删除项目的位置（元素下标），使用负数可从数组结尾处规定位置。
howmany 必需。要删除的项目数量。如果设置为 0，则不会删除项目。
item1, …, itemX 可选。向数组添加的新项目。

```js
var arr = ["a", "b", "c", 2, 3, 6];
var rel = arr.splice(2, 1, "add1", "add2");
console.log(arr); // a b add1 add2 2 3 6
console.log(rel); // c 
```

### concat()

功能： 数组的拼接(将多个数组或元素拼接形成一个新的数组),不改变原数组。

```js
var arr1 = [1, 2, 3];
var arr2 = ["a", "b", "c"];
var arr3 = ["A", "B", "C"];
var rel = arr1.concat(arr2, arr3);
console.log(arr1); // 1 2 3
console.log(rel); // 1 2 3 a b c A B C
```

### join()

功能：用特定的字符,将数组拼接形成字符串 (默认",")。

```js
var list = ["a", "b", "c", "d"]; // "a-b-c-d"
var result = list.join("-");     //"a-b-c-d"
var result = list.join("/");     //"a/b/c/d"
var result = list.join("");      //"abcd"
var result = list.join();        //  a,b,c,d
console.log(result);
```

### slice()

功能：裁切指定位置的数组，返回值为被裁切的元素形成的新数组 ，不改变原数组。
同concat() 方法 slice() 如果不传参数,会使用默认值,得到一个与原数组元素相同的新数组 (复制数组)

arr[].slice(startIndex,endIndex)
startIndex 起始下标 默认值 0
endIndex 终止下标 默认值 length,可以接收负数,(倒着数)

```js
var list = ["a", "b", "c", "d"];
var result = list.slice(1, 3);
console.log(result);  // ["b", "c"] 左闭右开
```

### toString()

功能: 直接将数组转换为字符串,并且返回转换后的新数组,不改变原数组,与join()方法不添加任何参数相同。

```js
var list = ["a", "b", "c", "d"];
var rel = list.toString();
console.log(rel);   // a,b,c,d   (字符串类型)
```

### valueOf()

功能: 返回数组的原始值（一般情况下其实就是数组自身）。

```js
var list = [1, 2, 3, 4];
var rel = list.valueOf();
console.log(list); // [1, 2, 3, 4]
console.log(rel); // [1, 2, 3, 4]
```

### indexOf()

功能: 查询某个元素在数组中第一次出现的位置 存在该元素,返回下标,不存在 返回 -1 (可以通过返回值 变相的判断是否存在该元素)。

```js
var list = [1, 2, 3, 4];
var index = list.indexOf(4); //3
var index = list.indexOf("4"); //-1
console.log(index);
```

### lastIndexOf()

功能: 查询某个元素在数组中最后一次出现的位置 (或者理解为反向查询第一次出现的位置) 存在该元素,返回下标,不存在 返回 -1 (可以通过返回值 变相的判断是否存在该元素)。

```js
var list = [1, 2, 3, 4];
var index = list.lastIndexOf(4); //3
var index = list.lastIndexOf("4"); //-1
console.log(index);
```

### forEach()

功能: 遍历数组,每次循环中执行传入的回调函数。(注意: forEach() 对于空数组是不会执行回调函数的。) 没有返回值,或理解为返回值为undefined,不改变原数组。

```js
arr[].forEach(function(value,index,array){
　 //do something
})
```

参数: value:每次循环的当前元素, index:当前项的索引, array:原始数组。

```js
var list = [32, 93, 77, 53, 38, 87];
var res = list.forEach(function (item, index, array) {
  console.log(item, index, array);
});
console.log(res);
```

### map()

功能: 遍历数组, 每次循环时执行传入的回调函数,根据回调函数的返回值,生成一个新的数组,同forEach() 方法,但是map()方法有返回值,可以return出来。

```js
arr[].map(function(item,index,array){
　//do something
  return XXX
})
```

参数： item:每次循环的当前元素, index:当前项的索引, array:原始数组；

```js
var list = [32, 93, 77, 53, 38, 87];
var res = list.map(function (item, index, array) {
  return item + 5 * 2;
});
console.log("原数组", list);
console.log("新数组", res);
```

### filter()

功能: 遍历数组, 每次循环时执行传入的回调函数,回调函数返回一个条件,把满足条件的元素筛选出来放到新数组中。

```js
arr[].filter(function(item,index,array){
　//do something
　return XXX //条件
})
```

参数： item:每次循环的当前元素, index:当前项的索引, array:原始数组。

```js
var list = [32, 93, 77, 53, 38, 87];
var resList = list.filter(function (item, index, array) {
  return item >= 60; // true || false
});
console.log(resList);
```

### every()

功能: 遍历数组, 每次循环时执行传入的回调函数,回调函数返回一个条件,全都满足返回true 只要有一个不满足 返回false => 判断数组中所有的元素是否满足某个条件。

```js
var list = [32, 93, 77, 53, 38, 87];
var result = list.every(function (item, index, array) {
  console.log(item, index, array);
  return item >= 50;
});
console.log(result); // false
```

### some()

功能: 遍历数组, 每次循环时执行传入的回调函数,回调函数返回一个条件,只要有一个元素满足条件就返回true,都不满足返回false => 判断数组中是否存在,满足某个条件的元素。

```js
var list = [32, 93, 77, 53, 38, 87];
var result = list.some(function (item, index, array) {
  console.log(item, index, array);
  return item >= 50;
});
console.log(result); // true
```

### reduce()

功能: 遍历数组, 每次循环时执行传入的回调函数,回调函数会返回一个值,将该值作为初始值prev,传入到下一次函数中, 返回最终操作的结果;

语法: arr.reduce(function(prev,item,index,array){})

参数:
prev 初始值 (类似求和是 sum=0) 可以设置初始值( 参数),如果不设置初始值默认是数组中的第一个元素,遍历时从第二个元素开始遍历
item 每次循环的当前元素
index 每次循环的当前下标
array 原数组

```js
var arr = [2, 3, 4, 5];
var sum = arr.reduce(function (prev, item, index, array) {
  console.log(prev, item, index, array);
  return prev + item;
});
console.log(arr, sum);
```

### reduceRight()

功能: 用法同reduce,只不过是从右向左。

```js
var arr = [2, 3, 4, 5];
var sum = arr.reduceRight(function (prev, item, index, array) {
  console.log(prev, item, index, array);
  return prev + item;
});
console.log(arr, sum);
```

### includes()

功能: 用来判断一个数组是否包含一个指定的值，如果是返回 true，否则false。

```js
let site = ['runoob', 'google', 'taobao'];
 
site.includes('runoob'); 
// true 
 
site.includes('baidu'); 
// false
```

### Array.from()

功能: 将一个类数组对象或者可遍历对象转换成一个真正的数组。

注意 将一个类数组对象转换为一个真正的数组，必须具备以下条件：

1、该 伪数组 / 类数组 对象必须具有length属性，用于指定数组的长度。如果没有length属性，那么转换后的数组是一个空数组。
2、该 伪数组 / 类数组 对象的属性名必须为数值型或字符串型的数字。

```js
var all = {
  0: "张飞",
  1: "28",
  2: "男",
  3: ["率土", "鸿图", "三战"],
  length: 4,
};
var list = Array.from(all);
console.log(all);
console.log(list, Array.isArray(list));
```

### find()

功能: 遍历数组 每次循环 执行回调函数,回调函数接受一个条件 返回满足条件的第一个元素,不存在则返回undefined。

参数:
item:必须 , 循环当前元素
index:可选 , 循环当前下标
array:可选 , 当前元素所属的数组对象

```js
var list = [55, 66, 77, 88, 99, 100];
var res= list.find(function (item, index, array) {
  return item > 60;
});
console.log(res); //66
```

该方法可快速查找对象数组满足条件的项

```js
let arr = [{ id: 1, name: 'coco' }, { id: 2, name: 'dudu' }]
let res = arr.find(item => item.id == 1)
console.log('res', res)  //res {id: 1, name: "coco"}
```

### findIndex()

功能 遍历数组,执行回调函数,回调函数接受一个条件,返回满足条件的第一个元素下标,不存在则返回-1。

参数
item:必须 , 循环当前元素
index:可选 , 循环当前下标
array:可选 , 当前元素所属的数组对象

注意
findIndex();和indexOf();不同 (刚接触时乍一看和indexOf()怎么一模一样,仔细看了下才发现大有不同)
indexOf是传入一个值.找到了也是返回索引,没有找到也是返回-1 ,属于ES5
findIndex是传入一个测试条件,也就是函数,找到了返回当前项索引,没有找到返回-1. 属于ES6

```js
var list = [55, 66, 77, 88, 99, 100];
var index = list.findIndex(function (item, index, array) {
  console.log(item, index, array);
  return item > 60;
});
console.log(index); // 1
```

该方法可快速查找对象数组满足条件的索引，indexOf不支持

```js
let arr = [{ id: 1, name: 'coco' }, { id: 2, name: 'dudu' }]
let res = arr.findIndex(item => item.id == 1)
console.log('res', res)  //res 0
```

### fill()

功能 用给定值填充一个数组。

参数
value 必需。填充的值。
start 可选。开始填充位置。
end 可选。停止填充位置 (默认为 array.length)

```js
var result = ["a", "b", "c"].fill("填充", 1, 2);
console.log('result', result)  // a 填充 b
```

### flat()

功能： 用于将嵌套的数组"拉平",变成一维的数组。该方法返回一个新数组，对原数据没有影响。

注意： 默认拉平一次 如果想自定义拉平此处 需要手动传参 ,如果想全都拉平 传 Infinity

```js
var list = [1, 2, [3, 4, [5]]];
var arr = list.flat(); // 默认拉平一次
console.log("拉平一次", arr); // [1, 2, 3, 4, [5]]

var arr = list.flat(2); // 拉平2次
console.log("拉平两次", arr); // [1, 2, 3, 4, 5]

[1, 2, , 4, 5].flat()
// [1, 2, 4, 5]
```

### flatMap()

功能： flat()和map()的组合版 , 先通过map()返回一个新数组,再将数组拉平( 只能拉平一次 )

```js
var list = [55, 66, 77, 88, 99, 100];
var newArr = list.map(function (item, index) {
  return [item, index];
});
console.log("Map方法:", newArr);

var newArr = list.flatMap(function (item, index) {
  return [item, index];
});
console.log("flatMap方法:", newArr);
```

## Map 和 Set

Map是一组键值对的结构，具有极快的查找速度。

```js
var names = ['Michael', 'Bob', 'Tracy'];
var scores = [95, 75, 85];
var m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);
m.get('Michael'); // 95
```

初始化Map需要一个二维数组，或者直接初始化一个空Map。Map具有以下方法：

```js
var m = new Map(); // 空Map
m.set('Adam', 67); // 添加新的key-value
m.set('Bob', 59);
m.has('Adam'); // 是否存在key 'Adam': true
m.get('Adam'); // 67
m.delete('Adam'); // 删除key 'Adam'
m.get('Adam'); // undefined
```

Set和Map类似，也是一组key的集合，但不存储value。由于key不能重复，所以，在Set中，没有重复的key。
要创建一个Set，需要提供一个Array作为输入，或者直接创建一个空Set

```js
var s1 = new Set(); // 空Set
var s2 = new Set([1, 2, 3]); // 含1, 2, 3
```

重复元素在Set中自动被过滤

```js
var s = new Set([1, 2, 3, 3, '3']);
console.log(s); // Set {1, 2, 3, "3"}
```

通过add(key)方法可以添加元素到Set中，可以重复添加，但不会有效果：

```js
s.add(4);
console.log(s); // Set {1, 2, 3, 4}
s.add(4);
console.log(s); // 仍然是 Set {1, 2, 3, 4}
```

通过delete(key)方法可以删除元素：

```js
var s = new Set([1, 2, 3]);
console.log(s); // Set {1, 2, 3}
s.delete(3);
console.log(s); // Set {1, 2}
```

## Map 和 Object 的区别

### 概念

#### Object

在ECMAScript中，Object是一个特殊的对象。它本身是一个顶级对象，同时还是一个构造函数，可以通过它（如：new Object()）来创建一个对象。我们可以认为JavaScript中所有的对象都是Object的一个实例，对象可以用字面量的方法const obj = {}即可声明。

#### Map

Map是Object的一个子类，可以有序保存任意类型的数据，使用键值对去存储，其中键可以存储任意类型，通过const m = new Map();即可得到一个map实例。

### 访问属性

map: 通过map.get(key)方法去属性, 不存在则返回undefined

object: 通过obj.a或者obj[‘a’]去访问一个属性, 不存在则返回undefined

### 添加属性

map: 通过map.set去设置一个值，key可以是任意类型

object: 通过object.a = 1或者object[‘a’] = 1，去赋值，key只能是字符串，数字或symbol

### 删除属性

map: 通过map.delete去删除一个值，试图删除一个不存在的属性会返回false

object: 通过delete操作符才能删除对象的一个属性，诡异的是，即使对象不存在该属性，删除也返回true，当然可以通过Reflect.deleteProperty(target, prop) 删除不存在的属性还是会返回true。

## JSON

### 含义

JSON 指的是 JavaScript 对象表示法（JavaScript Object Notation）
JSON 是轻量级的文本数据交换格式
JSON 独立于语言：JSON 使用 Javascript语法来描述数据对象，但是 JSON 仍然独立于语言和平台。JSON 解析器和 JSON 库支持许多不同的编程语言。 目前非常多的动态（PHP，JSP，.NET）编程语言都支持JSON。
JSON 具有自我描述性，更易理解

### JSON常用方法

JSON.parse(): 将一个 JSON 字符串转换为 JavaScript 对象。
JSON.stringify():于将 JavaScript 值转换为 JSON 字符串。

## 类数组对象

理解：是JS中一种特殊的对象。本质上来说对象是满足了一定条件的数组，类数组的使用目的在于使得一个对象既有数组的特性也具有对象的特性。

```js
var arr = ['name', 'age', 'sex']; // 数组
var arrLike = {
  0: 'name',
  1: 'age',
  2: 'sex',
  length: 3
} // 类数组
```

类数组对象与数组的性质相似，因为类数组对象在访问、赋值、获取长度上的操作与数组一致。

数组与类数组对象的访问

```js
console.log(arr[0]); // name
console.log(arrLike[0]); // name
```

数组与类数组对象的赋值

```js
arr[0] = 'newName';
arrLike[0] = 'newName';
```

获取数组与类数组对象的长度

```js
console.log(arr.length); // 3
console.log(arrLike.length); // 3
```

类数组与数组的区别：类数组对象不能直接使用数组的方法

类数组对象使用数组方法时会报错

```js
arrLike.push('address');  // Uncaught TypeError: arrLike.push is not a function
```

### 类数组使用数组方法

```js
// 使用 call 方法
Array.prototype.push.call(arrLike, 'address');
console.log(arrLike); // { '0': 'name', '1': 'age', '2': 'sex', '3': 'address', length: 4 }
var arrLikeStr = Array.prototype.join.call(arrLike, '&')
console.log(arrLikeStr); // name&age&sex&address
```

```js
// 使用 apply 方法
Array.prototype.push.apply(arrLike, ['address']);
console.log(arrLike); // { '0': 'name', '1': 'age', '2': 'sex', '3': 'address', length: 4 }
var arrLikeStr = Array.prototype.join.apply(arrLike, ['&'])
console.log(arrLikeStr); // name&age&sex&address
```

### 类数组转化为数组

```js
// 使用 call 方法
console.log(Array.prototype.slice.call(arrLike,0));
console.log(Array.prototype.splice.call(arrLike,0));  // 会改变原先的类数组对象
```

```js
// 使用 apply 方法
console.log(Array.prototype.slice.apply(arrLike,[0]));
console.log(Array.prototype.splice.apply(arrLike,[0]));  // 会改变原先的类数组对象
```

## arguments

在函数体中定义 Arguments 对象，其包含函数的参数和其它属性，以 arguments 变量来指代。

```js
function fn(name, age, sex) {
    console.log(arguments);
}

fn('Scojing', '20', '女')
```

```js
function fn(name, age, sex) {
    console.log(arguments.length);  // 2
}

fn('Scojing', '20')
```

## for..in 和 for..of 的区别

### for..in

for...in是为遍历对象属性而构建的，它以任意顺序遍历一个对象的除Symbol以外的可枚举属性，可用break或者throw跳出。

```js
let obj = {
  name: '张三',
  age: 18
}

for(let item in obj) {
  console.log(item)
}
// 输出 name age
```

在JavaScript中，数组也是对象的一种，所以数组也是可以使用for...in遍历

```js
let arr = ['a', 'b', 'c']

for(let item in arr) {
  console.log(item)
}
// 输出 0 1 2
```

### for..of

for...of语句在可迭代对象上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句（包括Array，Map，Set，String，TypedArray，arguments等等，不包括Object），可用break或者throw跳出。

```js
let arr = ['a', 'b', 'c']

let obj = {
  name: '张三',
  age: 18,
  sex: '男'
}

for (let i of arr) {
  console.log(i)
}
// 输出 a b c

for (let i of obj) {
  console.log(i)
}
// 报错 obj is not iterable (obj不是可迭代的)
```

### 两者区别

无论是for...in还是for...of都是迭代一些东西。它们之间的主要区别在于它们的迭代方式

- for...in语句以任意顺序迭代对象的可枚举属性
- for...of语句遍历可迭代对象定义要迭代的数据

总之，for...in 循环主要是为了遍历对象而生，不适用于遍历数组

for...of 循环可以用来遍历数组、类数组对象，字符串、Set、Map 以及 Generator 对象

```js
let arr = ['a', 'b', 'c']

Array.prototype.ufo = '张三'

for(let item in arr) {
  console.log(item)
}
// 输出 0 1 2 ufo

for(let item of arr) {
  console.log(item)
}
// 输出 a b c
```

## 使用for....of遍历对象的方法

### 遍历类数组对象

使用Array.from()方法将对象转换为数组

```js
var obj = {
  0:'one',
  1:'two',
  length: 2
};
obj = Array.from(obj);
for(var k of obj){
  console.log(k)
}
```

### 遍历普通对象

- 给对象添加一个[symbol.iterator]属性，并指向一个迭代器。

```js
var obj = {
    a:1,
    b:2,
    c:3
};

obj[Symbol.iterator] = function(){
  var keys = Object.keys(this);
  var count = 0;
  return {
    next(){
      if(count<keys.length){
        return {value: obj[keys[count++]],done:false};
      }else{
        return {value:undefined,done:true};
      }
    }
  }
};

for(var k of obj){
  onsole.log(k);
}
```

- 方法二（使用Generator函数生成迭代器）

```js
var obj = {
    a:1,
    b:2,
    c:3
};
obj[Symbol.iterator] = function*(){
    var keys = Object.keys(obj);
    for(var k of keys){
        yield [k,obj[k]]
    }
};

for(var [k,v] of obj){
    console.log(k,v);
}
```

## for 和 forEach区别

- for循环可以使用break跳出循环，但forEach不能。
- for循环可以控制循环起点（i初始化的数字决定循环的起点），forEach只能默认从索引0开始。
- for循环过程中支持修改索引（修改 i），但forEach做不到（底层控制index自增，无法左右它）。

## Promise

Promise 是异步编程的一种解决方案：从语法上讲，promise是一个对象，从它可以获取异步操作的消息；从本意上讲，它是承诺，承诺它过一段时间会给你一个结果。

promise有三种状态： pending(等待态)，fulfilled(成功态)，rejected(失败态)；状态一旦改变，就不会再变。创造promise实例后，它会立即执行。

promise是用来解决两个问题的：   回调地狱，代码难以维护， 常常第一个的函数的输出是第二个函数的输入这种现象   promise可以支持多个并发的请求，获取并发请求中的数据   这个promise可以解决异步的问题，本身不能说promise是异步的。

## 普通函数和箭头函数的区别

1. 箭头函数没有prototype(原型)，箭头函数没有自己的this，继承的是外层代码块的this。
2. 不可以当做构造函数，也就是说不可以使用new命令，否则会报错的。
3. 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
4. 不可以使用yield命令，因此箭头函数不能用作 Generator（生成器） 函数。
5. 因为没有this，所以不能使用call、bind、apply来改变this的指向。

## 预加载和懒加载

### 懒加载

懒加载也叫延迟加载，延迟加载网络资源或符合某些条件时才加载资源。常见的就是图片延时加载。

意义：懒加载的主要目的是作为服务器前端的优化，减少请求数或延迟请求数。

懒加载实现：

1. 第一种是纯粹的延迟加载，使用setTimeOut或setInterval进行加载延迟。
2. 条件加载，符合某些条件，或触发了某些事件才开始异步下载。
3. 第三种是可视区加载，即仅加载用户可以看到的区域，这个主要由监控滚动条来实现，一般会在距用户看到某图片前一定距离遍开始加载，这样能保证用户拉下时正好能看到图片。

### 预加载

提前加载图片，当用户需要查看时可直接从本地缓存中渲染。

两者的行为是相反的，一个是提前加载，一个是迟缓甚至不加载。懒加载对服务器前端有一定的缓解压力作用，预加载则会增加服务器前端压力。预加载应用如广告弹窗等。

## JavaScript定义类的四种方法

### 工厂方法

```js
function createPerson(name, age) {
    var obj = new Object();
    obj.name = name;
    obj.age = age;
    obj.sayName = function() {
        alert(this.name);
    }
    return obj;
}
```

### 构造函数方法

```js
function Person(name, age) {
    this.name = name;
    this,age = age;
    this.sayName = function() {
        alert(this.name)
    }
}

var p1 = new Person('zhang'， 18);
var p2 = new Person('li'， 20);
```

### 原型方法

```js
function Person() {}
Person.prototype = {
    constructor : Person,
    name : 'Ning';
    age : 18;
    sayName : funciton() {
		alert(this.name)
    }
}
```

### 组合使用构造函数和原型方法

```js
function Person(name, age) {
	this.name = name;
    this.age = age;
}

Person.prototype = {
    constructor : Person;
    sayName : function() {
        alert(this.name);
    }
}
```

## JavaScript实现继承的3种方法

### 借用构造函数法

```js
function SuperType(name) {
	this.name = name;
	this.sayName = function() {
		alert(this.name)
	}
}

function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}
```

### 对象冒充

```js
function SuperType(name) {
    this.name = name;
    this.sayName = function() {
        alert(this.name);
    }
}

function SubType(name, age) {
    // 对象冒充
    this.supertype = SuperType;
    this.supertype(name);
    this.age = age;
}
```

### 组合继承

```js
function SuperType(name) {
    this.name = name;
}

SuperType.prototype = {
    sayName : function() {
        alert(this.name);
    }
}

function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}

SubType.prototype = new SuperType();
```

## 回流和重绘

当渲染树中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建。这就称为回流(reflow)。每个页面至少需要一次回流，就是在页面第一次加载的时候。在回流的时候，浏览器会使渲染树中受到影响的部分失效，并重新构造这部分渲染树。完成回流后，浏览器会重新绘制受影响的部分到屏幕中，该过程成为重绘。

### 回流

当元素结构、位置、尺寸或某些属性发生改变时，浏览器需要重新计算样式和渲染数。

触发：页面首次渲染、DOM树变化、元素尺寸或者位置发生变化。

### 重绘

当元素发生的改变只影响了节点的一些样式（背景色、边框颜色、文字颜色等），浏览器只需要将新样式赋予给这个元素并重绘他。

触发：背景色、颜色、字体改变

### 减少回流

1. 尽量避免改变和多次读取布局属性。
2. 节点元素脱离文档流。
3. 不在标签内使用type属性定义。

## XML与JSON的区别

1. 数据体积方面。JSON相对于XML来讲，数据的体积小，传递的速度更快些。
2. 数据交互方面。JSON与JavaScript的交互更加方便，更容易解析处理，更好的数据交互。
3. 数据描述方面。JSON对数据的描述性比XML较差。
4. 传输速度方面。JSON的速度要远远快于XML。

## 深浅拷贝

深浅拷贝是只针对Object和Array这样的引用数据类型的。

引用数据类型栈中储存的指针，堆中储存的是它的实体地址。

### 浅拷贝

浅拷贝只复制在栈内存中的指针，只是在栈内存复制出同样的地址，而不复制对象本身，新旧对象还是共享同一块内存。

### 深拷贝

深拷贝会在内存空间中创造一个一模一样的对象，将原对象遍历到新对象中，新对象跟原对象不共享内存，修改新对象不会改到原对象。

## 跨域

跨域是浏览器的安全限制。

当一个请求url的**协议、域名、端口**三者之间任意一个与当前页面url不同即为跨域。

### 跨域解决方法

#### 1. 设置document.domain解决无法读取非同源网页的cookie问题。

因为浏览器是通过document.domain属性来检查两个页面是否同源，因此只要通过设置相同的document.domain，两个页面就可以共享Cookie（此方案仅限主域相同，子域不同的跨域应用场景。）

```js
// 两个页面都要设置
document.domain = 'test.com';
```

#### 2. JSONP

JSONP 是服务器与客户端跨源通信的常用方法。最大特点就是简单适用，兼容性好（兼容低版本IE），缺点是只支持get请求，不支持post请求。

核心思想：网页通过添加一个`<script>`元素，向服务器请求 JSON 数据，服务器收到请求后，将数据放在一个指定名字的回调函数的参数位置传回来。

```html
// 原生实现

// 向服务器test.com发出请求，该请求的查询字符串有一个callback参数，用来指定回调函数的名字
<script src="http://test.com/data.php?callback=dosomething"></script>

// 处理服务器返回回调函数的数据
<script type="text/javascript">
    function dosomething(res){
        // 处理获得的数据
        console.log(res.data)
    }
</script>
```

```js
// jQuery ajax
$.ajax({
    url: 'http://www.test.com:8080/login',
    type: 'get',
    dataType: 'jsonp',  // 请求方式为jsonp
    jsonpCallback: "handleCallback",    // 自定义回调函数名
    data: {}
});
```

```js
// vue.js
this.$http.jsonp('http://www.domain2.com:8080/login', {
    params: {},
    jsonp: 'handleCallback'
}).then((res) => {
    console.log(res); 
})
```

#### 3. CORS

CORS 是跨域资源分享（Cross-Origin Resource Sharing）的缩写。它是 W3C 标准，属于跨源 AJAX 请求的根本解决方法。

**1、普通跨域请求：只需服务器端设置Access-Control-Allow-Origin**

**2、带cookie跨域请求：前后端都需要进行设置**

**【前端设置】**根据xhr.withCredentials字段判断是否带有cookie

```js
// 原生ajax

// IE8/9需用window.XDomainRequest兼容
var xhr = new XMLHttpRequest(); 
 
// 前端设置是否带cookie
xhr.withCredentials = true;
 
xhr.open('post', 'http://www.domain2.com:8080/login', true);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.send('user=admin');
 
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        alert(xhr.responseText);
    }
};
```

```js
// jQuery ajax

$.ajax({
   url: 'http://www.test.com:8080/login',
   type: 'get',
   data: {},
   xhrFields: {
       // 前端设置是否带cookie
       withCredentials: true 
   },
   // 会让请求头中包含跨域的额外信息，但不会含cookie
   crossDomain: true,  
});
```

```js
// Vue-resource

Vue.http.options.credentials = true;
```

```js
// axios

axios.defaults.withCredentials = true
```

## ES6模块化规范

ES6模块化规范是浏览器和服务端通用的模块化开发规范。

### ES6模块化规范中的定义

1. 每个js文件都是一个独立的模块。
2. 导入其他模块成员使用import关键字。
3. 向外共享模块成员使用export关键字。

### ES6模块化的基本语法

**export暴露**

1. 分别暴露 定义对象前加上export

   ```js
   export let name = 'Tom'
   export function play() {}
   ```

2. 统一暴露 先定义完所有数据，在统一暴露

   ```js
   let name = 'Tom'
   function play() {}
   
   export {name, play}
   ```

3. 默认暴露 将所有的数据写在default对象中

   ```js
   export default {
       name = 'Tom',
       play: function() {}
   }
   ```

**import引入**

1. 通用引入 三种暴露方式都可以引入

   ```js
   import * as m from 'url'
   
   // * : 代表引入改模块中的所有暴露数据
   // as : 重命名
   // as后面的紧跟的m就是别名，m代表引入的这个模块
   // url : 引入模块的地址
   
   // 如果引入的模块是默认暴露的
   m.default.xxx
   // 那么m里面会有一个default对象，这个对象里面保存着默认暴露的所有数据
   ```

2. 结构赋值形式 三种暴露方式都可以引入

   ```js
   import {name, play} from 'url'
   
   // name 和 play 是某个模块里面事先定义并暴露的数据
   // {name, play} 表示引入改模块中暴露的name 和play ，并用同名的变量保存
   
   // 因为会用同名变量保存引入的参数，所以很可能导致命名冲突
   import {name as n, play} from 'url'
   
   // 可以用 as 取别名，这样 n 就代表 name
   // 这时会用 变量n 保存 name
   
   // 如果引入的模块 是 默认暴露的
   import {default as m} from 'url'
   // m 里封装了所有暴露的数据
   ```

3. 简便形式  只适用于默认暴露的模块

   ```js
   import m from 'url'
   
   // url为默认暴露的模块，如果不是会报错
   // m 里封装了所有暴露的数据
   ```

**Script标签**

用到了模块化import 和 export 的 js 文件要是引入到 html 页面中的话 必须给script加上 type = "module" 这个属性
`<script type="module" src="url..."></script>`

## 事件冒泡和事件捕获

### 事件冒泡

事件由子元素传递到父元素的过程叫做冒泡。

**查找事件（事件响应）的顺序**：文本节点–>元素节点—>body—>html—>document（例如点击事件）<向上响应>

**阻止事件冒泡**

1. `事件委托`：将元素的绑定事件写起其父元素上，防止事件冒泡。
2. `event.stopPropagation()`：可以阻止事件冒泡，阻止父级元素的绑定事件。

### 事件捕获

事件由父元素传递到子元素的过程叫做事件捕获。**查找事件（事件响应）的顺序**：document–>html–>body–>元素节点–>文本节点 <向下响应>

## 阻止默认事件

1. `return false` 用于阻止默认事件
2. `事件名.Defalute();` 用于阻止默认事件
3. `event.preventDefault();` 用于阻止默认事件
4. `event.stopPropagation();` 用于阻止冒泡的默认事件

## 阻止冒泡事件

1. `event.stoppropagation()`
2. `return false`
