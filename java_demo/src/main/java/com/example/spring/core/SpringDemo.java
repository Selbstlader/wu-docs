package com.example.spring.core;

import com.example.spring.core.config.AppConfig;
import com.example.spring.core.service.UserService;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

/**
 * Spring示例程序
 * 演示Spring的核心功能
 */
public class SpringDemo {
    public static void main(String[] args) {
        // 1. 创建Spring容器（使用Java配置方式）
        AnnotationConfigApplicationContext context = 
            new AnnotationConfigApplicationContext(AppConfig.class);

        // 2. 从容器中获取bean
        UserService userService = context.getBean(UserService.class);

        // 3. 使用bean
        userService.createUser("张三");
        String userInfo = userService.getUserInfo("001");
        System.out.println(userInfo);

        // 4. 关闭容器
        context.close();
    }
} 