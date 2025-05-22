package com.example.collection;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

/**
 * 数组操作示例
 * 展示数组和ArrayList的常用操作方法
 */
public class ArrayOperationsDemo {
    public static void main(String[] args) {
        // 1. 数组基本操作
        System.out.println("=== 数组基本操作 ===");
        int[] numbers = {5, 2, 8, 1, 9};
        
        // 1.1 数组排序
        Arrays.sort(numbers);
        System.out.println("排序后: " + Arrays.toString(numbers));
        
        // 1.2 数组查找
        int index = Arrays.binarySearch(numbers, 8);
        System.out.println("数字8的位置: " + index);
        
        // 1.3 数组填充
        int[] filledArray = new int[5];
        Arrays.fill(filledArray, 10);
        System.out.println("填充后: " + Arrays.toString(filledArray));
        
        // 1.4 数组比较
        int[] array1 = {1, 2, 3};
        int[] array2 = {1, 2, 3};
        System.out.println("数组相等: " + Arrays.equals(array1, array2));

        // 2. ArrayList操作
        System.out.println("\n=== ArrayList操作 ===");
        ArrayList<String> fruits = new ArrayList<>();
        
        // 2.1 添加元素
        fruits.add("苹果");
        fruits.add("香蕉");
        fruits.add("橙子");
        System.out.println("添加元素后: " + fruits);
        
        // 2.2 在指定位置添加
        fruits.add(1, "葡萄");
        System.out.println("在索引1处添加葡萄: " + fruits);
        
        // 2.3 获取元素
        String fruit = fruits.get(0);
        System.out.println("第一个水果: " + fruit);
        
        // 2.4 修改元素
        fruits.set(0, "红苹果");
        System.out.println("修改后: " + fruits);
        
        // 2.5 删除元素
        fruits.remove("香蕉");
        System.out.println("删除香蕉后: " + fruits);
        
        // 2.6 删除指定位置的元素
        fruits.remove(0);
        System.out.println("删除第一个元素后: " + fruits);
        
        // 2.7 检查元素是否存在
        boolean contains = fruits.contains("橙子");
        System.out.println("是否包含橙子: " + contains);
        
        // 2.8 获取大小
        System.out.println("列表大小: " + fruits.size());
        
        // 2.9 清空列表
        fruits.clear();
        System.out.println("清空后: " + fruits);
        
        // 2.10 检查是否为空
        System.out.println("列表是否为空: " + fruits.isEmpty());

        // 3. 高级操作
        System.out.println("\n=== 高级操作 ===");
        ArrayList<Integer> numbersList = new ArrayList<>();
        numbersList.add(5);
        numbersList.add(2);
        numbersList.add(8);
        numbersList.add(1);
        numbersList.add(9);
        
        // 3.1 排序
        Collections.sort(numbersList);
        System.out.println("排序后: " + numbersList);
        
        // 3.2 反转
        Collections.reverse(numbersList);
        System.out.println("反转后: " + numbersList);
        
        // 3.3 查找最大最小值
        System.out.println("最大值: " + Collections.max(numbersList));
        System.out.println("最小值: " + Collections.min(numbersList));
        
        // 3.4 复制列表
        ArrayList<Integer> copyList = new ArrayList<>(numbersList);
        System.out.println("复制后的列表: " + copyList);
        
        // 3.5 填充列表
        Collections.fill(copyList, 0);
        System.out.println("填充后: " + copyList);
    }
} 