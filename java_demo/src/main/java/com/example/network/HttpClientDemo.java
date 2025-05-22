package com.example.network;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * HTTP客户端示例
 * 功能：创建一个HTTP客户端，发送GET请求并处理响应
 * 特点：
 * 1. 使用HttpURLConnection进行HTTP通信
 * 2. 支持设置请求方法和请求头
 * 3. 可以读取响应状态码和响应内容
 * 4. 实现了基本的HTTP请求-响应模式
 */
public class HttpClientDemo {
    public static void main(String[] args) {
        try {
            // 创建URL对象，指定目标网址
            URL url = new URL("http://example.com");
            
            // 打开HTTP连接
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            
            // 设置请求方法为GET
            connection.setRequestMethod("GET");
            
            // 设置请求头，模拟浏览器访问
            connection.setRequestProperty("User-Agent", "Java Client");
            
            // 获取响应状态码
            int responseCode = connection.getResponseCode();
            System.out.println("响应码: " + responseCode);
            
            // 读取响应内容
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(connection.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    System.out.println(line);
                }
            }
            
            // 关闭连接
            connection.disconnect();
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
} 