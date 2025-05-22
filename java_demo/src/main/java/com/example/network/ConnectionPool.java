package com.example.network;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

/**
 * Socket连接池示例
 * 功能：实现一个简单的Socket连接池，用于管理和复用Socket连接
 * 特点：
 * 1. 使用BlockingQueue管理连接
 * 2. 支持连接的获取和释放
 * 3. 实现了连接的重用
 * 4. 包含基本的连接管理功能
 */
public class ConnectionPool {
    // 连接池最大容量
    private static final int MAX_POOL_SIZE = 10;
    // 连接超时时间（毫秒）
    private static final int TIMEOUT = 5000;
    
    // 使用阻塞队列存储Socket连接
    private final BlockingQueue<Socket> pool;
    
    public ConnectionPool() {
        pool = new ArrayBlockingQueue<>(MAX_POOL_SIZE);
    }
    
    /**
     * 获取一个Socket连接
     * @param host 目标主机
     * @param port 目标端口
     * @return Socket连接
     * @throws IOException 如果连接失败
     */
    public Socket getConnection(String host, int port) throws IOException {
        // 尝试从池中获取连接
        Socket socket = pool.poll();
        // 如果池中没有可用连接或连接已关闭，创建新连接
        if (socket == null || socket.isClosed()) {
            socket = new Socket();
            socket.connect(new InetSocketAddress(host, port), TIMEOUT);
        }
        return socket;
    }
    
    /**
     * 释放Socket连接回连接池
     * @param socket 要释放的Socket连接
     */
    public void releaseConnection(Socket socket) {
        if (socket != null && !socket.isClosed()) {
            pool.offer(socket);
        }
    }
    
    /**
     * 关闭连接池中的所有连接
     */
    public void closeAll() {
        Socket socket;
        while ((socket = pool.poll()) != null) {
            try {
                socket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}