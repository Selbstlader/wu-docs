package com.example.basics;

/**
 * Java 数据类型示例
 * 重点介绍实际开发中最常用的数据类型
 */
public class DataTypeDemo {
    public static void main(String[] args) {
        // 1. 基本数据类型（Primitive Types）
        // 整数类型
        byte age = 25;                    // 范围：-128 到 127，常用于年龄、小数值
        short year = 2024;                // 范围：-32,768 到 32,767，用于年份等
        int salary = 10000;               // 范围：±21亿，最常用的整数类型
        long population = 1400000000L;    // 范围：±922亿亿，用于大数值，注意要加L后缀

        // 浮点类型
        float price = 99.9f;              // 单精度，用于价格等，注意要加f后缀
        double pi = 3.14159265359;        // 双精度，更精确，默认的浮点类型

        // 布尔类型
        boolean isActive = true;          // true 或 false，用于条件判断

        // 字符类型
        char grade = 'A';                 // 单个字符，用单引号

        // 2. 引用类型（Reference Types）
        // 字符串 - 最常用的引用类型
        String name = "张三";             // 字符串，用双引号
        String email = "zhangsan@example.com";
        
        // 数组
        int[] scores = {85, 90, 95};      // 整数数组
        String[] hobbies = {"读书", "运动", "音乐"}; // 字符串数组

        // 3. 实际开发中的常见用法
        // 打印个人信息
        System.out.println("=== 个人信息 ===");
        System.out.println("姓名: " + name);
        System.out.println("年龄: " + age);
        System.out.println("邮箱: " + email);
        System.out.println("是否在职: " + isActive);
        
        // 计算示例
        System.out.println("\n=== 计算示例 ===");
        double monthlySalary = salary / 12.0;
        System.out.println("月薪: " + monthlySalary);
        
        // 数组操作
        System.out.println("\n=== 数组操作 ===");
        System.out.println("第一个分数: " + scores[0]);
        System.out.println("第一个爱好: " + hobbies[0]);
        
        // 4. 类型转换示例
        System.out.println("\n=== 类型转换 ===");
        // 自动类型转换（小类型转大类型）
        int intValue = 100;
        long longValue = intValue;        // int 自动转 long
        double doubleValue = intValue;    // int 自动转 double
        
        // 强制类型转换（大类型转小类型）
        double price2 = 99.9;
        int intPrice = (int) price2;      // double 强制转 int，会丢失小数部分
        System.out.println("原价: " + price2);
        System.out.println("转换后: " + intPrice);
        
        // 5. 实际开发中的注意事项
        System.out.println("\n=== 注意事项 ===");
        // 字符串拼接
        String fullInfo = String.format("姓名: %s, 年龄: %d, 月薪: %.2f", name, age, monthlySalary);
        System.out.println(fullInfo);
        
        // 数值计算精度
        double result = 0.1 + 0.2;
        System.out.println("0.1 + 0.2 = " + result);  // 注意浮点数计算可能有精度问题
        
        // 使用 BigDecimal 进行精确计算（实际开发中常用）
        java.math.BigDecimal bd1 = new java.math.BigDecimal("0.1");
        java.math.BigDecimal bd2 = new java.math.BigDecimal("0.2");
        System.out.println("精确计算: 0.1 + 0.2 = " + bd1.add(bd2));
    }
} 