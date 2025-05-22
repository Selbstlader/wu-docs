package com.example.basics;

/**
 * Java 基础示例 - Hello World
 * 这是我们的第一个 Java 程序
 * 
 * @author Your Name
 * @version 1.0
 */
public class HelloWorld {
    /**
     * 程序入口点
     * @param args 命令行参数
     */
    public static void main(String[] args) {
        // 打印 Hello World
        System.out.println("Hello, World!");
        
        // 变量声明和使用示例
        String message = "欢迎学习 Java!";
        System.out.println(message);
        
        // 基本数据类型示例
        int number = 42;
        double pi = 3.14159;
        boolean isJavaFun = true;
        
        // 打印不同类型的变量
        System.out.println("数字: " + number);
        System.out.println("圆周率: " + pi);
        System.out.println("Java 有趣吗? " + isJavaFun);
    }
} 