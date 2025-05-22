package com.example.spring.learn.model;

/**
 * 用户实体类
 * 用于演示Spring的基本概念
 */
public class User {
    private String id;
    private String name;
    private String email;

    // 无参构造方法
    public User() {
        System.out.println("User对象被创建");
    }

    // getter和setter方法
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
} 