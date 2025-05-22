package com.example.basics;

/**
 * Java 快捷表达式示例
 * 展示三元运算符、空值合并等快捷语法
 */
public class ShortcutExpressionsDemo {
    public static void main(String[] args) {
        // 1. 三元运算符 (condition ? valueIfTrue : valueIfFalse)
        int age = 20;
        String status = age >= 18 ? "成年人" : "未成年";
        System.out.println("=== 三元运算符示例 ===");
        System.out.println("年龄: " + age + ", 状态: " + status);

        // 2. 链式三元运算符
        int score = 85;
        String grade = score >= 90 ? "优秀" : 
                      score >= 80 ? "良好" : 
                      score >= 60 ? "及格" : "不及格";
        System.out.println("\n=== 链式三元运算符示例 ===");
        System.out.println("分数: " + score + ", 等级: " + grade);

        // 3. 空值处理
        System.out.println("\n=== 空值处理示例 ===");
        // 3.1 使用三元运算符处理空值
        String name = null;
        String displayName = name != null ? name : "未知";
        System.out.println("显示名称: " + displayName);

        // 3.2 使用 Optional 处理空值（Java 8+）
        java.util.Optional<String> optionalName = java.util.Optional.ofNullable(name);
        String safeName = optionalName.orElse("未知");
        System.out.println("安全名称: " + safeName);

        // 4. 短路运算符
        System.out.println("\n=== 短路运算符示例 ===");
        // 4.1 && (与) 短路
        String text = null;
        if (text != null && text.length() > 0) {
            System.out.println("文本不为空");
        } else {
            System.out.println("文本为空或null");
        }

        // 4.2 || (或) 短路
        int value = 5;
        if (value < 0 || value > 100) {
            System.out.println("值超出范围");
        } else {
            System.out.println("值在范围内");
        }

        // 5. 实际开发中的常见用法
        System.out.println("\n=== 实际开发示例 ===");
        // 5.1 条件赋值
        int max = Math.max(10, 20);
        int min = Math.min(10, 20);
        System.out.println("较大值: " + max + ", 较小值: " + min);

        // 5.2 空值合并（Java 8+）
        String defaultValue = "默认值";
        String result = optionalName.orElseGet(() -> "计算得到的默认值");
        System.out.println("结果: " + result);

        // 5.3 条件执行
        java.util.Optional.ofNullable(name)
            .ifPresent(n -> System.out.println("名称存在: " + n));

        // 6. 其他快捷操作
        System.out.println("\n=== 其他快捷操作示例 ===");
        // 6.1 递增/递减
        int count = 0;
        System.out.println("count++: " + count++);  // 先使用后递增
        System.out.println("++count: " + ++count);  // 先递增后使用

        // 6.2 复合赋值
        int number = 5;
        number += 3;  // 等同于 number = number + 3
        System.out.println("复合赋值后: " + number);

        // 6.3 位运算快捷操作
        int flags = 0;
        flags |= 1;  // 设置标志位
        flags &= ~1; // 清除标志位
        System.out.println("标志位: " + flags);
    }
} 