package com.example.data.repository;

import com.example.data.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    // 根据学号查找学生
    Optional<Student> findByStudentNumber(String studentNumber);

    // 根据姓名查找学生
    List<Student> findByNameContaining(String name);

    // 根据专业查找学生
    List<Student> findByMajor(String major);

    // 根据GPA范围查找学生
    List<Student> findByGradePointAverageBetween(Double minGpa, Double maxGpa);

    // 根据入学年份查找学生
    List<Student> findByEnrollmentYear(Integer year);

    // 根据入学日期查找学生
    List<Student> findByEnrollmentDateAfter(LocalDate date);

    // 使用JPQL自定义查询
    @Query("SELECT s FROM Student s WHERE s.major = :major AND s.gradePointAverage >= :minGpa")
    List<Student> findByMajorAndMinGpa(@Param("major") String major, @Param("minGpa") Double minGpa);

    // 使用原生SQL查询
    //    @Query(value = "SELECT * FROM students WHERE YEAR(enrollment_date) = :year", nativeQuery = true)

}