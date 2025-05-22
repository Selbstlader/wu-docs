# Java 控制流程

## 1. 条件语句

### 1.1 if-else 语句
```java
if (条件1) {
    // 条件1为真时执行
} else if (条件2) {
    // 条件2为真时执行
} else {
    // 所有条件都为假时执行
}
```

### 1.2 switch 语句
```java
switch (表达式) {
    case 值1:
        // 代码块1
        break;
    case 值2:
        // 代码块2
        break;
    default:
        // 默认代码块
}
```

## 2. 循环语句

### 2.1 for 循环
```java
// 基本for循环
for (初始化; 条件; 更新) {
    // 循环体
}

// 增强for循环（用于遍历数组或集合）
for (类型 变量 : 数组或集合) {
    // 循环体
}
```

### 2.2 while 循环
```java
while (条件) {
    // 循环体
}
```

### 2.3 do-while 循环
```java
do {
    // 循环体
} while (条件);
```

## 3. 跳转语句

### 3.1 break
- 跳出当前循环
- 跳出 switch 语句
```java
for (int i = 0; i < 10; i++) {
    if (i == 5) {
        break;  // 当i等于5时跳出循环
    }
}
```

### 3.2 continue
- 跳过当前循环的剩余部分
- 继续下一次循环
```java
for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) {
        continue;  // 跳过偶数
    }
    System.out.println(i);
}
```

## 4. 实际开发中的最佳实践

### 4.1 条件语句最佳实践
```java
// 1. 使用括号明确优先级
if ((age >= 18) && (age < 60)) {
    // 代码
}

// 2. 使用常量比较
if (status == UserStatus.ACTIVE) {
    // 代码
}

// 3. 避免深层嵌套
if (!isValid) {
    return;
}
// 继续处理有效情况
```

### 4.2 循环最佳实践
```java
// 1. 使用增强for循环遍历集合
for (String item : items) {
    System.out.println(item);
}

// 2. 使用while循环处理不确定次数的循环
while (scanner.hasNext()) {
    String input = scanner.next();
    // 处理输入
}

// 3. 使用do-while处理至少执行一次的循环
do {
    // 获取用户输入
} while (!isValidInput);
```

## 5. 常见问题及解决方案

### 5.1 无限循环
问题：循环条件永远为真
```java
while (true) {
    // 可能造成无限循环
}
```
解决方案：确保有退出条件
```java
boolean running = true;
while (running) {
    if (shouldStop()) {
        running = false;
    }
}
```

### 5.2 空循环体
问题：循环体为空
```java
for (int i = 0; i < 10; i++);  // 注意这里的分号
```
解决方案：使用大括号
```java
for (int i = 0; i < 10; i++) {
    // 循环体
}
```

## 6. 练习题

1. 实现一个简单的计算器程序：
   - 支持加减乘除四则运算
   - 使用 switch 语句处理不同运算符
   - 处理除数为零的情况

2. 实现一个猜数字游戏：
   - 随机生成一个1-100之间的数字
   - 用户输入猜测的数字
   - 给出"太大"或"太小"的提示
   - 统计猜测次数

3. 打印杨辉三角：
   - 使用嵌套循环
   - 处理边界情况
   - 格式化输出

## 7. 扩展阅读

- [Oracle Java 教程 - 控制流程语句](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/flow.html)
- [Java 循环语句最佳实践](https://www.baeldung.com/java-loops)
- [Java 条件语句最佳实践](https://www.baeldung.com/java-conditional-statements) 