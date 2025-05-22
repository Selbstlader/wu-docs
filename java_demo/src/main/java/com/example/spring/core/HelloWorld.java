package com.example.spring.core;

/**
 * 一个简单的Hello World类
 * 用于演示Spring的基本概念
 */
public class HelloWorld {
    private String message;

    // 无参构造方法
    public HelloWorld() {
        System.out.println("HelloWorld对象被创建");
    }

    // setter方法，用于依赖注入
    public void setMessage(String message) {
        this.message = message;
    }

    // 获取消息的方法
    public String getMessage() {
        return message;
    }

    // 打印消息的方法
    public void sayHello() {
        System.out.println("消息: " + message);
    }
} 