package com.example.network;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * TCP服务器示例
 * 功能：创建一个TCP服务器，监听指定端口，接收客户端连接并处理消息
 * 特点：
 * 1. 使用ServerSocket监听端口
 * 2. 支持多客户端并发连接（每个客户端一个线程）
 * 3. 实现了简单的请求-响应模式
 */
public class TcpServer {
    public static void main(String[] args) {
        try (ServerSocket serverSocket = new ServerSocket(8080)) {
            System.out.println("服务器启动，等待连接...");
            
            while (true) {
                // 接受客户端连接
                Socket clientSocket = serverSocket.accept();
                // 为每个客户端创建一个新线程处理请求
                new Thread(() -> {
                    try {
                        // 获取输入流，用于读取客户端发送的消息
                        BufferedReader in = new BufferedReader(
                            new InputStreamReader(clientSocket.getInputStream()));
                        // 获取输出流，用于向客户端发送响应
                        PrintWriter out = new PrintWriter(
                            clientSocket.getOutputStream(), true);
                        
                        String message;
                        // 循环读取客户端消息
                        while ((message = in.readLine()) != null) {
                            System.out.println("收到消息: " + message);
                            // 发送响应消息
                            out.println("服务器已收到: " + message);
                        }
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }).start();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
} 