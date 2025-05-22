package com.example.exception;

import java.net.HttpURLConnection;
import java.net.URL;
import java.net.UnknownHostException;
import java.io.IOException;

/**
 * 网络请求异常处理示例
 * 展示网络请求过程中的异常处理
 */
public class NetworkExceptionDemo {
    public static void main(String[] args) {
        // 1. 基本网络请求异常处理
        System.out.println("=== 基本网络请求异常处理 ===");
        try {
            makeRequest("https://api.example.com/data");
        } catch (UnknownHostException e) {
            System.out.println("无法解析主机名: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("网络请求错误: " + e.getMessage());
        } catch (HttpException e) {
            System.out.println("HTTP错误: " + e.getMessage());
        }

        // 2. 自定义网络异常
        System.out.println("\n=== 自定义网络异常 ===");
        try {
            validateResponse(404);
        } catch (HttpException e) {
            System.out.println("HTTP错误: " + e.getMessage());
        }
    }

    // 发送网络请求
    public static void makeRequest(String urlString) throws IOException, HttpException {
        URL url = new URL(urlString);
        HttpURLConnection connection = null;
        try {
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            
            int responseCode = connection.getResponseCode();
            if (responseCode != 200) {
                throw new HttpException("HTTP错误: " + responseCode);
            }
            
            System.out.println("请求成功");
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
    }

    // 验证响应状态
    public static void validateResponse(int statusCode) throws HttpException {
        if (statusCode >= 400) {
            throw new HttpException("请求失败，状态码: " + statusCode);
        }
    }
}

// 自定义HTTP异常
class HttpException extends Exception {
    public HttpException(String message) {
        super(message);
    }
} 