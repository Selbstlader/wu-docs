package com.example.network;

import java.io.*;
import java.net.Socket;
import java.net.ConnectException;

/**
 * TCP客户端示例
 * 功能：创建一个TCP客户端，连接到服务器并发送消息
 * 特点：
 * 1. 使用Socket连接到服务器
 * 2. 支持用户输入消息
 * 3. 实现了自动重连机制
 * 4. 包含完整的错误处理
 */
public class TcpClient {
    // 最大重试次数
    private static final int MAX_RETRIES = 3;
    // 重试间隔时间（毫秒）
    private static final int RETRY_DELAY = 2000; // 2秒

    public static void main(String[] args) {
        int retryCount = 0;
        
        while (retryCount < MAX_RETRIES) {
            try (Socket socket = new Socket("localhost", 8080);
                 // 创建输出流，用于发送消息到服务器
                 PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
                 // 创建输入流，用于接收服务器响应
                 BufferedReader in = new BufferedReader(
                     new InputStreamReader(socket.getInputStream()));
                 // 创建标准输入流，用于读取用户输入
                 BufferedReader stdIn = new BufferedReader(
                     new InputStreamReader(System.in))) {
                
                System.out.println("已连接到服务器，请输入消息：");
                String userInput;
                // 循环读取用户输入并发送到服务器
                while ((userInput = stdIn.readLine()) != null) {
                    // 发送消息到服务器
                    out.println(userInput);
                    // 接收服务器响应
                    String response = in.readLine();
                    System.out.println("服务器响应: " + response);
                }
                break; // 如果成功连接，跳出重试循环
                
            } catch (ConnectException e) {
                retryCount++;
                if (retryCount < MAX_RETRIES) {
                    System.out.println("连接服务器失败，正在重试... (第" + retryCount + "次)");
                    try {
                        Thread.sleep(RETRY_DELAY);
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        break;
                    }
                } else {
                    System.out.println("无法连接到服务器，请确保：");
                    System.out.println("1. 服务器程序已启动");
                    System.out.println("2. 服务器端口(8080)未被占用");
                    System.out.println("3. 防火墙未阻止连接");
                    e.printStackTrace();
                }
            } catch (IOException e) {
                System.out.println("发生IO错误：");
                e.printStackTrace();
                break;
            }
        }
    }
} 