package com.example.spring.aop.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Constructor;
import java.util.Arrays;

/**
 * 反射操作切面
 * 用于监控反射相关的操作
 */
@Aspect
@Component
public class ReflectionAspect {
    
    /**
     * 监控 Field 的反射操作
     */
    @Around("execution(* java.lang.reflect.Field.*(..))")
    public Object monitorFieldReflection(ProceedingJoinPoint joinPoint) throws Throwable {
        Field field = (Field) joinPoint.getTarget();
        String operation = joinPoint.getSignature().getName();
        
        System.out.println("\n=== 字段反射操作 ===");
        System.out.println("字段名: " + field.getName());
        System.out.println("字段类型: " + field.getType().getName());
        System.out.println("操作类型: " + operation);
        System.out.println("参数: " + Arrays.toString(joinPoint.getArgs()));
        
        try {
            Object result = joinPoint.proceed();
            System.out.println("操作结果: " + result);
            System.out.println("=== 字段反射操作完成 ===\n");
            return result;
        } catch (Throwable e) {
            System.out.println("操作异常: " + e.getMessage());
            System.out.println("=== 字段反射操作异常 ===\n");
            throw e;
        }
    }
    
    /**
     * 监控 Method 的反射操作
     */
    @Around("execution(* java.lang.reflect.Method.*(..))")
    public Object monitorMethodReflection(ProceedingJoinPoint joinPoint) throws Throwable {
        Method method = (Method) joinPoint.getTarget();
        String operation = joinPoint.getSignature().getName();
        
        System.out.println("\n=== 方法反射操作 ===");
        System.out.println("方法名: " + method.getName());
        System.out.println("返回类型: " + method.getReturnType().getName());
        System.out.println("操作类型: " + operation);
        System.out.println("参数: " + Arrays.toString(joinPoint.getArgs()));
        
        try {
            Object result = joinPoint.proceed();
            System.out.println("操作结果: " + result);
            System.out.println("=== 方法反射操作完成 ===\n");
            return result;
        } catch (Throwable e) {
            System.out.println("操作异常: " + e.getMessage());
            System.out.println("=== 方法反射操作异常 ===\n");
            throw e;
        }
    }
    
    /**
     * 监控 Constructor 的反射操作
     */
    @Around("execution(* java.lang.reflect.Constructor.*(..))")
    public Object monitorConstructorReflection(ProceedingJoinPoint joinPoint) throws Throwable {
        Constructor<?> constructor = (Constructor<?>) joinPoint.getTarget();
        String operation = joinPoint.getSignature().getName();
        
        System.out.println("\n=== 构造方法反射操作 ===");
        System.out.println("构造方法所属类: " + constructor.getDeclaringClass().getName());
        System.out.println("操作类型: " + operation);
        System.out.println("参数: " + Arrays.toString(joinPoint.getArgs()));
        
        try {
            Object result = joinPoint.proceed();
            System.out.println("操作结果: " + result);
            System.out.println("=== 构造方法反射操作完成 ===\n");
            return result;
        } catch (Throwable e) {
            System.out.println("操作异常: " + e.getMessage());
            System.out.println("=== 构造方法反射操作异常 ===\n");
            throw e;
        }
    }
} 