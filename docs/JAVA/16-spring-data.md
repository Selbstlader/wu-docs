# Spring Data

Spring Data是Spring框架的一个子项目，旨在简化数据访问层的开发。它提供了一套统一的API和抽象，使开发者能够轻松地访问各种数据存储技术，如关系型数据库、NoSQL数据库和云数据服务等。

## 1. 核心概念

### 1.1 Repository接口

Spring Data的核心是Repository接口体系，主要包括：

- `Repository`：最基础的接口，主要作为标记接口
- `CrudRepository`：提供基本CRUD操作
- `PagingAndSortingRepository`：在CrudRepository基础上增加分页和排序功能
- `JpaRepository`：专用于JPA的增强接口，提供JPA相关的额外功能

### 1.2 实体映射

通过注解（如`@Entity`、`@Table`、`@Column`）将Java类映射到数据库表。

### 1.3 查询方法

Spring Data支持三种主要的查询定义方式：
- 方法名派生查询
- `@Query`注解定义查询
- 查询DSL（Domain Specific Language）

## 2. Spring Data JPA

Spring Data JPA是Spring Data家族中使用最广泛的模块，专注于JPA (Java Persistence API) 的数据访问。

### 2.1 实体定义

```java
@Entity
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String name;
    
    @Column(nullable = false, unique = true, length = 20)
    private String studentNumber;
    
    // 其他字段、getter和setter
}
```

### 2.2 Repository接口定义

```java
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    
    // 根据学号查找学生
    Optional<Student> findByStudentNumber(String studentNumber);
    
    // 根据姓名模糊查询
    List<Student> findByNameContaining(String name);
    
    // 使用JPQL查询
    @Query("SELECT s FROM Student s WHERE s.major = :major AND s.gradePointAverage >= :minGpa")
    List<Student> findByMajorAndMinGpa(@Param("major") String major, @Param("minGpa") Double minGpa);
    
    // 使用原生SQL查询
    @Query(value = "SELECT * FROM students WHERE YEAR(enrollment_date) = :year", nativeQuery = true)
    List<Student> findByEnrollmentYear(@Param("year") Integer year);
}
```

## 3. 方法命名规则

Spring Data能够根据方法名自动生成查询。命名规则如下：

### 3.1 查询方法前缀

- `find...By`
- `get...By`
- `query...By`
- `read...By`
- `count...By`
- `exists...By`

### 3.2 条件关键字

- 比较操作：`Equals`, `GreaterThan`, `LessThan`, `Between`, `In`, `NotIn` 等
- 字符串操作：`StartingWith`, `EndingWith`, `Containing`, `Like` 等
- 空值检查：`IsNull`, `IsNotNull`
- 逻辑操作：`And`, `Or`
- 排序：`OrderBy...Asc/Desc`

### 3.3 示例

| 方法名 | SQL等价 |
|--------|---------|
| `findByName(String name)` | `SELECT * FROM entity WHERE name = ?` |
| `findByNameAndAge(String name, int age)` | `SELECT * FROM entity WHERE name = ? AND age = ?` |
| `findByNameContaining(String name)` | `SELECT * FROM entity WHERE name LIKE %?%` |
| `findByAgeBetween(int start, int end)` | `SELECT * FROM entity WHERE age BETWEEN ? AND ?` |
| `findByAgeGreaterThanEqual(int age)` | `SELECT * FROM entity WHERE age >= ?` |
| `findByOrderByNameAsc()` | `SELECT * FROM entity ORDER BY name ASC` |

## 4. 服务层实现

服务层通常封装Repository接口，提供业务逻辑：

```java
@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    @Transactional
    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Student not found with id: " + id));
    }
    
    // 其他业务方法
}
```

## 5. 高级特性

### 5.1 分页和排序

```java
// 在Repository接口中
Page<Student> findByMajor(String major, Pageable pageable);

// 在Service中使用
Pageable pageable = PageRequest.of(0, 10, Sort.by("name").ascending());
Page<Student> studentPage = studentRepository.findByMajor("Computer Science", pageable);
```

### 5.2 投影（Projections）

创建接口只返回实体的特定字段：

```java
public interface StudentNameOnly {
    String getName();
    String getStudentNumber();
}

// 在Repository中
List<StudentNameOnly> findByMajor(String major);
```

### 5.3 规范（Specifications）

用于构建动态查询：

```java
public List<Student> findStudents(String name, String major) {
    return studentRepository.findAll(Specification
        .where(nameContains(name))
        .and(majorEquals(major)));
}

private Specification<Student> nameContains(String name) {
    return (root, query, cb) -> 
        name == null ? null : cb.like(root.get("name"), "%" + name + "%");
}

private Specification<Student> majorEquals(String major) {
    return (root, query, cb) -> 
        major == null ? null : cb.equal(root.get("major"), major);
}
```

## 6. 事务管理

在Spring Data中，事务通常通过`@Transactional`注解管理：

```java
@Transactional
public Student updateStudentInfo(Long id, StudentDTO dto) {
    Student student = getStudentById(id);
    student.setName(dto.getName());
    student.setEmail(dto.getEmail());
    return studentRepository.save(student);
}

@Transactional(readOnly = true)  // 只读事务，性能更好
public List<Student> getAllStudents() {
    return studentRepository.findAll();
}
```

## 7. 最佳实践

1. **合理使用方法名查询**：简单查询用方法名，复杂查询用`@Query`
2. **避免N+1查询问题**：使用`JOIN FETCH`加载关联实体
3. **使用DTO**：避免直接在接口层暴露实体
4. **分页处理大结果集**：避免一次加载大量数据
5. **使用索引**：为经常查询的字段创建索引
6. **缓存常用数据**：减少数据库查询

## 8. Spring Data的其他模块

除了JPA，Spring Data还支持多种数据存储技术：

- Spring Data MongoDB
- Spring Data Redis
- Spring Data Elasticsearch
- Spring Data Neo4j
- Spring Data JDBC
- Spring Data REST

每个模块都采用相同的编程模型，但针对特定数据库做了优化。 