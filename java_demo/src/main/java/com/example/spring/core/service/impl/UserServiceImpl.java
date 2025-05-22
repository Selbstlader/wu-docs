package com.example.spring.core.service.impl;

import com.example.spring.core.service.UserService;
import org.springframework.stereotype.Service;

/**
 * 用户服务实现类
 */
@Service
public class UserServiceImpl implements UserService {
    
    @Override
    public String getUserInfo(String userId) {
        System.out.println("获取用户信息: " + userId);
        return "用户信息: " + userId;
    }
    
    @Override
    public boolean createUser(String userInfo) {
        System.out.println("创建用户: " + userInfo);
        return true;
    }
} 