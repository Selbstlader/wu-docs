package com.example.collection;

import java.util.*;

/**
 * 集合框架示例
 * 展示Java中常用集合的使用方法
 */
public class CollectionDemo {
    public static void main(String[] args) {
        // 1. List示例
        System.out.println("=== List示例 ===");
        // ArrayList示例
        List<String> arrayList = new ArrayList<>();
        arrayList.add("苹果");
        arrayList.add("香蕉");
        arrayList.add("橙子");
        System.out.println("ArrayList: " + arrayList);
        
        // LinkedList示例
        List<String> linkedList = new LinkedList<>();
        linkedList.add("红");
        linkedList.add("绿");
        linkedList.add("蓝");
        System.out.println("LinkedList: " + linkedList);

        // 2. Set示例
        System.out.println("\n=== Set示例 ===");
        // HashSet示例（无序）
        Set<String> hashSet = new HashSet<>();
        hashSet.add("张三");
        hashSet.add("李四");
        hashSet.add("王五");
        hashSet.add("张三"); // 重复元素不会被添加
        System.out.println("HashSet: " + hashSet);
        
        // TreeSet示例（有序）
        Set<String> treeSet = new TreeSet<>();
        treeSet.add("香蕉");
        treeSet.add("苹果");
        treeSet.add("橙子");
        System.out.println("TreeSet: " + treeSet);

        // 3. Map示例
        System.out.println("\n=== Map示例 ===");
        // HashMap示例
        Map<String, Integer> hashMap = new HashMap<>();
        hashMap.put("张三", 90);
        hashMap.put("李四", 85);
        hashMap.put("王五", 95);
        System.out.println("HashMap: " + hashMap);
        System.out.println("张三的成绩: " + hashMap.get("张三"));
        
        // TreeMap示例（按键排序）
        Map<String, Integer> treeMap = new TreeMap<>();
        treeMap.put("香蕉", 3);
        treeMap.put("苹果", 5);
        treeMap.put("橙子", 2);
        System.out.println("TreeMap: " + treeMap);

        // 4. 集合遍历示例
        System.out.println("\n=== 集合遍历示例 ===");
        // List遍历
        System.out.println("ArrayList遍历:");
        for (String fruit : arrayList) {
            System.out.println("- " + fruit);
        }
        
        // Set遍历
        System.out.println("\nHashSet遍历:");
        for (String name : hashSet) {
            System.out.println("- " + name);
        }
        
        // Map遍历
        System.out.println("\nHashMap遍历:");
        for (Map.Entry<String, Integer> entry : hashMap.entrySet()) {
            System.out.println("- " + entry.getKey() + ": " + entry.getValue());
        }
    }
} 