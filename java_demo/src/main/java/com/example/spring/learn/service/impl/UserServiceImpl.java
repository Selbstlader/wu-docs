package com.example.spring.learn.service.impl;

import com.example.spring.learn.model.User;
import com.example.spring.learn.service.UserService;
import org.springframework.stereotype.Service;

/**
 * 用户服务实现类
 * 演示@Service注解和依赖注入
 */
@Service
public class UserServiceImpl implements UserService {
    
    // 模拟数据库存储
    private java.util.Map<String, User> userMap = new java.util.HashMap<>();

    @Override
    public boolean createUser(User user) {
        System.out.println("创建用户: " + user);
        userMap.put(user.getId(), user);
        return true;
    }

    @Override
    public User getUser(String userId) {
        System.out.println("获取用户: " + userId);
        return userMap.get(userId);
    }

    @Override
    public boolean updateUser(User user) {
        System.out.println("更新用户: " + user);
        if (userMap.containsKey(user.getId())) {
            userMap.put(user.getId(), user);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteUser(String userId) {
        System.out.println("删除用户: " + userId);
        return userMap.remove(userId) != null;
    }
} 