package com.example.exception;

import java.io.*;

/**
 * 文件操作异常处理示例
 * 展示文件读写过程中的异常处理
 */
public class FileExceptionDemo {
    public static void main(String[] args) {
        // 1. 文件读取异常处理
        System.out.println("=== 文件读取异常处理 ===");
        try {
            readFile("test.txt");
        } catch (FileNotFoundException e) {
            System.out.println("文件不存在: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("读取文件时发生错误: " + e.getMessage());
        }

        // 2. 文件写入异常处理
        System.out.println("\n=== 文件写入异常处理 ===");
        try {
            writeFile("output.txt", "Hello World");
        } catch (IOException e) {
            System.out.println("写入文件时发生错误: " + e.getMessage());
        }

        // 3. 使用try-with-resources
        System.out.println("\n=== 使用try-with-resources ===");
        try (BufferedReader reader = new BufferedReader(new FileReader("test.txt"))) {
            String line = reader.readLine();
            System.out.println("读取的内容: " + line);
        } catch (IOException e) {
            System.out.println("文件操作错误: " + e.getMessage());
        }
    }

    // 读取文件
    public static void readFile(String fileName) throws IOException {
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new FileReader(fileName));
            String line = reader.readLine();
            System.out.println("文件内容: " + line);
        } finally {
            if (reader != null) {
                reader.close();
            }
        }
    }

    // 写入文件
    public static void writeFile(String fileName, String content) throws IOException {
        BufferedWriter writer = null;
        try {
            writer = new BufferedWriter(new FileWriter(fileName));
            writer.write(content);
            System.out.println("文件写入成功");
        } finally {
            if (writer != null) {
                writer.close();
            }
        }
    }
} 