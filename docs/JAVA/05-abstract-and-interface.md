# Java 抽象类和接口

## 1. 抽象类

### 1.1 什么是抽象类
- 使用 `abstract` 关键字声明的类
- 可以包含抽象方法和具体方法
- 不能被实例化，只能被继承
- 子类必须实现所有抽象方法

### 1.2 抽象类的特点
```java
public abstract class Animal {
    protected String name;
    
    // 构造方法
    public Animal(String name) {
        this.name = name;
    }
    
    // 抽象方法：子类必须实现
    public abstract void makeSound();
    
    // 具体方法：子类可以直接使用
    public void sleep() {
        System.out.println(name + "正在睡觉");
    }
}
```

### 1.3 使用场景
- 当多个类有共同的行为，但具体实现不同
- 需要共享代码，但又要强制子类实现某些方法
- 需要提供一些默认实现，同时允许子类重写

## 2. 接口

### 2.1 什么是接口
- 使用 `interface` 关键字声明
- 只能包含抽象方法（Java 8 后可以有默认方法）
- 所有方法默认是 `public abstract`
- 所有字段默认是 `public static final`

### 2.2 接口的特点
```java
public interface Flyable {
    void fly();  // 抽象方法
    
    // 默认方法（Java 8+）
    default void land() {
        System.out.println("正在降落");
    }
}
```

### 2.3 使用场景
- 定义行为规范
- 实现多重继承
- 解耦接口和实现
- 定义回调函数

## 3. 抽象类 vs 接口

### 3.1 主要区别
1. 继承关系：
   - 类只能单继承抽象类
   - 类可以实现多个接口

2. 构造方法：
   - 抽象类可以有构造方法
   - 接口不能有构造方法

3. 字段：
   - 抽象类可以有实例字段
   - 接口只能有静态常量

4. 方法：
   - 抽象类可以有具体方法
   - 接口方法默认是抽象的

### 3.2 选择建议
- 使用抽象类：
  - 需要共享代码
  - 有共同的字段
  - 需要构造方法
  - 需要控制访问权限

- 使用接口：
  - 需要定义行为规范
  - 需要多重继承
  - 需要解耦
  - 需要定义回调

## 4. 实际开发中的最佳实践

### 4.1 接口设计原则
- 接口要小而专注
- 避免接口污染
- 优先使用组合而不是继承
- 遵循接口隔离原则

### 4.2 抽象类设计原则
- 抽象类要包含共同的行为
- 抽象方法要少而精
- 提供有用的默认实现
- 考虑子类的扩展性

## 5. 练习题

1. 创建一个 `Vehicle` 抽象类，包含：
   - 抽象方法 `start()`
   - 具体方法 `stop()`
   - 子类 `Car` 和 `Motorcycle`

2. 创建接口：
   - `FuelPowered`：加油方法
   - `ElectricPowered`：充电方法
   - 实现类 `HybridCar` 同时实现这两个接口

## 6. 扩展阅读

- [Oracle Java 教程 - 抽象类](https://docs.oracle.com/javase/tutorial/java/IandI/abstract.html)
- [Oracle Java 教程 - 接口](https://docs.oracle.com/javase/tutorial/java/IandI/createinterface.html)
- [Java 8 接口新特性](https://www.baeldung.com/java-8-new-features) 