# Java反射机制使用场景详解

## 一、框架开发场景

### 1. Spring框架中的依赖注入
```java
// 1. 通过注解标记需要注入的字段
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    public User findUser(Long id) {
        return userRepository.findById(id);
    }
}

// 2. Spring容器通过反射实现依赖注入
public class SpringContainer {
    public void injectDependencies(Object target) throws Exception {
        Class<?> clazz = target.getClass();
        Field[] fields = clazz.getDeclaredFields();
        
        for (Field field : fields) {
            if (field.isAnnotationPresent(Autowired.class)) {
                field.setAccessible(true);
                // 获取字段类型
                Class<?> fieldType = field.getType();
                // 创建依赖对象
                Object dependency = fieldType.newInstance();
                // 注入依赖
                field.set(target, dependency);
            }
        }
    }
}
```

### 2. MyBatis中的ORM映射
```java
// 1. 定义实体类
public class User {
    private Long id;
    private String name;
    private String email;
    // getter和setter方法
}

// 2. 通过反射实现结果集映射
public class ResultSetMapper {
    public <T> T mapResultSet(ResultSet rs, Class<T> clazz) throws Exception {
        T obj = clazz.newInstance();
        ResultSetMetaData metaData = rs.getMetaData();
        int columnCount = metaData.getColumnCount();
        
        for (int i = 1; i <= columnCount; i++) {
            String columnName = metaData.getColumnName(i);
            Field field = clazz.getDeclaredField(columnName);
            field.setAccessible(true);
            
            // 根据字段类型设置值
            if (field.getType() == Long.class) {
                field.set(obj, rs.getLong(columnName));
            } else if (field.getType() == String.class) {
                field.set(obj, rs.getString(columnName));
            }
            // 其他类型的处理...
        }
        return obj;
    }
}
```

## 二、配置文件解析场景

### 1. 属性文件解析
```java
// 1. 配置文件内容
// config.properties
// className=com.example.User
// methodName=getName

// 2. 通过反射动态调用方法
public class ConfigParser {
    public Object executeMethodFromConfig() throws Exception {
        Properties props = new Properties();
        props.load(new FileInputStream("config.properties"));
        
        // 获取类名和方法名
        String className = props.getProperty("className");
        String methodName = props.getProperty("methodName");
        
        // 创建对象并调用方法
        Class<?> clazz = Class.forName(className);
        Object obj = clazz.newInstance();
        Method method = clazz.getDeclaredMethod(methodName);
        return method.invoke(obj);
    }
}
```

### 2. XML配置文件解析
```java
// 1. XML配置文件
// <bean id="userService" class="com.example.UserService">
//     <property name="userRepository" ref="userRepository"/>
// </bean>

// 2. 解析XML并创建对象
public class XmlBeanFactory {
    public Object getBean(String beanId) throws Exception {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        Document document = builder.parse("beans.xml");
        
        NodeList beans = document.getElementsByTagName("bean");
        for (int i = 0; i < beans.getLength(); i++) {
            Element bean = (Element) beans.item(i);
            if (beanId.equals(bean.getAttribute("id"))) {
                String className = bean.getAttribute("class");
                return Class.forName(className).newInstance();
            }
        }
        return null;
    }
}
```

## 三、动态代理场景

### 1. 方法调用日志记录
```java
// 1. 定义接口
public interface UserService {
    User findUser(Long id);
    void saveUser(User user);
}

// 2. 实现类
public class UserServiceImpl implements UserService {
    @Override
    public User findUser(Long id) {
        // 实现查找用户逻辑
        return new User();
    }
    
    @Override
    public void saveUser(User user) {
        // 实现保存用户逻辑
    }
}

// 3. 动态代理实现
public class LoggingProxy implements InvocationHandler {
    private Object target;
    
    public LoggingProxy(Object target) {
        this.target = target;
    }
    
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) 
        throws Throwable {
        System.out.println("开始执行方法: " + method.getName());
        long startTime = System.currentTimeMillis();
        
        Object result = method.invoke(target, args);
        
        long endTime = System.currentTimeMillis();
        System.out.println("方法执行完成，耗时: " + (endTime - startTime) + "ms");
        return result;
    }
    
    public static Object createProxy(Object target) {
        return Proxy.newProxyInstance(
            target.getClass().getClassLoader(),
            target.getClass().getInterfaces(),
            new LoggingProxy(target)
        );
    }
}
```

### 2. 事务管理
```java
// 1. 事务注解
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Transactional {
}

// 2. 事务代理
public class TransactionProxy implements InvocationHandler {
    private Object target;
    
    public TransactionProxy(Object target) {
        this.target = target;
    }
    
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) 
        throws Throwable {
        if (method.isAnnotationPresent(Transactional.class)) {
            try {
                // 开启事务
                beginTransaction();
                Object result = method.invoke(target, args);
                // 提交事务
                commitTransaction();
                return result;
            } catch (Exception e) {
                // 回滚事务
                rollbackTransaction();
                throw e;
            }
        }
        return method.invoke(target, args);
    }
}
```

## 四、单元测试场景

### 1. 测试私有方法
```java
// 1. 被测试类
public class Calculator {
    private int add(int a, int b) {
        return a + b;
    }
}

// 2. 测试类
public class CalculatorTest {
    @Test
    public void testPrivateMethod() throws Exception {
        Calculator calculator = new Calculator();
        Method method = Calculator.class.getDeclaredMethod("add", int.class, int.class);
        method.setAccessible(true);
        
        int result = (int) method.invoke(calculator, 2, 3);
        assertEquals(5, result);
    }
}
```

### 2. 模拟对象
```java
// 1. 创建模拟对象
public class MockObject {
    public static <T> T createMock(Class<T> clazz) throws Exception {
        return (T) Proxy.newProxyInstance(
            clazz.getClassLoader(),
            new Class<?>[]{clazz},
            new InvocationHandler() {
                @Override
                public Object invoke(Object proxy, Method method, Object[] args) 
                    throws Throwable {
                    // 返回模拟数据
                    return "Mocked " + method.getName();
                }
            }
        );
    }
}

// 2. 使用模拟对象
public class UserServiceTest {
    @Test
    public void testWithMock() throws Exception {
        UserRepository mockRepo = MockObject.createMock(UserRepository.class);
        UserService service = new UserService(mockRepo);
        // 进行测试...
    }
}
```

## 五、通用工具类场景

### 1. 对象属性复制
```java
public class BeanUtils {
    public static void copyProperties(Object source, Object target) 
        throws Exception {
        Class<?> sourceClass = source.getClass();
        Class<?> targetClass = target.getClass();
        
        Field[] sourceFields = sourceClass.getDeclaredFields();
        for (Field sourceField : sourceFields) {
            sourceField.setAccessible(true);
            String fieldName = sourceField.getName();
            
            try {
                Field targetField = targetClass.getDeclaredField(fieldName);
                targetField.setAccessible(true);
                targetField.set(target, sourceField.get(source));
            } catch (NoSuchFieldException e) {
                // 目标对象没有该字段，忽略
            }
        }
    }
}
```

### 2. 对象序列化
```java
public class JsonSerializer {
    public static String toJson(Object obj) throws Exception {
        StringBuilder json = new StringBuilder();
        Class<?> clazz = obj.getClass();
        json.append("{");
        
        Field[] fields = clazz.getDeclaredFields();
        for (int i = 0; i < fields.length; i++) {
            Field field = fields[i];
            field.setAccessible(true);
            
            json.append("\"").append(field.getName()).append("\":");
            Object value = field.get(obj);
            
            if (value instanceof String) {
                json.append("\"").append(value).append("\"");
            } else {
                json.append(value);
            }
            
            if (i < fields.length - 1) {
                json.append(",");
            }
        }
        json.append("}");
        return json.toString();
    }
}
```

## 六、插件系统场景

### 1. 动态加载插件
```java
public class PluginManager {
    private Map<String, Plugin> plugins = new HashMap<>();
    
    public void loadPlugin(String pluginPath) throws Exception {
        File pluginDir = new File(pluginPath);
        for (File file : pluginDir.listFiles()) {
            if (file.getName().endsWith(".jar")) {
                URLClassLoader loader = new URLClassLoader(
                    new URL[]{file.toURI().toURL()}
                );
                
                // 加载插件类
                Class<?> pluginClass = loader.loadClass("com.example.Plugin");
                Plugin plugin = (Plugin) pluginClass.newInstance();
                
                // 注册插件
                plugins.put(plugin.getName(), plugin);
            }
        }
    }
    
    public void executePlugin(String pluginName) {
        Plugin plugin = plugins.get(pluginName);
        if (plugin != null) {
            plugin.execute();
        }
    }
}
```

### 2. 热插拔功能
```java
public class HotSwapManager {
    private Map<String, Object> instances = new HashMap<>();
    
    public void reloadClass(String className) throws Exception {
        // 获取类加载器
        ClassLoader loader = new URLClassLoader(
            new URL[]{new File("classes").toURI().toURL()}
        );
        
        // 加载新类
        Class<?> newClass = loader.loadClass(className);
        
        // 创建新实例
        Object newInstance = newClass.newInstance();
        
        // 更新实例
        instances.put(className, newInstance);
    }
    
    public Object getInstance(String className) {
        return instances.get(className);
    }
}
```

## 七、注意事项

1. **性能考虑**
   - 反射操作比直接调用慢
   - 避免在性能关键代码中使用
   - 考虑使用缓存机制

2. **安全考虑**
   - 注意访问权限控制
   - 防止非法访问
   - 保护敏感信息

3. **代码维护**
   - 添加详细注释
   - 做好异常处理
   - 保持代码简洁

4. **最佳实践**
   - 合理使用反射
   - 遵循设计原则
   - 考虑可维护性 