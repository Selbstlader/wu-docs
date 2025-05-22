package com.example.spring.aop.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

/**
 * 性能监控切面
 * 用于监控方法执行时间，对执行时间过长的方法进行警告
 */
@Aspect
@Component
public class PerformanceAspect {
    
    private static final long WARNING_THRESHOLD = 150; // 警告阈值（毫秒）
    
    /**
     * 环绕通知：监控方法执行时间
     */
    @Around("execution(* com.example.spring.aop.service.*.*(..))")
    public Object monitorPerformance(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();
        
        try {
            Object result = joinPoint.proceed();
            long endTime = System.currentTimeMillis();
            long executionTime = endTime - startTime;
            
            if (executionTime > WARNING_THRESHOLD) {
                System.out.println("\n=== 性能警告 ===");
                System.out.println("方法: " + joinPoint.getSignature().getName());
                System.out.println("执行时间: " + executionTime + "ms");
                System.out.println("超过阈值: " + WARNING_THRESHOLD + "ms");
                System.out.println("=== 性能警告结束 ===\n");
            }
            
            return result;
        } catch (Throwable e) {
            long endTime = System.currentTimeMillis();
            System.out.println("\n=== 性能异常 ===");
            System.out.println("方法: " + joinPoint.getSignature().getName());
            System.out.println("执行时间: " + (endTime - startTime) + "ms");
            System.out.println("异常信息: " + e.getMessage());
            System.out.println("=== 性能异常结束 ===\n");
            throw e;
        }
    }
} 