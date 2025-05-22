package com.example.spring.learn.service;

import com.example.spring.learn.model.User;

/**
 * 用户服务接口
 * 演示面向接口编程
 */
public interface UserService {
    /**
     * 创建用户
     * @param user 用户信息
     * @return 是否创建成功
     */
    boolean createUser(User user);

    /**
     * 获取用户信息
     * @param userId 用户ID
     * @return 用户信息
     */
    User getUser(String userId);

    /**
     * 更新用户信息
     * @param user 用户信息
     * @return 是否更新成功
     */
    boolean updateUser(User user);

    /**
     * 删除用户
     * @param userId 用户ID
     * @return 是否删除成功
     */
    boolean deleteUser(String userId);
} 