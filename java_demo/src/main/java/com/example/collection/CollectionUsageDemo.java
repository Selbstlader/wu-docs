package com.example.collection;

import java.util.*;

/**
 * 集合框架使用场景示例
 */
public class CollectionUsageDemo {
    public static void main(String[] args) {
        // 1. ArrayList使用场景：商品列表
        System.out.println("=== ArrayList使用场景：商品列表 ===");
        List<Product> productList = new ArrayList<>();
        productList.add(new Product("手机", 3999));
        productList.add(new Product("电脑", 6999));
        productList.add(new Product("耳机", 999));
        
        // 随机访问商品
        System.out.println("第一个商品: " + productList.get(0));
        // 遍历商品列表
        System.out.println("所有商品:");
        productList.forEach(System.out::println);

        // 2. LinkedList使用场景：操作历史记录
        System.out.println("\n=== LinkedList使用场景：操作历史记录 ===");
        LinkedList<String> history = new LinkedList<>();
        history.addFirst("创建文件");
        history.addFirst("编辑文件");
        history.addFirst("保存文件");
        
        System.out.println("最近的操作: " + history.getFirst());
        System.out.println("撤销操作: " + history.removeFirst());

        // 3. HashSet使用场景：用户ID集合
        System.out.println("\n=== HashSet使用场景：用户ID集合 ===");
        Set<String> userIds = new HashSet<>();
        userIds.add("user1");
        userIds.add("user2");
        userIds.add("user1"); // 重复ID会被忽略
        System.out.println("用户ID集合: " + userIds);
        System.out.println("是否存在user1: " + userIds.contains("user1"));

        // 4. TreeSet使用场景：学生成绩排名
        System.out.println("\n=== TreeSet使用场景：学生成绩排名 ===");
        TreeSet<Student> students = new TreeSet<>((s1, s2) -> 
            Double.compare(s2.getScore(), s1.getScore())); // 按分数降序排序
        
        students.add(new Student("张三", 85.5));
        students.add(new Student("李四", 92.0));
        students.add(new Student("王五", 78.5));
        
        System.out.println("学生成绩排名:");
        students.forEach(System.out::println);

        // 5. PriorityQueue使用场景：任务优先级队列
        System.out.println("\n=== PriorityQueue使用场景：任务优先级队列 ===");
        PriorityQueue<Task> tasks = new PriorityQueue<>((t1, t2) -> 
            t2.getPriority() - t1.getPriority()); // 优先级高的先执行
        
        tasks.offer(new Task("紧急bug修复", 3));
        tasks.offer(new Task("代码审查", 1));
        tasks.offer(new Task("系统维护", 2));
        
        System.out.println("任务执行顺序:");
        while (!tasks.isEmpty()) {
            System.out.println(tasks.poll());
        }
    }
}

// 示例类
class Product {
    private String name;
    private double price;

    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    @Override
    public String toString() {
        return name + " - ￥" + price;
    }
}

class Student {
    private String name;
    private double score;

    public Student(String name, double score) {
        this.name = name;
        this.score = score;
    }

    public double getScore() {
        return score;
    }

    @Override
    public String toString() {
        return name + " - " + score + "分";
    }
}

class Task {
    private String name;
    private int priority; // 1-3，3最高

    public Task(String name, int priority) {
        this.name = name;
        this.priority = priority;
    }

    public int getPriority() {
        return priority;
    }

    @Override
    public String toString() {
        return name + " (优先级: " + priority + ")";
    }
} 