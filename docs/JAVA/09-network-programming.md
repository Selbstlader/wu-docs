 # Java网络编程详解

## 一、网络编程基础

### 1. 网络通信模型
- **OSI七层模型**：
  - 应用层
  - 表示层
  - 会话层
  - 传输层
  - 网络层
  - 数据链路层
  - 物理层

- **TCP/IP四层模型**：
  - 应用层
  - 传输层
  - 网络层
  - 网络接口层

### 2. 常用协议

### 1. TCP (传输控制协议)
- **特点**：
  - 面向连接：通信前需要建立连接
  - 可靠传输：保证数据不丢失、不重复、按序到达
  - 有流量控制：防止发送方发送过快
  - 有拥塞控制：防止网络过载
- **适用场景**：
  - 文件传输
  - 邮件发送
  - 网页浏览
  - 需要可靠传输的场景

### 2. UDP (用户数据报协议)
- **特点**：
  - 无连接：直接发送数据，不需要建立连接
  - 不可靠：不保证数据到达，可能丢失或乱序
  - 速度快：没有建立连接和确认的开销
  - 无流量控制
- **适用场景**：
  - 视频直播
  - 在线游戏
  - DNS查询
  - 实时性要求高的场景

### 3. HTTP (超文本传输协议)
- **特点**：
  - 应用层协议，基于TCP
  - 无状态：每次请求都是独立的
  - 请求-响应模式
  - 支持多种数据格式（HTML、JSON、XML等）
- **适用场景**：
  - Web应用
  - API接口
  - 网页浏览
  - 移动应用后端

### 4. Socket (套接字)
- **特点**：
  - 不是协议，而是编程接口
  - 可以基于TCP或UDP
  - 提供了网络通信的抽象层
  - 支持双向通信
- **适用场景**：
  - 自定义网络应用
  - 实时通信
  - 网络游戏
  - 需要底层网络控制的场景


## 二、Socket编程

### 1. TCP Socket
```java
// 服务器端
public class TcpServer {
    public static void main(String[] args) {
        try (ServerSocket serverSocket = new ServerSocket(8080)) {
            System.out.println("服务器启动，等待连接...");
            
            while (true) {
                Socket clientSocket = serverSocket.accept();
                new Thread(() -> {
                    try {
                        // 获取输入流
                        BufferedReader in = new BufferedReader(
                            new InputStreamReader(clientSocket.getInputStream()));
                        // 获取输出流
                        PrintWriter out = new PrintWriter(
                            clientSocket.getOutputStream(), true);
                        
                        String message;
                        while ((message = in.readLine()) != null) {
                            System.out.println("收到消息: " + message);
                            // 发送响应
                            out.println("服务器已收到: " + message);
                        }
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }).start();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

// 客户端
public class TcpClient {
    public static void main(String[] args) {
        try (Socket socket = new Socket("localhost", 8080);
             PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
             BufferedReader in = new BufferedReader(
                 new InputStreamReader(socket.getInputStream()));
             BufferedReader stdIn = new BufferedReader(
                 new InputStreamReader(System.in))) {
            
            String userInput;
            while ((userInput = stdIn.readLine()) != null) {
                // 发送消息
                out.println(userInput);
                // 接收响应
                String response = in.readLine();
                System.out.println("服务器响应: " + response);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### 2. UDP Socket
```java
// 服务器端
public class UdpServer {
    public static void main(String[] args) {
        try (DatagramSocket socket = new DatagramSocket(8080)) {
            byte[] buffer = new byte[1024];
            DatagramPacket packet = new DatagramPacket(buffer, buffer.length);
            
            while (true) {
                socket.receive(packet);
                String message = new String(packet.getData(), 0, packet.getLength());
                System.out.println("收到消息: " + message);
                
                // 发送响应
                String response = "服务器已收到: " + message;
                byte[] responseData = response.getBytes();
                DatagramPacket responsePacket = new DatagramPacket(
                    responseData, responseData.length,
                    packet.getAddress(), packet.getPort());
                socket.send(responsePacket);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

// 客户端
public class UdpClient {
    public static void main(String[] args) {
        try (DatagramSocket socket = new DatagramSocket()) {
            InetAddress address = InetAddress.getByName("localhost");
            byte[] buffer = new byte[1024];
            
            // 发送消息
            String message = "Hello, Server!";
            byte[] sendData = message.getBytes();
            DatagramPacket sendPacket = new DatagramPacket(
                sendData, sendData.length, address, 8080);
            socket.send(sendPacket);
            
            // 接收响应
            DatagramPacket receivePacket = new DatagramPacket(buffer, buffer.length);
            socket.receive(receivePacket);
            String response = new String(receivePacket.getData(), 0, receivePacket.getLength());
            System.out.println("服务器响应: " + response);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## 三、HTTP客户端

### 1. 使用HttpURLConnection
```java
public class HttpUrlConnectionDemo {
    public static void main(String[] args) {
        try {
            URL url = new URL("http://example.com");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            
            // 设置请求方法
            connection.setRequestMethod("GET");
            
            // 设置请求头
            connection.setRequestProperty("User-Agent", "Java Client");
            
            // 获取响应
            int responseCode = connection.getResponseCode();
            System.out.println("响应码: " + responseCode);
            
            // 读取响应内容
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(connection.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    System.out.println(line);
                }
            }
            
            connection.disconnect();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### 2. 使用HttpClient（Java 11+）
```java
public class HttpClientDemo {
    public static void main(String[] args) {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("http://example.com"))
            .header("User-Agent", "Java Client")
            .GET()
            .build();
        
        try {
            HttpResponse<String> response = client.send(request,
                HttpResponse.BodyHandlers.ofString());
            
            System.out.println("响应码: " + response.statusCode());
            System.out.println("响应内容: " + response.body());
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

## 四、WebSocket编程

### 1. 服务器端
```java
@ServerEndpoint("/websocket")
public class WebSocketServer {
    private static Set<Session> sessions = Collections.synchronizedSet(new HashSet<>());
    
    @OnOpen
    public void onOpen(Session session) {
        sessions.add(session);
        System.out.println("新连接: " + session.getId());
    }
    
    @OnMessage
    public void onMessage(String message, Session session) {
        System.out.println("收到消息: " + message);
        // 广播消息
        broadcast(message);
    }
    
    @OnClose
    public void onClose(Session session) {
        sessions.remove(session);
        System.out.println("连接关闭: " + session.getId());
    }
    
    @OnError
    public void onError(Throwable error) {
        error.printStackTrace();
    }
    
    private void broadcast(String message) {
        sessions.forEach(session -> {
            try {
                session.getBasicRemote().sendText(message);
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }
}
```

### 2. 客户端
```java
public class WebSocketClient {
    public static void main(String[] args) {
        try {
            WebSocketContainer container = ContainerProvider.getWebSocketContainer();
            String uri = "ws://localhost:8080/websocket";
            
            WebSocketClient client = new WebSocketClient();
            Session session = container.connectToServer(client, URI.create(uri));
            
            // 发送消息
            session.getBasicRemote().sendText("Hello, Server!");
            
            // 保持连接
            Thread.sleep(10000);
            
            session.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    @OnMessage
    public void onMessage(String message) {
        System.out.println("收到消息: " + message);
    }
}
```

## 五、网络编程最佳实践

### 1. 异常处理
```java
public class NetworkExceptionHandler {
    public static void handleException(Exception e) {
        if (e instanceof SocketTimeoutException) {
            System.out.println("连接超时");
        } else if (e instanceof ConnectException) {
            System.out.println("连接失败");
        } else if (e instanceof UnknownHostException) {
            System.out.println("未知主机");
        } else {
            System.out.println("其他错误: " + e.getMessage());
        }
    }
}
```

### 2. 连接池管理
```java
public class ConnectionPool {
    private static final int MAX_POOL_SIZE = 10;
    private static final int TIMEOUT = 5000;
    
    private final BlockingQueue<Socket> pool;
    
    public ConnectionPool() {
        pool = new ArrayBlockingQueue<>(MAX_POOL_SIZE);
    }
    
    public Socket getConnection(String host, int port) throws IOException {
        Socket socket = pool.poll();
        if (socket == null || socket.isClosed()) {
            socket = new Socket();
            socket.connect(new InetSocketAddress(host, port), TIMEOUT);
        }
        return socket;
    }
    
    public void releaseConnection(Socket socket) {
        if (socket != null && !socket.isClosed()) {
            pool.offer(socket);
        }
    }
}
```

### 3. 超时控制
```java
public class TimeoutSocket {
    public static Socket createSocket(String host, int port, int timeout) 
            throws IOException {
        Socket socket = new Socket();
        socket.connect(new InetSocketAddress(host, port), timeout);
        socket.setSoTimeout(timeout);
        return socket;
    }
}
```

## 六、注意事项

1. **安全性**
   - 使用HTTPS进行安全通信
   - 验证服务器证书
   - 加密敏感数据
   - 防止SQL注入

2. **性能优化**
   - 使用连接池
   - 设置合理的超时时间
   - 使用异步IO
   - 压缩传输数据

3. **错误处理**
   - 处理网络异常
   - 实现重试机制
   - 记录错误日志
   - 优雅降级

4. **资源管理**
   - 及时关闭连接
   - 释放系统资源
   - 监控连接状态
   - 定期清理过期连接

## 七、选择建议

1. **需要可靠传输时选择TCP**
   - 文件传输
   - 数据库操作
   - 需要保证数据完整性的场景

2. **需要实时性时选择UDP**
   - 视频直播
   - 在线游戏
   - 实时数据采集

3. **开发Web应用时使用HTTP**
   - 网站开发
   - RESTful API
   - 移动应用后端

4. **需要自定义网络应用时使用Socket**
   - 自定义协议
   - 实时通信
   - 需要底层控制的场景

## 五、注意事项

1. **TCP注意事项**
   - 需要处理连接建立和断开
   - 注意处理粘包和分包问题
   - 考虑使用连接池管理连接

2. **UDP注意事项**
   - 需要自己处理数据可靠性
   - 注意数据包大小限制
   - 考虑网络拥塞问题

3. **HTTP注意事项**
   - 注意请求超时处理
   - 合理设置请求头
   - 处理各种状态码

4. **Socket注意事项**
   - 正确关闭连接
   - 处理异常情况
   - 注意资源释放


## 八、学习建议

1. 理解网络协议
   - TCP/IP协议栈
   - HTTP协议
   - WebSocket协议

2. 掌握Socket编程
   - TCP Socket
   - UDP Socket
   - 多线程处理

3. 学习HTTP客户端
   - HttpURLConnection
   - HttpClient
   - 请求/响应处理

4. 实践WebSocket
   - 服务器端实现
   - 客户端实现
   - 消息处理

5. 关注最佳实践
   - 异常处理
   - 性能优化
   - 安全考虑
   - 资源管理