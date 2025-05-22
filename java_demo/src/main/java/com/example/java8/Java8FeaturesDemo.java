package com.example.java8;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Java 8+ 新特性示例
 */
public class Java8FeaturesDemo {
    public static void main(String[] args) {
        // 1. Lambda表达式示例
        System.out.println("=== Lambda表达式示例 ===");
        List<String> names = Arrays.asList("张三", "李四", "王五", "赵六");
        
        // 使用Lambda表达式排序
        names.sort((a, b) -> a.compareTo(b));
        System.out.println("排序后: " + names);
        
        // 使用Lambda表达式遍历
        System.out.println("\n使用Lambda遍历:");
        names.forEach(name -> System.out.println("名字: " + name));

        // 2. Stream API示例
        System.out.println("\n=== Stream API示例 ===");
        List<Student> students = Arrays.asList(
            new Student("张三", 85, "计算机"),
            new Student("李四", 92, "数学"),
            new Student("王五", 78, "物理"),
            new Student("赵六", 88, "计算机")
        );
        
        // 过滤计算机专业的学生
        System.out.println("计算机专业的学生:");
        students.stream()
            .filter(s -> "计算机".equals(s.getMajor()))
            .forEach(System.out::println);
        
        // 计算平均分
        double averageScore = students.stream()
            .mapToInt(Student::getScore)
            .average()
            .orElse(0.0);
        System.out.println("\n平均分: " + averageScore);
        
        // 按专业分组
        Map<String, List<Student>> studentsByMajor = students.stream()
            .collect(Collectors.groupingBy(Student::getMajor));
        System.out.println("\n按专业分组:");
        studentsByMajor.forEach((major, studentList) -> {
            System.out.println(major + ": " + studentList);
        });

        // 3. Optional类示例
        System.out.println("\n=== Optional类示例 ===");
        Optional<Student> topStudent = students.stream()
            .max(Comparator.comparingInt(Student::getScore));
        
        // 安全地获取学生信息
        topStudent.ifPresent(student -> 
            System.out.println("最高分学生: " + student));
        
        // 使用orElse提供默认值
        String studentName = topStudent
            .map(Student::getName)
            .orElse("未知");
        System.out.println("最高分学生姓名: " + studentName);

        // 4. 新的日期时间API示例
        System.out.println("\n=== 新的日期时间API示例 ===");
        // 获取当前日期和时间
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();
        LocalDateTime dateTime = LocalDateTime.now();
        
        System.out.println("当前日期: " + today);
        System.out.println("当前时间: " + now);
        System.out.println("当前日期时间: " + dateTime);
        
        // 日期格式化
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy年MM月dd日 HH:mm:ss");
        System.out.println("格式化后的日期时间: " + dateTime.format(formatter));
        
        // 日期计算
        LocalDate nextWeek = today.plusWeeks(1);
        System.out.println("下周的日期: " + nextWeek);
        
        // 计算两个日期之间的天数
        Period period = Period.between(today, nextWeek);
        System.out.println("相差天数: " + period.getDays());
    }
}

class Student {
    private String name;
    private int score;
    private String major;

    public Student(String name, int score, String major) {
        this.name = name;
        this.score = score;
        this.major = major;
    }

    public String getName() {
        return name;
    }

    public int getScore() {
        return score;
    }

    public String getMajor() {
        return major;
    }

    @Override
    public String toString() {
        return name + "(" + score + "分, " + major + "专业)";
    }
} 