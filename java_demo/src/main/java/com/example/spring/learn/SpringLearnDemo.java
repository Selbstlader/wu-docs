package com.example.spring.learn;

import com.example.spring.learn.config.AppConfig;
import com.example.spring.learn.model.User;
import com.example.spring.learn.service.UserService;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

/**
 * Spring学习示例主程序
 * 演示Spring的核心功能
 */
public class SpringLearnDemo {
    public static void main(String[] args) {
        // 1. 创建Spring容器
        System.out.println("1. 创建Spring容器");
        AnnotationConfigApplicationContext context = 
            new AnnotationConfigApplicationContext(AppConfig.class);

        // 2. 从容器中获取bean
        System.out.println("\n2. 获取UserService");
        UserService userService = context.getBean(UserService.class);

        // 3. 使用bean
        System.out.println("\n3. 使用UserService");
        
        // 创建用户
        User user = new User();
        user.setId("001");
        user.setName("张三");
        user.setEmail("zhangsan@example.com");
        userService.createUser(user);

        // 获取用户
        User foundUser = userService.getUser("001");
        System.out.println("获取到的用户: " + foundUser);

        // 更新用户
        user.setName("张三（已更新）");
        userService.updateUser(user);
        System.out.println("更新后的用户: " + userService.getUser("001"));

        // 删除用户
        userService.deleteUser("001");
        System.out.println("删除后的用户: " + userService.getUser("001"));

        // 4. 关闭容器
        System.out.println("\n4. 关闭Spring容器");
        context.close();
    }
} 