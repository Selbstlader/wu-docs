package com.example.io;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.List;

/**
 * Java IO操作示例
 */
public class IODemo {
    public static void main(String[] args) {
        // 1. 文件基本操作
        System.out.println("=== 文件基本操作 ===");
        try {
            // 创建文件
            File file = new File("test.txt");
            if (file.createNewFile()) {
                System.out.println("文件创建成功");
            }

            // 检查文件是否存在
            System.out.println("文件是否存在: " + file.exists());
            System.out.println("是否是文件: " + file.isFile());
            System.out.println("文件大小: " + file.length() + " 字节");

            // 删除文件
            if (file.delete()) {
                System.out.println("文件删除成功");
            }
        } catch (IOException e) {
            System.out.println("文件操作出错: " + e.getMessage());
        }

        // 2. 字节流操作
        System.out.println("\n=== 字节流操作 ===");
        try (FileOutputStream fos = new FileOutputStream("test.txt")) {
            // 写入数据
            String content = "Hello, Java IO!";
            fos.write(content.getBytes(StandardCharsets.UTF_8));
            System.out.println("数据写入成功");
        } catch (IOException e) {
            System.out.println("写入文件出错: " + e.getMessage());
        }

        try (FileInputStream fis = new FileInputStream("test.txt")) {
            // 读取数据
            byte[] buffer = new byte[1024];
            int length = fis.read(buffer);
            String content = new String(buffer, 0, length, StandardCharsets.UTF_8);
            System.out.println("读取的内容: " + content);
        } catch (IOException e) {
            System.out.println("读取文件出错: " + e.getMessage());
        }

        // 3. 字符流操作
        System.out.println("\n=== 字符流操作 ===");
        try (FileWriter writer = new FileWriter("test.txt")) {
            // 写入数据
            writer.write("你好，Java IO！");
            System.out.println("数据写入成功");
        } catch (IOException e) {
            System.out.println("写入文件出错: " + e.getMessage());
        }

        try (FileReader reader = new FileReader("test.txt")) {
            // 读取数据
            char[] buffer = new char[1024];
            int length = reader.read(buffer);
            String content = new String(buffer, 0, length);
            System.out.println("读取的内容: " + content);
        } catch (IOException e) {
            System.out.println("读取文件出错: " + e.getMessage());
        }

        // 4. 缓冲流操作
        System.out.println("\n=== 缓冲流操作 ===");
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("test.txt"))) {
            // 写入数据
            writer.write("第一行");
            writer.newLine();
            writer.write("第二行");
            System.out.println("数据写入成功");
        } catch (IOException e) {
            System.out.println("写入文件出错: " + e.getMessage());
        }

        try (BufferedReader reader = new BufferedReader(new FileReader("test.txt"))) {
            // 读取数据
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println("读取的行: " + line);
            }
        } catch (IOException e) {
            System.out.println("读取文件出错: " + e.getMessage());
        }

        // 5. NIO操作
        System.out.println("\n=== NIO操作 ===");
        try {
            // 写入数据
            Path path = Paths.get("test.txt");
            List<String> lines = List.of("第一行", "第二行", "第三行");
            Files.write(path, lines, StandardCharsets.UTF_8);
            System.out.println("数据写入成功");

            // 读取数据
            List<String> readLines = Files.readAllLines(path, StandardCharsets.UTF_8);
            System.out.println("读取的内容:");
            readLines.forEach(System.out::println);

            // 删除文件
            Files.deleteIfExists(path);
            System.out.println("文件删除成功");
        } catch (IOException e) {
            System.out.println("NIO操作出错: " + e.getMessage());
        }
    }
} 