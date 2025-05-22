package com.example.spring.aop.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

/**
 * 安全切面
 * 用于检查敏感操作，如删除用户等
 */
@Aspect
@Component
public class SecurityAspect {
    
    /**
     * 环绕通知：检查敏感操作
     */
    @Around("execution(* com.example.spring.aop.service.*.deleteUser(..))")
    public Object checkSecurity(ProceedingJoinPoint joinPoint) throws Throwable {
        System.out.println("\n=== 安全检查 ===");
        System.out.println("检测到敏感操作: " + joinPoint.getSignature().getName());
        
        // 这里可以添加实际的安全检查逻辑
        // 例如：检查用户权限、验证token等
        
        System.out.println("安全检查通过");
        System.out.println("=== 安全检查结束 ===\n");
        
        return joinPoint.proceed();
    }
} 