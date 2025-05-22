# Spring学习示例项目

## 项目说明
这是一个Spring框架学习示例项目，通过一个简单的用户管理系统来演示Spring的核心概念。

## 项目结构
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

## 核心概念演示
1. 依赖注入（DI）
2. 控制反转（IoC）
3. 面向接口编程
4. 注解使用
5. Bean的生命周期

## 运行方式
1. 确保已安装Java 20和Maven
2. 在项目根目录执行：`mvn clean package`
3. 运行：`java -jar target/spring-learn-demo.jar`

## 环境要求

- JDK 17 或更高版本
- Maven 3.6 或更高版本
- IDE（推荐使用 IntelliJ IDEA）

## 项目结构

```
src/
  ├── main/
  │   └── java/
  │       └── com/
  │           └── example/
  │               ├── basics/        # Java 基础语法示例
  │               ├── oop/           # 面向对象编程示例
  │               ├── collections/   # 集合框架示例
  │               ├── io/            # 输入输出示例
  │               ├── exceptions/    # 异常处理示例
  │               └── utils/         # 工具类
  └── test/
      └── java/                     # 单元测试
```

## 如何运行

1. 克隆项目到本地
2. 使用 IDE 打开项目
3. 等待 Maven 下载依赖
4. 运行 `HelloWorld.java` 查看第一个示例

## 学习路径

1. 从 `basics` 包开始，学习 Java 基础语法
2. 然后学习 `oop` 包中的面向对象编程概念
3. 继续学习其他包中的进阶主题

## 注意事项

- 每个示例都包含详细的注释
- 建议按照包名的顺序学习
- 动手实践每个示例
- 尝试修改代码并观察结果

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个学习项目。

## 许可证

MIT License 