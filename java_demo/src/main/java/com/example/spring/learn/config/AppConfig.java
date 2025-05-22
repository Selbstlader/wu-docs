package com.example.spring.learn.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 * Spring配置类
 * 演示@Configuration和@ComponentScan注解
 */
@Configuration
@ComponentScan("com.example.spring.learn")
public class AppConfig {
    // 配置类可以包含@Bean方法
    // 这里我们使用组件扫描，所以不需要显式定义Bean
} 