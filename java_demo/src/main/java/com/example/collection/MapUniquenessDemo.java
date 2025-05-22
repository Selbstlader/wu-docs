package com.example.collection;

import java.util.*;

/**
 * Map唯一性示例
 * 展示Map的键值唯一性以及Map和数组的区别
 */
public class MapUniquenessDemo {
    public static void main(String[] args) {
        // 1. Map的键值唯一性示例
        System.out.println("=== Map的键值唯一性示例 ===");
        Map<String, Integer> studentScores = new HashMap<>();
        
        // 1.1 键唯一性演示
        studentScores.put("张三", 90);
        studentScores.put("张三", 95); // 相同的键会覆盖之前的值
        System.out.println("张三的成绩: " + studentScores.get("张三")); // 输出95
        
        // 1.2 值可以重复
        studentScores.put("李四", 90);
        studentScores.put("王五", 90);
        System.out.println("学生成绩: " + studentScores);
        
        // 2. Map和数组的区别
        System.out.println("\n=== Map和数组的区别 ===");
        
        // 2.1 数组示例
        System.out.println("数组示例：");
        String[] students = new String[3];
        students[0] = "张三";
        students[1] = "李四";
        students[2] = "王五";
        // students[3] = "赵六"; // 错误：数组越界
        
        // 2.2 Map示例
        System.out.println("Map示例：");
        Map<Integer, String> studentMap = new HashMap<>();
        studentMap.put(1, "张三");
        studentMap.put(2, "李四");
        studentMap.put(3, "王五");
        studentMap.put(4, "赵六"); // 可以继续添加，自动扩容
        
        // 3. 实际应用场景对比
        System.out.println("\n=== 实际应用场景对比 ===");
        
        // 3.1 使用数组存储学生信息
        System.out.println("使用数组：");
        String[] studentNames = {"张三", "李四", "王五"};
        int[] studentAges = {20, 21, 22};
        // 查找特定学生的年龄
        for (int i = 0; i < studentNames.length; i++) {
            if (studentNames[i].equals("李四")) {
                System.out.println("李四的年龄: " + studentAges[i]);
                break;
            }
        }
        
        // 3.2 使用Map存储学生信息
        System.out.println("\n使用Map：");
        Map<String, Integer> studentAgesMap = new HashMap<>();
        studentAgesMap.put("张三", 20);
        studentAgesMap.put("李四", 21);
        studentAgesMap.put("王五", 22);
        // 直接查找特定学生的年龄
        System.out.println("李四的年龄: " + studentAgesMap.get("李四"));
        
        // 4. 性能对比
        System.out.println("\n=== 性能对比 ===");
        // 4.1 数组查找
        long startTime = System.nanoTime();
        for (int i = 0; i < studentNames.length; i++) {
            if (studentNames[i].equals("王五")) {
                break;
            }
        }
        long arrayTime = System.nanoTime() - startTime;
        
        // 4.2 Map查找
        startTime = System.nanoTime();
        studentAgesMap.get("王五");
        long mapTime = System.nanoTime() - startTime;
        
        System.out.println("数组查找时间: " + arrayTime + " 纳秒");
        System.out.println("Map查找时间: " + mapTime + " 纳秒");
    }
} 