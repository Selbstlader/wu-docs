package com.example.io;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

/**
 * 文件上传示例
 */
public class FileUploadDemo {
    public static void main(String[] args) {
        // 源文件路径
        String sourcePath = "C:\\Users\\Administrator\\Desktop\\慧溯系统物流板块\\物流调度\\index.html";
        // 目标文件路径
        String targetPath = "C:\\Users\\Administrator\\Desktop\\慧溯系统物流板块\\物流调度\\index_copy.html";
        
        // 验证源文件是否存在
        File sourceFile = new File(sourcePath);
        if (!sourceFile.exists()) {
            System.out.println("源文件不存在: " + sourcePath);
            return;
        }
        
        System.out.println("源文件大小: " + sourceFile.length() + " 字节");
        
        // 1. 使用字节流上传（适合所有类型文件）
        uploadWithByteStream(sourcePath, targetPath);
        
        // 2. 使用缓冲流上传（提高性能）
        uploadWithBufferedStream(sourcePath, targetPath + ".buffered");
        
        // 3. 使用NIO上传（更现代的方式）
        uploadWithNIO(sourcePath, targetPath + ".nio");
    }
    
    /**
     * 使用字节流上传文件
     */
    private static void uploadWithByteStream(String sourcePath, String targetPath) {
        System.out.println("\n=== 使用字节流上传文件 ===");
        try (FileInputStream fis = new FileInputStream(sourcePath);
             FileOutputStream fos = new FileOutputStream(targetPath)) {
            
            // 创建缓冲区
            byte[] buffer = new byte[1024];
            int length;
            long totalBytes = 0;
            
            // 读取源文件并写入目标文件
            while ((length = fis.read(buffer)) != -1) {
                fos.write(buffer, 0, length);
                totalBytes += length;
            }
            
            // 验证文件大小
            File targetFile = new File(targetPath);
            if (targetFile.exists() && targetFile.length() == new File(sourcePath).length()) {
                System.out.println("文件上传成功，大小: " + totalBytes + " 字节");
            } else {
                System.out.println("文件上传可能不完整，请检查");
            }
        } catch (IOException e) {
            System.out.println("文件上传失败: " + e.getMessage());
        }
    }
    
    /**
     * 使用缓冲流上传文件
     */
    private static void uploadWithBufferedStream(String sourcePath, String targetPath) {
        System.out.println("\n=== 使用缓冲流上传文件 ===");
        try (BufferedInputStream bis = new BufferedInputStream(new FileInputStream(sourcePath));
             BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(targetPath))) {
            
            // 创建缓冲区
            byte[] buffer = new byte[8192]; // 使用更大的缓冲区
            int length;
            long totalBytes = 0;
            
            // 读取源文件并写入目标文件
            while ((length = bis.read(buffer)) != -1) {
                bos.write(buffer, 0, length);
                totalBytes += length;
            }
            
            // 验证文件大小
            File targetFile = new File(targetPath);
            if (targetFile.exists() && targetFile.length() == new File(sourcePath).length()) {
                System.out.println("文件上传成功，大小: " + totalBytes + " 字节");
            } else {
                System.out.println("文件上传可能不完整，请检查");
            }
        } catch (IOException e) {
            System.out.println("文件上传失败: " + e.getMessage());
        }
    }
    
    /**
     * 使用NIO上传文件
     */
    private static void uploadWithNIO(String sourcePath, String targetPath) {
        System.out.println("\n=== 使用NIO上传文件 ===");
        try {
            Path source = Paths.get(sourcePath);
            Path target = Paths.get(targetPath);
            
            // 直接复制文件，如果目标文件存在则覆盖
            Files.copy(source, target, StandardCopyOption.REPLACE_EXISTING);
            
            // 验证文件大小
            long sourceSize = Files.size(source);
            long targetSize = Files.size(target);
            
            if (sourceSize == targetSize) {
                System.out.println("文件上传成功，大小: " + targetSize + " 字节");
            } else {
                System.out.println("文件上传可能不完整，请检查");
            }
        } catch (IOException e) {
            System.out.println("文件上传失败: " + e.getMessage());
        }
    }
    
    /**
     * 创建测试文件
     */
    private static void createTestFile(String path) {
        try (FileWriter writer = new FileWriter(path)) {
            writer.write("这是一个测试文件\n");
            writer.write("用于演示文件上传\n");
            writer.write("包含多行内容\n");
        } catch (IOException e) {
            System.out.println("创建测试文件失败: " + e.getMessage());
        }
    }
} 