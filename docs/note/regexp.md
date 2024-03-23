---
prev:
  text: 'Sass'
  link: '/note/sass'
next:
  text: 'Webpack'
  link: '/note/webpack'
---

# Regexp

## 基础语法

用来处理字符串的规则

- 只能处理字符串的
- 它是一个规则：可以验证字符串是否符合某个规则，也可以把字符串中符合规则的内容捕获到

## 创建对象

1. 使用一个正则表达式字面量，其由包含在斜杠之间的模式组成。

   ```js
   let reg = /\d+/
   ```

2. 调用`RegExp`对象的构造函数 ，两个参数一个是元字符字符串，一个是修饰符字符串。

   ```js
   let reg = new RegExp('\\d+')
   ```

**区别：** 构造函数因为传递的是字符串，\需要写两个才代表斜杠。

## 修饰符

| 修饰符 | 描述                           |
| ------ | ------------------------------ |
| i      | 执行大小写不敏感的匹配。       |
| g      | 执行全局匹配（查找所有匹配）。 |
| m      | 执行多行匹配。                 |

## 方括号

方括号用于查找某个范围内的字符：

| 表达式    | 描述                               |
| --------- | ---------------------------------- |
| [abc]     | 查找方括号之间的任何字符。         |
| [^abc]    | 查找任何不在方括号之间的字符。     |
| [0-9]     | 查找任何从 0 至 9 的数字。         |
| [a-z]     | 查找任何小写 a 到小写 z 的字符。   |
| [A-Z]     | 查找任何大写 A 到 大写 Z 的字符。  |
| [A-z]     | 查找任何从大写 A 到小写 z 的字符。 |
| [adgk]    | 查找给定集合内的任何字符。         |
| [^adgk]   | 查找给定集合外的任何字符。         |
| (a\|b\|c) | 查找任何指定的选项。               |

## 元字符

元字符（Metacharacter）是拥有特殊含义的字符：

| 元字符 | 描述                                        |
| ------ | ------------------------------------------- |
| .      | 查找单个字符，除了换行和行结束符。          |
| \w     | 查找单词字符。                              |
| \W     | 查找非单词字符。                            |
| \d     | 查找数字。                                  |
| \D     | 查找非数字字符。                            |
| \s     | 查找空白字符。                              |
| \S     | 查找非空白字符。                            |
| \b     | 匹配单词边界。                              |
| \B     | 匹配非单词边界。                            |
| \0     | 查找 NUL 字符。                             |
| \n     | 查找换行符。                                |
| \f     | 查找换页符。                                |
| \r     | 查找回车符。                                |
| \t     | 查找制表符。                                |
| \v     | 查找垂直制表符。                            |
| \xxx   | 查找以八进制数 xxx 规定的字符。             |
| \xdd   | 查找以十六进制数 dd 规定的字符。            |
| \uxxxx | 查找以十六进制数 xxxx 规定的 Unicode 字符。 |

## 量词

| 量词     | 描述                                        |
| :------- | :------------------------------------------ |
| n+       | 匹配任何包含至少一个 n 的字符串。           |
| n*       | 匹配任何包含零个或多个 n 的字符串。         |
| n?       | 匹配任何包含零个或一个 n 的字符串。         |
| `n{X}`   | 匹配包含 X 个 n 的序列的字符串。            |
| `n{X,Y}` | 匹配包含 X 至 Y 个 n 的序列的字符串。       |
| `n{X,}`  | 匹配包含至少 X 个 n 的序列的字符串。        |
| n$       | 匹配任何结尾为 n 的字符串。                 |
| ^n       | 匹配任何开头为 n 的字符串。                 |
| ?=n      | 匹配任何其后紧接指定字符串 n 的字符串。     |
| ?!n      | 匹配任何其后没有紧接指定字符串 n 的字符串。 |

## RegExp 对象属性

| 属性       | 描述                                     |
| :--------- | :--------------------------------------- |
| global     | RegExp 对象是否具有标志 g。              |
| ignoreCase | RegExp 对象是否具有标志 i。              |
| lastIndex  | 一个整数，标示开始下一次匹配的字符位置。 |
| multiline  | RegExp 对象是否具有标志 m。              |
| source     | 正则表达式的源文本。                     |

## RegExp 对象方法

| 方法    | 描述                                               |
| :------ | :------------------------------------------------- |
| compile | 编译正则表达式。                                   |
| exec    | 检索字符串中指定的值。返回找到的值，并确定其位置。 |
| test    | 检索字符串中指定的值。返回 true 或 false。         |

## 支持正则表达式的 String 对象的方法

| 方法    | 描述                             |
| :------ | :------------------------------- |
| search  | 检索与正则表达式相匹配的值。     |
| match   | 找到一个或多个正则表达式的匹配。 |
| replace | 替换与正则表达式匹配的子串。     |
| split   | 把字符串分割为字符串数组。       |