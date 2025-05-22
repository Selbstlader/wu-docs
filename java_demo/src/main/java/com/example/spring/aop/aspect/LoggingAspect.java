package com.example.spring.aop.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

/**
 * 日志切面
 * 用于记录方法执行时间和参数
 */
@Aspect
@Component
public class LoggingAspect {

    /**
     * 环绕通知：记录方法执行时间
     * @param joinPoint 连接点
     * @return 方法执行结果
     * @throws Throwable 可能抛出的异常
     */
    @Around("execution(* com.example.spring.aop.service.*.*(..))")
    public Object logMethodExecution(ProceedingJoinPoint joinPoint) throws Throwable {
        // 获取方法名
        String methodName = joinPoint.getSignature().getName();
        
        // 获取参数
        Object[] args = joinPoint.getArgs();
        
        // 记录开始时间
        long startTime = System.currentTimeMillis();
        
        System.out.println("\n=== 方法执行日志 ===");
        System.out.println("方法名: " + methodName);
        System.out.println("参数: " + java.util.Arrays.toString(args));
        
        try {
            // 执行目标方法
            Object result = joinPoint.proceed();
            
            // 记录结束时间
            long endTime = System.currentTimeMillis();
            System.out.println("执行时间: " + (endTime - startTime) + "ms");
            System.out.println("返回结果: " + result);
            System.out.println("=== 方法执行完成 ===\n");
            
            return result;
        } catch (Throwable e) {
            System.out.println("执行异常: " + e.getMessage());
            System.out.println("=== 方法执行异常 ===\n");
            throw e;
        }
    }
} 