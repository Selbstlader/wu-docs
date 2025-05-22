package com.example.spring.aop.service.impl;

import com.example.spring.aop.model.User;
import com.example.spring.aop.service.UserService;
import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 用户服务实现类
 */
@Service
public class UserServiceImpl implements UserService {
    // 模拟数据库存储
    private final Map<String, User> userMap = new ConcurrentHashMap<>();
    
    @Override
    public boolean login(String username, String password) {
        // 模拟登录验证
        try {
            Thread.sleep(100); // 模拟网络延迟
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        User user = userMap.values().stream()
                .filter(u -> u.getUsername().equals(username))
                .findFirst()
                .orElse(null);
                
        if (user != null && user.getPassword().equals(password)) {
            user.setLastLoginTime(new java.util.Date());
            user.setLoginCount(user.getLoginCount() + 1);
            return true;
        }
        return false;
    }
    
    @Override
    public User register(String username, String password) {
        // 模拟注册过程
        try {
            Thread.sleep(200); // 模拟网络延迟
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        User user = new User(String.valueOf(System.currentTimeMillis()), username, password);
        userMap.put(user.getId(), user);
        return user;
    }
    
    @Override
    public boolean updateUser(User user) {
        // 模拟更新用户信息
        try {
            Thread.sleep(150); // 模拟网络延迟
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        if (userMap.containsKey(user.getId())) {
            userMap.put(user.getId(), user);
            return true;
        }
        return false;
    }
    
    @Override
    public boolean deleteUser(String userId) {
        // 模拟删除用户
        try {
            Thread.sleep(100); // 模拟网络延迟
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        return userMap.remove(userId) != null;
    }
} 