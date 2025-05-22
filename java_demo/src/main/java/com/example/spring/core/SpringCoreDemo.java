package com.example.spring.core;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * Spring Core 基础示例
 * 演示了Spring的核心概念：
 * 1. IoC（控制反转）：对象的创建由Spring容器负责
 * 2. DI（依赖注入）：对象的依赖关系由Spring容器注入
 */
public class SpringCoreDemo {
    public static void main(String[] args) {
        // 1. 创建Spring容器
        // ClassPathXmlApplicationContext会从类路径下加载配置文件
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");

        // 2. 从容器中获取bean
        // 这里不需要我们手动创建HelloWorld对象，Spring容器会帮我们创建
        HelloWorld helloWorld = (HelloWorld) context.getBean("helloWorld");

        // 3. 使用bean
        helloWorld.sayHello();

        // 4. 关闭容器
        ((ClassPathXmlApplicationContext) context).close();
    }
} 