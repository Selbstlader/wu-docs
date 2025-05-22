package com.example.spring.aop;

import com.example.spring.aop.config.AopConfig;
import com.example.spring.aop.model.User;
import com.example.spring.aop.service.UserService;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

/**
 * AOP示例程序
 * 演示Spring AOP的多个切面功能
 */
public class AopDemo {
    public static void main(String[] args) {
        // 1. 创建Spring容器
        System.out.println("1. 创建Spring容器");
        AnnotationConfigApplicationContext context = 
            new AnnotationConfigApplicationContext(AopConfig.class);

        // 2. 从容器中获取bean
        System.out.println("\n2. 获取UserService");
        UserService userService = context.getBean(UserService.class);

        // 3. 测试用户注册（将触发日志切面和性能监控切面）
        System.out.println("\n3. 测试用户注册");
        User user = userService.register("testUser", "password123");
        System.out.println("注册的用户: " + user);

        // 4. 测试用户登录（将触发日志切面和性能监控切面）
        System.out.println("\n4. 测试用户登录");
        boolean loginResult = userService.login("testUser", "password123");
        System.out.println("登录结果: " + loginResult);

        // 5. 测试更新用户（将触发日志切面和性能监控切面）
        System.out.println("\n5. 测试更新用户");
        user.setUsername("updatedUser");
        boolean updateResult = userService.updateUser(user);
        System.out.println("更新结果: " + updateResult);

        // 6. 测试删除用户（将触发所有切面）
        System.out.println("\n6. 测试删除用户");
        boolean deleteResult = userService.deleteUser(user.getId());
        System.out.println("删除结果: " + deleteResult);

        // 7. 关闭容器
        System.out.println("\n7. 关闭Spring容器");
        context.close();
    }
} 