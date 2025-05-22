package com.example.collection;

import java.util.*;

/**
 * 数组去重示例
 * 展示使用Map实现数组去重的功能
 */
public class ArrayDeduplicationDemo {
    public static void main(String[] args) {
        // 1. 基本类型数组去重
        System.out.println("=== 基本类型数组去重 ===");
        int[] numbers = {1, 2, 3, 2, 4, 3, 5, 1};
        System.out.println("原始数组: " + Arrays.toString(numbers));
        
        // 使用Map去重
        Map<Integer, Integer> numberMap = new HashMap<>();
        for (int num : numbers) {
            numberMap.put(num, num);
        }
        
        // 获取去重后的数组
        int[] uniqueNumbers = numberMap.keySet().stream().mapToInt(Integer::intValue).toArray();
        System.out.println("去重后数组: " + Arrays.toString(uniqueNumbers));

        // 2. 字符串数组去重
        System.out.println("\n=== 字符串数组去重 ===");
        String[] fruits = {"苹果", "香蕉", "苹果", "橙子", "香蕉", "葡萄"};
        System.out.println("原始数组: " + Arrays.toString(fruits));
        
        // 使用Map去重
        Map<String, String> fruitMap = new HashMap<>();
        for (String fruit : fruits) {
            fruitMap.put(fruit, fruit);
        }
        
        // 获取去重后的数组
        String[] uniqueFruits = fruitMap.keySet().toArray(new String[0]);
        System.out.println("去重后数组: " + Arrays.toString(uniqueFruits));

        // 3. 对象数组去重（基于某个属性）
        System.out.println("\n=== 对象数组去重 ===");
        Person[] people = {
            new Person("张三", 20),
            new Person("李四", 25),
            new Person("张三", 20),  // 重复
            new Person("王五", 30),
            new Person("李四", 25)   // 重复
        };
        
        System.out.println("原始数组:");
        for (Person person : people) {
            System.out.println(person);
        }
        
        // 使用Map去重（基于name属性）
        Map<String, Person> personMap = new HashMap<>();
        for (Person person : people) {
            personMap.put(person.getName(), person);
        }
        
        // 获取去重后的数组
        Person[] uniquePeople = personMap.values().toArray(new Person[0]);
        System.out.println("\n去重后数组:");
        for (Person person : uniquePeople) {
            System.out.println(person);
        }

        // 4. 使用LinkedHashMap保持插入顺序
        System.out.println("\n=== 保持插入顺序的去重 ===");
        String[] orderedFruits = {"苹果", "香蕉", "苹果", "橙子", "香蕉", "葡萄"};
        System.out.println("原始数组: " + Arrays.toString(orderedFruits));
        
        // 使用LinkedHashMap去重并保持顺序
        Map<String, String> orderedMap = new LinkedHashMap<>();
        for (String fruit : orderedFruits) {
            orderedMap.put(fruit, fruit);
        }
        
        // 获取去重后的数组
        String[] uniqueOrderedFruits = orderedMap.keySet().toArray(new String[0]);
        System.out.println("去重后数组（保持顺序）: " + Arrays.toString(uniqueOrderedFruits));
    }
} 