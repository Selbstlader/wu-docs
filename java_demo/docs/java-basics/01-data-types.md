# Java 数据类型

## 1. 基本数据类型（Primitive Types）

### 1.1 整数类型
| 类型  | 大小    | 范围                    | 常用场景           |
|-------|---------|------------------------|-------------------|
| byte  | 1字节   | -128 到 127            | 年龄、小数值      |
| short | 2字节   | -32,768 到 32,767      | 年份、中等数值    |
| int   | 4字节   | ±21亿                  | 最常用的整数类型  |
| long  | 8字节   | ±922亿亿               | 大数值，如人口数  |

### 1.2 浮点类型
| 类型   | 大小    | 精度     | 常用场景           |
|--------|---------|----------|-------------------|
| float  | 4字节   | 单精度   | 价格、一般计算    |
| double | 8字节   | 双精度   | 科学计算、金额    |

### 1.3 其他基本类型
| 类型      | 大小    | 取值范围        | 常用场景           |
|-----------|---------|----------------|-------------------|
| boolean   | 1位     | true/false     | 条件判断          |
| char      | 2字节   | 单个字符        | 字符处理          |

## 2. 引用类型（Reference Types）

### 2.1 String（最常用）
```java
String name = "张三";
String email = "zhangsan@example.com";
```
特点：
- 不可变性
- 支持多种操作方法
- 线程安全

### 2.2 数组
```java
int[] scores = {85, 90, 95};
String[] hobbies = {"读书", "运动", "音乐"};
```
特点：
- 固定长度
- 相同类型元素
- 通过索引访问

## 3. 实际开发中的最佳实践

### 3.1 金额计算
```java
// 错误示例
double price1 = 0.1;
double price2 = 0.2;
System.out.println(price1 + price2); // 输出：0.30000000000000004

// 正确示例
BigDecimal bd1 = new BigDecimal("0.1");
BigDecimal bd2 = new BigDecimal("0.2");
System.out.println(bd1.add(bd2)); // 输出：0.3
```

### 3.2 字符串拼接
```java
// 1. 使用 + 运算符（简单场景）
String name = "张三";
int age = 25;
String info = name + "今年" + age + "岁";

// 2. 使用 String.format（格式化场景）
String info2 = String.format("姓名：%s，年龄：%d", name, age);

// 3. 使用 StringBuilder（大量拼接场景）
StringBuilder sb = new StringBuilder();
sb.append("姓名：").append(name)
  .append("，年龄：").append(age);
String info3 = sb.toString();
```

### 3.3 类型转换
```java
// 自动类型转换（小类型转大类型）
int intValue = 100;
long longValue = intValue;        // int 自动转 long
double doubleValue = intValue;    // int 自动转 double

// 强制类型转换（大类型转小类型）
double price = 99.9;
int intPrice = (int) price;      // 会丢失小数部分
```

## 4. 常见问题及解决方案

### 4.1 浮点数精度问题
问题：浮点数计算可能出现精度误差
```java
double result = 0.1 + 0.2;  // 结果：0.30000000000000004
```
解决方案：使用 BigDecimal
```java
BigDecimal bd1 = new BigDecimal("0.1");
BigDecimal bd2 = new BigDecimal("0.2");
BigDecimal result = bd1.add(bd2);  // 结果：0.3
```

### 4.2 字符串比较
问题：使用 == 比较字符串
```java
String s1 = "hello";
String s2 = new String("hello");
System.out.println(s1 == s2);  // false
```
解决方案：使用 equals 方法
```java
System.out.println(s1.equals(s2));  // true
```

## 5. 练习题

1. 创建一个表示商品信息的类，包含：
   - 商品名称（String）
   - 价格（BigDecimal）
   - 库存数量（int）
   - 是否上架（boolean）

2. 实现以下功能：
   - 计算商品总价值（价格 * 数量）
   - 格式化输出商品信息
   - 判断商品是否缺货（数量 < 10）

## 6. 扩展阅读

- [Oracle Java 文档 - 基本数据类型](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html)
- [Java 中的 BigDecimal 使用指南](https://www.baeldung.com/java-bigdecimal-biginteger)
- [Java 字符串最佳实践](https://www.baeldung.com/java-string) 