# Java IO操作

Java IO（输入/输出）是Java中处理数据输入输出的核心机制。Java提供了丰富的IO类库，支持文件操作、网络通信、内存操作等多种场景。

## 1. 文件基本操作

### 1.1 File类
File类是Java IO的基础类，用于处理文件和目录。

```java
// 创建文件
File file = new File("test.txt");
if (file.createNewFile()) {
    System.out.println("文件创建成功");
}

// 检查文件属性
System.out.println("文件是否存在: " + file.exists());
System.out.println("是否是文件: " + file.isFile());
System.out.println("文件大小: " + file.length() + " 字节");

// 删除文件
if (file.delete()) {
    System.out.println("文件删除成功");
}
```

### 1.2 目录操作
```java
// 创建目录
File dir = new File("testDir");
if (dir.mkdir()) {
    System.out.println("目录创建成功");
}

// 列出目录内容
File[] files = dir.listFiles();
for (File f : files) {
    System.out.println(f.getName());
}
```

## 2. 字节流操作

字节流用于处理二进制数据，以字节为单位进行读写操作。

### 2.1 字节输出流
```java
try (FileOutputStream fos = new FileOutputStream("test.txt")) {
    String content = "Hello, Java IO!";
    fos.write(content.getBytes(StandardCharsets.UTF_8));
}
```

### 2.2 字节输入流
```java
try (FileInputStream fis = new FileInputStream("test.txt")) {
    byte[] buffer = new byte[1024];
    int length = fis.read(buffer);
    String content = new String(buffer, 0, length, StandardCharsets.UTF_8);
    System.out.println(content);
}
```

## 3. 字符流操作

字符流用于处理文本数据，以字符为单位进行读写操作。

### 3.1 字符输出流
```java
try (FileWriter writer = new FileWriter("test.txt")) {
    writer.write("你好，Java IO！");
}
```

### 3.2 字符输入流
```java
try (FileReader reader = new FileReader("test.txt")) {
    char[] buffer = new char[1024];
    int length = reader.read(buffer);
    String content = new String(buffer, 0, length);
    System.out.println(content);
}
```

## 4. 缓冲流操作

缓冲流提供了缓冲功能，可以提高IO效率。

### 4.1 缓冲输出流
```java
try (BufferedWriter writer = new BufferedWriter(new FileWriter("test.txt"))) {
    writer.write("第一行");
    writer.newLine();
    writer.write("第二行");
}
```

### 4.2 缓冲输入流
```java
try (BufferedReader reader = new BufferedReader(new FileReader("test.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
}
```

## 5. NIO操作

Java NIO（New IO）提供了更高效的IO操作方式。

### 5.1 文件操作
```java
// 写入数据
Path path = Paths.get("test.txt");
List<String> lines = List.of("第一行", "第二行", "第三行");
Files.write(path, lines, StandardCharsets.UTF_8);

// 读取数据
List<String> readLines = Files.readAllLines(path, StandardCharsets.UTF_8);
readLines.forEach(System.out::println);
```

### 5.2 文件属性
```java
// 获取文件属性
BasicFileAttributes attrs = Files.readAttributes(path, BasicFileAttributes.class);
System.out.println("创建时间: " + attrs.creationTime());
System.out.println("最后修改时间: " + attrs.lastModifiedTime());
System.out.println("文件大小: " + attrs.size());
```

## 6. 注意事项

1. **资源关闭**
   - 使用try-with-resources语句自动关闭资源
   - 确保所有IO流都被正确关闭

2. **异常处理**
   - 正确处理IOException
   - 使用try-catch块捕获可能的异常

3. **性能考虑**
   - 使用缓冲流提高IO效率
   - 合理设置缓冲区大小
   - 考虑使用NIO进行大文件操作

4. **字符编码**
   - 明确指定字符编码（如UTF-8）
   - 避免使用默认编码

## 7. 最佳实践

1. **选择合适的IO类**
   - 文本文件使用字符流
   - 二进制文件使用字节流
   - 大文件操作考虑使用NIO

2. **使用工具类**
   - 使用Files类进行文件操作
   - 使用Paths类处理路径

3. **文件操作安全**
   - 检查文件是否存在
   - 验证文件权限
   - 处理文件锁定

4. **代码组织**
   - 将IO操作封装在专门的方法中
   - 使用常量定义文件路径
   - 提供清晰的错误信息 