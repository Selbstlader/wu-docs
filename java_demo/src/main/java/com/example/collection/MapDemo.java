package com.example.collection;

import java.util.*;

/**
 * Map示例
 * 展示Java中Map的基本用法和常见操作
 */
public class MapDemo {
    public static void main(String[] args) {
        // 1. HashMap示例（最常用的Map实现）
        System.out.println("=== HashMap示例 ===");
        Map<String, Integer> studentScores = new HashMap<>();
        
        // 1.1 添加键值对
        studentScores.put("张三", 90);
        studentScores.put("李四", 85);
        studentScores.put("王五", 95);
        System.out.println("学生成绩: " + studentScores);
        
        // 1.2 获取值
        int score = studentScores.get("张三");
        System.out.println("张三的成绩: " + score);
        
        // 1.3 检查键是否存在
        boolean containsKey = studentScores.containsKey("李四");
        System.out.println("是否包含李四: " + containsKey);
        
        // 1.4 检查值是否存在
        boolean containsValue = studentScores.containsValue(95);
        System.out.println("是否有95分: " + containsValue);
        
        // 1.5 删除键值对
        studentScores.remove("王五");
        System.out.println("删除王五后: " + studentScores);
        
        // 1.6 获取所有键
        Set<String> keys = studentScores.keySet();
        System.out.println("所有学生: " + keys);
        
        // 1.7 获取所有值
        Collection<Integer> values = studentScores.values();
        System.out.println("所有成绩: " + values);
        
        // 1.8 遍历Map
        System.out.println("\n遍历Map的三种方式：");
        // 方式1：使用entrySet
        System.out.println("方式1 - 使用entrySet：");
        for (Map.Entry<String, Integer> entry : studentScores.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
        
        // 方式2：使用keySet
        System.out.println("\n方式2 - 使用keySet：");
        for (String key : studentScores.keySet()) {
            System.out.println(key + ": " + studentScores.get(key));
        }
        
        // 方式3：使用forEach（Java 8+）
        System.out.println("\n方式3 - 使用forEach：");
        studentScores.forEach((key, value) -> 
            System.out.println(key + ": " + value));

        // 2. TreeMap示例（按键排序的Map）
        System.out.println("\n=== TreeMap示例 ===");
        Map<String, String> sortedMap = new TreeMap<>();
        sortedMap.put("香蕉", "黄色");
        sortedMap.put("苹果", "红色");
        sortedMap.put("葡萄", "紫色");
        System.out.println("按字母顺序排序的水果: " + sortedMap);

        // 3. 实际应用示例：统计单词频率
        System.out.println("\n=== 单词频率统计示例 ===");
        String text = "Java是一种广泛使用的计算机编程语言，拥有跨平台、面向对象、泛型编程的特性";
        Map<String, Integer> wordCount = new HashMap<>();
        
        // 分割文本并统计
        String[] words = text.split("，|、");
        for (String word : words) {
            wordCount.put(word, wordCount.getOrDefault(word, 0) + 1);
        }
        
        System.out.println("单词频率统计：");
        wordCount.forEach((word, count) -> 
            System.out.println(word + ": " + count + "次"));
    }
} 