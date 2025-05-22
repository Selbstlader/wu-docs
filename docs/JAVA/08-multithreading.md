# Java多线程编程详解

## 一、多线程基础

### 1. 线程与进程
- **进程**：操作系统分配资源的基本单位
- **线程**：CPU调度的基本单位，共享进程资源
- **区别**：
  - 进程间资源独立，线程共享进程资源
  - 进程切换开销大，线程切换开销小
  - 进程间通信复杂，线程间通信简单

#### 注意事项：
1. 线程共享进程的堆内存，但每个线程有自己的栈内存
2. 线程过多会导致系统资源耗尽
3. 线程切换有开销，不是越多线程越好

### 2. 线程创建方式
```java
// 1. 继承Thread类
class MyThread extends Thread {
    @Override
    public void run() {
        // 线程执行的代码
        System.out.println("Thread running: " + Thread.currentThread().getName());
    }
}

// 使用示例
MyThread thread1 = new MyThread();
thread1.start(); // 正确启动方式
// thread1.run(); // 错误！这样是在主线程中执行

// 2. 实现Runnable接口（推荐）
class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Runnable running: " + Thread.currentThread().getName());
    }
}

// 使用示例
Thread thread2 = new Thread(new MyRunnable());
thread2.start();

// 3. 使用Lambda表达式
Thread thread3 = new Thread(() -> {
    System.out.println("Lambda running: " + Thread.currentThread().getName());
});
thread3.start();
```

#### 注意事项：
1. 不要直接调用run()方法，应该调用start()方法
2. 一个线程只能start()一次，重复start()会抛出IllegalThreadStateException
3. 推荐使用Runnable接口，因为：
   - 避免单继承限制
   - 更好的代码组织
   - 更容易实现线程池

### 3. 线程生命周期
- **新建(New)**：创建线程对象
- **就绪(Runnable)**：调用start()方法
- **运行(Running)**：获得CPU时间片
- **阻塞(Blocked)**：等待I/O、同步锁等
- **死亡(Dead)**：执行完成或异常退出

#### 状态转换示例：
```java
public class ThreadStateDemo {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            try {
                // 进入阻塞状态
                Thread.sleep(1000);
                // 等待获取锁
                synchronized (ThreadStateDemo.class) {
                    // 获取到锁后执行
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
        
        // 新建状态
        System.out.println("State: " + thread.getState()); // NEW
        
        thread.start();
        // 就绪状态
        System.out.println("State: " + thread.getState()); // RUNNABLE
        
        Thread.sleep(100);
        // 阻塞状态
        System.out.println("State: " + thread.getState()); // TIMED_WAITING
        
        thread.join();
        // 死亡状态
        System.out.println("State: " + thread.getState()); // TERMINATED
    }
}
```

#### 注意事项：
1. 线程状态是瞬时的，可能随时变化
2. 不要依赖线程状态做业务逻辑
3. 使用join()等待线程结束
4. 注意处理InterruptedException

## 二、线程同步机制

### 1. synchronized关键字
```java
class SynchronizedDemo {
    private int count = 0;
    
    // 同步方法
    public synchronized void increment() {
        count++;
    }
    
    // 同步代码块
    public void increment2() {
        synchronized(this) {
            count++;
        }
    }
    
    // 静态同步方法
    public static synchronized void staticMethod() {
        // 类级别的同步
    }
}

// 使用示例
public class SyncExample {
    public static void main(String[] args) {
        SynchronizedDemo demo = new SynchronizedDemo();
        
        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                demo.increment();
            }
        });
        
        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                demo.increment();
            }
        });
        
        t1.start();
        t2.start();
        
        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        System.out.println("Final count: " + demo.getCount());
    }
}
```

#### 注意事项：
1. synchronized是重入锁
2. 同步方法锁的是this对象
3. 静态同步方法锁的是类对象
4. 同步代码块可以指定锁对象
5. 避免在同步块中调用外部方法（可能造成死锁）

### 2. Lock接口
```java
class LockDemo {
    private final Lock lock = new ReentrantLock();
    private int count = 0;
    
    public void increment() {
        lock.lock();
        try {
            count++;
        } finally {
            lock.unlock();
        }
    }
    
    // 使用tryLock避免死锁
    public boolean tryIncrement() {
        if (lock.tryLock()) {
            try {
                count++;
                return true;
            } finally {
                lock.unlock();
            }
        }
        return false;
    }
    
    // 使用超时机制
    public boolean incrementWithTimeout() {
        try {
            if (lock.tryLock(1, TimeUnit.SECONDS)) {
                try {
                    count++;
                    return true;
                } finally {
                    lock.unlock();
                }
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        return false;
    }
}
```

#### 注意事项：
1. 必须在finally中释放锁
2. 使用tryLock避免死锁
3. 可以使用超时机制
4. 注意处理中断异常

### 3. 原子类
```java
class AtomicDemo {
    private AtomicInteger counter = new AtomicInteger(0);
    private AtomicReference<String> message = new AtomicReference<>("");
    
    public void increment() {
        // 原子操作
        counter.incrementAndGet();
    }
    
    public void updateMessage(String newMessage) {
        // CAS操作
        message.updateAndGet(old -> old + newMessage);
    }
    
    // 复合操作
    public boolean compareAndSet(int expect, int update) {
        return counter.compareAndSet(expect, update);
    }
}
```

#### 注意事项：
1. 原子类保证单个操作的原子性
2. 复合操作需要额外同步
3. 注意ABA问题
4. 使用适当的原子类（AtomicInteger, AtomicLong等）

## 三、线程池

### 1. 线程池优势
- 降低资源消耗
- 提高响应速度
- 提高线程可管理性
- 提供更多功能

### 2. 常用线程池
```java
// 固定大小线程池
ExecutorService fixedPool = Executors.newFixedThreadPool(10);

// 缓存线程池
ExecutorService cachedPool = Executors.newCachedThreadPool();

// 单线程池
ExecutorService singlePool = Executors.newSingleThreadExecutor();

// 定时任务线程池
ScheduledExecutorService scheduledPool = Executors.newScheduledThreadPool(5);

// 使用示例
public class ThreadPoolDemo {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(3);
        
        // 提交任务
        Future<?> future = executor.submit(() -> {
            // 任务代码
            return "result";
        });
        
        try {
            // 获取结果
            String result = (String) future.get(5, TimeUnit.SECONDS);
        } catch (Exception e) {
            // 处理异常
        } finally {
            // 关闭线程池
            executor.shutdown();
        }
    }
}
```

#### 注意事项：
1. 正确关闭线程池
2. 处理任务异常
3. 设置合理的线程池大小
4. 使用适当的拒绝策略

### 3. 自定义线程池
```java
ThreadPoolExecutor executor = new ThreadPoolExecutor(
    5,                      // 核心线程数
    10,                     // 最大线程数
    60L,                    // 空闲线程存活时间
    TimeUnit.SECONDS,       // 时间单位
    new LinkedBlockingQueue<>(100),  // 工作队列
    new ThreadFactory() {   // 线程工厂
        @Override
        public Thread newThread(Runnable r) {
            Thread t = new Thread(r, "custom-thread");
            t.setDaemon(true);  // 设置为守护线程
            return t;
        }
    },
    new ThreadPoolExecutor.CallerRunsPolicy()  // 拒绝策略
);
```

#### 注意事项：
1. 核心线程数 = CPU核心数 + 1
2. 最大线程数 = 核心线程数 * 2
3. 队列大小 = 核心线程数 * 4
4. 使用有界队列避免OOM
5. 设置合理的拒绝策略

## 四、实际应用场景

### 1. Web服务器并发处理
```java
public class WebServer {
    private final ExecutorService threadPool = Executors.newFixedThreadPool(10);
    private final AtomicInteger requestCount = new AtomicInteger(0);
    
    public void handleRequest(Request request) {
        threadPool.submit(() -> {
            try {
                // 记录请求数
                requestCount.incrementAndGet();
                
                // 处理请求
                processRequest(request);
                
            } catch (Exception e) {
                // 处理异常
                logError(e);
            } finally {
                // 减少请求数
                requestCount.decrementAndGet();
            }
        });
    }
    
    // 优雅关闭
    public void shutdown() {
        threadPool.shutdown();
        try {
            if (!threadPool.awaitTermination(60, TimeUnit.SECONDS)) {
                threadPool.shutdownNow();
            }
        } catch (InterruptedException e) {
            threadPool.shutdownNow();
        }
    }
}
```

#### 注意事项：
1. 处理请求异常
2. 记录请求状态
3. 优雅关闭服务器
4. 监控线程池状态

### 2. 文件处理
```java
public class FileProcessor {
    private final ExecutorService processPool = Executors.newFixedThreadPool(3);
    private final BlockingQueue<File> fileQueue = new LinkedBlockingQueue<>();
    
    public void processFiles(List<File> files) {
        // 提交文件到队列
        files.forEach(fileQueue::offer);
        
        // 启动处理线程
        for (int i = 0; i < 3; i++) {
            processPool.submit(() -> {
                while (true) {
                    try {
                        File file = fileQueue.poll(1, TimeUnit.SECONDS);
                        if (file == null) {
                            break;
                        }
                        processFile(file);
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                        break;
                    }
                }
            });
        }
    }
    
    private void processFile(File file) {
        // 文件处理逻辑
    }
}
```

#### 注意事项：
1. 使用队列管理文件
2. 处理文件异常
3. 控制处理线程数
4. 优雅处理中断

### 3. 数据处理
```java
public class DataProcessor {
    private final ExecutorService processPool = Executors.newFixedThreadPool(4);
    private final AtomicInteger processedCount = new AtomicInteger(0);
    
    public void processData(List<Data> dataList) {
        // 数据分片
        List<List<Data>> batches = splitIntoBatches(dataList, 1000);
        
        // 并行处理
        List<Future<?>> futures = new ArrayList<>();
        for (List<Data> batch : batches) {
            futures.add(processPool.submit(() -> {
                try {
                    processBatch(batch);
                    processedCount.addAndGet(batch.size());
                } catch (Exception e) {
                    // 处理异常
                    handleError(e, batch);
                }
            }));
        }
        
        // 等待所有任务完成
        for (Future<?> future : futures) {
            try {
                future.get();
            } catch (Exception e) {
                // 处理异常
            }
        }
    }
}
```

#### 注意事项：
1. 合理分片数据
2. 处理任务异常
3. 监控处理进度
4. 等待所有任务完成

### 4. 定时任务
```java
public class TaskScheduler {
    private final ScheduledExecutorService scheduler = 
        Executors.newScheduledThreadPool(5);
    private final Map<String, ScheduledFuture<?>> tasks = new ConcurrentHashMap<>();
    
    public void scheduleTask(String taskId, Runnable task, long period) {
        ScheduledFuture<?> future = scheduler.scheduleAtFixedRate(() -> {
            try {
                task.run();
            } catch (Exception e) {
                // 处理异常
                handleError(e);
            }
        }, 0, period, TimeUnit.SECONDS);
        
        tasks.put(taskId, future);
    }
    
    public void cancelTask(String taskId) {
        ScheduledFuture<?> future = tasks.remove(taskId);
        if (future != null) {
            future.cancel(false);
        }
    }
}
```

#### 注意事项：
1. 处理任务异常
2. 管理任务生命周期
3. 优雅取消任务
4. 监控任务状态

## 五、线程通信

### 1. wait/notify机制
```java
class MessageQueue {
    private String message;
    private boolean empty = true;
    private final Object lock = new Object();
    
    public void put(String message) throws InterruptedException {
        synchronized (lock) {
            while (!empty) {
                lock.wait();
            }
            this.message = message;
            empty = false;
            lock.notifyAll();
        }
    }
    
    public String take() throws InterruptedException {
        synchronized (lock) {
            while (empty) {
                lock.wait();
            }
            String result = message;
            empty = true;
            lock.notifyAll();
            return result;
        }
    }
}
```

#### 注意事项：
1. 使用while循环检查条件
2. 在synchronized块中使用wait/notify
3. 使用notifyAll而不是notify
4. 处理中断异常

### 2. 阻塞队列
```java
public class BlockingQueueDemo {
    private final BlockingQueue<String> queue = new LinkedBlockingQueue<>(10);
    
    // 生产者
    public void produce(String message) throws InterruptedException {
        queue.put(message);
    }
    
    // 消费者
    public String consume() throws InterruptedException {
        return queue.take();
    }
    
    // 使用示例
    public static void main(String[] args) {
        BlockingQueueDemo demo = new BlockingQueueDemo();
        
        // 生产者线程
        new Thread(() -> {
            try {
                for (int i = 0; i < 100; i++) {
                    demo.produce("message" + i);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();
        
        // 消费者线程
        new Thread(() -> {
            try {
                while (true) {
                    String message = demo.consume();
                    System.out.println("Consumed: " + message);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();
    }
}
```

#### 注意事项：
1. 选择合适的队列大小
2. 处理队列满/空的情况
3. 处理中断异常
4. 使用适当的队列类型

## 六、最佳实践

### 1. 线程安全
```java
// 1. 使用线程安全类
private final ConcurrentHashMap<String, String> map = new ConcurrentHashMap<>();

// 2. 使用不可变对象
public final class ImmutableValue {
    private final String value;
    
    public ImmutableValue(String value) {
        this.value = value;
    }
    
    public String getValue() {
        return value;
    }
}

// 3. 使用原子类
private final AtomicInteger counter = new AtomicInteger(0);

// 4. 使用volatile
private volatile boolean running = true;
```

#### 注意事项：
1. 优先使用线程安全类
2. 尽量使用不可变对象
3. 正确使用volatile
4. 避免共享可变状态

### 2. 性能优化
```java
// 1. 使用适当的线程池大小
int processors = Runtime.getRuntime().availableProcessors();
ExecutorService executor = Executors.newFixedThreadPool(processors + 1);

// 2. 使用分段锁
class StripedMap {
    private final Striped<Lock> locks = Striped.lock(16);
    private final Map<String, String> map = new HashMap<>();
    
    public void put(String key, String value) {
        Lock lock = locks.get(key);
        lock.lock();
        try {
            map.put(key, value);
        } finally {
            lock.unlock();
        }
    }
}

// 3. 使用无锁算法
private final AtomicInteger counter = new AtomicInteger(0);
```

#### 注意事项：
1. 合理设置线程池大小
2. 使用分段锁减少竞争
3. 优先使用无锁算法
4. 避免过度同步

### 3. 异常处理
```java
// 1. 处理线程异常
Thread.setDefaultUncaughtExceptionHandler((thread, throwable) -> {
    // 处理未捕获的异常
});

// 2. 处理线程池任务异常
executor.submit(() -> {
    try {
        // 任务代码
    } catch (Exception e) {
        // 处理异常
    }
});

// 3. 处理中断异常
try {
    Thread.sleep(1000);
} catch (InterruptedException e) {
    Thread.currentThread().interrupt();
}
```

#### 注意事项：
1. 设置默认异常处理器
2. 处理任务异常
3. 正确处理中断
4. 记录异常日志

### 4. 监控和调试
```java
// 1. 线程转储
ThreadMXBean threadMXBean = ManagementFactory.getThreadMXBean();
ThreadInfo[] threadInfos = threadMXBean.dumpAllThreads(true, true);

// 2. 监控线程状态
for (ThreadInfo info : threadInfos) {
    System.out.println(info.getThreadName() + ": " + info.getThreadState());
}

// 3. 记录关键日志
private static final Logger logger = LoggerFactory.getLogger(MyClass.class);
logger.info("Thread {} started", Thread.currentThread().getName());
```

#### 注意事项：
1. 使用线程转储分析问题
2. 监控线程状态
3. 记录关键日志
4. 使用性能分析工具

## 七、常见问题

### 1. 死锁
```java
// 死锁示例
class DeadlockDemo {
    private final Object lock1 = new Object();
    private final Object lock2 = new Object();
    
    public void method1() {
        synchronized (lock1) {
            synchronized (lock2) {
                // 操作
            }
        }
    }
    
    public void method2() {
        synchronized (lock2) {
            synchronized (lock1) {
                // 操作
            }
        }
    }
}

// 避免死锁
class SafeDemo {
    private final Object lock1 = new Object();
    private final Object lock2 = new Object();
    
    public void method1() {
        synchronized (lock1) {
            synchronized (lock2) {
                // 操作
            }
        }
    }
    
    public void method2() {
        synchronized (lock1) {
            synchronized (lock2) {
                // 操作
            }
        }
    }
}
```

#### 注意事项：
1. 按固定顺序获取锁
2. 使用超时机制
3. 避免嵌套锁
4. 定期检查死锁

### 2. 线程泄漏
```java
// 线程泄漏示例
class ThreadLeakDemo {
    private final List<Thread> threads = new ArrayList<>();
    
    public void startThread() {
        Thread thread = new Thread(() -> {
            while (true) {
                // 无限循环
            }
        });
        thread.start();
        threads.add(thread);
    }
}

// 正确实现
class SafeThreadDemo {
    private final ExecutorService executor = Executors.newFixedThreadPool(10);
    
    public void startTask() {
        executor.submit(() -> {
            // 任务代码
        });
    }
    
    public void shutdown() {
        executor.shutdown();
    }
}
```

#### 注意事项：
1. 使用线程池
2. 正确关闭线程
3. 处理未捕获异常
4. 监控线程数量

### 3. 性能问题
```java
// 性能问题示例
class PerformanceDemo {
    private final Object lock = new Object();
    
    public void method() {
        synchronized (lock) {
            // 耗时操作
            Thread.sleep(1000);
        }
    }
}

// 优化后
class OptimizedDemo {
    private final Object lock = new Object();
    
    public void method() {
        // 非同步操作
        doSomething();
        
        synchronized (lock) {
            // 最小化同步代码
            updateSharedState();
        }
    }
}
```

#### 注意事项：
1. 最小化同步代码
2. 使用适当的锁粒度
3. 避免在同步块中执行耗时操作
4. 使用并发工具类

## 八、学习建议

1. 理解基本概念
   - 线程与进程
   - 线程生命周期
   - 同步机制

2. 掌握同步机制
   - synchronized
   - Lock
   - 原子类

3. 熟练使用线程池
   - 线程池参数
   - 任务提交
   - 异常处理

4. 注意实际应用
   - 选择合适的方案
   - 处理异常
   - 性能优化

5. 重视最佳实践
   - 线程安全
   - 资源管理
   - 异常处理

6. 持续学习新特性
   - CompletableFuture
   - 并发集合
   - 函数式编程

## 九、进阶主题

1. Fork/Join框架
   - 分治算法
   - 工作窃取
   - 性能优化

2. CompletableFuture
   - 异步编程
   - 组合操作
   - 异常处理

3. 并发集合
   - ConcurrentHashMap
   - CopyOnWriteArrayList
   - BlockingQueue

4. 原子操作
   - CAS操作
   - 原子类
   - 无锁算法

5. 线程安全设计模式
   - 不可变对象
   - 线程局部存储
   - 发布订阅模式

## 十、异步编程

### 1. CompletableFuture 实现类似 async/await
```java
public class AsyncAwaitDemo {
    // 模拟异步存储方法
    public CompletableFuture<Void> storeDataAsync(String data) {
        return CompletableFuture.runAsync(() -> {
            try {
                // 模拟存储操作
                Thread.sleep(1000);
                System.out.println("数据存储完成: " + data);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
    }
    
    // 模拟异步处理方法
    public CompletableFuture<String> processDataAsync(String data) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                // 模拟处理操作
                Thread.sleep(1000);
                return "处理后的数据: " + data;
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                return null;
            }
        });
    }
    
    // 使用示例
    public void example() {
        // 类似 async/await 的链式调用
        storeDataAsync("原始数据")
            .thenCompose(v -> processDataAsync("新数据"))
            .thenAccept(result -> {
                System.out.println("最终结果: " + result);
            })
            .exceptionally(throwable -> {
                System.out.println("发生错误: " + throwable.getMessage());
                return null;
            });
    }
}
```

#### 注意事项：
1. 使用 CompletableFuture 实现异步操作
2. 通过链式调用实现类似 async/await 的效果
3. 正确处理异常和中断
4. 注意资源管理

### 2. 虚拟线程（Java 21+）
```java
public class VirtualThreadDemo {
    // 模拟异步存储方法
    public void storeData(String data) {
        try {
            // 模拟存储操作
            Thread.sleep(1000);
            System.out.println("数据存储完成: " + data);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
    
    // 模拟异步处理方法
    public String processData(String data) {
        try {
            // 模拟处理操作
            Thread.sleep(1000);
            return "处理后的数据: " + data;
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return null;
        }
    }
    
    // 使用虚拟线程
    public void example() {
        Thread.startVirtualThread(() -> {
            try {
                // 类似 async/await 的写法
                storeData("原始数据");
                String result = processData("新数据");
                System.out.println("最终结果: " + result);
            } catch (Exception e) {
                System.out.println("发生错误: " + e.getMessage());
            }
        });
    }
}
```

#### 注意事项：
1. 虚拟线程是轻量级线程
2. 适合 I/O 密集型任务
3. 可以创建大量虚拟线程
4. 需要 Java 21 或更高版本

### 3. 实际应用示例
```java
public class AsyncDataProcessor {
    private final ExecutorService executor = Executors.newFixedThreadPool(3);
    
    // 异步存储数据
    public CompletableFuture<Void> storeDataAsync(Data data) {
        return CompletableFuture.runAsync(() -> {
            try {
                // 数据库存储操作
                saveToDatabase(data);
            } catch (Exception e) {
                throw new CompletionException(e);
            }
        }, executor);
    }
    
    // 异步处理数据
    public CompletableFuture<Result> processDataAsync(Data data) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                // 数据处理操作
                return processData(data);
            } catch (Exception e) {
                throw new CompletionException(e);
            }
        }, executor);
    }
    
    // 使用示例
    public void processAndStore(Data data) {
        // 类似 async/await 的链式调用
        storeDataAsync(data)
            .thenCompose(v -> processDataAsync(data))
            .thenAccept(result -> {
                // 处理结果
                handleResult(result);
            })
            .exceptionally(throwable -> {
                // 处理异常
                handleError(throwable);
                return null;
            });
    }
}
```

#### 注意事项：
1. 使用线程池管理异步任务
2. 正确处理异常和资源
3. 使用链式调用组织异步流程
4. 注意任务依赖关系

### 4. 并行处理
```java
public class ParallelProcessingDemo {
    public CompletableFuture<String> process1(String data) {
        return CompletableFuture.supplyAsync(() -> {
            // 处理1
            return "处理1结果";
        });
    }
    
    public CompletableFuture<String> process2(String data) {
        return CompletableFuture.supplyAsync(() -> {
            // 处理2
            return "处理2结果";
        });
    }
    
    public void example() {
        // 并行执行多个异步操作
        CompletableFuture<String> future1 = process1("数据");
        CompletableFuture<String> future2 = process2("数据");
        
        // 等待所有操作完成
        CompletableFuture.allOf(future1, future2)
            .thenRun(() -> {
                try {
                    String result1 = future1.get();
                    String result2 = future2.get();
                    System.out.println("所有处理完成");
                } catch (Exception e) {
                    // 处理异常
                }
            });
    }
}
```

#### 注意事项：
1. 使用 allOf 等待所有任务完成
2. 使用 anyOf 等待任意任务完成
3. 正确处理并行任务的结果
4. 注意资源管理和异常处理

### 5. 最佳实践

1. **选择合适的异步方式**：
   - 简单异步：CompletableFuture
   - 复杂流程：链式调用
   - 并行处理：allOf/anyOf
   - 轻量级：虚拟线程

2. **异常处理**：
   - 使用 exceptionally 处理异常
   - 使用 handle 处理结果和异常
   - 注意资源释放
   - 记录错误日志

3. **性能优化**：
   - 合理使用线程池
   - 避免阻塞操作
   - 控制并发数量
   - 使用超时机制

4. **资源管理**：
   - 正确关闭线程池
   - 释放系统资源
   - 处理中断异常
   - 监控资源使用

5. **代码组织**：
   - 清晰的异步流程
   - 合理的错误处理
   - 适当的注释
   - 模块化设计 