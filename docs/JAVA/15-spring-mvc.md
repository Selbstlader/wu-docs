# Spring MVC

## 1. Spring MVC 概述

### 1.1 什么是 Spring MVC
Spring MVC 是 Spring 框架的一个模块，用于构建 Web 应用程序。它实现了 MVC（Model-View-Controller）设计模式，提供了构建灵活、松耦合的 Web 应用程序的框架。

### 1.2 MVC 模式
- **Model（模型）**：应用程序的数据和业务逻辑
- **View（视图）**：用户界面，展示数据
- **Controller（控制器）**：处理用户请求，协调模型和视图

### 1.3 Spring MVC 的特点
1. **松耦合**：各个组件之间松耦合，便于维护和扩展
2. **灵活性**：支持多种视图技术（JSP、Thymeleaf、FreeMarker等）
3. **可扩展性**：易于集成其他 Spring 模块
4. **强大的数据绑定**：支持复杂对象的数据绑定
5. **REST 支持**：原生支持 RESTful Web 服务

## 2. Spring MVC 核心组件

### 2.1 DispatcherServlet
前端控制器，负责接收所有请求并分发到相应的处理器。

### 2.2 HandlerMapping
处理器映射，将请求映射到处理器。

### 2.3 HandlerAdapter
处理器适配器，调用处理器的方法。

### 2.4 ViewResolver
视图解析器，将逻辑视图名解析为实际的视图对象。

### 2.5 HandlerInterceptor
处理器拦截器，用于拦截请求进行预处理和后处理。

## 3. Spring MVC 工作流程

1. **请求进入**：客户端发送请求到 DispatcherServlet
2. **请求分发**：DispatcherServlet 查询 HandlerMapping 找到对应的 Handler
3. **处理器执行**：HandlerAdapter 调用 Handler 处理请求
4. **返回 ModelAndView**：Handler 处理完成后返回 ModelAndView
5. **视图解析**：ViewResolver 解析视图名得到实际的视图对象
6. **视图渲染**：视图对象渲染数据并返回给客户端

## 4. Spring MVC 配置

### 4.1 基本配置
```java
@Configuration
@EnableWebMvc
@ComponentScan("com.example.controller")
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        registry.jsp("/WEB-INF/views/", ".jsp");
    }
}
```

### 4.2 控制器配置
```java
@Controller
@RequestMapping("/user")
public class UserController {
    @GetMapping("/{id}")
    public String getUser(@PathVariable Long id, Model model) {
        User user = userService.getUser(id);
        model.addAttribute("user", user);
        return "user/detail";
    }
}
```

### 4.3 视图配置
```java
@Configuration
public class ViewConfig {
    @Bean
    public ViewResolver viewResolver() {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setPrefix("/WEB-INF/views/");
        resolver.setSuffix(".jsp");
        return resolver;
    }
}
```

## 5. 常用注解

### 5.1 控制器注解
```java
@Controller          // 标识这是一个控制器
@RequestMapping      // 映射请求路径
@GetMapping         // 映射GET请求
@PostMapping        // 映射POST请求
@PutMapping         // 映射PUT请求
@DeleteMapping      // 映射DELETE请求
@PatchMapping       // 映射PATCH请求
```

### 5.2 参数注解
```java
@PathVariable       // 获取路径变量
@RequestParam       // 获取请求参数
@RequestBody        // 获取请求体
@RequestHeader      // 获取请求头
@CookieValue        // 获取Cookie值
@ModelAttribute     // 绑定请求参数到模型对象
```

### 5.3 响应注解
```java
@ResponseBody       // 将返回值序列化为JSON/XML
@ResponseStatus     // 设置响应状态码
```

## 6. 数据绑定和验证

### 6.1 数据绑定
```java
@PostMapping("/user")
public String createUser(@ModelAttribute User user) {
    userService.save(user);
    return "redirect:/user/list";
}
```

### 6.2 数据验证
```java
@PostMapping("/user")
public String createUser(@Valid @ModelAttribute User user, 
                        BindingResult result) {
    if (result.hasErrors()) {
        return "user/form";
    }
    userService.save(user);
    return "redirect:/user/list";
}
```

## 7. 文件上传

### 7.1 配置文件上传
```java
@Configuration
public class FileUploadConfig {
    @Bean
    public MultipartResolver multipartResolver() {
        CommonsMultipartResolver resolver = new CommonsMultipartResolver();
        resolver.setMaxUploadSize(10485760); // 10MB
        return resolver;
    }
}
```

### 7.2 处理文件上传
```java
@PostMapping("/upload")
public String handleFileUpload(@RequestParam("file") MultipartFile file) {
    if (!file.isEmpty()) {
        // 处理文件上传
        return "upload/success";
    }
    return "upload/error";
}
```

## 8. 异常处理

### 8.1 全局异常处理
```java
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ModelAndView handleException(Exception e) {
        ModelAndView mav = new ModelAndView("error");
        mav.addObject("message", e.getMessage());
        return mav;
    }
}
```

### 8.2 特定异常处理
```java
@ExceptionHandler(UserNotFoundException.class)
public ModelAndView handleUserNotFound(UserNotFoundException e) {
    ModelAndView mav = new ModelAndView("error/user-not-found");
    mav.addObject("userId", e.getUserId());
    return mav;
}
```

## 9. RESTful Web 服务

### 9.1 REST 控制器
```java
@RestController
@RequestMapping("/api/users")
public class UserRestController {
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }
    
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.save(user);
    }
}
```

### 9.2 响应状态
```java
@GetMapping("/{id}")
public ResponseEntity<User> getUser(@PathVariable Long id) {
    User user = userService.getUser(id);
    if (user == null) {
        return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(user);
}
```

## 10. 最佳实践

### 10.1 控制器设计
1. **单一职责**：每个控制器只负责一个功能模块
2. **URL 设计**：使用 RESTful 风格的 URL
3. **参数验证**：及时验证请求参数
4. **异常处理**：统一处理异常
5. **响应封装**：统一响应格式

### 10.2 性能优化
1. **缓存使用**：合理使用缓存
2. **异步处理**：使用异步处理耗时操作
3. **静态资源**：合理配置静态资源
4. **压缩传输**：启用响应压缩

### 10.3 安全考虑
1. **输入验证**：验证所有用户输入
2. **XSS 防护**：防止跨站脚本攻击
3. **CSRF 防护**：防止跨站请求伪造
4. **SQL 注入**：防止 SQL 注入攻击

## 11. 总结

Spring MVC 是一个功能强大的 Web 框架，它：
1. 实现了 MVC 设计模式
2. 提供了灵活的数据绑定
3. 支持多种视图技术
4. 易于集成其他 Spring 模块
5. 支持 RESTful Web 服务

通过合理使用 Spring MVC，我们可以：
1. 构建松耦合的 Web 应用
2. 提高代码的可维护性
3. 加快开发速度
4. 提供更好的用户体验 