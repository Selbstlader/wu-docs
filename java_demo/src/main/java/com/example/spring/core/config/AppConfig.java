package com.example.spring.core.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 * Spring配置类
 * 使用Java配置方式替代XML配置
 */
@Configuration
@ComponentScan("com.example.spring.core")
public class AppConfig {
    // 配置类可以包含@Bean方法
    // 这里我们使用组件扫描，所以不需要显式定义Bean
} 