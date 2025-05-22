# Java 面向对象编程

## 1. 类和对象

### 1.1 类的定义
```java
public class Person {
    // 属性（成员变量）
    private String name;
    private int age;
    
    // 构造方法
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // 方法
    public void introduce() {
        System.out.println("我叫" + name + "，今年" + age + "岁");
    }
}
```

### 1.2 创建对象
```java
Person person = new Person("张三", 25);
person.introduce();
```

## 2. 封装

### 2.1 访问修饰符
- `private`: 只能在类内部访问
- `protected`: 可以在同包和子类中访问
- `public`: 可以在任何地方访问
- `default`(不写): 可以在同包中访问

### 2.2 Getter 和 Setter
```java
public class Person {
    private String name;
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
}
```

## 3. 继承

### 3.1 基本继承
```java
public class Student extends Person {
    private String major;
    
    public Student(String name, int age, String major) {
        super(name, age);  // 调用父类构造方法
        this.major = major;
    }
}
```

### 3.2 方法重写
```java
@Override
public void introduce() {
    super.introduce();  // 调用父类方法
    System.out.println("我的专业是" + major);
}
```

## 4. 多态

### 4.1 多态示例
```java
Person[] people = new Person[2];
people[0] = new Person("王五", 30);
people[1] = new Student("赵六", 22, "数学");

for (Person p : people) {
    p.introduce();  // 多态调用
}
```

### 4.2 多态的特点
- 父类引用可以指向子类对象
- 调用方法时，实际执行的是子类重写的方法
- 多态提高了代码的灵活性和可扩展性

## 5. 抽象类和接口

### 5.1 抽象类
```java
public abstract class Animal {
    protected String name;
    
    public abstract void makeSound();  // 抽象方法
    
    public void sleep() {  // 具体方法
        System.out.println(name + "正在睡觉");
    }
}
```

### 5.2 接口
```java
public interface Flyable {
    void fly();  // 抽象方法
    
    default void land() {  // 默认方法
        System.out.println("正在降落");
    }
}
```

## 6. 实际开发中的最佳实践

### 6.1 类的设计原则
- 单一职责原则：一个类只做一件事
- 开闭原则：对扩展开放，对修改关闭
- 里氏替换原则：子类必须能替换父类
- 接口隔离原则：使用多个专门的接口
- 依赖倒置原则：依赖抽象而不是具体实现

### 6.2 封装的最佳实践
```java
public class BankAccount {
    private double balance;
    
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
    
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
        }
    }
}
```

## 7. 练习题

1. 创建一个 `Shape` 抽象类，包含计算面积和周长的方法
2. 创建 `Circle` 和 `Rectangle` 类继承 `Shape`
3. 实现一个简单的图形管理系统，可以添加和显示不同的图形

## 8. 扩展阅读

- [Oracle Java 教程 - 类和对象](https://docs.oracle.com/javase/tutorial/java/javaOO/index.html)
- [Java 设计模式](https://www.baeldung.com/design-patterns-series)
- [SOLID 原则详解](https://www.baeldung.com/solid-principles) 