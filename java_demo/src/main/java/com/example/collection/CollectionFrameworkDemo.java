package com.example.collection;

import java.util.*;

/**
 * Java集合框架核心组件示例
 * 展示List、Set、Queue等集合的使用
 */
public class CollectionFrameworkDemo {
    public static void main(String[] args) {
        // 1. List接口示例
        System.out.println("=== List接口示例 ===");
        // ArrayList示例
        List<String> arrayList = new ArrayList<>();
        arrayList.add("苹果");
        arrayList.add("香蕉");
        arrayList.add("橙子");
        System.out.println("ArrayList: " + arrayList);
        
        // LinkedList示例
        List<String> linkedList = new LinkedList<>();
        linkedList.add("苹果");
        linkedList.add("香蕉");
        linkedList.add("橙子");
        System.out.println("LinkedList: " + linkedList);
        
        // List的常用操作
        System.out.println("\nList常用操作:");
        System.out.println("获取第一个元素: " + arrayList.get(0));
        System.out.println("是否包含'香蕉': " + arrayList.contains("香蕉"));
        System.out.println("元素个数: " + arrayList.size());
        
        // 2. Set接口示例
        System.out.println("\n=== Set接口示例 ===");
        // HashSet示例
        Set<String> hashSet = new HashSet<>();
        hashSet.add("苹果");
        hashSet.add("香蕉");
        hashSet.add("苹果"); // 重复元素会被忽略
        System.out.println("HashSet: " + hashSet);
        
        // TreeSet示例（自动排序）
        Set<String> treeSet = new TreeSet<>();
        treeSet.add("香蕉");
        treeSet.add("苹果");
        treeSet.add("橙子");
        System.out.println("TreeSet: " + treeSet);
        
        // 3. Queue接口示例
        System.out.println("\n=== Queue接口示例 ===");
        // PriorityQueue示例（优先级队列）
        Queue<String> priorityQueue = new PriorityQueue<>();
        priorityQueue.offer("香蕉");
        priorityQueue.offer("苹果");
        priorityQueue.offer("橙子");
        System.out.println("PriorityQueue: " + priorityQueue);
        System.out.println("队首元素: " + priorityQueue.peek());
        System.out.println("出队元素: " + priorityQueue.poll());
        
        // 4. 集合遍历方式
        System.out.println("\n=== 集合遍历方式 ===");
        // 使用for-each循环
        System.out.println("使用for-each循环遍历ArrayList:");
        for (String fruit : arrayList) {
            System.out.println(fruit);
        }
        
        // 使用Iterator
        System.out.println("\n使用Iterator遍历HashSet:");
        Iterator<String> iterator = hashSet.iterator();
        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }
        
        // 使用forEach方法（Java 8+）
        System.out.println("\n使用forEach方法遍历TreeSet:");
        treeSet.forEach(System.out::println);
    }
} 