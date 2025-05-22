package com.example.oop;

/**
 * 继承关系示例
 * 展示父类和子类之间的访问关系
 */
public class InheritanceDemo {
    public static void main(String[] args) {
        // 创建父类对象
        Parent parent = new Parent();
        parent.parentMethod();  // 可以调用父类方法
        // parent.childMethod();  // 错误！父类不能调用子类方法
        
        // 创建子类对象
        Child child = new Child();
        child.parentMethod();   // 子类可以调用父类方法
        child.childMethod();    // 子类可以调用自己的方法
        
        // 父类引用指向子类对象（多态）
        Parent p = new Child();
        p.parentMethod();       // 可以调用父类方法
        // p.childMethod();     // 错误！即使实际是子类对象，也不能通过父类引用调用子类方法
    }
}

class Parent {
    protected String parentField = "父类字段";
    
    public void parentMethod() {
        System.out.println("这是父类方法");
    }
}

class Child extends Parent {
    private String childField = "子类字段";
    
    public void childMethod() {
        System.out.println("这是子类方法");
        System.out.println("可以访问父类字段: " + parentField);  // 可以访问父类字段
    }
    
    @Override
    public void parentMethod() {
        super.parentMethod();  // 调用父类方法
        System.out.println("子类重写了父类方法");
    }
} 