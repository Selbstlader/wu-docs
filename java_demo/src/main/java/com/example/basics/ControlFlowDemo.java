package com.example.basics;

import java.util.Scanner;

/**
 * Java 控制流程示例
 * 包含条件语句、循环语句和跳转语句的实际应用
 */
public class ControlFlowDemo {
    public static void main(String[] args) {
        // 创建 Scanner 对象用于接收用户输入
        Scanner scanner = new Scanner(System.in);
        
        // 1. if-else 条件语句示例
        System.out.println("=== if-else 示例 ===");
        System.out.print("请输入你的年龄: ");
        int age = scanner.nextInt();
        
        if (age < 18) {
            System.out.println("未成年");
        } else if (age < 60) {
            System.out.println("成年人");
        } else {
            System.out.println("老年人");
        }
        
        // 2. switch 语句示例
        System.out.println("\n=== switch 示例 ===");
        System.out.print("请输入月份(1-12): ");
        int month = scanner.nextInt();
        
        switch (month) {
            case 3:
            case 4:
            case 5:
                System.out.println("春季");
                break;
            case 6:
            case 7:
            case 8:
                System.out.println("夏季");
                break;
            case 9:
            case 10:
            case 11:
                System.out.println("秋季");
                break;
            case 12:
            case 1:
            case 2:
                System.out.println("冬季");
                break;
            default:
                System.out.println("无效的月份");
        }
        
        // 3. for 循环示例
        System.out.println("\n=== for 循环示例 ===");
        System.out.print("请输入要计算的阶乘: ");
        int n = scanner.nextInt();
        int factorial = 1;
        
        for (int i = 1; i <= n; i++) {
            factorial *= i;
        }
        System.out.println(n + "的阶乘是: " + factorial);
        
        // 4. while 循环示例
        System.out.println("\n=== while 循环示例 ===");
        System.out.print("请输入一个数字，计算其各位数字之和: ");
        int number = scanner.nextInt();
        int sum = 0;
        int temp = number;
        
        while (temp > 0) {
            sum += temp % 10;
            temp /= 10;
        }
        System.out.println(number + "的各位数字之和是: " + sum);
        
        // 5. do-while 循环示例
        System.out.println("\n=== do-while 循环示例 ===");
        int guess;
        int target = (int) (Math.random() * 100) + 1;
        
        do {
            System.out.print("请猜一个1-100之间的数字: ");
            guess = scanner.nextInt();
            
            if (guess < target) {
                System.out.println("太小了，再大一点！");
            } else if (guess > target) {
                System.out.println("太大了，再小一点！");
            } else {
                System.out.println("恭喜你猜对了！");
            }
        } while (guess != target);
        
        // 6. break 和 continue 示例
        System.out.println("\n=== break 和 continue 示例 ===");
        System.out.println("打印1-10中的偶数：");
        for (int i = 1; i <= 10; i++) {
            if (i % 2 != 0) {
                continue;  // 跳过奇数
            }
            System.out.print(i + " ");
        }
        System.out.println();
        
        // 7. 实际开发中的常见用法
        System.out.println("\n=== 实际开发示例 ===");
        // 7.1 遍历数组
        int[] scores = {85, 90, 95, 88, 92};
        int maxScore = scores[0];
        for (int score : scores) {
            if (score > maxScore) {
                maxScore = score;
            }
        }
        System.out.println("最高分是: " + maxScore);
        
        // 7.2 嵌套循环
        System.out.println("\n打印九九乘法表：");
        for (int i = 1; i <= 9; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.printf("%d×%d=%-3d", j, i, i * j);
            }
            System.out.println();
        }
        
        // 关闭 Scanner
        scanner.close();
    }
} 