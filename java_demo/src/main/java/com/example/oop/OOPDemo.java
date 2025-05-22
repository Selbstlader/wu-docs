package com.example.oop;

/**
 * Java 面向对象编程示例
 * 展示类、对象、继承、封装等基本概念
 */
public class OOPDemo {
    public static void main(String[] args) {
        // 1. 创建对象
        System.out.println("=== 创建对象示例 ===");
        Person person = new Person("张三", 25);
        person.introduce();

        // 2. 继承示例
        System.out.println("\n=== 继承示例 ===");
        Student student = new Student("李四", 20, "计算机科学");
        student.introduce();
        student.study();

        // 3. 多态示例
        System.out.println("\n=== 多态示例 ===");
        Person[] people = new Person[2];
        people[0] = new Person("王五", 30);
        people[1] = new Student("赵六", 22, "数学");
        
        for (Person p : people) {
            p.introduce();  // 多态调用
        }

        // 4. 封装示例
        System.out.println("\n=== 封装示例 ===");
        BankAccount account = new BankAccount("123456", 1000.0);
        System.out.println("账户余额: " + account.getBalance());
        account.deposit(500.0);
        System.out.println("存款后余额: " + account.getBalance());
        account.withdraw(200.0);
        System.out.println("取款后余额: " + account.getBalance());
    }
}

// 基类
class Person {
    private String name;    // 私有属性
    private int age;       // 私有属性

    // 构造方法
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // 公共方法
    public void introduce() {
        System.out.println("我叫" + name + "，今年" + age + "岁");
    }

    // Getter 和 Setter
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        if (age >= 0) {  // 数据验证
            this.age = age;
        }
    }
}

// 子类
class Student extends Person {
    private String major;  // 专业

    public Student(String name, int age, String major) {
        super(name, age);  // 调用父类构造方法
        this.major = major;
    }

    // 重写父类方法
    @Override
    public void introduce() {
        super.introduce();  // 调用父类方法
        System.out.println("我的专业是" + major);
    }

    // 子类特有方法
    public void study() {
        System.out.println("正在学习" + major + "课程");
    }
}

// 封装示例
class BankAccount {
    private String accountNumber;
    private double balance;

    public BankAccount(String accountNumber, double balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("存款成功: " + amount);
        } else {
            System.out.println("存款金额必须大于0");
        }
    }

    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("取款成功: " + amount);
        } else {
            System.out.println("取款失败: 金额无效或余额不足");
        }
    }
} 