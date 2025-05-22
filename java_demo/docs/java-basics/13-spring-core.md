# Spring Core 基础教程

## 1. Spring框架简介

Spring是一个轻量级的开源框架，用于构建企业级应用程序。它的核心特性包括：

- **IoC（控制反转）**：将对象的创建和管理交给Spring容器
- **DI（依赖注入）**：由Spring容器负责注入对象之间的依赖关系
- **AOP（面向切面编程）**：用于处理横切关注点
- **声明式事务**：简化事务管理

## 2. Spring Core核心概念

### 2.1 IoC（控制反转）

#### 传统方式
```java
// 传统方式：手动创建对象
HelloWorld helloWorld = new HelloWorld();
helloWorld.setMessage("你好");
```

#### Spring方式
```java
// Spring方式：由容器创建对象
ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
HelloWorld helloWorld = (HelloWorld) context.getBean("helloWorld");
```

**优点**：
- 降低代码耦合度
- 提高代码可维护性
- 便于单元测试
- 支持面向接口编程

### 2.2 DI（依赖注入）

Spring支持三种依赖注入方式：

#### 1. Setter注入
```xml
<bean id="helloWorld" class="com.example.spring.core.HelloWorld">
    <property name="message" value="你好，Spring！"/>
</bean>
```

#### 2. 构造器注入
```xml
<bean id="helloWorld" class="com.example.spring.core.HelloWorld">
    <constructor-arg name="message" value="你好，Spring！"/>
</bean>
```

#### 3. 注解注入
```java
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
}
```

### 2.3 Spring注解说明

#### 核心注解
1. **@Service**
   - 标识服务层组件
   - 用于业务逻辑类
   ```java
   @Service
   public class UserServiceImpl implements UserService {
       // 业务逻辑实现
   }
   ```

2. **@Component**
   - 通用组件注解
   - 用于任何Spring管理的组件
   ```java
   @Component
   public class UserValidator {
       // 验证逻辑
   }
   ```

3. **@Configuration**
   - 标识配置类
   - 用于Spring配置
   ```java
   @Configuration
   @ComponentScan("com.example.spring")
   public class AppConfig {
       // 配置方法
   }
   ```

4. **@Override**
   - 标识重写方法
   - 帮助编译器检查
   ```java
   @Override
   public String getUserInfo(String userId) {
       // 实现方法
   }
   ```

## 3. 项目分层示例

### 3.1 Model层（数据模型）
```java
public class User {
    private String id;
    private String name;
    private String email;

    // 无参构造方法
    public User() {
        System.out.println("User对象被创建");
    }

    // getter和setter方法
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    // ... 其他getter和setter
}
```

### 3.2 Service层（业务逻辑）
```java
// 接口
public interface UserService {
    boolean createUser(User user);
    User getUser(String userId);
    boolean updateUser(User user);
    boolean deleteUser(String userId);
}

// 实现类
@Service
public class UserServiceImpl implements UserService {
    private Map<String, User> userMap = new HashMap<>();

    @Override
    public boolean createUser(User user) {
        System.out.println("创建用户: " + user);
        userMap.put(user.getId(), user);
        return true;
    }
    // ... 其他方法实现
}
```

### 3.3 Config层（配置）
```java
@Configuration
@ComponentScan("com.example.spring.learn")
public class AppConfig {
    // 配置类可以包含@Bean方法
    // 这里使用组件扫描，所以不需要显式定义Bean
}
```

## 4. 完整示例

### 4.1 主程序
```java
public class SpringLearnDemo {
    public static void main(String[] args) {
        // 1. 创建Spring容器
        AnnotationConfigApplicationContext context = 
            new AnnotationConfigApplicationContext(AppConfig.class);

        // 2. 从容器中获取bean
        UserService userService = context.getBean(UserService.class);

        // 3. 使用bean
        User user = new User();
        user.setId("001");
        user.setName("张三");
        userService.createUser(user);

        // 4. 关闭容器
        context.close();
    }
}
```

## 5. 项目结构说明

```
src/main/java/com/example/spring/learn/
├── config/                 # 配置类
│   └── AppConfig.java     # Spring配置类
├── model/                 # 模型类
│   └── User.java         # 用户实体类
├── service/              # 服务层
│   ├── UserService.java  # 用户服务接口
│   └── impl/
│       └── UserServiceImpl.java  # 用户服务实现
└── SpringLearnDemo.java  # 主程序
```

### 5.1 各层职责

1. **Model层**
   - 定义数据结构
   - 不包含业务逻辑
   - 通常对应数据库表

2. **Service层**
   - 实现业务逻辑
   - 处理数据操作
   - 协调多个Model

3. **Config层**
   - 配置Spring容器
   - 管理Bean创建
   - 定义依赖关系

## 6. 最佳实践

1. **分层原则**
   - Model层保持简单
   - Service层处理业务
   - Config层集中配置

2. **注解使用**
   - 合理使用@Service
   - 正确使用@Override
   - 适当使用@Configuration

3. **依赖注入**
   - 优先使用构造器注入
   - 合理使用setter注入
   - 避免循环依赖

## 7. 常见问题

1. **Bean创建失败**
   - 检查注解是否正确
   - 检查包扫描路径
   - 检查依赖关系

2. **依赖注入失败**
   - 检查@Service注解
   - 检查接口实现
   - 检查包扫描范围

3. **配置问题**
   - 检查@Configuration
   - 检查@ComponentScan
   - 检查Bean定义

## 8. 进阶学习

1. **Spring AOP**
   - 切面编程
   - 事务管理
   - 日志处理

2. **Spring Boot**
   - 自动配置
   - 起步依赖
   - 外部配置

3. **Spring Data**
   - 数据访问
   - 仓库模式
   - 查询方法

## 9. 学习资源

1. **官方文档**
   - Spring Framework Documentation
   - Spring Boot Reference Guide

2. **推荐书籍**
   - Spring in Action
   - Spring Boot in Action

3. **在线资源**
   - Spring.io
   - Baeldung
   - InfoQ

## 10. 练习建议

1. **基础练习**
   - 创建简单的Bean
   - 使用不同的注入方式
   - 配置Bean的作用域

2. **进阶练习**
   - 实现接口编程
   - 使用AOP
   - 配置事务

3. **实战练习**
   - 构建小型应用
   - 集成数据库
   - 实现REST API 



   