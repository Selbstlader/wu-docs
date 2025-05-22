package com.example.spring.aop.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

/**
 * AOP配置类
 * @EnableAspectJAutoProxy 启用AOP功能
 */
@Configuration
@EnableAspectJAutoProxy
@ComponentScan("com.example.spring.aop")
public class AopConfig {
    // 配置类可以包含其他配置
} 