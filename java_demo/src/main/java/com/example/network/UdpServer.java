package com.example.network;

import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.io.IOException;

/**
 * UDP服务器示例
 * 功能：创建一个UDP服务器，接收客户端发送的数据包并响应
 * 特点：
 * 1. 使用DatagramSocket进行UDP通信
 * 2. 无连接，面向数据包
 * 3. 支持多个客户端同时通信
 * 4. 实现了简单的请求-响应模式
 */
public class UdpServer {
    public static void main(String[] args) {
        try (DatagramSocket socket = new DatagramSocket(8080)) {
            System.out.println("UDP服务器启动，等待数据...");
            // 创建接收数据的缓冲区
            byte[] buffer = new byte[1024];
            // 创建数据包对象
            DatagramPacket packet = new DatagramPacket(buffer, buffer.length);
            
            while (true) {
                // 接收数据包
                socket.receive(packet);
                // 将接收到的数据转换为字符串
                String message = new String(packet.getData(), 0, packet.getLength());
                System.out.println("收到消息: " + message);
                
                // 准备响应数据
                String response = "服务器已收到: " + message;
                byte[] responseData = response.getBytes();
                // 创建响应数据包，指定目标地址和端口
                DatagramPacket responsePacket = new DatagramPacket(
                    responseData, responseData.length,
                    packet.getAddress(), packet.getPort());
                // 发送响应
                socket.send(responsePacket);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
} 