# Java集合框架

## 1. 集合框架概述

Java集合框架（Java Collections Framework）是一组用于存储和操作数据的类和接口。它提供了常用的数据结构实现，如列表、集合、队列和映射。

### 主要接口
- Collection：所有集合的根接口
  - List：有序集合，允许重复
  - Set：不允许重复的集合
  - Queue：队列，先进先出
- Map：键值对映射

## 2. List接口

### ArrayList
```java
// 创建ArrayList
List<String> list = new ArrayList<>();

// 添加元素
list.add("张三");
list.add("李四");
list.add(0, "王五"); // 在指定位置插入

// 获取元素
String name = list.get(0);

// 修改元素
list.set(0, "赵六");

// 删除元素
list.remove("张三");
list.remove(0);

// 查找元素
boolean contains = list.contains("李四");
int index = list.indexOf("李四");

// 遍历
for (String item : list) {
    System.out.println(item);
}

// 使用Lambda遍历
list.forEach(System.out::println);
```

### LinkedList
```java
// 创建LinkedList
List<String> list = new LinkedList<>();

// 双向链表特有操作
LinkedList<String> linkedList = new LinkedList<>();
linkedList.addFirst("张三");  // 在头部添加
linkedList.addLast("李四");   // 在尾部添加
String first = linkedList.getFirst();  // 获取第一个元素
String last = linkedList.getLast();    // 获取最后一个元素
linkedList.removeFirst();  // 删除第一个元素
linkedList.removeLast();   // 删除最后一个元素
```

## 3. Set接口

### HashSet
```java
// 创建HashSet
Set<String> set = new HashSet<>();

// 添加元素
set.add("张三");
set.add("李四");
set.add("张三"); // 重复元素会被忽略

// 删除元素
set.remove("张三");

// 查找元素
boolean contains = set.contains("李四");

// 获取大小
int size = set.size();

// 遍历
for (String item : set) {
    System.out.println(item);
}
```

### TreeSet
```java
// 创建TreeSet（自动排序）
Set<String> set = new TreeSet<>();

// 创建TreeSet（自定义排序）
Set<Student> students = new TreeSet<>((s1, s2) -> 
    s1.getScore() - s2.getScore());

// 添加元素
set.add("张三");
set.add("李四");
set.add("王五");

// 获取第一个和最后一个元素
String first = ((TreeSet<String>) set).first();
String last = ((TreeSet<String>) set).last();
```

## 4. Queue接口

### PriorityQueue
```java
// 创建优先级队列
Queue<String> queue = new PriorityQueue<>();

// 添加元素
queue.offer("张三");
queue.add("李四");

// 获取队首元素
String peek = queue.peek();

// 出队
String poll = queue.poll();

// 检查是否为空
boolean isEmpty = queue.isEmpty();
```

## 5. Map接口

### HashMap
```java
// 创建HashMap
Map<String, String> map = new HashMap<>();

// 添加键值对
map.put("name", "张三");
map.put("age", "20");

// 获取值
String name = map.get("name");

// 删除键值对
map.remove("age");

// 检查键是否存在
boolean containsKey = map.containsKey("name");

// 检查值是否存在
boolean containsValue = map.containsValue("张三");

// 获取所有键
Set<String> keys = map.keySet();

// 获取所有值
Collection<String> values = map.values();

// 遍历
map.forEach((key, value) -> 
    System.out.println(key + ": " + value));
```

### TreeMap
```java
// 创建TreeMap（按键排序）
Map<String, String> map = new TreeMap<>();

// 创建TreeMap（自定义排序）
Map<Student, String> studentMap = new TreeMap<>((s1, s2) -> 
    s1.getScore() - s2.getScore());

// 获取第一个和最后一个键
String firstKey = ((TreeMap<String, String>) map).firstKey();
String lastKey = ((TreeMap<String, String>) map).lastKey();
```

## 6. 集合工具类

### Collections
```java
// 排序
Collections.sort(list);

// 反转
Collections.reverse(list);

// 随机打乱
Collections.shuffle(list);

// 查找最大最小值
String max = Collections.max(list);
String min = Collections.min(list);

// 填充
Collections.fill(list, "默认值");

// 复制
Collections.copy(destList, srcList);

// 替换
Collections.replaceAll(list, "旧值", "新值");
```

### Arrays
```java
// 数组转List
List<String> list = Arrays.asList("张三", "李四", "王五");

// 数组排序
Arrays.sort(array);

// 数组填充
Arrays.fill(array, "默认值");

// 数组比较
boolean equals = Arrays.equals(array1, array2);

// 数组转字符串
String str = Arrays.toString(array);
```

## 7. 注意事项

1. 集合选择
   - ArrayList：适合随机访问
   - LinkedList：适合频繁插入删除
   - HashSet：适合需要去重的场景
   - TreeSet：适合需要排序的场景
   - HashMap：适合键值对存储
   - TreeMap：适合需要按键排序的场景

2. 线程安全
   - 上述集合类都不是线程安全的
   - 需要线程安全时可以使用：
     - Collections.synchronizedList()
     - Collections.synchronizedSet()
     - Collections.synchronizedMap()
     - ConcurrentHashMap

3. 性能考虑
   - ArrayList的随机访问性能好
   - LinkedList的插入删除性能好
   - HashSet的查找性能好
   - TreeSet的排序性能好

4. 最佳实践
   - 使用接口类型声明变量
   - 使用泛型避免类型转换
   - 注意集合的初始容量
   - 及时清理不再使用的集合 