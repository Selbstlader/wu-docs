package com.example.oop;

/**
 * 抽象类和接口示例
 * 展示抽象类和接口的使用场景
 */
public class AbstractAndInterfaceDemo {
    public static void main(String[] args) {
        // 1. 抽象类示例
        System.out.println("=== 抽象类示例 ===");
        // 创建Dog对象，Dog继承自抽象类Animal
        Dog dog = new Dog("旺财");
        dog.makeSound();  // 调用Dog类实现的抽象方法
        dog.sleep();      // 调用Animal类中的普通方法

        // 2. 接口示例
        System.out.println("\n=== 接口示例 ===");
        // 创建Bird对象，Bird实现了Flyable接口
        Bird bird = new Bird("小黄");
        bird.makeSound(); // 调用Bird类自己的方法
        bird.fly();       // 调用Bird类实现的接口方法

        // 3. 多接口实现示例
        System.out.println("\n=== 多接口实现示例 ===");
        // 创建Duck对象，Duck同时实现了Flyable和Swimmable接口
        Duck duck = new Duck("唐老鸭");
        duck.makeSound(); // 调用Duck类自己的方法
        duck.fly();       // 调用Duck类实现的Flyable接口方法
        duck.swim();      // 调用Duck类实现的Swimmable接口方法
    }
}

// 抽象类示例
// 抽象类：不能被实例化，只能被继承
// 可以包含抽象方法和具体方法
abstract class Animal {
    protected String name;  // 受保护的字段，子类可以访问

    // 构造方法：用于初始化对象
    public Animal(String name) {
        this.name = name;
    }

    // 抽象方法：没有方法体，子类必须实现
    // 相当于一个约定，告诉子类必须实现这个方法
    public abstract void makeSound();

    // 普通方法：有方法体，子类可以直接使用
    // 相当于一个共享的功能，所有子类都可以使用
    public void sleep() {
        System.out.println(name + "正在睡觉");
    }
}

// 接口示例
// 接口：定义行为规范，类可以实现多个接口
// 所有方法默认是public abstract
interface Flyable {
    void fly();  // 抽象方法，实现类必须实现
}

// 另一个接口
interface Swimmable {
    void swim();  // 抽象方法，实现类必须实现
}

// 继承抽象类
// Dog类继承Animal抽象类，必须实现所有抽象方法
class Dog extends Animal {
    // 构造方法：调用父类构造方法
    public Dog(String name) {
        super(name);  // 调用父类构造方法
    }

    // 实现父类的抽象方法
    @Override
    public void makeSound() {
        System.out.println(name + "说：汪汪！");
    }
}

// 实现接口
// Bird类实现Flyable接口，必须实现接口的所有方法
class Bird implements Flyable {
    private String name;  // 私有字段

    public Bird(String name) {
        this.name = name;
    }

    // Bird类自己的方法
    public void makeSound() {
        System.out.println(name + "说：啾啾！");
    }

    // 实现Flyable接口的方法
    @Override
    public void fly() {
        System.out.println(name + "正在飞翔");
    }
}

// 实现多个接口
// Duck类同时实现Flyable和Swimmable接口
// 必须实现两个接口的所有方法
class Duck implements Flyable, Swimmable {
    private String name;

    public Duck(String name) {
        this.name = name;
    }

    // Duck类自己的方法
    public void makeSound() {
        System.out.println(name + "说：嘎嘎！");
    }

    // 实现Flyable接口的方法
    @Override
    public void fly() {
        System.out.println(name + "正在低空飞行");
    }

    // 实现Swimmable接口的方法
    @Override
    public void swim() {
        System.out.println(name + "正在游泳");
    }
}