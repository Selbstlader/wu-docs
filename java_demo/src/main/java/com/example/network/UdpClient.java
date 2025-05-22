package com.example.network;

import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.io.IOException;

/**
 * UDP客户端示例
 * 功能：创建一个UDP客户端，向服务器发送数据包并接收响应
 * 特点：
 * 1. 使用DatagramSocket进行UDP通信
 * 2. 无连接，面向数据包
 * 3. 简单的一次性请求-响应模式
 * 4. 不需要建立连接即可通信
 */
public class UdpClient {
    public static void main(String[] args) {
        try (DatagramSocket socket = new DatagramSocket()) {
            // 获取服务器地址
            InetAddress address = InetAddress.getByName("localhost");
            // 创建接收数据的缓冲区
            byte[] buffer = new byte[1024];
            
            // 准备发送的消息
            String message = "Hello, Server!";
            byte[] sendData = message.getBytes();
            // 创建发送数据包，指定目标地址和端口
            DatagramPacket sendPacket = new DatagramPacket(
                sendData, sendData.length, address, 8080);
            // 发送数据包
            socket.send(sendPacket);
            System.out.println("已发送消息: " + message);
            
            // 创建接收数据包
            DatagramPacket receivePacket = new DatagramPacket(buffer, buffer.length);
            // 接收服务器响应
            socket.receive(receivePacket);
            // 将接收到的数据转换为字符串
            String response = new String(receivePacket.getData(), 0, receivePacket.getLength());
            System.out.println("服务器响应: " + response);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
} 