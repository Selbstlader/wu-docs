package com.example.collection;

import java.util.ArrayList;
import java.util.Arrays;

/**
 * 数组合并示例
 * 展示合并数组的多种方法
 */
public class ArrayMergeDemo {
    public static void main(String[] args) {
        // 1. 普通数组合并
        System.out.println("=== 普通数组合并 ===");
        int[] array1 = {1, 2, 3};
        int[] array2 = {4, 5, 6};
        
        // 1.1 使用System.arraycopy
        int[] mergedArray1 = new int[array1.length + array2.length];
        System.arraycopy(array1, 0, mergedArray1, 0, array1.length);
        System.arraycopy(array2, 0, mergedArray1, array1.length, array2.length);
        System.out.println("方法1合并结果: " + Arrays.toString(mergedArray1));
        
        // 1.2 使用循环
        int[] mergedArray2 = new int[array1.length + array2.length];
        for (int i = 0; i < array1.length; i++) {
            mergedArray2[i] = array1[i];
        }
        for (int i = 0; i < array2.length; i++) {
            mergedArray2[array1.length + i] = array2[i];
        }
        System.out.println("方法2合并结果: " + Arrays.toString(mergedArray2));

        // 2. ArrayList合并
        System.out.println("\n=== ArrayList合并 ===");
        ArrayList<String> list1 = new ArrayList<>(Arrays.asList("苹果", "香蕉"));
        ArrayList<String> list2 = new ArrayList<>(Arrays.asList("橙子", "葡萄"));
        
        // 2.1 使用addAll方法
        ArrayList<String> mergedList1 = new ArrayList<>(list1);
        mergedList1.addAll(list2);
        System.out.println("方法1合并结果: " + mergedList1);
        
        // 2.2 使用Stream
        ArrayList<String> mergedList2 = new ArrayList<>();
        mergedList2.addAll(list1);
        mergedList2.addAll(list2);
        System.out.println("方法2合并结果: " + mergedList2);

        // 3. 对象数组合并
        System.out.println("\n=== 对象数组合并 ===");
        Person[] persons1 = {
            new Person("张三", 20),
            new Person("李四", 25)
        };
        Person[] persons2 = {
            new Person("王五", 30),
            new Person("赵六", 35)
        };
        
        // 3.1 使用System.arraycopy
        Person[] mergedPersons = new Person[persons1.length + persons2.length];
        System.arraycopy(persons1, 0, mergedPersons, 0, persons1.length);
        System.arraycopy(persons2, 0, mergedPersons, persons1.length, persons2.length);
        System.out.println("合并后的人员: " + Arrays.toString(mergedPersons));
    }
}
//
//// 用于演示的对象类
//class Person {
//    private String name;
//    private int age;
//
//    public Person(String name, int age) {
//        this.name = name;
//        this.age = age;
//    }
//
//    @Override
//    public String toString() {
//        return name + "(" + age + ")";
//    }
//}