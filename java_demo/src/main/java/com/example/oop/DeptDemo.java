package com.example.oop;

/**
 * 部门类示例
 * 展示Java中构造方法的使用
 */
public class DeptDemo {
    public static void main(String[] args) {
        // 正确的构造方法调用方式
        Dept dept1 = new Dept("技术部");
        System.out.println("部门名称: " + dept1.getName());

        // 使用多个参数的构造方法
        Dept dept2 = new Dept("市场部", 100);
        System.out.println("部门名称: " + dept2.getName());
        System.out.println("部门人数: " + dept2.getEmployeeCount());
    }
}

class Dept {
    private String name;
    private int employeeCount;

    // 单参数构造方法
    public Dept(String name) {
        this.name = name;
        this.employeeCount = 0;
    }

    // 双参数构造方法
    public Dept(String name, int employeeCount) {
        this.name = name;
        this.employeeCount = employeeCount;
    }

    // getter方法
    public String getName() {
        return name;
    }

    public int getEmployeeCount() {
        return employeeCount;
    }
} 