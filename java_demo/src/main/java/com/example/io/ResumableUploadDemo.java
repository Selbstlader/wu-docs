package com.example.io;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.atomic.AtomicLong;

/**
 * 断点续传文件上传示例
 */
public class ResumableUploadDemo {
    // 记录上传进度的文件
    private static final String PROGRESS_FILE = "upload_progress.txt";
    // 缓冲区大小
    private static final int BUFFER_SIZE = 8192;
    
    public static void main(String[] args) {
        String sourcePath = "large_file.txt";
        String targetPath = "uploaded_file.txt";
        
        // 创建测试文件
        createLargeTestFile(sourcePath);
        
        // 模拟断点续传
        try {
            // 第一次上传（模拟中断）
            System.out.println("=== 第一次上传（模拟中断）===");
            uploadWithResume(sourcePath, targetPath, true);
            
            // 第二次上传（继续上传）
            System.out.println("\n=== 第二次上传（继续上传）===");
            uploadWithResume(sourcePath, targetPath, false);
            
            // 清理进度文件
            Files.deleteIfExists(Paths.get(PROGRESS_FILE));
        } catch (IOException e) {
            System.out.println("上传过程出错: " + e.getMessage());
        }
    }
    
    /**
     * 支持断点续传的文件上传
     */
    private static void uploadWithResume(String sourcePath, String targetPath, boolean simulateInterrupt) {
        try {
            // 获取文件总大小
            long fileSize = Files.size(Paths.get(sourcePath));
            // 获取已上传的大小
            long uploadedSize = getUploadedSize();
            
            System.out.println("文件总大小: " + fileSize + " 字节");
            System.out.println("已上传大小: " + uploadedSize + " 字节");
            
            // 如果已经上传完成，直接返回
            if (uploadedSize >= fileSize) {
                System.out.println("文件已上传完成");
                return;
            }
            
            try (RandomAccessFile sourceFile = new RandomAccessFile(sourcePath, "r");
                 RandomAccessFile targetFile = new RandomAccessFile(targetPath, "rw")) {
                
                // 设置文件指针到已上传位置
                sourceFile.seek(uploadedSize);
                targetFile.seek(uploadedSize);
                
                byte[] buffer = new byte[BUFFER_SIZE];
                int length;
                AtomicLong currentProgress = new AtomicLong(uploadedSize);
                
                // 读取并写入数据
                while ((length = sourceFile.read(buffer)) != -1) {
                    targetFile.write(buffer, 0, length);
                    
                    // 更新进度
                    currentProgress.addAndGet(length);
                    saveProgress(currentProgress.get());
                    
                    // 模拟中断
                    if (simulateInterrupt && currentProgress.get() > fileSize / 2) {
                        System.out.println("模拟上传中断...");
                        break;
                    }
                    
                    // 显示进度
                    double progress = (double) currentProgress.get() / fileSize * 100;
                    System.out.printf("上传进度: %.2f%%\n", progress);
                }
            }
            
            System.out.println("上传完成");
        } catch (IOException e) {
            System.out.println("上传失败: " + e.getMessage());
        }
    }
    
    /**
     * 获取已上传的大小
     */
    private static long getUploadedSize() {
        try {
            Path progressPath = Paths.get(PROGRESS_FILE);
            if (Files.exists(progressPath)) {
                String progress = Files.readString(progressPath).trim();
                return Long.parseLong(progress);
            }
        } catch (IOException | NumberFormatException e) {
            System.out.println("读取进度文件失败: " + e.getMessage());
        }
        return 0;
    }
    
    /**
     * 保存上传进度
     */
    private static void saveProgress(long progress) {
        try {
            Files.writeString(Paths.get(PROGRESS_FILE), String.valueOf(progress));
        } catch (IOException e) {
            System.out.println("保存进度失败: " + e.getMessage());
        }
    }
    
    /**
     * 创建测试大文件
     */
    private static void createLargeTestFile(String path) {
        try (FileWriter writer = new FileWriter(path)) {
            // 写入1MB的测试数据
            for (int i = 0; i < 1024 * 1024; i++) {
                writer.write("测试数据" + i + "\n");
            }
        } catch (IOException e) {
            System.out.println("创建测试文件失败: " + e.getMessage());
        }
    }
} 