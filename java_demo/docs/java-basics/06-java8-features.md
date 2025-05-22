# Java 8+ 新特性

## 1. 集合工具方法

### Arrays工具类
```java
// 创建List
List<String> names = Arrays.asList("张三", "李四", "王五");
// 创建Set
Set<String> nameSet = new HashSet<>(Arrays.asList("张三", "李四", "王五"));
// 数组转List
String[] array = {"张三", "李四", "王五"};
List<String> list = Arrays.asList(array);
```

### Collections工具类
```java
// 创建空集合
List<String> emptyList = Collections.emptyList();
Set<String> emptySet = Collections.emptySet();
Map<String, String> emptyMap = Collections.emptyMap();

// 创建单元素集合
List<String> singletonList = Collections.singletonList("张三");
Set<String> singletonSet = Collections.singleton("张三");
Map<String, String> singletonMap = Collections.singletonMap("key", "value");
```

## 2. Lambda表达式

Lambda表达式是Java 8引入的一个重要特性，它允许我们以更简洁的方式编写代码，特别是在处理集合数据时。

### 基本语法
```java
// 基本语法
(parameters) -> expression
// 或
(parameters) -> { statements; }
```

### 常见用法
```java
// 排序
names.sort((a, b) -> a.compareTo(b));

// 遍历
names.forEach(name -> System.out.println("名字: " + name));
```

### 使用场景
- 集合操作
- 事件处理
- 线程创建
- 函数式接口实现

## 2. Stream API

Stream API是Java 8引入的一个强大的数据处理工具，它允许我们以声明式的方式处理集合数据。

### 主要操作
1. **中间操作**
   - filter：过滤
   - map：转换
   - sorted：排序
   - distinct：去重

2. **终端操作**
   - collect：收集结果
   - forEach：遍历
   - reduce：归约
   - count：计数

### 示例代码
```java
// 过滤计算机专业的学生
students.stream()
    .filter(s -> "计算机".equals(s.getMajor()))
    .forEach(System.out::println);

// 计算平均分
double averageScore = students.stream()
    .mapToInt(Student::getScore)
    .average()
    .orElse(0.0);

// 按专业分组
Map<String, List<Student>> studentsByMajor = students.stream()
    .collect(Collectors.groupingBy(Student::getMajor));
```

## 3. Optional类

Optional类是Java 8引入的一个用于处理空值的工具类，它可以帮助我们避免NullPointerException。

### 主要方法
- of()：创建非空Optional
- ofNullable()：创建可能为空的Optional
- isPresent()：判断值是否存在
- ifPresent()：如果值存在则执行操作
- orElse()：如果值不存在则返回默认值
- map()：转换值

### 示例代码
```java
Optional<Student> topStudent = students.stream()
    .max(Comparator.comparingInt(Student::getScore));

// 安全地获取学生信息
topStudent.ifPresent(student -> 
    System.out.println("最高分学生: " + student));

// 使用orElse提供默认值
String studentName = topStudent
    .map(Student::getName)
    .orElse("未知");
```

## 4. 新的日期时间API

Java 8引入了新的日期时间API，它比旧的Date和Calendar类更易用、更安全。

### 主要类
- LocalDate：日期
- LocalTime：时间
- LocalDateTime：日期时间
- DateTimeFormatter：格式化
- Period：日期周期
- Duration：时间间隔

### 示例代码
```java
// 获取当前日期和时间
LocalDate today = LocalDate.now();
LocalTime now = LocalTime.now();
LocalDateTime dateTime = LocalDateTime.now();

// 日期格式化
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy年MM月dd日 HH:mm:ss");
System.out.println(dateTime.format(formatter));

// 日期计算
LocalDate nextWeek = today.plusWeeks(1);
Period period = Period.between(today, nextWeek);
```

## 5. 实际应用场景

### 数据处理
- 使用Stream API处理大量数据
- 使用Lambda表达式简化代码
- 使用Optional处理可能为空的值

### 日期处理
- 使用新的日期时间API处理日期计算
- 使用DateTimeFormatter格式化日期时间

### 集合操作
- 使用Stream API进行数据过滤、转换、分组
- 使用Lambda表达式进行集合遍历和排序

## 6. 注意事项

1. Lambda表达式
   - 只能访问final或effectively final的局部变量
   - 不能修改外部变量

2. Stream API
   - 流只能使用一次
   - 中间操作是惰性的
   - 终端操作会触发实际计算

3. Optional
   - 不要过度使用
   - 主要用于返回值可能为null的情况

4. 日期时间API
   - 线程安全
   - 不可变
   - 更精确的时间计算 