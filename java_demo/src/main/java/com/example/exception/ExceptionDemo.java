package com.example.exception;

/**
 * 异常处理示例
 * 展示Java中异常处理的基本用法和最佳实践
 */
public class ExceptionDemo {
    public static void main(String[] args) {
        // 1. 基本异常处理
        System.out.println("=== 基本异常处理 ===");
        try {
            int result = divide(10, 0);
            System.out.println("结果: " + result);
        } catch (ArithmeticException e) {
            System.out.println("捕获到算术异常: " + e.getMessage());
        } finally {
            System.out.println("finally块总是执行");
        }

        // 2. 多个catch块
        System.out.println("\n=== 多个catch块 ===");
        try {
            String str = null;
            System.out.println(str.length());
        } catch (NullPointerException e) {
            System.out.println("空指针异常: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("其他异常: " + e.getMessage());
        }

        // 3. 自定义异常
        System.out.println("\n=== 自定义异常 ===");
        try {
            validateAge(15);
        } catch (AgeException e) {
            System.out.println("年龄异常: " + e.getMessage());
        }

        // 4. try-with-resources
        System.out.println("\n=== try-with-resources ===");
        try (Resource resource = new Resource()) {
            resource.use();
        } catch (Exception e) {
            System.out.println("资源使用异常: " + e.getMessage());
        }
    }

    // 基本异常示例
    public static int divide(int a, int b) {
        return a / b;  // 可能抛出ArithmeticException
    }

    // 自定义异常示例
    public static void validateAge(int age) throws AgeException {
        if (age < 18) {
            throw new AgeException("年龄必须大于18岁");
        }
    }
}

// 自定义异常类
class AgeException extends Exception {
    public AgeException(String message) {
        super(message);
    }
}

// 资源类示例
class Resource implements AutoCloseable {
    public void use() {
        System.out.println("使用资源");
    }

    @Override
    public void close() {
        System.out.println("关闭资源");
    }
} 