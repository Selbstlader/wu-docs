package com.example.spring.aop;

import com.example.spring.aop.config.AopConfig;
import com.example.spring.aop.model.User;
import com.example.spring.aop.service.UserService;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.Arrays;

/**
 * AOP示例程序
 * 演示Spring AOP的多个切面功能
 */
public class AopDemo1 {
    public static void main(String[] args) throws Exception {
        // 1. 创建Spring容器
        System.out.println("1. 创建Spring容器");
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AopConfig.class);

        // 2. 从容器中获取bean
        System.out.println("\n2. 获取UserService");
        UserService userService = context.getBean(UserService.class);

        // 3. 测试反射操作
        System.out.println("\n3. 测试反射操作");
        Class<?> clazz = Class.forName("com.example.spring.aop.model.User");
        
        // 测试字段反射
        System.out.println("\n=== 测试字段反射 ===");
        Field[] fields = clazz.getDeclaredFields();
        for (Field field : fields) {
            System.out.println("字段名: " + field.getName());
            // 尝试获取字段值
            field.setAccessible(true);
            User user = new User("001", "test", "password");
            Object value = field.get(user);
            System.out.println("字段值: " + value);
        }
        
        // 测试方法反射
        System.out.println("\n=== 测试方法反射 ===");
        Method[] methods = clazz.getDeclaredMethods();
        for (Method method : methods) {
            System.out.println("方法名: " + method.getName());
            // 尝试调用方法
            if (method.getName().startsWith("get")) {
                User user = new User("001", "test", "password");
                Object result = method.invoke(user);
                System.out.println("方法调用结果: " + result);
            }
        }
        
        // 测试构造方法反射
        System.out.println("\n=== 测试构造方法反射 ===");
        Constructor<?>[] constructors = clazz.getDeclaredConstructors();
        for (Constructor<?> constructor : constructors) {
            System.out.println("构造方法: " + constructor);
            // 尝试创建实例
            Object instance = constructor.newInstance("002", "test2", "password2");
            System.out.println("创建的实例: " + instance);
        }

        // 4. 关闭容器
        System.out.println("\n4. 关闭Spring容器");
        context.close();
    }
} 