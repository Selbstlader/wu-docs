package com.example.collection;

import java.util.ArrayList;
import java.util.Arrays;

/**
 * 数组使用场景示例
 * 展示普通数组和ArrayList的不同使用场景
 */
public class ArrayUsageDemo {
    public static void main(String[] args) {
        // 1. 普通数组适用场景
        System.out.println("=== 普通数组适用场景 ===");
        
        // 场景1：固定长度的数据
        System.out.println("\n1. 固定长度的数据（如：一周的天数）");
        String[] weekDays = {"周一", "周二", "周三", "周四", "周五", "周六", "周日"};
        System.out.println("星期数组: " + Arrays.toString(weekDays));
        
        // 场景2：性能要求高的场景（如：图像处理）
        System.out.println("\n2. 性能要求高的场景（如：图像处理）");
        int[] imageData = new int[1000 * 1000]; // 100万像素的图像数据
        // 使用普通数组处理图像数据
        for (int i = 0; i < imageData.length; i++) {
            imageData[i] = i % 255; // 模拟图像处理
        }
        System.out.println("图像数据处理完成，大小: " + imageData.length);
        
        // 场景3：基本类型数据存储
        System.out.println("\n3. 基本类型数据存储（如：学生成绩）");
        int[] scores = new int[5];
        scores[0] = 90;
        scores[1] = 85;
        scores[2] = 95;
        scores[3] = 88;
        scores[4] = 92;
        System.out.println("学生成绩: " + Arrays.toString(scores));

        // 2. ArrayList适用场景
        System.out.println("\n=== ArrayList适用场景 ===");
        
        // 场景1：动态数据（如：用户列表）
        System.out.println("\n1. 动态数据（如：用户列表）");
        ArrayList<String> users = new ArrayList<>();
        users.add("张三");
        users.add("李四");
        users.add("王五");
        System.out.println("用户列表: " + users);
        
        // 场景2：需要频繁增删的场景
        System.out.println("\n2. 需要频繁增删的场景（如：待办事项）");
        ArrayList<String> todoList = new ArrayList<>();
        todoList.add("写代码");
        todoList.add("开会");
        todoList.add("写文档");
        System.out.println("原始待办: " + todoList);
        
        todoList.remove(1); // 删除"开会"
        todoList.add("测试"); // 添加新任务
        System.out.println("更新后的待办: " + todoList);
        
        // 场景3：不确定数量的数据（如：日志记录）
        System.out.println("\n3. 不确定数量的数据（如：日志记录）");
        ArrayList<String> logs = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            logs.add("日志记录 " + i);
        }
        System.out.println("日志数量: " + logs.size());
        System.out.println("日志内容: " + logs);
    }
} 