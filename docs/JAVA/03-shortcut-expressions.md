# Java 快捷表达式

## 1. 三元运算符

### 1.1 基本用法
```java
// 语法：condition ? valueIfTrue : valueIfFalse
int age = 20;
String status = age >= 18 ? "成年人" : "未成年";
```

### 1.2 链式三元运算符
```java
int score = 85;
String grade = score >= 90 ? "优秀" : 
              score >= 80 ? "良好" : 
              score >= 60 ? "及格" : "不及格";
```

## 2. 空值处理

### 2.1 三元运算符处理空值
```java
String name = null;
String displayName = name != null ? name : "未知";
```

### 2.2 Optional 类（Java 8+）
```java
// 创建 Optional
Optional<String> optionalName = Optional.ofNullable(name);

// 获取值或默认值
String safeName = optionalName.orElse("未知");

// 条件执行
optionalName.ifPresent(n -> System.out.println(n));

// 链式操作
String result = optionalName
    .map(String::toUpperCase)
    .orElse("未知");
```

## 3. 短路运算符

### 3.1 && (与) 短路
```java
// 如果 text 为 null，不会执行 text.length()
if (text != null && text.length() > 0) {
    // 代码
}
```

### 3.2 || (或) 短路
```java
// 如果 value < 0 为 true，不会检查 value > 100
if (value < 0 || value > 100) {
    // 代码
}
```

## 4. 其他快捷操作

### 4.1 递增/递减
```java
int count = 0;
count++;  // 后递增
++count;  // 前递增
count--;  // 后递减
--count;  // 前递减
```

### 4.2 复合赋值
```java
int number = 5;
number += 3;  // 等同于 number = number + 3
number -= 2;  // 等同于 number = number - 2
number *= 2;  // 等同于 number = number * 2
number /= 2;  // 等同于 number = number / 2
```

### 4.3 位运算快捷操作
```java
int flags = 0;
flags |= 1;    // 设置标志位
flags &= ~1;   // 清除标志位
flags ^= 1;    // 切换标志位
```

## 5. 实际开发中的最佳实践

### 5.1 使用三元运算符
```java
// 推荐：简单条件判断
String status = isActive ? "活跃" : "非活跃";

// 不推荐：复杂条件判断
String status = isActive ? 
    (hasPermission ? "活跃且有权限" : "活跃但无权限") : 
    "非活跃";
```

### 5.2 使用 Optional
```java
// 推荐：使用 Optional 处理可能为空的值
Optional.ofNullable(user)
    .map(User::getName)
    .orElse("未知用户");

// 不推荐：使用三元运算符处理嵌套空值
String name = user != null ? 
    (user.getName() != null ? user.getName() : "未知") : 
    "未知";
```

### 5.3 使用短路运算符
```java
// 推荐：使用短路运算符避免空指针异常
if (list != null && !list.isEmpty()) {
    // 处理列表
}

// 不推荐：分开判断
if (list != null) {
    if (!list.isEmpty()) {
        // 处理列表
    }
}
```

## 6. 练习题

1. 使用三元运算符实现：
   - 判断一个数是否为正数
   - 返回两个数中的较大值
   - 根据分数返回等级（A/B/C/D）

2. 使用 Optional 实现：
   - 安全地获取嵌套对象的属性
   - 处理可能为空的集合
   - 实现空值合并操作

3. 使用短路运算符实现：
   - 安全的字符串操作
   - 范围检查
   - 条件组合

## 7. 扩展阅读

- [Oracle Java 教程 - 运算符](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/operators.html)
- [Java Optional 最佳实践](https://www.baeldung.com/java-optional)
- [Java 8 新特性](https://www.baeldung.com/java-8-new-features) 