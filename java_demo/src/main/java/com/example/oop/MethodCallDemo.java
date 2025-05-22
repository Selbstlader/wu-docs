package com.example.oop;

/**
 * 方法调用示例
 * 展示子类调用父类方法和自身方法的不同情况
 */
public class MethodCallDemo {
    public static void main(String[] args) {
        // 创建子类对象
        Manager manager = new Manager("张三", "技术部");
        
        // 调用子类自己的方法
        manager.showInfo();
        
        // 调用父类的方法
        manager.work();
    }
}

// 父类
class Employee {
    protected String name;  // 受保护的字段，子类可以访问
    
    public Employee(String name) {
        this.name = name;
    }
    
    // 父类的方法
    public void work() {
        System.out.println(name + "正在工作");
    }
    
    // 父类的另一个方法
    protected void takeBreak() {
        System.out.println(name + "正在休息");
    }
}

// 子类
class Manager extends Employee {
    private String department;
    
    public Manager(String name, String department) {
        super(name);  // 调用父类的构造方法
        this.department = department;
    }
    
    // 子类自己的方法
    public void showInfo() {
        // 调用父类的方法
        super.work();  // 使用super调用父类方法
        
        // 调用自己的方法
        this.manageTeam();  // 使用this调用自己的方法（可选）
        
        // 直接调用自己的方法
        manageTeam();  // 直接调用，效果相同
        
        // 调用父类的protected方法
        super.takeBreak();  // 可以调用父类的protected方法
    }
    
    // 子类的另一个方法
    private void manageTeam() {
        System.out.println(name + "正在管理" + department + "团队");
    }
} 