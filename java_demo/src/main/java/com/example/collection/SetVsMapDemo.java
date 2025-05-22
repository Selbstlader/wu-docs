package com.example.collection;

import java.util.*;

/**
 * Set和Map的区别示例
 */
public class SetVsMapDemo {
    public static void main(String[] args) {
        // 1. Set示例：存储唯一的学生ID
        System.out.println("=== Set示例：存储唯一的学生ID ===");
        Set<String> studentIds = new HashSet<>();
        studentIds.add("S001");
        studentIds.add("S002");
        studentIds.add("S001"); // 重复ID会被忽略
        System.out.println("学生ID集合: " + studentIds);
        System.out.println("是否存在S001: " + studentIds.contains("S001"));

        // 2. Map示例：存储学生ID和对应的学生信息
        System.out.println("\n=== Map示例：存储学生ID和对应的学生信息 ===");
        Map<String, StudentInfo> studentMap = new HashMap<>();
        studentMap.put("S001", new StudentInfo("张三", 18, "计算机"));
        studentMap.put("S002", new StudentInfo("李四", 19, "数学"));
        studentMap.put("S003", new StudentInfo("王五", 20, "物理"));
        
        // 通过ID查找学生信息
        System.out.println("S001的学生信息: " + studentMap.get("S001"));
        System.out.println("所有学生信息:");
        studentMap.forEach((id, info) -> 
            System.out.println("ID: " + id + ", 信息: " + info));

        // 3. 实际应用场景对比
        System.out.println("\n=== 实际应用场景对比 ===");
        
        // 场景1：使用Set检查重复
        System.out.println("场景1：使用Set检查重复");
        Set<String> processedOrders = new HashSet<>();
        String[] orders = {"ORD001", "ORD002", "ORD001", "ORD003"};
        for (String order : orders) {
            if (processedOrders.add(order)) {
                System.out.println("处理新订单: " + order);
            } else {
                System.out.println("订单重复: " + order);
            }
        }

        // 场景2：使用Map存储键值对
        System.out.println("\n场景2：使用Map存储键值对");
        Map<String, Integer> productStock = new HashMap<>();
        productStock.put("手机", 100);
        productStock.put("电脑", 50);
        productStock.put("耳机", 200);
        
        // 更新库存
        productStock.put("手机", productStock.get("手机") - 1);
        System.out.println("手机库存: " + productStock.get("手机"));
        
        // 检查并添加新产品
        productStock.putIfAbsent("平板", 30);
        System.out.println("平板库存: " + productStock.get("平板"));
    }
}

class StudentInfo {
    private String name;
    private int age;
    private String major;

    public StudentInfo(String name, int age, String major) {
        this.name = name;
        this.age = age;
        this.major = major;
    }

    @Override
    public String toString() {
        return name + "(" + age + "岁, " + major + "专业)";
    }
} 