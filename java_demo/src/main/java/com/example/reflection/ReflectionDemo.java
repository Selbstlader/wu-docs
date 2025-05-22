package com.example.reflection;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.Arrays;

/**
 * Java反射机制示例
 * 反射是Java提供的一种在运行时获取类信息、创建对象、调用方法、访问字段的能力
 * 主要使用java.lang.reflect包下的类：
 * - Class: 表示类的信息
 * - Constructor: 表示构造方法
 * - Field: 表示字段
 * - Method: 表示方法
 * - Modifier: 表示修饰符
 */
public class ReflectionDemo {
    public static void main(String[] args) {
        try {
            // 1. 获取类信息
            // Class.forName() 方法用于加载类，返回Class对象
            // 这是反射的入口点，通过类名获取类的所有信息
            Class<?> clazz = Class.forName("com.example.reflection.Person");
            System.out.println("=== 类信息 ===");
            System.out.println("类名: " + clazz.getName());
            System.out.println("修饰符: " + Modifier.toString(clazz.getModifiers()));

            // // 2. 获取构造方法
            // // getDeclaredConstructors() 获取所有声明的构造方法（包括私有构造方法）
            // // getConstructors() 只获取公共构造方法
            // System.out.println("\n=== 构造方法 ===");
            // Constructor<?>[] constructors = clazz.getDeclaredConstructors();
            // for (Constructor<?> constructor : constructors) {
            //     System.out.println("构造方法: " + constructor);
            // }

            // 3. 获取字段
            // getDeclaredFields() 获取所有声明的字段（包括私有字段）
            // getFields() 只获取公共字段
            System.out.println("\n=== 字段信息 ===");
            Field[] fields = clazz.getDeclaredFields();
            for (Field field : fields) {
                System.out.println("字段名: " + field.getName());
                System.out.println("字段类型: " + field.getType());
                System.out.println("修饰符: " + Modifier.toString(field.getModifiers()));
                System.out.println("---");
            }
            
            // 获取所有方法
            System.out.println("\n--- 所有方法 ---");
            Method[] methods = clazz.getDeclaredMethods();
            for (Method method : methods) {
                System.out.println("方法名: " + method.getName());
                System.out.println("返回类型: " + method.getReturnType());
                System.out.println("参数类型: " + Arrays.toString(method.getParameterTypes()));
                System.out.println("修饰符: " + Modifier.toString(method.getModifiers()));
                System.out.println("---");
            }
            
            // 获取所有构造方法
            System.out.println("\n--- 所有构造方法 ---");
            Constructor<?>[] constructors = clazz.getDeclaredConstructors();
            for (Constructor<?> constructor : constructors) {
                System.out.println("构造方法: " + constructor.getName());
                System.out.println("参数类型: " + Arrays.toString(constructor.getParameterTypes()));
                System.out.println("修饰符: " + Modifier.toString(constructor.getModifiers()));
                System.out.println("---");
            }

            // 5. 创建对象
            // 通过反射创建对象需要以下步骤：
            // 1. 获取构造方法
            // 2. 设置构造方法可访问（如果是私有构造方法）
            // 3. 调用构造方法创建对象
            System.out.println("\n=== 创建对象 ===");
            Constructor<?> constructor = clazz.getDeclaredConstructor(String.class, int.class);
            constructor.setAccessible(true); // 设置私有构造方法可访问
            Object person = constructor.newInstance("张三", 25);
            System.out.println("创建的对象: " + person);

            // 6. 调用方法
            // 通过反射调用方法需要以下步骤：
            // 1. 获取方法对象
            // 2. 调用invoke方法，传入对象实例和参数
            System.out.println("\n=== 调用方法 ===");
            Method getNameMethod = clazz.getDeclaredMethod("getName");
            String name = (String) getNameMethod.invoke(person);
            System.out.println("调用getName方法: " + name);

            // 7. 修改字段值
            // 通过反射修改字段值需要以下步骤：
            // 1. 获取字段对象
            // 2. 设置字段可访问（如果是私有字段）
            // 3. 调用set方法设置新值
            System.out.println("\n=== 修改字段值 ===");
            Field ageField = clazz.getDeclaredField("age");
            ageField.setAccessible(true); // 设置私有字段可访问
            ageField.set(person, 26);
            System.out.println("修改后的对象: " + person);

            // 8. 调用私有方法
            // 通过反射调用私有方法需要以下步骤：
            // 1. 获取方法对象
            // 2. 设置方法可访问
            // 3. 调用invoke方法
            System.out.println("\n=== 调用私有方法 ===");
            Method privateMethod = clazz.getDeclaredMethod("privateMethod");
            privateMethod.setAccessible(true);
            privateMethod.invoke(person);

            System.out.println("=== 所有字段 ===");
            Field[] copyList = clazz.getDeclaredFields();
            for (Field field : copyList) {
                System.out.println(field);
            }
            System.out.println("=== 所有方法 ===");
            Method[] copyMethod = clazz.getDeclaredMethods();
            for (Method method : copyMethod) {
                System.out.println(method);
            }
            System.out.println("=== 所有构造方法 ===");
            Constructor<?>[] copyConstructor = clazz.getDeclaredConstructors();
            for (Constructor<?> constructor1 : copyConstructor) {
                System.out.println(constructor1);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

/**
 * 用于演示反射的示例类
 * 这个类包含了各种访问修饰符的成员，用于展示反射的能力
 */
class Person {
    private String name; // 私有字段
    private int age; // 私有字段

    private Person(String name, int age) { // 私有构造方法
        this.name = name;
        this.age = age;
    }

    public String getName() { // 公共方法
        return name;
    }

    public void setName(String name) { // 公共方法
        this.name = name;
    }

    public int getAge() { // 公共方法
        return age;
    }

    public void setAge(int age) { // 公共方法
        this.age = age;
    }

    private void privateMethod() { // 私有方法
        System.out.println("这是一个私有方法");
    }

    @Override
    public String toString() { // 重写toString方法
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}