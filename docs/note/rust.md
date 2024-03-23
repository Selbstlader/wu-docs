---
prev:
   text: 'Mysql'
   link: '/note/mysql'
next: false
---

# Rust

## 快速入门

### 创建工程

输入

```bash
cargo new --bin helloworld
```

显示

```bash
Created binary (application) `helloworld` package
```

文件目录

```txt
helloworld 
├── Cargo.toml 
    └── src 
    └── main.rs
```

第一层是一个 src 目录和一个 Cargo.toml 配置文件。src 是放置源代码的地方，而 Cargo.toml 是这个工程的配置文件。

```toml
# 名字、版本和采用的 Rust 版次
[package]
name = "helloworld"
version = "0.1.0"
edition = "2021"
# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html
[dependencies]
```

### Rust 的基础类型

#### 赋值语句

Rust 中使用 **let** 关键字定义变量及初始化

```rust
fn main() {
    // Rust 中类型写在变量名的后面，例子里变量 a 的类型是 u32, 也就是无符号 32 位整数，赋值为 1。
    // Rust 保证你定义的变量在第一次使用之前一定被初始化过。
    let a: u32 = 1;
}
```

#### 数字类型

Rust 的数字类型是区分位数。

**整数**

| 长度    | 有符号 | 无符号 |
| ------- | ------ | ------ |
| 8-bit   | i8     | u8     |
| 16-bit  | i16    | u16    |
| 32-bit  | i32    | u32    |
| 64-bit  | i64    | u64    |
| 128-bit | i128   | u128   |
| arch    | isize  | useze  |

isize 和 usize 的位数与具体 CPU 架构位数有关。CPU 是 64 位的，它们就是 64 位的，CPU 是 32 位的，它们就是 32 位的。这些整数类型可以在写字面量的时候作为后缀跟在后面，来直接指定值的类型，比如 let a = 10u32; 就定义了一个变量 a，初始化成无符号 32 位整型，值为 10。

**整数字面量的辅助写法**

Rust 提供了灵活的数字表示方法，便于我们编写整数字面量。比如：

```txt
十进制字面量 98_222，使用下划线按三位数字一组隔开
十六进制字面量 0xff，使用0x开头
8进制字面量 0o77，使用0o（小写字母o）开头二进制字面量 0b1111_0000，使用0b开头，按4位数字一组隔开字符的字节表示 b'A'，对一个ASCII字符，在其前面加b前缀，直接得到此字符的ASCII码值
```

**浮点数**

浮点数有两种类型：f32 和 f64，分别代表 32 位浮点数类型和 64 位浮点数类型。它们也可以跟在字面量的后面，用来指定浮点数值的类型，比如 let a = 10.0f32; 就定义了一个变量 a，初始化成 32 位浮点数类型，值为 10.0。

#### 布尔类型

Rust 中的布尔类型为 bool，它只有两个值，true 和 false。

```rust
let a = true;
let b: bool = false;
```

#### 字符

Rust 中的字符类型是 char，值用单引号括起来。

```rust
let c = 'z';
let z: char = 'ℤ';
let heart_eyed_cat = '😻';
let t = '中';
```

Rust 的 char 类型存的是 Unicode 散列值。这意味着它可以表达各种符号，比如中文符号、emoji 符号等。在 Rust 中，char 类型在内存中总是占用 4 个字节大小。

#### 字符串

Rust 中的字符串类型是 String。虽然中文表述上，字符串只比前面的字符类型多了一个串字，但它们内部存储结构完全不同。String 内部存储的是 Unicode 字符串的 UTF8 编码，而 char 直接存的是 Unicode Scalar Value。也就是说 String 不是 char 的数组，这点与 C 语言也有很大区别。

```rust
let hello = String::from("السلام عليكم");
let hello = String::from("Dobrý den");
let hello = String::from("Hello");
let hello = String::from("שָׁלוֹם");
let hello = String::from("नमस्ते");
let hello = String::from("こんにちは");
let hello = String::from("안녕하세요");
let hello = String::from("你好");
let hello = String::from("Olá");
let hello = String::from("Здравствуйте");
let hello = String::from("Hola");
```

注意，Rust 中的 String 不能通过下标去访问。

```rust
let hello = String::from("你好");
let a = hello[0];  // 你可能想把“你”字取出来，但实际上这样是错误的
```

因为 String 存储的 Unicode 序列的 UTF8 编码，而 UTF8 编码是变长编码。这样即使能访问成功，也只能取出一个字符的 UTF8 编码的第一个字节，它很可能是没有意义的。因此 Rust 直接对 String 禁止了这个索引操作。

**字符串字面量中的转义**

Rust 中转义符号也是反斜杠 \ ，可用来转义各种字符。

```rust
fn main() {
    // 将""号进行转义
    let byte_escape = "I'm saying \"Hello\"";
    println!("{}", byte_escape);
    
    // 分两行打印
    let byte_escape = "I'm saying \n 你好";
    println!("{}", byte_escape);
    
    // Windows下的换行符
    let byte_escape = "I'm saying \r\n 你好";
    println!("{}", byte_escape);
    
    // 打印出 \ 本身
    let byte_escape = "I'm saying \\ Ok";
    println!("{}", byte_escape);
    
    // 强行在字符串后面加个0，与C语言的字符串一致。
    let byte_escape = "I'm saying hello.\0";
    println!("{}", byte_escape);
}
```

除此之外，Rust 还支持通过 \x 输入等值的 ASCII 字符，以及通过 \u{} 输入等值的 Unicode 字符。

```rust
fn main() {
    // 使用 \x 输入等值的ASCII字符（最高7位）
    let byte_escape = "I'm saying hello \x7f";
    println!("{}", byte_escape);
    
    // 使用 \u{} 输入等值的Unicode字符（最高24位）
    let byte_escape = "I'm saying hello \u{0065}";
    println!("{}", byte_escape);
}
```

**禁止转义的字符串字面量**

有时候，我们不希望字符串被转义，也就是想输出原始字面量。这个在 Rust 中也有办法，使用 r"" 或 r#""# 把字符串字面量套起来就行了。

```rust
fn main() {
    // 字符串字面量前面加r，表示不转义
    let raw_str = r"Escapes don't work here: \x3F \u{211D}";
    println!("{}", raw_str);
    
    // 这个字面量必须使用r##这种形式，因为我们希望在字符串字面量里面保留""
    let quotes = r#"And then I said: "There is no escape!""#;
    println!("{}", quotes);
    
    // 如果遇到字面量里面有#号的情况，可以在r后面，加任意多的前后配对的#号，
    // 只要能帮助Rust编译器识别就行
    let longer_delimiter = r###"A string with "# in it. And even "##!"###;
    println!("{}", longer_delimiter);
}
```

#### 字节串

很多时候，我们的字符串字面量中用不到 Unicode 字符，只需要 ASCII 字符集。对于这种情况，Rust 还有一种更紧凑的表示法：字节串。用 b 开头，双引号括起来，比如 b"this is a byte string"。这时候字符串的类型已不是字符串，而是字节的数组 [u8; N]，N 为字节数。

```rust
fn main() {
    // 字节串的类型是字节的数组，而不是字符串了
    let bytestring: &[u8; 21] = b"this is a byte string";
    println!("A byte string: {:?}", bytestring);
    
    // 可以看看下面这串打印出什么
    let escaped = b"\x52\x75\x73\x74 as bytes";
    println!("Some escaped bytes: {:?}", escaped);

    // 字节串与原始字面量结合使用
    let raw_bytestring = br"\u{211D} is not escaped here";
    println!("{:?}", raw_bytestring);
}
```

#### 数组

Rust 中的数组是 array 类型，用于存储同一类型的多个值。数组表示成[T; N]，由中括号括起来，中间用分号隔开，分号前面表示类型，分号后面表示数组长度。

```rust
fn main() {
    let a: [i32; 5] = [1, 2, 3, 4, 5];
    let a = [1, 2, 3, 4, 5];
}
```

Rust 中的数组是固定长度的，也就是说在编译阶段就能知道它占用的字节数，并且在运行阶段，不能改变它的长度（尺寸）

数组的访问可以使用下标访问

```rust
fn main() {
    let a: [i32; 5] = [1, 2, 3, 4, 5];
    let b = a[0];
    println!("{}", b)
}
// 输出 
1
```

当数组下标越界时，Rust 在编译的时候，就给我们指出了问题，说这个操作会在运行的时候崩溃。为什么 Rust 能指出来呢？就是因为**数组的长度是确定的**，Rust 在编译时就分析并提取了这个数组类型占用空间长度的信息，因此直接阻止了你的越界访问。

#### 动态数组

Rust 中的动态数组类型是 Vec（Vector），也就是向量，中文翻译成动态数组。它用来存储**同一类型**的多个值，容量可在程序运行的过程中动态地扩大或缩小，因此叫做动态数组。

```rust
fn main() {
    let v: Vec<i32> = Vec::new();
    let v = vec![1, 2, 3];
    
    let mut v = Vec::new();
    v.push(5);
    v.push(6);
    v.push(7);
    v.push(8);
}
```

动态数组可以用下标进行索引访问。

```rust
fn main() {
    let s1 = String::from("superman 1");
    let s2 = String::from("superman 2");
    let s3 = String::from("superman 3");
    let s4 = String::from("superman 4");
    
    let v = vec![s1, s2, s3, s4];

    println!("{:?}", v[0]);
}
// 输出 
"superman 1"
```

如果我们下标越界了会发生什么？代码正确通过了编译，但在运行的时候出错了，并且导致了主线程的崩溃。

#### 哈希表

哈希表是一种常见的结构，用于存储 Key-Value 映射关系，基本在各种语言中都有内置提供。Rust 中的哈希表类型为 HashMap。对一个 HashMap 结构来说，Key 要求是同一种类型，比如是字符串就统一用字符串，是数字就统一用数字。Value 也是一样，要求是同一种类型。Key 和 Value 的类型不需要相同。

```rust
fn main() {
    use std::collections::HashMap;
    
    let mut scores = HashMap::new();
    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);
}
```

#### Rust 中的复合类型

复合类型可以包含多种基础类型，是一种将类型进行有效组织的方式，提供了一级一级搭建更高层类型的能力。Rust 中的复合类型包括元组、结构体、枚举等。

**元组**

元组是一个固定（元素）长度的列表，每个元素类型可以不一样。用小括号括起来，元素之间用逗号隔开。

```rust
fn main() {
    let tup: (i32, f64, u8) = (500, 6.4, 1);
}
```

元组元素访问

```rust
fn main() {
    let x: (i32, f64, u8) = (500, 6.4, 1);
    
    // 元组使用.运算符访问其元素，下标从0开始，注意语法
    let five_hundred = x.0;
    let six_point_four = x.1;
    let one = x.2;
}
```

与数组的相同点是，它们都是固定元素个数的，在运行时不可伸缩。与数组的不同点是，元组的每个元素的类型可以不一样。元组在 Rust 中很有用，因为它可以用于函数的返回值，相当于把多个想返回的值捆绑在一起，一次性返回。

当没有任何元素的时候，元组退化成 ()，就叫做 unit 类型，是 Rust 中一个非常重要的基础类型和值，unit 类型唯一的值实例就是 ()，与其类型本身的表示相同。**比如一个函数没有返回值的时候，它实际默认返回的是这个 unit 值。**

**结构体**

结构体也是一种复合类型，它由若干字段组成，每个字段的类型可以不一样。Rust 中使用 struct 关键字来定义结构体。比如下面的代码就定义了一个 User 类型

```rust
fn main() {
    struct User {
        active: bool,
        username: String,
        email: String,
        age: u64,
	}
    let user1 = User {
        active: true,
        username: String::from("someusername123"),
        email: String::from("someone@example.com"),
        age: 1,
    };
}
```

**枚举**

Rust 中使用 enum 关键字定义枚举类型。

```rust
enum IpAddrKind {
    V4,
    V6,
}

let four = IpAddrKind::V4;
let six = IpAddrKind::V6;
```

可以看到，枚举类型也是一种复合类型。但是与结构体不同，结构体类型是里面的所有字段（所有类型）同时起作用，来产生一个具体的实例，而枚举类型是其中的一个变体起作用，来产生一个具体实例，这点区别可以细细品味。学术上，通常把枚举叫作和类型（sum type），把结构体叫作积类型（product type）。

#### Rust 中的控制流

**分支语句**

Rust 中使用 if else 来构造分支。

```rust
fn main() {
    let number = 6;
    // 判断数字number能被4，3，2中的哪一个数字整除
    if number % 4 == 0 {
        println!("number is divisible by 4");
    } else if number % 3 == 0 {
        println!("number is divisible by 3");
    } else if number % 2 == 0 {
        println!("number is divisible by 2");
    } else {
        println!("number is not divisible by 4, 3, or 2");
    };
}
```

与其他 C 系语言不同，Rust 中 if 后面的条件表达式不推荐用（）包裹起来，因为 Rust 设计者认为那个是不必要的，是多余的语法噪音。

if else 支持表达式返回

```rust
fn main() {
    let x = 1;
    // 在这里，if else 返回了值
    let y = if x == 0 {
        // 代码块结尾最后一句不加分号，表示把值返回回去
        100
    } else {
        // 代码块结尾最后一句不加分号，表示把值返回回去
        101
    };
    println!("y is {}", y);
}
```

**循环语句**

Rust 中有三种循环语句，分别是 loop、while、for。

- loop 用于无条件（无限）循环。

  ```rust
  fn main() {
      let mut counter = 0;
      
      // 这里，接收从循环体中返回的值，对result进行初始化
      let result = loop {
          counter += 1;
          if counter == 10 {
              // 使用break跳出循环，同时带一个返回值回去
              break counter * 2;
          }
      };
  
      println!("The result is {result}");
  }
  ```

- while 循环为条件判断循环。当后面的条件为真的时候，执行循环体里面的代码。和前面的 if 语句一样，Rust 中的 while 后面的条件表达式不推荐用（）包裹起来。

  ```rust
  fn main() {
      let mut number = 3;
  
      while number != 0 {
          println!("{number}!");
  
          number -= 1;
      }
  
      println!("LIFTOFF!!!");
  }
  ```

- for 循环在 Rust 中，基本上只用于迭代器（暂时可以想象成对数组，动态数组等）的遍历。Rust 中没有 C 语言那种 for 循环风格的语法支持，因为那被认为是一种不好的设计。

  ```rust
  fn main() {
      let a = [10, 20, 30, 40, 50];
  
      for element in a {
          println!("the value is: {element}");
      }
  }
  ```

  上面代码对动态数组 Vec 的遍历阻止了越界的可能性，因此用这种方式访问 Vec 比用下标索引的方式访问更加安全。

  对于循环的场景，Rust 还提供了一个便捷的语法来生成遍历区间： ..（两个点）。

  ```rust
  fn main() {
      // 左闭右开区间
      for number in 1..4 {
          println!("{number}");
      }
      println!("--");
      // 左闭右闭区间
      for number in 1..=4 {
          println!("{number}");
      }
      println!("--");
      // 反向
      for number in (1..4).rev() {
          println!("{number}");
      }
  }
  // 输出
  1
  2
  3
  --
  1
  2
  3
  4
  --
  3
  2
  1
  ```

#### Rust 中的函数和模块

**函数**

函数基本上是所有编程语言的标配，在 Rust 中也不例外，它是一种基本的代码复用方法。在 Rust 中使用 fn 关键字来定义一个函数。

```rust
fn print_a_b(a: i32, b: char) {
    println!("The value of a b is: {a}{b}");
}

fn main() {
    print_a_b(5, 'h');
}
```

**闭包（Closure）**

闭包是另一种风格的函数。它使用两个竖线符号 || 定义，而不是用 fn () 来定义。你可以看下面的形式对比

```rust
// 标准的函数定义
fn add_one_v1 (x: u32) -> u32 { x + 1 }
// 闭包的定义，请注意形式对比
let add_one_v2 = |x: u32| -> u32 { x + 1 };
// 闭包的定义2，省略了类型标注
let add_one_v3 = |x| { x + 1 };
// 闭包的定义3，花括号也省略了
let add_one_v4 = |x| x + 1;
```

闭包与函数的一个显著不同就是，闭包可以捕获函数中的局部变量为我所用，而函数不行。比如，下面示例中的闭包 add_v2 捕获了 main 函数中的局部变量 a 来使用，但是函数 add_v1 就没有这个能力。

```rust
fn main() {
    let a = 10u32;             // 局部变量
    
    fn  add_v1   (x: u32) -> u32 { x + a }    // 定义一个内部函数
    let add_v2 = |x: u32| -> u32 { x + a };   // 定义一个闭包
    
    let result1 = add_v1(20);  // 调用函数
    let result2 = add_v2(20);  // 调用闭包
    println!("{}", result2);
}
```

**模块**

我们不可能把所有代码都写在一个文件里面。代码量多了后，分成不同的文件模块书写是非常自然的事情。这个需求需要从编程语言层级去做一定的支持才行，Rust 也提供了相应的方案。

```txt
backyard
├── Cargo.lock
├── Cargo.toml
└── src
    ├── garden              // 子目录
    │   └── vegetables.rs
    ├── garden.rs           // 与子目录同名的.rs文件，表示这个模块的入口
    └── main.rs
```

第五行代码到第七行代码组成 garden 模块，在 garden.rs 中，使用 mod vegetables; 导入 vegetables 子模块。

在 main.rs 中，用同样的方式导入 garden 模块。/ mod garden.rs /

```txt
backyard
├── Cargo.lock
├── Cargo.toml
└── src
    ├── garden          // 子目录
    │   └── mod.rs      // 子目录中有一个固定文件名 mod.rs，表示这个模块的入口
    │   └── vegetables.rs
    └── main.rs
```

#### 测试

Rust 语言中自带单元测试和集成测试方案。我们来看一个示例，在 src/lib.rs 或 src/main.rs 下有一段代码。

```rust
fn foo() -> u32 { 10u32 }

#[cfg(test)]            // 这里配置测试模块
mod tests {
    use crate::foo;
     
    #[test]             // 具体的单元测试用例
    fn it_works() {
        let result = foo();           // 调用被测试的函数或功能
        assert_eq!(result, 10u32);    // 断言
    }
}
```

### 所有权

#### 栈和堆

现代计算机会把内存划分为很多个区。比如，二进制代码的存放区、静态数据的存放区、栈、堆等。栈上的操作比堆高效，因为栈上内存的分配和回收只需移动栈顶指针就行了。这就决定了分配和回收时都必须精确计算这个指针的增减量，因此栈上一般放固定尺寸的值。另一方面，栈的容量也是非常有限的，因此也不适合放尺寸太大的值，比如一个有 1000 万个元素的数组。那么非固定尺寸的值怎么处理呢？在计算机体系架构里面，专门在内存中拿出一大块区域来存放这类值，这个区域就叫“堆”。

**栈空间和堆空间**

在一般的程序语言设计中，栈空间都会与函数关联起来。每一个函数的调用，都会对应一个帧，也叫做 frame 栈帧。一个函数被调用，就会分配一个新的帧，函数调用结束后，这个帧就会被自动释放掉。因此栈帧是一个运行时的事物。函数中的参数、局部变量之类的资源，都会放在这个帧里面。

而计算机程序内存管理的复杂性，主要就在于堆内存的管理比较复杂——既要高效，又要安全。

#### 变量与可变性

```rust
fn main() {
    // 默认变量为不可变，下面代码会报错。
    let x = 5;
    println!("The value of x is: {x}");
    x = 6;
    println!("The value of x is: {x}");
}
```

```rust
fn main() {
    let x = 5;
    println!("The value of x is: {x}");
    let x = 6;    // 注意这里，重新使用了 let 来定义新变量
    println!("The value of x is: {x}");
}
```

这种方式在 Rust 中叫做变量的 Shadowing。意思很好理解，就是定义了一个新的变量名，只不过这个变量名和老的相同。原来那个变量就被遮盖起来了，访问不到了。这种方式最大的用处是程序员不用再去费力地想另一个名字了！变量的 Shadow 甚至支持新的变量的类型和原来的不一样。

```rust
fn main() {
    // mut 声明变量为可变变量
    let mut x = 5;
    println!("The value of x is: {x}");
    x = 6;
    println!("The value of x is: {x}");
}
// 输出 
The value of x is: 5
The value of x is: 6
```

注意，值的改变只能在同一种类型中变化，在变量 x 定义的时候，就已经确定了变量 x 的类型为数字了，你可以试试将其改成字符串，看会报什么错误。

#### 变量的类型

值是有类型的，比如 10u32，它就是一个 u32 类型的数字。一旦一个变量绑定了一个值，或者说一个值被绑定到了一个变量上，那么这个变量就被指定为这种值的类型。比如 let x = 10u32; 编译器会自动推导出变量 x 的类型为 u32。完整的写法就是 let x: u32 = 10u32;。

此外还有一种方式，就是直接先指定变量的类型，然后把一个值绑定上去，比如 let x: u32 = 10;。这种方式更好，它能说明你在写这句代码的时候就已经对它做了一个架构上的规划和设计，这种形式能帮助我们在编译阶段阻止一些错误。

#### 所有权

字符串的行为好像与 u32 这种数字类型不一样。前面我们说过，u32 这种类型是固定尺寸类型，而 String 是非固定尺寸类型。一般来说，对于固定尺寸类型，会默认放在栈上；而非固定尺寸类型，会默认创建在堆上，成为堆上的一个资源，然后在栈上用一个局部变量来指向它。

```rust
fn main() {
    let s1 = String::from("I am a superman.");
    let s2 = s1;
    //println!("{s1}");
    println!("{s2}");
}
```

Rust 虽然也是把字符串的引用由 s1 拷贝到了 s2，但是只保留了最新的 s2 到字符串的指向，同时却把 s1 到字符串的指向给“抹去”了。

在Rust中，对于固定尺寸的类型（比如整数、浮点数、字符等），赋值操作是进行复制而不是转移所有权。这是因为这些类型是实现了`Copy` trait 的，而`Copy` trait 表示类型可以通过简单的位拷贝来进行复制，而不是通过移动所有权。

当你将一个固定尺寸类型的值赋给另一个变量时，这个值会被复制到新变量，而原始变量仍然保留其所有权。这是一种轻量级的操作，不会涉及到所有权转移和所有权借用的复杂性。

对于非固定尺寸类型（如动态字符串 `String` 或向量 `Vec<T>`）的赋值，通常涉及到所有权的转移，因为这些类型不是实现了 `Copy` trait 的。这意味着在将它们赋值给其他变量时，原始变量的所有权会被转移到新变量。

所有权的基础是三条定义。

- Rust 中，每一个值都有一个所有者。
- 任何一个时刻，一个值只有一个所有者。
- 当所有者所在作用域（scope）结束的时候，其管理的值会被一起释放掉。

这三条规则涉及两个概念：**所有者**和**作用域**。

```rust
fn foo(s: String) {
    println!("{s}");
}

fn main() {
    let s1 = String::from("I am a superman.");
    // 参数 s 获取了字符串的所有权，s1 处于无效状态
    foo(s1);
    // 函数结束，s 的内存被回收
    println!("{s1}");    // 这里加了一行
}
```

```rust
fn foo(s: String) {
    println!("{s}");
}
// 调用两次也是做不到
fn main() {
    let s1 = String::from("I am a superman.");
    foo(s1);
    foo(s1);
}
```

**移动还是复制**

默认做复制所有权的操作的有 7 种。

- 所有的整数类型，比如 u32；
- 布尔类型 bool；
- 浮点数类型，比如 f32、f64；
- 字符类型 char；
- 由以上类型组成的元组类型 tuple，如（i32, i32, char；
- 由以上类型组成的数组类型 array，如 [9; 100]；
- 不可变引用类型 &。

其他类型默认都是做移动所有权的操作。

#### 借用和引用

在 Rust 中，变量前用“&”符号来表示引用，比如 &x。

引用也是一种值，并且是固定尺寸的值，一般来说，与机器 CPU 位数一致，比如 64 位或 32 位。因为是值，所以就可以赋给另一个变量。同时它又是固定的而且是小尺寸的值，那其实赋值的时候，就可以直接复制一份这个引用。

```rust
fn main() {
    let a = 10u32;
    let b = &a;        // b是变量a的一级引用
    let c = &&&&&a;    // c是变量a的多级引用
    let d = &b;        // d是变量a的间接引用
    let e = b;         // 引用b再赋值给e
    
    println!("{a}");
    println!("{b}");
    println!("{c}");
    println!("{d}");
    println!("{e}");
}
// 输出
10
10
10
10
10
```

我们可以将变量按一个新的维度划分为所有权型变量和引用型变量。

#### 不可变引用、可变引用

实际上默认 `&x` 指的是不可变引用。而要获取到可变引用，需要使用 &mut 符号，如 `&mut x`。

- 引用分成不可变引用和可变引用。
- `&x` 是对变量 x 的不可变引用。
- `&mut x` 是对变量 x 的可变引用。

一个所有权型变量的作用域是从它定义时开始到花括号结束。而引用型变量的作用域不是这样，引用型变量的作用域是从它定义起到它最后一次使用时结束。

**一个所有权型变量的可变引用与不可变引用的作用域不能交叠**

```rust
fn main() {
    let mut a = 10u32;
    let c = &a;        
    let b = &mut a;
    *b = 20;
  
    println!("{c}");
    // a 的不可变引用 c 的作用域 3-7
    // a 的可变引用 b 的作用域 4-6
    // 两者作用域重叠不可编译通过
}
```

**同一个所有权型变量的可变借用之间的作用域也不能交叠。**

```rust
fn main() {
    let mut a = 10u32;
    let b = &mut a;
    *b = 20;
    let d = &mut a;
    
    println!("{b}");      // 打印b
    // a 的可变引用 b 作用域 3-7 
    // a 的可变引用 d 作用域 4-5 
    // 两者作用域重叠不可编译通过
}
```

**有借用的情况下，不能对所有权变量进行更改值的操作（写操作）**

```rust
fn main() {
    let mut a = 10u32;
    let r1 = &a;
    a = 20;
    
    println!("{r1}");
    
    // 编译报错
  	// 可变变量 a 被 r1 借用后，a 的值不能被修改
}
```

```rust
fn main() {
    let mut a = 10u32;
    let r1 = &mut a;
    a = 20;
    
    println!("{r1}");
    
    // 同上
}
```

关于引用（借用）的一些规则

- 所有权型变量的作用域是从它定义时开始到所属那层花括号结束。
- 引用型变量的作用域是从它定义起到它最后一次使用时结束。
- 引用（不可变引用和可变引用）型变量的作用域不会长于所有权变量的作用域。这是肯定的，不然就会出现悬锤引用，这是典型的内存安全问题。
- 一个所有权型变量的不可变引用可以同时存在多个，可以复制多份。
- 一个所有权型变量的可变引用与不可变引用的作用域不能交叠，也可以说不能同时存在。
- 某个时刻对某个所有权型变量只能存在一个可变引用，不能有超过一个可变借用同时存在，也可以说，对同一个所有权型变量的可变借用之间的作用域不能交叠。
- 在有借用存在的情况下，不能通过原所有权型变量对值进行更新。当借用完成后（借用的作用域结束后），物归原主，又可以使用所有权型变量对值做更新操作了。

**一个所有权型变量的可变引用也具有所有权特征，**

```rust
fn main() {
    let mut a = 10u32;
    let r1 = &mut a;
    let r2 = r1;
    
    println!("{r1}")
    // 所有权特性，r1 的所有权以及被转移至 r2
}
```

#### 多级引用

```rust
fn main() {
    let mut a1 = 10u32;
    let mut b = &mut a1;
    *b = 20;

    let c = &mut b;
    **c = 30; 
    
    println!("{c}");
}
```

Rust 中三条关于引用的知识点

- 对于多级可变引用，要利用可变引用去修改目标资源的值的时候，需要做正确的多级解引用操作，比如例子中的 **c，做了两级解引用。
- 只有全是多级可变引用的情况下，才能修改到目标资源的值。
- 对于多级引用（包含可变和不可变），打印语句中，可以自动为我们解引用正确的层数，直到访问到目标资源的值，这很符合人的直觉和业务的需求。用引用改进函数的定义

### 字符串

Rust 有那么多看上去都是字符串的类型，就是因为 Rust 把字符串在各种场景下的使用给`模型化`、`抽象化`了。

#### 不同的字符串类型

```rust
fn main() {
    
  // &'static str，这是静态数据区中的字符串的表示方法。
  let s1: &'static str = "I am a superman."; 
    
  // s1.to_string() Rust 将静态数据区中的字符串字面量拷贝了一份到堆内存中，通过 s2 指向，s2 具有这个堆内存字符串的所有权，String 在 Rust 中就代表具有所有权的字符串。
  let s2: String = s1.to_string(); 
    
  // s3 就是对 s2 的不可变引用，因此类型为 &String。
  let s3: &String = &s2;
  // s4 是对 s2 的切片引用，类型是 &str; [...]取的目标对象字符串的全部
  let s4: &str = &s2[..];
  // s5 是对 s2 的切片引用, [..6]取的目标对象字符串的前5个字符
  let s5: &str = &s2[..6];
}
```

> String 是字符串的所有权形式，常常在堆中分配。String 字符串的内容大小是可以动态变化的。而 str 是字符串的切片类型，通常以切片引用 &str 形式出现，是字符串的视图的借用形式。

字符串字面量默认会存放在静态数据区里，而静态数据区中的字符串总是贯穿程序运行的整个生命期，直到程序结束的时候才会被释放。因此对于字符串字面量这种数据类型，我们只能拿到它的借用形式 &'static str。这里 'static 表示这个引用可以贯穿整个程序的生命期，直到这个程序运行结束。

```rust
// &str 也可转换为 String
let s: String = "I am a superman.".to_string(); 
let a_slice: &str = &s[..];
let another_String: String = a_slice.to_string();
```

#### 切片

切片是一段连续内存的一个视图（view），在 Rust 中由 [T] 表示，T 为元素类型。

```rust
let s = String::from("abcdefg");
let s1 = &s[..];    // s1 内容是 "abcdefg"
let s2 = &s[0..4];  // s2 内容是 "abcd"
let s3 = &s[2..5];  // s3 内容是 "cde"
```

字符串切片引用转换成所有权型字符串

```rust
let s: &str = "I am a superman.";
let s1: String = String::from(s);  // 使用 String 的from构造器
let s2: String = s.to_string();    // 使用 to_string() 方法
let s3: String = s.to_owned();     // 使用 to_owned() 方法
```

#### `[u8]`、`&[u8]`、`&[u8; N]`、`Vec<u8>`

- `[u8]` 是字节串切片，大小是可以动态变化的。
- `&[u8]` 是对字节串切片的引用，即切片引用，与 `&str` 是类似的。
- `&[u8; N]` 是对 u8 数组（其长度为 N）的引用。
- `Vec<u8>` 是 u8 类型的动态数组。与 `String` 类似，这是一种具有所有权的类型。

```rust
fn main() {
    let vec: Vec<u8> = "I am super man".as_bytes().to_vec();
    let vec_reference: &Vec<u8> = &vec[..]; // 报错！&Vec<u8>是对整个Vec的引用
    let byte_slice: &[u8] = &vec[..]; // &[u8]是对Vec的切片引用
    println!("{:?} {:?}", vec_reference, byte_slice);
}
```

#### `as_str()`、`as_bytes()`、`as_slice()`

String 类型上有个方法是 `as_str()`。它返回 `&str` 类型。这个方法效果其实等价于 `&a_string[..]`，也就是包含完整的字符串内容的切片。

```rust
let s: String = "I am a superman".to_string();
let s1: &str = s.as_str();
```

String 类型上还有个方法是 `as_bytes()`，它返回 `&[u8]` 类型。该方法同样能使 `&str` 转换成 `&[u8]` 。

```rust
fn main() {
    let s: String = "i am a superman".to_string();
    let s1: &[u8] = s.as_bytes();
    println!("{:?}", s1);
}

```

Vec 上有个 `as_slice()` 函数，与 String 上的` as_str()` 对应，把完整内容转换成切片引用` &[T]`，等价于 `&a_vec[..]`。

```rust
let a_vec: Vec<i32> = vec![1, 2, 3, 5, 8];
let v: &[i32] = a_vec.as_slice();
```

#### 隐式引用类型转换

```rust
fn foo(s: &String) {  }

fn main() {
  let s = String::from("I am a superman.");
  foo(&s); // &String
  let s1 = "I am a superman.";    
  foo(s1); // 报错！&str类型不匹配                    
}
```

```rust
fn foo(s: &str) {}      // 只需要把这里的参数改为 &str 类型

fn main() {
  let s = String::from("I am a superman.");
  foo(&s);
  let s1 = "I am a superman.";    
  foo(s1);                        
}
```

在 Rust 中对 String 做引用操作时，可以告诉 Rust 编译器，我想把 &String 直接转换到 &str 类型。只需要在代码中明确指定目标类型就可以了。

```rust
let s = String::from("I am a superman.");
let s1: String = &s;
// 手动指定 s2 类型 &str，将 &String 转换为 &str
let s2: &str = &s;
// 使用 &s[..] 自动转化
let s2: &str = &s[..];
```

- &String -> &str
- &Vec[u8] -> &[u8]
- &Vec[T] -> &[T]

#### 字节串转换成字符串

前面我们看到可以通过 `as_bytes()`方法将字符串转换成 `&[u8]`。相反的操作也是有的，就是把`&[u8]` 转换成字符串。

- `String::from_utf8()`，可以把 Vec 转换成 String，转换不一定成功，因为一个字节序列不一定是有效的 UTF-8 编码序列。它返回的是 Result（关于 Result，我们后面会专题讲解，这里仅做了解），需要自行做错误处理。
- `String::from_utf8_unchecked()` 可以把 Vec 转换成 String。不检查字节序列是不是无效的 UTF-8 编码，直接返回 String 类型。但是这个函数是 unsafe 的，一般不推荐使用。
- `str::from_utf8()` 可以将 &[u8] 转换成 &str。它返回的是 Result，需要自行做错误处理。
- `str::from_utf8_unchecked()` 可以把 &[u8] 转换成 &str。它直接返回 &str 类型。但是这个函数是 unsafe 的，一般不推荐使用。

#### 字符串切割成字符数组

```rust
fn main() {
    let s = String::from("中国你好");                                                                                 
    let char_vec: Vec<char> = s.chars().collect();                                                                     
    println!("{:?}", char_vec); 
    
    for ch in s.chars() {
        println!("{:?}", ch); 
    }
}
```

#### Parse 方法

str 有一个 parse() 方法非常强大，可以从字符串转换到任意 Rust 类型，只要这个类型实现了 FromStr 这个 Trait即可。把字符串解析成 Rust 类型，肯定有不成功的可能，所以这个方法返回的是一个 Result，需要自行处理解析错误的情况。

```rust
fn main() {
    let a = "10".parse::<u32>();
    let aa: u32 = "10".parse().unwrap(); // 这种写法也很常见
    println!("{:?}", a);
    
    let a = "10".parse::<f32>();
    println!("{:?}", a);
    
    let a = "4.2".parse::<f32>();
    println!("{:?}", a);
    
    let a = "true".parse::<bool>();
    println!("{:?}", a);

    let a = "a".parse::<char>();
    println!("{:?}", a);
    
    let a = "192.168.1.100".parse::<std::net::IpAddr>();
    println!("{:?}", a);
}
```

### 结构体

结构体是由其他的基础类型或复合类型组成的，当它所有字段同时实例化后，就生成了这个结构体的实例。在 Rust 中，结构体使用 **struct** 关键字进行定义。

#### 结构体实例

```rust
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn main() {
    let user1 = User {
        active: true,
        username: String::from("someusername123"),
        email: String::from("someone@example.com"),
        sign_in_count: 1,
    };
}
```

结构体类型也可以参与更复杂结构体的构建。

```rust
struct Class {
  serial_number: u32,
  grade_number: u32,
  entry_year: String,
  members: Vec<User>,  
}
```

**结构体往往是一个程序的骨干，用来承载对目标问题进行建模和描述的重任。**

#### 结构体形式

**命名结构体**

命名结构体是指每个字段都有名字的结构体，比如前面提到的 User 结构体，它的每个字段都有明确的名字和类型。

如果在实例化结构体之前，命名了结构体字段名的同名变量，那么用下面这种写法可以偷懒少写几个字符。

```rust
fn main() {
    let active = true;
    let username = String::from("someusername123");
    let email = String::from("someone@example.com");
    let user1 = User {
        active,    // 这里本来应该是 active: active,
        username,  // 这里本来应该是 username: username,
        email,     // 这里本来应该是 email: email,
        sign_in_count: 1,
    };
}
```

结构体创建好之后，可以更新结构体的部分字段。下面的示例里就单独更新了 email 字段。

```rust
fn main() {
    // mut 修饰符，不加的话就没办法修改这个结构体里的字段。
    let mut user1 = User {
        active: true,
        username: String::from("someusername123"),
        email: String::from("someone@example.com"),
        sign_in_count: 1,
    };

    user1.email = String::from("anotheremail@example.com");
}
```

如果我们已经有了一个 User 的实例 user1，想再创建一个新的 user2，而两个实例之间只有部分字段不同。这时，Rust 也提供了偷懒的办法，比如：

```rust
fn main() {
    let active = true;
    let username = String::from("someusername123");
    let email = String::from("someone@example.com");
    let user1 = User {
        active,
        username,
        email,
        sign_in_count: 1,
    };
    let user2 = User {
        email: String::from("another@example.com"),
        ..user1    // 注意这里，直接用 ..user1
    };
}
```

**元组结构体**

Rust 中也支持一种匿名结构体的形式，也叫做元组结构体。所谓元组结构体，也就是元组和结构体的结合体。

```rust
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

fn main() {
    let black = Color(0, 0, 0);
    let origin = Point(0, 0, 0);
}
```

```rust
fn main() {
    struct Color(i32, i32, i32);
    // 创建一个 Color 实例
    let red = Color(255, 0, 0);
    // 访问元组结构体的字段
    println!("Red color: {}, {}, {}", red.0, red.1, red.2);
    // 解构元组结构体
    let Color(r, g, b) = red;
    println!("Red color (destructured): {}, {}, {}", r, g, b);
}
```

**单元结构体**

Rust 还支持单元结构体。单元结构体就是只有一个类型名字，没有任何字段的结构体。单元结构体在定义和创建实例的时候，连后面的花括号都可以省略。

```rust
struct ArticleModule;

fn main() {
    let module = ArticleModule;    // 请注意这一句，也做了实例化操作
}
```

#### 结构体中的所有权问题

**部分移动**

```rust
#[derive(Debug)]
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u32,
}

fn main() {
    let active = true;
    let username = String::from("someusername123");
    let email = String::from("someone@example.com");
    let user1 = User {
        active,
        username,
        email,
        sign_in_count: 1,
    };
    
    let email = user1.email;  // 在这里发生了partially moved
    
    println!("{:?}", user1)   // 这一句无法通过编译
}
```

```rust
let email = user1.email;

println!("{}", user1.username);      // 分别打印另外3个字段 
println!("{}", user1.active);
println!("{}", user1.sign_in_count);
println!("{}", user1.email); // 部分移动 报错！
```

**字段是引用类型**

```rust
struct User {
    active: &bool,       // 这里换成了 &bool
    username: &str,      // 这里换成了 &str
    email: &str,         // 这里换成了 &str
    sign_in_count: &u32, // 这里换成了 &u32
}
```

**给结构体添加标注**

```rust
#[derive(Debug)]        // 这里，在结构体上面添加了一种标注
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u32,
}
```

```rust
// 这样标注后，就可以在打印语句的时候把整个结构体打印出来了
println!("{:?}", user1);    // 注意这里的 :? 符号
```

这种 `#[derive(Debug)] `语法在 Rust 中叫`属性标注`，具体来说这里用的是`派生宏属性`，`派生宏`作用在下面紧接着的结构体类型上，可以为结构体自动添加一些功能。

#### 面向对象特性

Rust 不是一门面向对象的语言，但是它确实有部分面向对象的特性**。而 Rust 承载面向对象特性的主要类型就是结构体。Rust 有个关键字 impl 可以用来给结构体或其他类型实现方法，也就是关联在某个类型上的函数。**

**方法（实例方法）**

使用 impl 关键字为结构体实现方法，可以像下面这样：

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {                // 就像这样去实现
    fn area(self) -> u32 {      // area就是方法，被放在impl实现体中
        self.width * self.height
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area()      // 使用点号操作符调用area方法
    );
}
// 输出
The area of the rectangle is 1500 square pixels.
```

**Self**

```rust
fn area(self) -> u32 
```

实际上这里是 Rust 的一个语法糖，self 的完整写法是 self: Self，而 Self 是 Rust 里一个特殊的类型名，它表示正在被实现（impl）的那个类型。

Rust 中所有权形式和借用形式总是成对出现，在 impl 的时候也是如此。方法的签名中也会对应三种参数形式。

```rust
impl Rectangle {
    fn area1(self) -> u32 { // self: Self
        self.width * self.height
    }
    fn area2(&self) -> u32 { // self: &Self
        self.width * self.height
    }
    fn area3(&mut self) -> u32 { // self: &mut Self
        self.width * self.height
    }
}
```

- self: Self：传入实例的所有权。
- self: &Self：传入实例的不可变引用。
- self: &mut Self：传入实例的可变引用。

**关联函数（静态方法）**

如果第一个参数不是 self，那么他则是一个静态方法。关联函数使用类型配合路径符 :: 来调用。注意这里与实例用点运算符调用方法的区别。

```rust
impl Rectangle {
    fn numbers(rows: u32, cols: u32) -> u32 {
        rows * cols
    }
}

// Rectangle::numbers(10, 10);
```

**构造函数**

Rust 中结构体可以直接实例化，比如前面定义的 Rectangle。

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };
}
```

Rust 社区一般约定使用 new() 这个名字的关联函数，像下面这样把类型的实例化包起来。

```rust
impl Rectangle {
  pub fn new(width: u32, height: u32) -> Self {
    Rectangle {
        width,
        height,
    }
  }  
}

let rect1 = Rectangle::new(30, 50);
```

new 这个名字并不是强制的。

**Default**

```rust
#[derive(Debug, Default)]      // 这里加了一个Default派生宏
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1: Rectangle = Default::default();    // 使用方式1
    let rect2 = Rectangle::default();             // 使用方式2
    
    println!("{:?}", rect1);
    println!("{:?}", rect2);
}

// 打印出如下：
Rectangle { width: 0, height: 0 }
Rectangle { width: 0, height: 0 }
```

Default 有两种使用方式，一种是直接用 Default::default()，第二种是用类型名 ::default()，它们的实例化效果是一样的。

### 枚举与模式匹配

#### 枚举：强大的复合类型

```rust
enum Shape {
    Rectangle,
    Triangle,
    Circle,
}
```

枚举与结构体不同，结构体的实例化需要所有字段一起起作用，而枚举的实例化只需要且只能是其中一个变体起作用。

```rust
struct Rectangle {
    width: u32,
    height: u32,
}

enum Shape {
    Rectangle (Rectangle),
    Triangle((u32, u32), (u32, u32), (u32, u32)),
    Circle { origin: (u32, u32), radius: u32 },
}
```

示例：

```rust
enum WebEvent {
    PageLoad,
    PageUnload,
    KeyPress(char),
    Paste(String),
    Click { x: i64, y: i64 },
}
```

#### 枚举实例化

枚举的实例化实际是枚举变体的实例化。

```rust
let a = WebEvent::PageLoad;
let b = WebEvent::PageUnload;
let c = WebEvent::KeyPress('c');
let d = WebEvent::Paste(String::from("batman"));
let e = WebEvent::Click { x: 320, y: 240 };
```

可以看到，不带负载的变体实例化和带负载的变体实例化不一样。带负载的变体实例化要根据不同变体附带的类型做特定的实例化。

#### 类C枚举

```rust
// 给枚举变体一个起始数字值 
enum Number {
    Zero = 0,
    One,
    Two,
}

// 给枚举每个变体赋予不同的值
enum Color {
    Red = 0xff0000,
    Green = 0x00ff00,
    Blue = 0x0000ff,
}

fn main() {
    // 使用 as 进行类型的转化
    println!("zero is {}", Number::Zero as i32);
    println!("one is {}", Number::One as i32);

    println!("roses are #{:06x}", Color::Red as i32);
    println!("violets are #{:06x}", Color::Blue as i32);
}
// 输出 
zero is 0
one is 1
roses are #ff0000
violets are #0000ff
```

打印的时候，只需要使用 as 操作符将变体转换为具体的数值类型即可。

代码中的 println! 里的 {:06x} 是格式化参数，这里表示打印出值的 16 进制形式，占位 6 个宽度，不足的用 0 补齐。你可以顺便了解一下 println 打印语句中格式化参数的详细内容。格式化参数相当丰富，我们可以在以后不断地实践中去熟悉和掌握它。

#### 空枚举

Rust 中也可以定义空枚举。比如 enum MyEnum {};。它其实与单元结构体一样，都表示一个类型。但是它不能被实例化。

```rust
enum Foo {}  

let a = Foo {}; // 错误的

// 提示
expected struct, variant or union type, found enum `Foo`
not a struct, variant or union type
```

#### impl 枚举

```rust
enum MyEnum {
    Add,
    Subtract,
}

impl MyEnum {
    fn run(&self, x: i32, y: i32) -> i32 {
        match self {                  // match 语句
            Self::Add => x + y,
            Self::Subtract => x - y,
        }
    }
}

fn main() {
    // 实例化枚举
    let add = MyEnum::Add;
    // 实例化后执行枚举的方法
    add.run(100, 200);
}
```

但是不能对枚举的变体直接 impl。

```rust
enum Foo {
  AAA,
  BBB,
  CCC
}

impl Foo::AAA { }  // 错误的
```

一般情况下，枚举会用来做配置，并结合 match 语句使用来做分支管理。如果要定义一个新类型，在 Rust 中主要还是使用结构体。

#### match + 枚举

```rust
#[derive(Debug)]
enum Shape {
    Rectangle,
    Triangle,
    Circle,
}

fn main() {
    let shape_a = Shape::Rectangle;  // 创建实例
    match shape_a {                  // 匹配实例
        Shape::Rectangle => {
            println!("{:?}", Shape::Rectangle);  // 进了这个分支
        }
        Shape::Triangle => {
            println!("{:?}", Shape::Triangle);
        }
        Shape::Circle => {
            println!("{:?}", Shape::Circle);
        }
    }  
}
// 输出
Rectangle
```

#### match 可返回值

就像大多数 Rust 语法一样，match 语法也是可以有返回值的，所以也叫做 match 表达式。

```rust
// match 表达式中各个分支返回的值的类型必须相同。
// 所有分支都必须处理
let res = match shape_a {
        Shape::Rectangle => {
            1
        }
        Shape::Triangle => {
            2
        }
        // Shape::Circle => {
        //    3
        // }
    	// 报错！Circle 分支没有被处理
    }  
```

#### _ 占位符

有时，你确实想测试一些东西，或者就是不想处理一些分支，可以用 _ 偷懒。

```rust
#[derive(Debug)]
enum Shape {
    Rectangle,
    Triangle,
    Circle,
}

fn main() {
    let shape_a = Shape::Rectangle;  
    let ret = match shape_a {                  
        Shape::Rectangle => {
            1
        }
        _ => {
            10
        }
    };
    println!("{}", ret);  
}
```

相当于除` Shape::Rectangle `之外的分支我们都统一用 _ 占位符进行处理了。

#### 更广泛的分支

```rust
fn main() {
    let number = 13;
    // 你可以试着修改上面的数字值，看看下面走哪个分支

    println!("Tell me about {}", number);
    match number {
        // 匹配单个数字
        1 => println!("One!"),
        // 匹配几个数字
        2 | 3 | 5 | 7 | 11 => println!("This is a prime"),
        // 匹配一个范围，左闭右闭区间
        13..=19 => println!("A teen"),
        // 处理剩下的情况
        _ => println!("Ain't special"),
    }
}
```

#### 模式匹配

match 实际是模式匹配的入口，从 match 表达式我们可引出模式匹配的概念。模式匹配就是**按对象值的结构**进行匹配，并且可以取出符合模式的值。下面我们通过一些示例来解释这句话。

模式匹配不限于在 match 中使用。除了 match 外，Rust 还给模式匹配提供了其他一些语法层面的设施。

#### if let

当要匹配的分支只有两个或者在这个位置只想先处理一个分支的时候，可以直接用 if let。

```rust
let shape_a = Shape::Rectangle;  
match shape_a {                  
    Shape::Rectangle => {
        println!("1");
    }
    _ => {
        println!("10");
    }
};
```

改写为：

```rust
let shape_a = Shape::Rectangle;  
if let Shape::Rectangle = shape_a {                  
    println!("1");
} else {
    println!("10");
}
```

`if let` 不仅仅适用于 `enum`，它也适用于其他可匹配的模式，例如结构体、元组和 `Option`、`Result` 等。

```rust
struct Point {
    x: i32,
    y: i32,
}

let my_point = Point { x: 5, y: 10 };

if let Point { x, y } = my_point {
    println!("x: {}, y: {}", x, y);
}
```

```rust
let maybe_value: Option<u32> = Some(42);

if let Some(value) = maybe_value {
    println!("Got a value: {}", value);
}
```

```rust
let result: Result<i32, &str> = Ok(42);

if let Ok(value) = result {
    println!("Success! Value: {}", value);
}
```

#### while let

```rust
#[derive(Debug)]
enum Shape {
    Rectangle,
    Triangle,
    Circle,
}

fn main() {
    let mut shape_a = Shape::Rectangle; 
    let mut i = 0;
    while let Shape::Rectangle = shape_a {    // 注意这一句
        if i > 9 {
            println!("Greater than 9, quit!");
            shape_a = Shape::Circle;
        } else {
            println!("`i` is `{:?}`. Try again.", i);
            i += 1;
        }
    }
}
// 输出
`i` is `0`. Try again.
`i` is `1`. Try again.
`i` is `2`. Try again.
`i` is `3`. Try again.
`i` is `4`. Try again.
`i` is `5`. Try again.
`i` is `6`. Try again.
`i` is `7`. Try again.
`i` is `8`. Try again.
`i` is `9`. Try again.
Greater than 9, quit!
```

看起来，在条件判断语句那里用 `while Shape::Rectangle == shape_a` 也行，好像用 while let 的意义不大。我们来试一下，编译之后，报错了。

#### let

let 本身就支持模式匹配。其实前面的 if let、while let 本身使用的就是 let 模式匹配的能力。

```rust
#[derive(Debug)]
enum Shape {
    Rectangle {width: u32, height: u32},
    Triangle,
    Circle,
}

fn main() {
    // 创建实例
    let shape_a = Shape::Rectangle {width: 10, height: 20}; 
    // 模式匹配出负载内容
    let Shape::Rectangle {width, height} = shape_a else {
        panic!("Can't extract rectangle.");
    };
    println!("width: {}, height: {}", width, height);
}

// 输出
width: 10, height: 20
```

我们利用模式匹配解开了 shape_a 中带的负载（结构体负载），同时定义了 width 和 height 两个局部变量，并初始化为枚举变体的实例负载的值。这两个局部变量在后续的代码块中可以使用。

#### 匹配元组

```rust
// 元组也可以被解构
fn main() {
    let a = (1,2,'a');
    
    let (b,c,d) = a;
    
    println!("{:?}", a);
    println!("{}", b);
    println!("{}", c);
    println!("{}", d);
}
```

#### 匹配枚举

```rust
struct Rectangle {
    width: u32, 
    height: u32
}

enum Shape {
    Rectangle(Rectangle),
    Triangle((u32, u32), (u32, u32), (u32, u32)),
    Circle { origin: (u32, u32), radius: u32 },
}

fn main() {
    let a_rec = Rectangle {
        width: 10,
        height: 20,
    };
  
    // 请打开下面这一行进行实验
    //let shape_a = Shape::Rectangle(a_rec);
    // 请打开下面这一行进行实验
    //let shape_a = Shape::Triangle((0, 1), (3,4), (3, 0));
    
    let shape_a = Shape::Circle { origin: (0, 0), radius: 5 };
    
    // 这里演示了在模式匹配中将枚举的负载解出来的各种形式
    match shape_a {
        Shape::Rectangle(a_rec) => {  // 解出一个结构体
            println!("Rectangle {}, {}", a_rec.width, a_rec.height);
        }
        Shape::Triangle(x, y, z) => {  // 解出一个元组
            println!("Triangle {:?}, {:?}, {:?}", x, y, z);
        }
        Shape::Circle {origin, radius} => {  // 解出一个结构体的字段
            println!("Circle {:?}, {:?}", origin, radius);
        }
    }
}
// 输出
Circle (0, 0), 5
```

#### 匹配结构体

```rust
#[derive(Debug)]
struct User {
    name: String,
    age: u32,
    student: bool
}

fn main() {
    let a = User {
        name: String::from("mike"),
        age: 20,
        student: false,
    };
    let User {
        name,
        age,
        student,
    } = a;
    
    println!("{}", name);
    println!("{}", age);
    println!("{}", student);
    println!("{:?}", a); // 报错！name的所有权已经被转移
}
```

模式匹配过程中新定义的三个变量 name、age、student 分别得到了对应 User 实例 a 的三个字段值的所有权。age 和 student 采用了复制所有权的形式，而 name 字符串值则是采用了移动所有权的形式。a.name 被部分移动到了新的变量 name ，所以接下来 a.name 就无法直接使用了。

#### ref

```rust
#[derive(Debug)]
struct User {
    name: String,
    age: u32,
    student: bool
}

fn main() {
    let a = User {
        name: String::from("mike"),
        age: 20,
        student: false,
    };
    let User {
        ref name,    // 这里加了一个ref, name 的类型为 &String
        age,
        student,
    } = a;
    
    println!("{}", name);
    println!("{}", age);
    println!("{}", student);
    println!("{:?}", a);
}
// 输出 
mike
20
false
User { name: "mike", age: 20, student: false }
```

### 类型与类型参数

#### 类型

类型是对数据的分类，这个分类定义了这些数据的意义、被允许的值的集合，还有能在这些数据上执行哪些操作。编译器或运行时会检查类型化过程，以确保数据的完整性，对数据施加访问限制，以及把数据按程序员的意图进行解释。

**把类型看作集合，这个集合表达了这个类型的实例能取到的所有可能的值。**

#### 类型系统

类型系统是一套规则集——把类型赋予和施加到编程语言的元素上。这些元素可以是变量、函数和其他高阶结构。

#### 类型化的好处

正确性、不可变性、封装性、组合性、可读性。

```rust
fn main() {
    let a = 1.0f32;
    let b = 10; // 解决方法，使用 as 强制转化类型；let b = 10 as f32;
    
    let c = a * b; // 报错！a 与 b 不是相同类型
}
```

这里其实展示出 Rust 的一个非常明显的特点：**尽可能地显式化**。显式化包含两层意思。

1. 不做自动隐式转换。
2. 没有内置的转换策略。

#### 类型作为一种约束

类型是变量所有可能取得的值的集合。换句话说，类型实际上限制或定义了变量的取值空间。因此，类型对于变量来说，也是一种约束。

#### 泛型

```rust
struct Point<T, U> {
    x: T,
    y: U,
}

fn main() {
    let both_integer = Point { x: 5, y: 10 };
    let both_float = Point { x: 1.0, y: 4.0 };
    let integer_and_float = Point { x: 5, y: 4.0 };
}
```

```rust
struct Point<T> {
    x: T,
    y: T,
}

fn main() {
    let integer = Point::<u32> { x: 5, y: 10 };     
    let float = Point::<f32> { x: 1.0, y: 4.0 };    
}
```

```rust
struct Point<T, U> {
    x: T,
    y: U,
}

fn main() {
    let both_integer = Point::<u32, u32> { x: 5, y: 10 };
    let both_float = Point::<f32, f32> { x: 1.0, y: 4.0 };
    let integer_and_float = Point::<u32, f32> { x: 5, y: 4.0 };
}
```

#### 在泛型上做 impl

```rust
struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T> {        // 注意这一行
    fn play(n: T) {}      // 注意这一行
}
```

`impl<T> Point<T>` 中的两个 `<T>` 有不同的作用

- `<T>` 在 `impl<T>` 中表示类型参数，用于指定一个泛型类型。这个类型参数可以在结构体定义或实现的方法中使用，使得代码更加通用和灵活。也就是n 使用到的泛型T。
- `Point<T>` 表示要实现的类型或者类型的泛型。Point struct需要实现的泛型 T

```rust
struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T> {
    fn play(n: T) {}
}

impl Point<u32> {      // 这里，对具化类型 Point<u32> 继续做 impl
    fn doit() {}
}
```

#### 枚举中的类型参数

枚举的变体可以挂载任意其他类型作为负载。因此每个负载的位置，都可以出现类型参数。比如最常见的两个枚举，Option 与 Result，就是泛型。

**Option 用来表示有或无。**

```rust
enum Option<T> {
    Some(T),
    None,
}
```

**Result 用来表示结果，正确或错误。Ok 变体带类型参数 T，Err 变体带类型参数 E。**

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

#### 函数中的类型参数

逻辑相同，参数类型不同的函数。

```rust
struct PointU32 {
    x: u32,
    y: u32,
}

struct PointF32 {
    x: f32,
    y: f32,
}

fn print_u32(p: PointU32) {
    println!("Point {}, {}", p.x, p.y);
}

fn print_f32(p: PointF32) {
    println!("Point {}, {}", p.x, p.y);
}

fn main() {
    let p = PointU32 {x: 10, y: 20};
    print_u32(p);

    let p = PointF32 {x: 10.2, y: 20.4};
    print_f32(p);
}
```

使用泛型修改：

```rust
struct Point<T> {
    x: T,
    y: T,
}

fn print<T: std::fmt::Display>(p: Point<T>) {
    println!("Point {}, {}", p.x, p.y);
}

fn main() {
    let p = Point {x: 10, y: 20};
    print(p);

    let p = Point {x: 10.2, y: 20.4};
    print(p);
}
```

#### 方法中的类型参数

```rust
struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T> {
    fn x(&self) -> &T {
        return &self.y
    }
}
fn main() {
    let p = Point { x: 10, y: 10 };
    p.x();
    println!("{}", p.x())
}
```

复杂案例：

```rust
struct Point<X1, Y1> {
    x: X1,
    y: Y1,
}

// 这里定义了impl block中可以使用的类型参数X3, Y3，
impl<X3, Y3> Point<X3, Y3> {
    // 这里单独为mixup方法定义了两个新的类型参数 X2, Y2
    // 于是在mixup方法中，可以使用4个类型参数：X3, Y3, X2, Y2
    fn mixup<X2, Y2>(self, other: Point<X2, Y2>) -> Point<X3, Y2> {
        Point {
            x: self.x,
            y: other.y,
        }
    }
}

fn main() {
    let p1 = Point { x: 5, y: 10.4 };
    let p2 = Point { x: "Hello", y: 'c' };

    let p3 = p1.mixup(p2);

    println!("p3.x = {}, p3.y = {}", p3.x, p3.y);
}
```

#### newtype

结构体还有一种常见的封装方法，那就是用单元素的元组结构体。比如定义一个列表类型 struct List(Vec);。它实际就是 Vec 类型的一个新封装，相当于给里面原来那种类型取了一个新名字，同时也把原类型的属性和方法等屏蔽起来了。

```rust
struct List<T>(Vec<T>);
```

#### 洋葱结构

Rust 中的类型还有另外一种构建方法——洋葱结构。我们来看一个示例，注意代码里的 type 关键字在这里的作用是把一个类型重命名，取了一个更短的名字。
