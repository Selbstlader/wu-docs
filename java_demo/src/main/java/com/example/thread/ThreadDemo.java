package com.example.thread;

import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Java多线程示例
 * 展示了线程的基本使用、线程池、同步和通信
 */
public class ThreadDemo {
    public static void main(String[] args) {
        // 1. 基本线程创建和启动 - 展示如何创建和运行线程
        System.out.println("=== 基本线程示例 ===");
        basicThreadDemo();
        
        // 2. 线程池使用 - 展示如何使用线程池管理线程
        System.out.println("\n=== 线程池示例 ===");
        threadPoolDemo();
        
        // 3. 线程同步示例 - 展示如何保证线程安全
        System.out.println("\n=== 线程同步示例 ===");
        threadSyncDemo();
        
        // 4. 线程通信示例 - 展示线程间如何通信
        System.out.println("\n=== 线程通信示例 ===");
        threadCommunicationDemo();
    }
    
    /**
     * 基本线程示例
     * 展示两种创建线程的方式：
     * 1. 继承Thread类
     * 2. 实现Runnable接口（推荐）
     */
    private static void basicThreadDemo() {
        // 方式1：继承Thread类
        // 通过匿名内部类重写run方法
        Thread thread1 = new Thread() {
            @Override
            public void run() {
                System.out.println("线程1运行中...");
                try {
                    // 模拟线程执行任务
                    Thread.sleep(1000); // 休眠1秒
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println("线程1结束");
            }
        };
        
        // 方式2：实现Runnable接口
        // 使用Lambda表达式创建Runnable对象
        Thread thread2 = new Thread(() -> {
            System.out.println("线程2运行中...");
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("线程2结束");
        });
        
        // 启动线程
        // start()方法会创建新的线程并执行run方法
        thread1.start();
        thread2.start();
        
        // 等待线程结束
        // join()方法会阻塞当前线程，直到目标线程执行完成
        try {
            thread1.join();
            thread2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
    
    /**
     * 线程池示例
     * 展示如何使用线程池管理线程
     * 线程池优势：
     * 1. 避免频繁创建和销毁线程
     * 2. 控制并发线程数量
     * 3. 管理线程生命周期
     */
    private static void threadPoolDemo() {
        // 创建固定大小的线程池
        // 最多同时运行3个线程
        ExecutorService executor = Executors.newFixedThreadPool(3);
        
        // 提交5个任务到线程池
        for (int i = 1; i <= 5; i++) {
            final int taskId = i;
            // 提交任务到线程池
            executor.submit(() -> {
                System.out.println("任务" + taskId + "开始执行");
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println("任务" + taskId + "执行完成");
            });
        }
        
        // 关闭线程池
        executor.shutdown(); // 不再接受新任务
        try {
            // 等待所有任务完成，最多等待5秒
            if (!executor.awaitTermination(5, TimeUnit.SECONDS)) {
                // 如果超时，强制关闭
                executor.shutdownNow();
            }
        } catch (InterruptedException e) {
            executor.shutdownNow();
        }
    }
    
    /**
     * 线程同步示例
     * 展示如何使用原子类保证线程安全
     * 多个线程同时操作共享资源时，需要同步机制
     */
    private static void threadSyncDemo() {
        // 创建原子整数，保证线程安全
        AtomicInteger counter = new AtomicInteger(0);
        
        // 创建5个线程同时操作计数器
        Thread[] threads = new Thread[5];
        for (int i = 0; i < threads.length; i++) {
            threads[i] = new Thread(() -> {
                // 每个线程增加1000次
                for (int j = 0; j < 1000; j++) {
                    // 原子操作，保证线程安全
                    counter.incrementAndGet();
                }
            });
            threads[i].start();
        }
        
        // 等待所有线程结束
        for (Thread thread : threads) {
            try {
                thread.join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        
        // 最终结果应该是5000
        System.out.println("最终计数: " + counter.get());
    }
    
    /**
     * 线程通信示例
     * 展示生产者-消费者模式
     * 使用wait/notify机制实现线程间通信
     */
    private static void threadCommunicationDemo() {
        // 创建共享的消息队列
        MessageQueue queue = new MessageQueue();
        
        // 生产者线程：生产消息
        Thread producer = new Thread(() -> {
            for (int i = 1; i <= 5; i++) {
                try {
                    // 生产消息
                    queue.put("消息" + i);
                    Thread.sleep(1000); // 模拟生产耗时
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
        
        // 消费者线程：消费消息
        Thread consumer = new Thread(() -> {
            for (int i = 1; i <= 5; i++) {
                try {
                    // 消费消息
                    String message = queue.take();
                    System.out.println("收到: " + message);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
        
        // 启动线程
        producer.start();
        consumer.start();
        
        // 等待线程结束
        try {
            producer.join();
            consumer.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

/**
 * 简单的消息队列实现
 * 使用wait/notify机制实现线程间通信
 */
class MessageQueue {
    private String message; // 存储消息
    private boolean empty = true; // 标记队列是否为空
    
    /**
     * 生产消息
     * 如果队列不为空，则等待
     */
    public synchronized void put(String message) throws InterruptedException {
        while (!empty) {
            // 队列不为空，等待消费者消费
            wait();
        }
        // 生产消息
        this.message = message;
        empty = false;
        // 通知消费者可以消费了
        notifyAll();
    }
    
    /**
     * 消费消息
     * 如果队列为空，则等待
     */
    public synchronized String take() throws InterruptedException {
        while (empty) {
            // 队列为空，等待生产者生产
            wait();
        }
        // 消费消息
        String result = message;
        empty = true;
        // 通知生产者可以生产了
        notifyAll();
        return result;
    }
}