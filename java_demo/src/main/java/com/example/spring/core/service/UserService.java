package com.example.spring.core.service;

/**
 * 用户服务接口
 */
public interface UserService {
    /**
     * 获取用户信息
     * @param userId 用户ID
     * @return 用户信息
     */
    String getUserInfo(String userId);
    
    /**
     * 创建用户
     * @param userInfo 用户信息
     * @return 是否创建成功
     */
    boolean createUser(String userInfo);
} 