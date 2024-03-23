---
prev:
  text: 'Uni-app'
  link: '/note/uniapp'
next:
  text: 'Vue2'
  link: '/note/vue2'
---


# TypeScript

## 安装与编译

**安装**：

`npm install typescript -g`

**编译：**

`tsc ./index.ts`

**node 环境编译：**

`npm install ts-node -g`

`npm install tslib @types/node -g`

`ts-node ./index.ts`

## 基础类型(类型注解)

### 字符串类型

字符串类型使用 string 定义

> 注意：string 和 String 是有区别的
>
> string 是 Typescript 中定义的字符串类型，String 是 ECMAScript 中定义的一个类
>
> 类似于 `let date = New Date`

```ts
let a: string = '123'

let str: string = `ddd${a}`
```

### 数字类型

支持十六进制、十进制、八进制和二进制

```ts
let notANumber: number = NaN // Nan
let num: number = 123 // 普通数字
let infinityNumber: number = Infinity // 无穷
let decimal: number = 6 // 十进制
let hex: number = 0xf00d // 十六进制
let binary: number = 0b1010 // 二进制
let octal: number = 0o744 // 八进制
```

### 布尔类型

```ts
// 使用构造函数 Boolean 创造的对象不是布尔值

let createBoolean: boolean = new Boolean(1)
// 报错，new Boolean() 返回的是一个布尔对象
```

```ts
let createBoolean: Boolean = new Boolean(1)
```

```ts
let boolean1: boolean = true
let boolean2: boolean = Boolean(1)
```

### 空值类型

`JavaScript `没有空值的概念，在` TypeScript`中，可以用`void`表示没有返回值的函数。

```ts
function voidFn(): void {
    console.log('test void')
}
```

`void`类型主要是用在我们不希望调用者关薪函数返回值的情况下比如通常的**异步调用函数**

**void也可以定义undefined 和 null 类型**

```ts
let u: void = undefined
// 严格模式下null不能赋予void类型
let n: void = null
```

### Null和undefined类型

```ts
let u: undefined = undefined
let n: null = null
```

## 任意类型

### Any 类型和 unknow 类型

1. 没有强制限定哪种类型，可以随时切换类型，对 any 进行操作不需要任何检查。

   ```ts
   let anys: any = 123
   anys = '123'
   anys = true
   ```

2. 声明变量的时候没有指定任何类型默认为  any。

3. 使用 any 就失去了 TS 类型检查的作用。

4. TypeScript 3.0中引入的 unkonwn 类型也被认为是 top type，它比 any 更安全。

   ```ts
   // any 和 unknown 都可以定义任何类型的值 
   // any 类型可以赋值给其他类型，但是 unknown 只能赋予 any 或者自身
   let names: any = '123'
   let name2: string = names
   // 错误
   let names: unknown = '123'
   let name2: string = names
   ```

5. any 类型在对象中获取没有的属性值不会报错；unknown 不能调用任何属性和方法。

   ```ts
   let obj: any = {b:1}
   obj.a 
   
   // 错误
   let obj: unknown = {a:2, ccc:()=>{}}
   obj.a
   obj.ccc()
   ```

6. 如果要对 unknow 进行操作，必须进行类型缩小，入：

   ```ts
   let foo: unkonw = 'aaa'
   
   // 错误 不能进行任何操作
   console.log(foo.length)
   
   // 正确 进行了类型缩小
   if (typeof foo === string) {
       console.log(foo.length)
   }
   ```

## 字面量类型

```ts
// 1. 字面量类型基本使用
const name: 'zs' = 'zs'
let age: 18 = 18

// 2. 将多个字面量类型联合起来
type Direction = 'right' | 'left' | 'top' | 'bottom'
const d: Direction = 'top'
```

## 类型缩小

```ts
// 1. typeof 使用最多
function Print(val: number | string) {
    if (typeof val === number) {
        console.log(val)
    }
}

// 2. 平等缩小
type Direction = 'right' | 'left' | 'top' | 'bottom'
function d(val: Direction) {
    if (val === 'right') {
        console.log(val)
    }
}

// 3. instanceof
function print(date: string | Date) {
    if (date instanceof Date) {
        console.log(date)
    }
}

// 4. in
interface ISwim {
    swim: () => void
}
interface IRun {
    run: () => void
}
const fish: ISwim = {
    swim: function() {
        
    }
}
const dog: IRun = {
    run: function() {
        
    }
}
funciton move(animal: ISwim | IRun) {
    if ('swim' in animal) {
        
    } else if ('run' in animal) {
        
    }
}
```

## Object object 和 {}

1. Object 类型是所有 Object 类的实例。包含了所有类型。
2. object 代表所有非值的数据类型，例如数组、对象、函数。
3. {} 和 Object一致，但是它无法修改值。

## 接口和对象类型

```ts
// 接口
interface Person {
    b: string,
    a: string
}

// 调用接口
const person: Person = {
    b: 'xxx'
}
// 报错。使用接口约束的时候不能多一个属性也不能少一个属性
```

```ts
// 重名接口 可以合并
interface A {
    name: string
}
interface A {
    age: number
}
const x: A = {
    name: 'xxx',
    age: 123
}
```

```ts
// extends 继承
interface A {
    name: string
}
interface B extends A {
    age: number
}
const x: B = {
    age: 123,
    name: 'xxx'
}
```

```ts
// 可选操作符 ?
interface Person {
    name: string,
    age?: number
}
const person: Person = {
    name: 'xxx'
}
// name 为必填，age 为可选
```

```ts
// 任意属性 [propName: string]
interface Person {
    name: string,
    age: number,
    [propName: string]: any
}
const person: Person {
    name: 'xxx',
    age: 123,
    sex: 'nan'
}
// 允许添加除 name age 以外的其他值
```

```ts
// 只读readonly
interface Person {
    b?: string,
    readonly a: string,
    [propName: string]: any
}
const person: Person {
    a: '132',
    c: '234'
}
person.a = 123
// 报错 a 为 readonly 不允许重新赋值
```

```ts
// 添加函数
interface Person {
    b?: string
    readonly a: string
    [propName: string]: any
    cb: () => void
}
const person: Person = {
    a: '123',
    b: '234',
    c: '124',
    cb: () => {
        console.log(123)
    }
}
```

```ts
// 使用接口定义方法
interface Ifn {
    (a: number, b: number): boolean
}
fn: fn = (a, b) => return true
fn(1, 2)

// 接口与泛型结合
interface Ifn2 {
    <T>(a: T, b:T): boolean
}
fn<number>: fn = (1, 2) => return true
fn<number>(1, 2)
// 接口与泛型结合
interface Ifn3<T> {
    (a: T, b:T): boolean
}
fn: fn<number> = (1, 2) => return true
fn<number>(1, 2)
```

## 数组类型

### 类型 []

```ts
// 类型加中括号
let arr: number[] = [1,2,3]
// 操作方法的添加是不允许的 不能添加其他类型数值
arr.unshift('1')
// 任意类型数组
let arr: any[] = [1, '2', true]
```

### 泛型数组

```ts
let arr: Array<number> = [1,2,3]
```

### 接口表示数组

```ts
interface NumberArray {
    [index: number]: number
}
let arr: NumberArray = [1,2,3]
```

### 多维数组

```ts
let data: number[][] = [[1], [2], [3]]
```

### arguments 类数组

```ts
function Arr(...args: any): void {
    let arr:IArguments = arguments
}
```

## 函数类型

```ts
// 注意：参数不能多传，也不能少传，必须按照约定的类型来
const fn = (name: string, age: number) => {
    return name + age
}
fn('张三'，18)
```

```ts
// 通过 ? 表示参数的可选
const fn = (name: string, age?: number) => {
    return name + age
}
fn('张三') // 张三undefined
```

```ts
// 函数参数的默认值
const fn = (name: string, age: number = 18) {
    return name + age
}
```

```ts
// 函数的返回类型
// void 表示无返回类型
function foo(): void {
    console.log('void')
    // 但是如果你的返回类型是 undefined 也不会报错
    return underfind
}
// 箭头函数的返回类型
const foo: () => void = () => {
    console.log('void')
}
```

```ts
// 函数类型表示方法
// 方案一：函数类型表达式
// 格式(参数列表) => 返回值
// val的参数类型不可以省略
type Bar = (val: number) => number
const bar: Bar = (arg: number): number => {
    return 123
}
// 方案二：函数调用签名
interface IBar {
    name: string
    age: number
    (val: number): number
}
const bar: Bar = (num: number): number => {
    return 123
}
bar.name = 'zs'
bar.age = 18
bar(123)
```

```ts
// 接口定义函数
interface Add {
    (num: number, num2: number): number
}
const fn: Add = (num: number, num2: number): number => {
    return num + num2
}
fn(5, 5)

interface User {
    name: string,
    age: number
}
funcitong getUserInfo(user: User): User = {
    return user
}
```

```ts
// ts 可以定义 this 的类型，必须是第一个参数定义 this 类型
interface Obj {
    user: number[],
    add: (this: Obj, num: number) => {}
}

let obj: Obj = {
    user: [1,2,3],
    add(this: Obj, num: number) {
        this.user.push(num)
    }
}
// this 的内置工具使用
function foo(this: { name: string }, info: { name: string }) {
    console.log(this, info)
}
type FooType = typeof foo
// ThisParameterType 获取 FooType 类型中的 this 类型
type FooThisType = ThisParameterType<FooType>
// OmitThisParameter 删除 this 参数类型，保留剩余的函数类型
type PureFooType = OmitThisParameter<FooType>
```

### 函数重载

重载是方法名相同，而参数不用，返回类型可以相同也可以不同

如果参数类型不用，则参数类型定义为 any

参数数量不同你可以将不同参数设置为可选

```ts
let num: number[] = [1,2,3]
function findNum(id: number): number[]
function findNum(add: number[]): number[]
function findNum(): number[]
// 实现体函数不能被调用
function findNum(ids?: number | number[]): number[] {
    if (typeof ids === 'number') {
        return num.filter(v => v === ids)
    } else if (Array.isArray(ids)) {
        num.push(...ids)
        return num
    } else {
        return num
    }
}
```

## 联合类型

```ts
let myPhone: number | string = '010-111111'
// 错误
let myPhone: number | string = true

// 函数也可以使用联合类型
const fn = (something: number | boolean): boolea {
    return !!something
}
```

## 交叉类型

多种类型的集合。联合对象将具有所有联合类型的所有成员

```ts
interface People {
    age: number,
    height: number
}
interface Man {
    sex: string
}
const x = (man: People & Man) => {
    console.log(man.age)
    console.log(man.height)
    console.log(man.sex)
}
x({age: 100, height: 200, sex: 'male'})
```

## 类型断言

```ts
interface A {
    run: string
}
interface B {
    build: string
}
const fn = (type: A | B): string {
	return (type as A).run
}
// 使用 as 将 type 断言为A，避免出现B的情况
// 类型断言是欺骗性的，无法解决运行时的错误
```

```ts
// 使用 any 临时断言
window.abc = 123
// 错误，windown 上没有abc
(windos as any).abc = 123
```

```ts
const name = 'xxx'
name = 'yyy'
// 错误。无法修改
let name2 = 'xxx' as const
name2 = 'yyy'
// 错误。无法修改
```

```ts
let a1 = [1, 2] as const
const a2 = [1, 2]
a1.unshift(3) // 错误。无法修改此时字面量
a2.unshift(3) // 正确。没有修改指针
```

### 非空类型断言

```ts
interface IPerson = {
    name: string,
    age: number,
    friend?: {
    	name: string
	}

const info: IPerson = {
    name: 'zs',
    age: 18
}

// 错误。
info.friend.name = 'ls'
// 正确。
// 类型缩小
if (info.friend) {
    info.friend.name = 'ls'
}
// 非空类型断言，强制断言，存在危险，如果值不存在还是会报错。
info.friend!.name = 'ls' // 慎用
```

## Class 类

```js
// class ES6 语法糖
// 定义类
class Person {
    constructor (x,y) {
        this.x = x
        this.y = y
    }
    run () {
        console.log('123')
    }
}
```

### 定义类

```ts
// ts 定义类
// ts 不允许直接在 constructor 定义变量，需要在constructor 上事先声明
class Person {
    // 必须声明成员属性
    name: string
    age: number = 0
    constructor (name: string, age: number) {
        this.name = name
        // 如果定义了变量而不使用（例如 age）也会报错，通常是给个默认值
    }
}
```

### 类的修饰符

```ts
// 类的三个修饰符 public private protected
class Person {
    public name: string
    private age: number
    protected some: any
    constructor (name: string, age: number, some: any) {
        this.name = name
        this.age = age
        this.some = some
    }
    run () {
        console.log('running')
    }
}
// 继承
class Man extends Person {
    constructor () {
        super('张三',18,1)
        // protected 只能在内部和继承的子类中访问 不能在外部访问
        console.log(this.some)
    }
}
let person = new Person()
// public 可以让你的变量 内部访问也可以外部访问，不写就是默认 public
person.name
// private 代表变量私有，只允许类的内部访问。
person.age // 报错。
person.some // 报错。
```

### setter & getter

```ts
// 由于私有属性外部无法访问，我们可以通过 setter & getter
class Person() {
    private _name: string
    constructor(name: string) {
        this._name = name
    }
    set name(newValue: string) {
        this._name = newValue
    }
    get name() {
        return this._name
    }
}
const p = new Person('zs')
// 正确
p.name = 'ls'
console.log(p.name)
```

### static 静态属性 和静态方法

```ts
class Person {
    static nb: string = '123'
    constructor () {
        this.nb // 错误。static 定义的属性不可以通过this 访问，只能通过类名调用
        this.run() // 错误。
    }
    static run () {
        console.log('running')
    }
    static swim () {
        return this.run() // 正确。两个函数都属于 static 静态，可以通过this 相互调用
    }
}
Person.nb // 正确。
Person.run() // 正确。
```

### 参数属性

```ts
class Person() {
    age: number
    name: string
    constructor(age: number, name: string) {
        this.age = age
        this.name = name
    }
}

// 等同于
class Person() {
    constructor(public age: number, private name: string) {}
}
```

### interface 定义类

```ts
// interface 定义类 使用关键字 implements 后面可以跟多个接口名，使用逗号分隔，前面可以使用 extends 继承父类
interface PersonClass {
    get(type: boolean): boolean
}
interface PersonClass2 {
    set(): void,
    ads: string
}
class A {
    name: string
    constructor () {
        this.name = '123'
    }
}
class Person extends A implements Personclass, PersonClass2 {
    ads: string
    constructor () {
        super()
        this.ads = '123'
    }
    get(type: boolean) {
        return type
    }
    set () {
        
    }
}
```

### 抽象类

```ts
// 使用 abstract 定义抽象类
abstract class A {
    public name: string
}
let a = new A() // 错误。抽象类没有办法被实现
```

```ts
abstract class A {
    name: string
    constructor (name: string) {
        this.name = name
    }
    print(): string {
        return this.name
    }
    // 抽象类只能被描述 不能进行使用
    abstract getName(): string
}
// 抽象类不能使用，但能被继承
class B extends A {
    constructor () {
        super('xxx')
    }
    // 被用于继承的抽象类，内部的抽象方法必须被使用，否则报错。
    getName(): string {
        return this.name
    }
}
let b = new B()
console.log(b.getName())
```

## 严格字面量赋值检测

```ts
interface IPerson {
    name: string
    age: number
}
const p: IPerson = {
    name: 'zs',
    age: 18,
    // 错误。Person 中并没有定义 height 类型
    height: 1.88
}

// 正确
const obj = {
    name: 'zs',
    age: 18,
    height: 1.88
}
const p: IPerson = obj

function printPerson(p: IPerson) {}
// 错误
printPerson({name: 'zs', age: 18, height: 1.88})
// 正确
const obj = {name: 'zs', age: 18, height: 1.88}
printPerson(obj)
```

## 元组 tuple

元组就是固定数量的不同类型元素的组合。

元组和集合的不同之处在于，元组中的元素类型可以是不同的，而且数量固定的。元素的好处是在于可以把多个元素作为一个单元传递。如果一个方法需要返回多个值，可以把多个值作为元组返回，而不需要创建额外的类表示。

```ts
let arr: [number,string] = [1, '1']

// 使用 readonly 不允许修改元组内的元素
let arr2: readonly [number, boolean, stirng, undefined] = [1, true, '1', undefined]
```

```ts
let arr: [number, string] = [1, '1']
arr[0].length // 错误。
arr[1].length // 正确。
```

```ts
// 元组类型还可以支持自定义名称和变为可选的
let a: [x: number, y?: string] = [1]
```

```ts
// 越界元素的类型会被联合类型限制
let arr: [number, string] = [1, '1']
arr.push(false) // 错误。
```

具体运用场景：

```ts
function useState(init: number): [number, (val: number) => void] {
    let stateValue = init
    function setValue(val: number) {
        stateValue = val
    }
    return [stateValue, setValue]
}
const [count, setCount] = useState(10)
```

## 枚举类型

在 js 中是没有枚举类型的概念，ts 帮我们定义了枚举类型

使用 **enum** 关键字定义枚举

### 数字枚举

```ts
// 代表红色0 绿色为1 蓝色为2
enum Types {
    Red = 0,
    Green = 1,
    Blue = 2
}
// 增长枚举 定义红色1，其他成员自动增长，绿色2，蓝色3
enum Types {
    Red = 1,
    Green,
    Blue
}
```

### 字符串枚举

```ts
// 在一个字符串枚举里，每个成员都必须用字符串字面量
enum Types {
    Red = 'red',
    Green = 'green',
    Blue = 'blue'
}
```

### 异构枚举

```ts
// 异构枚举可以混合字符串和数字成员
enum Types {
    No = 'no',
    Yes = 1
}
```

### 接口枚举

```ts
enum Types {
    yyds,
    dddd
}
interface A {
    red: Types.yyds
}
let obj: A = {
    red: Types.yyds
}
```

### const 枚举

let 和 var 都是不允许的声明只能使用 const

```ts
const enum Types {
    No = 'No',
    Yes = 1
}
```

### 反向映射

它包含了正向映射（ `name` -> `value`）和反向映射（ `value` -> `name`）

要注意的是不会为字符串枚举成员生成反向映射。

```ts
enum Enum {
   fall
}
let a = Enum.fall;
console.log(a); //0
let nameOfA = Enum[a]; 
console.log(nameOfA); //fall
```

## 类型推论

声明了一个变量但是没有定义类型，ts 会根据赋值推论出一个类型

```ts
let str = 'xxx'
// ts 推论出 str的类型为 string
str = 123 // 错误。str 的类型已经被推论为string
// 等价于
let str: string = 'xxx'
```

```ts
// 如果你定义了一个变量，但是没有赋值，ts 会将其推论为 any
let str
str = 'xxxx' // 正确。
str = 123 // 正确。
```

## 类型别名

type 关键字可以给类型定义一个名字

```ts
type s = string
let str: s = 'xxx'

type f = () => string
let fn: f = () => 'xxx'
```

定义值的别名

```ts
type value = boolean | 0 | '123'
let s: value = true
// 变量s 的值只能是value 定义的值
```

**type 和 interface 还是一些区别的 虽然都可以定义类型**

1. interface 可以继承 type 只能通过 & 交叉类型合并。
2. type 可以定义 联合类型 和 可以使用一些操作符 interface 不行。
3. interface 遇到重名的会合并 type 不行，即可以声明多次。
4. interface 只能用来声明对象；type 可以用来声明普通类型。
5. interface 可以被类实现 `class Person implements Iperson {}`

**type 高级用法**

```ts
// 此处的 extends 为包含的含义
type a = 1 extends number ? 1 : 0 // 1
type a = 1 extends Number ? 1 : 0 // 1
type a = 1 extends Object ? 1 : 0 // 1
type a = 1 extends any ? 1 : 0 // 1
type a = 1 extends unknown ? 1 : 0 // 1
type a = 1 extends never ? 1 : 0 // 0
```

## never 类型

ts 将使用 never 类型来表示不应该存在的状态

```ts
// 返回 never 的函数必须存在无法到达的终点

// 因为必定抛出异常，所有 error 将不会有返回值
function error(message: string): never {
    throw new Error(message)
}

// 因为存在死循环，所以 loop 将不会有返回值
function loop(): never {
    while (1) {
        
    }
}

// foo(): never[]
function foo() {
    return []
}

// never 对于一些没有处理的 cese 可以直接报错
// bar() 被改成 function bar(msg: string | number | boolean)
// bar(true) 依然报错
function bar(msg: string | number) {
    switch(typeof msg) {
        case 'string':
            console.log('string')
            break
        case 'number': 
            console.log(123)
            break
        default:
            const check: never = message
    }
}
```

**never 与 void 的差异**

```ts
// void 类型只是没有返回值 但本身不会出错
function Void(): void {
    console.log()
}
// 只会抛出异常没有返回值
function Never(): never {
    throw new Erroe('aaa')
}
```

```ts
type A = void | number | never
// 将鼠标移上去会发现只有 void 和 number，never在联合类型中会被移除，never是最底层的类型，没有值包含在内，因此A 不可能是 never类型
```

```ts
type A = '小满' | '大满' | '超大满' 
 
function isXiaoMan(value:A) {
   switch (value) {
       case "小满":
           break 
       case "大满":
          break 
       case "超大满":
          break 
       default:
          //是用于场景兜底逻辑
          const error:never = value;
          return error
   }
}
```

## Symbol

`symbol`类型的值是通过`Symbol`构造函数创建的。

可以传递参做为唯一标识 只支持 string 和 number 或 undefined 类型的参数

```ts
let sym1 = Symbol();
let sym2 = Symbol('key')
```

### Symbol的值是唯一的

```ts
const s1 = Symbol()
const s2 = Symbol()
console.log(s1 === s2) // false
```

### 用作对象属性的键

```ts
let sym = Symbol()
let obj = {
    [sym]: 'value'
}
console.log(obj[sym]) // value
```

### 使用 symbol 定义的属性，是不能通过如下方式遍历得到的

```ts
const symbol1 = Symbol('666')
const symbol2 = Symbol('777')
const obj1 = {
    [symbol1]: '小满',
    [symbol2]: '二蛋',
    age: 19,
    sex: '女'
}

// 1 for in 遍历
for (const key in obj1) {
   // 注意在console看key,遍历不到symbol1
   console.log(key)
}
// 2 Object.keys 遍历
Object.keys(obj1)
console.log(Object.keys(obj1))
// 3 getOwnPropertyNames
console.log(Object.getOwnPropertyNames(obj1))
// 4 JSON.stringfy
console.log(JSON.stringify(obj1))
```

### 可以遍历的方法

```ts
// 1 拿到具体的symbol 属性,对象中有几个就会拿到几个
Object.getOwnPropertySymbols(obj1)
console.log(Object.getOwnPropertySymbols(obj1))
// 2 es6 的 Reflect 拿到对象的所有属性
Reflect.ownKeys(obj1)
console.log(Reflect.ownKeys(obj1))
```

## 泛型

### 函数泛型

```ts
function num (a: number, b: number): Array<number> {
    return [a, b]
}
function num (a: string, b: string): Array<string> {
    return [a, b]
}
// 泛型优化
function Add<T>(a: T, b: T): Array<T> {
    return [a, b]
}
Add<number>(1, 2)
Add<string>('1', '2')
```

我们也可以使用不同的泛型参数名，只要在数量上和使用方式上对应就可以。

```ts
function Sub<T, U>(a: T, b: U): Array<T|U> {
    const params:Array<T|U> = [a, b]
    return params
}
Sub<Boolean, number>(false, 1)
```

### 定义泛型接口

声明接口的时候 在名字后面加一个<参数>

```ts
interface MyInter<T> {
    (arg: T): T
}
function fn<T>(arg: T): T {
    return arg
}
let result: MyInter<number> = fn
result(123)
```

### 对象字面量泛型

```ts
let foo: {
    <T>(arg: T): T
}
foo = function <T>(arg: T): T {
    return arg
}
foo(123)
```

### 泛型约束

```ts
function getLength<T>(arg: T) {
    return arg.length
}
```

```ts
interface Len {
    length: number
}
funciton getLength<T extends Len>(arg: T) {
    return arg.length
}
getLength<string>('123')
```

### 使用 keyof 约束对象

其中使用了TS泛型和泛型约束。首先定义了T类型并使用extends关键字继承object类型的子类型，然后使用keyof操作符获取T类型的所有键，它的返回 类型是联合 类型，最后利用extends关键字约束 K类型必须为keyof T联合类型的子类型。

```ts
function prop<T, K extends keyof T>(obj: T, key: K) {
   return obj[key]
}
 
 
let o = { a: 1, b: 2, c: 3 }
 
prop(o, 'a') 
prop(o, 'd') //此时就会报错发现找不到
```

### 泛型类

声明方法跟函数类似名称后面定义<类型>。

```ts
class Sub<T>{
   attr: T[] = [];
   add (a:T):T[] {
      return [a]
   }
}
 
let s = new Sub<number>()
s.attr = [1,2,3]
s.add(123)
 
let str = new Sub<string>()
str.attr = ['1','2','3']
str.add('123')
```

### 映射类型

```ts
interface IPerson {
    name: string
    age: number
}

// 映射类型
interface MapPerson<T> {
    -readonly [Property in keyof T]?: T[Property]
}
```

## 几个内置工具

```ts
// 1. 返回类型返回值
type CalcFnType = (num1: number, num2: number) => number
function foo() {
    return 'abc'
}
calcReturnType = ReturnType<CalcFnType>
fooReturnType = ReturnType<typeof foo>
// 实现
type MyReturnType<T extends (..args: any[]) => any> = t extends (...args: any[]) => infer R ? R : never
    
// 2. 将所有元素都转化为可选
interface IKun {
    name: string
    age?: number
}
type IKunOption = Partial<IKun>
// 实现
type MyPartial<T> = {
    [P in typeof T]?: T[P]
}
    
// 3. 将所有元素都转化为必选
interface IKun {
    name: string
    age?: number
}
type IKunOption = Require<IKun>
// 实现
type MyRequire<T> = {
    [P in typeof T]-?: T[P]
}

// 4. 将所有元素都转化为只读
interface IKun {
    name: string
    age?: number
}
type IKunOption = Readonly<IKun>
// 实现
type MyReadonly<T> = {
   Readonly [P in typeof T]: T[P]
}

// 5. record 传入两个类型<K, V>，key 为 K, value 为 V
interface IKun {
    name: string
    age: number
}
type keys = 'a' | 'b' | 'c'
type recordType = record<keys, IKun>
type Ikuns: recordType = {
   'a': {
    	name: 'aaa'
    	age: 12
	},
    'b': {
    	name: 'bbb'
    	age: 12
	},
}
// 实现
interface IKun {
    name: string
    age: number
}
type keys = 'a' | 'b' | 'c'
// type keys = keyof any 返回结果是 number | string | symbol, 并且只有这三者才能成为我们的 key ，因此 K 的类型需要包括三者
type MyRecord<K extends keyof any, T> = {
    [P in K]: T
}

// 6. pick 从一个类型中挑选一个或多个类型
interface IKun {
    name: string
    age?: number
}
type IKunOption = Pick<IKun, 'name' | 'age'>
// 实现
type MyPick<T, K extends T> = {
   [P in K]: T[P]
}

// 6. omit 从一个类型中过滤一个或多个类型
interface IKun {
    name: string
    age?: number
}
type IKunOption = Pick<IKun, 'name'>
// 实现
type MyPick<T, K extends T> = {
   [P in keyof T as P extends K ? P : never]: T[P]
}

// 7. exclude 从一个联合类型中排除一个或多个类型
type iKun = 'name' | 'age' | 'slogan'
type IKunOption = Exclude<IKun, 'name'>
// 实现
type MyExclude<T, K> = T extends K ? never : T

// 8. extract 从一个联合类型中提取一个或多个类型
type iKun = 'name' | 'age' | 'slogan'
type IKunOption = Extract<IKun, 'name'>
// 实现
type MyExclude<T, K> = T extends K ? T : never

// 9. nonNullAble 从一个联合类型中排除所有的 null, undefined 类型
type iKun = 'name' | 'age' | 'slogan' | null | undefined
type IKunOption = NonNullAble<IKun, 'name'>
// 实现
type MyNonNullAble<T, K> = T extends null | undefined ? never : T
```

## tsconfig.json

```json
"compilerOptions": {
  "incremental": true, // TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度
  "tsBuildInfoFile": "./buildFile", // 增量编译文件的存储位置
  "diagnostics": true, // 打印诊断信息 
  "target": "ES5", // 目标语言的版本
  "module": "CommonJS", // 生成代码的模板标准
  "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可以用在AMD模块中，即开启时应设置"module": "AMD",
  "lib": ["DOM", "ES2015", "ScriptHost", "ES2019.Array"], // TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array",
  "allowJS": true, // 允许编译器编译JS，JSX文件
  "checkJs": true, // 允许在JS文件中报错，通常与allowJS一起使用
  "outDir": "./dist", // 指定输出目录
  "rootDir": "./", // 指定输出文件目录(用于输出)，用于控制输出目录结构
  "declaration": true, // 生成声明文件，开启后会自动生成声明文件
  "declarationDir": "./file", // 指定生成声明文件存放目录
  "emitDeclarationOnly": true, // 只生成声明文件，而不会生成js文件
  "sourceMap": true, // 生成目标文件的sourceMap文件
  "inlineSourceMap": true, // 生成目标文件的inline SourceMap，inline SourceMap会包含在生成的js文件中
  "declarationMap": true, // 为声明文件生成sourceMap
  "typeRoots": [], // 声明文件目录，默认时node_modules/@types
  "types": [], // 加载的声明文件包
  "removeComments":true, // 删除注释 
  "noEmit": true, // 不输出文件,即编译后不会生成任何js文件
  "noEmitOnError": true, // 发送错误时不输出任何文件
  "noEmitHelpers": true, // 不生成helper函数，减小体积，需要额外安装，常配合importHelpers一起使用
  "importHelpers": true, // 通过tslib引入helper函数，文件必须是模块
  "downlevelIteration": true, // 降级遍历器实现，如果目标源是es3/5，那么遍历器会有降级的实现
  "strict": true, // 开启所有严格的类型检查
  "alwaysStrict": true, // 在代码中注入'use strict'
  "noImplicitAny": true, // 不允许隐式的any类型
  "strictNullChecks": true, // 不允许把null、undefined赋值给其他类型的变量
  "strictFunctionTypes": true, // 不允许函数参数双向协变
  "strictPropertyInitialization": true, // 类的实例属性必须初始化
  "strictBindCallApply": true, // 严格的bind/call/apply检查
  "noImplicitThis": true, // 不允许this有隐式的any类型
  "noUnusedLocals": true, // 检查只声明、未使用的局部变量(只提示不报错)
  "noUnusedParameters": true, // 检查未使用的函数参数(只提示不报错)
  "noFallthroughCasesInSwitch": true, // 防止switch语句贯穿(即如果没有break语句后面不会执行)
  "noImplicitReturns": true, //每个分支都会有返回值
  "esModuleInterop": true, // 允许export=导出，由import from 导入
  "allowUmdGlobalAccess": true, // 允许在模块中全局变量的方式访问umd模块
  "moduleResolution": "node", // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
  "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
  "paths": { // 路径映射，相对于baseUrl
    // 如使用jq时不想使用默认版本，而需要手动指定版本，可进行如下配置
    "jquery": ["node_modules/jquery/dist/jquery.min.js"]
  },
  "rootDirs": ["src","out"], // 将多个目录放在一个虚拟目录下，用于运行时，即编译后引入文件的位置可能发生变化，这也设置可以虚拟src和out在同一个目录下，不用再去改变路径也不会报错
  "listEmittedFiles": true, // 打印输出文件
  "listFiles": true// 打印编译的文件(包括引用的声明文件)
}
 
// 指定一个匹配列表（属于自动指定该路径下的所有ts相关文件）
"include": [
   "src/**/*"
],
// 指定一个排除列表（include的反向操作）
 "exclude": [
   "demo.ts"
],
// 指定哪些文件使用该配置（属于手动一个个指定文件）
 "files": [
   "demo.ts"
]
```

## 命名空间

**我们在工作中无法避免全局变量造成的污染，TypeScript提供了namespace 避免这个问题出现**。

1. 内部模块，主要用于组织代码，避免命名冲突。
2. 命名空间内的类默认私有。
3. 通过 `export` 暴露。
4. 通过 `namespace` 关键字定义

TypeScript与ECMAScript 2015一样，任何包含顶级`import`或者`export`的文件都被当成一个模块。相反地，如果一个文件不带有顶级的`import`或者`export`声明，那么它的内容被视为全局可见的（因此对模块也是可见的）

```ts
namespace a {
    export const Time: number = 1000
    export const fn = <T>(arg: T): T => {
        return arg
    }
    fn(Time)
}
 
 
namespace b {
     export const Time: number = 1000
     export const fn = <T>(arg: T): T => {
        return arg
    }
    fn(Time)
}
 
a.Time
b.Time
```

### 嵌套命名空间

```ts
namespace a {
    export namespace b {
        export class Vue {
            parameters: string
            constructor(parameters: string) {
                this.parameters = parameters
            }
        }
    }
}
 
let v = a.b.Vue
 
new v('1')
```

### 抽离命名空间

```ts
export namespace V {
    export const a = 1
}
```

```ts
import {V} from '../observer/index'
 
console.log(V);
```

### 简化命名空间

```ts
namespace A  {
    export namespace B {
        export const C = 1
    }
}
 
import X = A.B.C
 
console.log(X);
```

### 合并命名空间

```ts
// 重名的命名空间会合并
namespace a {
    expotr const b = 111
}
namespace a {
    expotr const c = 222
}    
```

## declare

`index.d.ts`

```ts
// 为自己声明的变量/函数/类 定义类型声明
// 并且是全局变量
declare const name: string
declare const age: number
declare function foo(bar: string): string

// 也可以用来声明模块
declare module 'loadsh' {
    export function join(args: any[]): any
}
    
// 声明文件模块
declare module '*.png'
declare module '*.jpg'
```

## 三斜线指令

三斜线指令是包含单个XML标签的单行注释。 注释的内容会做为编译器指令使用。

三斜线指令仅可放在包含它的文件的最顶端。 一个三斜线指令的前面只能出现单行或多行注释，这包括其它的三斜线指令。 如果它们出现在一个语句或声明之后，那么它们会被当做普通的单行注释，并且不具有特殊的涵义。

`/// <reference path="..." />`指令是三斜线指令中最常见的一种。 它用于声明文件间的 *依赖*。

a.ts

```ts
namespace A {
    export const fn = () => 'a'
}
```

b.ts

```ts
namespace A {
    export const fn = () => 'b'
}
```

index.ts 引入之后可以直接使用变量 A

```ts
///<reference path="./index2.ts" />
///<reference path="./index3.ts" />
 
 
console.log(A)
```

### 声明文件引入

例如，把 `/// <reference types="node" />`引入到声明文件，表明这个文件使用了 `@types/node/index.d.ts`里面声明的名字； 并且，这个包需要在编译阶段与声明文件一起被包含进来。

仅当在你需要写一个`d.ts`文件时才使用这个指令。

```ts
///<reference types="node" />
```

## Mixins 混入

### 对象混入

```ts
interface Name {
    name: string
}
interface Age {
    age: number
}
interface Sex {
    sex: number
}
 
let people1: Name = { name: "小满" }
let people2: Age = { age: 20 }
let people3: Sex = { sex: 1 }
 
const people = Object.assign(people1,people2,people3)
```

### 类的混入

```ts
// 前提关闭严格模式
class A {
    type: boolean = false;
    changeType() {
        this.type = !this.type
    }
}
 
 
class B {
    name: string = '张三';
    getName(): string {
        return this.name;
    }
}

// 使用 implements 将类当成了接口
class C implements A,B{
    type:boolean
    changeType:()=>void;
    name: string;
    getName:()=> string
}

// Object.getOwnPropertyNames()可以获取对象自身的属性，除去他继承来的属性，对它所有的属性遍历，它是一个数组，遍历一下它所有的属性名
Mixins(C, [A, B])
function Mixins(curCls: any, itemCls: any[]) {
    itemCls.forEach(item => {
        Object.getOwnPropertyNames(item.prototype).forEach(name => {
            curCls.prototype[name] = item.prototype[name]
        })
    })
}
```

## infer 

infer 是 TypeScript 新增到的关键字 充当占位符。

```ts
type Infer<T> = T extends Array<any> ? T[number] : T
 
 
type A = Infer<(boolean | string)[]>
 
type B = Infer<null>
```

