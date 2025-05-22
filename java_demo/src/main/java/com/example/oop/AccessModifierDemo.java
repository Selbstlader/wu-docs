package com.example.oop;

/**
 * 访问修饰符使用示例
 * 展示不同访问修饰符的实际应用场景
 */
public class AccessModifierDemo {
    public static void main(String[] args) {
        // 创建用户服务对象
        UserService userService = new UserService();
        
        // 调用公共方法（API接口）
        userService.createUser("张三", "123456");
        
        // 创建用户DAO对象
        UserDAO userDAO = new UserDAO();
        // 无法直接访问私有方法
        // userDAO.validatePassword("123456"); // 编译错误
        
        // 创建自定义用户DAO
        CustomUserDAO customDAO = new CustomUserDAO();
        customDAO.createUser("李四", "654321");
    }
}

// 服务层 - 使用public方法提供API
class UserService {
    // 私有字段 - 封装实现细节
    private UserDAO userDAO;
    
    public UserService() {
        this.userDAO = new UserDAO();
    }
    
    // 公共方法 - 对外提供的API
    public void createUser(String username, String password) {
        // 调用私有方法进行业务处理
        validateUserData(username, password);
        userDAO.saveUser(username, password);
    }
    
    // 私有方法 - 内部实现细节
    private void validateUserData(String username, String password) {
        if (username == null || username.trim().isEmpty()) {
            throw new IllegalArgumentException("用户名不能为空");
        }
        if (password == null || password.length() < 6) {
            throw new IllegalArgumentException("密码长度不能小于6位");
        }
    }
}

// 数据访问层 - 使用protected方法提供扩展点
class UserDAO {
    // 私有字段
    private String connectionString;
    
    public UserDAO() {
        this.connectionString = "default_connection";
    }
    
    // 公共方法
    public void saveUser(String username, String password) {
        // 调用受保护的方法进行密码验证
        validatePassword(password);
        System.out.println("保存用户: " + username);
    }
    
    // 受保护的方法 - 允许子类重写
    protected void validatePassword(String password) {
        if (password.length() < 6) {
            throw new IllegalArgumentException("密码太短");
        }
    }
}

// 自定义DAO - 继承并重写protected方法
class CustomUserDAO extends UserDAO {
    // 重写父类的受保护方法
    @Override
    protected void validatePassword(String password) {
        // 自定义密码验证逻辑
        if (password.length() < 8) {
            throw new IllegalArgumentException("密码长度必须大于8位");
        }
    }
    
    // 公共方法
    public void createUser(String username, String password) {
        saveUser(username, password);
    }
} 