## 变量

```
ints = 50
strs = 'string'
floats = 13.14
true = True
false = False
null = None
```

## 数组

```
list = [0, 2, 3, 4, 10, 9, 49, 1]

# 前面加
list.append(100)

#指定位置加
list.insert(0, 100)

# 删除最后一个
list.remove(100)

#指定删除
list.pop(5)
```

## 对象

```
obj = {
    "Python": 100,
    "Java": 88,
    "C++": 60,
    "JavaScript": 70
}
print(obj['Python'])
```

## 函数

```
def Fun(dog):
    if dog == '米侯':
        print('米猴')
    elif dog == 'higou':
        print('海狗')
Fun('higou')

# Python中的函数传值主要涉及以下几种类型或方式

# 位置参数（Positional Arguments）

# 这是最基本的参数传递方式，函数调用时按照参数在函数定义时的位置顺序一一对应地传递值。例如

def func(a, b):
    print(a, b)

func(1, 2)  # 此处1对应a，2对应b

# 默认值参数（Default Arguments）

# 某些参数可以被赋予默认值，这样在调用函数时，如果没有为这些参数提供值，它们就会采用定义时的默认值。例如

def func(a, b=10):
    print(a, b)

func(1)  # 输出: 1 10，因为b有默认值，所以可以不传

# 命名参数/关键字参数（Keyword Arguments）

# 调用函数时，可以通过参数名明确指定参数值，不必遵循定义时的顺序。例如

def func(a, b):
    print(a, b)

func(b=2, a=1)  # 参数顺序可以与定义时不同

# 可变位置参数（Variable-Length Positional Arguments）

# 使用*args收集额外的位置参数，允许传入任意数量的位置参数。例如

def func(*args):
    for arg in args:
        print(arg)

func(1, 2, 3)  # 输出: 1 2 3

# 可变关键字参数（Variable-Length Keyword Arguments）

# 使用**kwargs收集额外的关键字参数，允许传入任意数量的关键字参数。例如

def func(**kwargs):
    for key, value in kwargs.items():
        print(key, value)

func(a=1, b=2)  # 输出: a 1, b 2

# 强制命名参数（Required Keyword-Only Arguments）

# 当参数前有*时，之后的所有参数都必须以关键字形式传递，即使它们有默认值。例如

def func(*, a=1, b=2):  #* 后的参数只能作为关键字参数
    print(a, b)

func(a=3, b=4)  # 必须使用关键字传参
```
