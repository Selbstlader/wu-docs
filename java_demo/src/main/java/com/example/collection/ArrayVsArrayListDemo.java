package com.example.collection;

import java.util.ArrayList;
import java.util.Arrays;

/**
 * 数组和ArrayList对比示例
 * 展示普通数组和ArrayList的区别
 */
public class ArrayVsArrayListDemo {
    public static void main(String[] args) {
        // 1. 普通数组
        System.out.println("=== 普通数组 ===");
        // 声明时必须指定长度
        String[] fruits = new String[3];
        fruits[0] = "苹果";
        fruits[1] = "香蕉";
        fruits[2] = "橙子";
        // fruits[3] = "葡萄"; // 错误：数组越界
        
        System.out.println("数组长度: " + fruits.length);
        System.out.println("数组内容: " + Arrays.toString(fruits));

        // 2. ArrayList
        System.out.println("\n=== ArrayList ===");
        ArrayList<String> fruitList = new ArrayList<>();
        // 初始容量为10，但可以动态增长
        System.out.println("初始容量: " + fruitList.size());
        
        // 添加元素
        fruitList.add("苹果");
        fruitList.add("香蕉");
        fruitList.add("橙子");
        fruitList.add("葡萄");  // 可以继续添加，自动扩容
        fruitList.add("草莓");
        
        System.out.println("当前大小: " + fruitList.size());
        System.out.println("列表内容: " + fruitList);

        // 3. ArrayList的扩容机制
        System.out.println("\n=== ArrayList扩容 ===");
        ArrayList<Integer> numbers = new ArrayList<>();
        // 添加20个元素，观察扩容
        for (int i = 0; i < 20; i++) {
            numbers.add(i);
            System.out.println("添加 " + i + " 后的大小: " + numbers.size());
        }

        // 4. 指定初始容量
        System.out.println("\n=== 指定初始容量 ===");
        ArrayList<String> customList = new ArrayList<>(100); // 指定初始容量为100
        System.out.println("指定初始容量后的大小: " + customList.size());
        
        // 添加元素
        for (int i = 0; i < 5; i++) {
            customList.add("元素" + i);
        }
        System.out.println("添加5个元素后的大小: " + customList.size());
    }
} 