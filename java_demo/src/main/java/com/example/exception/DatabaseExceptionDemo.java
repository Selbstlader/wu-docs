package com.example.exception;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * 数据库操作异常处理示例
 * 展示数据库操作过程中的异常处理
 */
public class DatabaseExceptionDemo {
    public static void main(String[] args) {
        // 1. 数据库连接异常处理
        System.out.println("=== 数据库连接异常处理 ===");
        try {
            connectToDatabase();
        } catch (SQLException e) {
            System.out.println("数据库连接错误: " + e.getMessage());
        }

        // 2. 数据库操作异常处理
        System.out.println("\n=== 数据库操作异常处理 ===");
        try {
            executeQuery("SELECT * FROM users");
        } catch (DatabaseException e) {
            System.out.println("数据库操作错误: " + e.getMessage());
        }
    }

    // 连接数据库
    public static void connectToDatabase() throws SQLException {
        Connection conn = null;
        try {
            // 注意：这里使用示例URL，实际使用时需要替换为真实的数据库连接信息
            conn = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/test",
                "username",
                "password"
            );
            System.out.println("数据库连接成功");
        } finally {
            if (conn != null) {
                conn.close();
            }
        }
    }

    // 执行数据库查询
    public static void executeQuery(String sql) throws DatabaseException {
        Connection conn = null;
        Statement stmt = null;
        try {
            conn = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/test",
                "username",
                "password"
            );
            stmt = conn.createStatement();
            stmt.executeQuery(sql);
            System.out.println("查询执行成功");
        } catch (SQLException e) {
            throw new DatabaseException("执行查询时发生错误: " + e.getMessage());
        } finally {
            try {
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                System.out.println("关闭数据库连接时发生错误: " + e.getMessage());
            }
        }
    }
}

// 自定义数据库异常
class DatabaseException extends Exception {
    public DatabaseException(String message) {
        super(message);
    }
} 