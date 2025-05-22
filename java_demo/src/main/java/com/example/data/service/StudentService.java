package com.example.data.service;

import com.example.data.entity.Student;
import java.time.LocalDate;
import java.util.List;

public interface StudentService {
    Student createStudent(Student student);
    Student getStudentById(Long id);
    Student getStudentByStudentNumber(String studentNumber);
    List<Student> getAllStudents();
    List<Student> searchStudentsByName(String name);
    List<Student> getStudentsByMajor(String major);
    List<Student> getStudentsByGpaRange(Double minGpa, Double maxGpa);
    List<Student> getStudentsByEnrollmentDateAfter(LocalDate date);
    List<Student> getStudentsByMajorAndMinGpa(String major, Double minGpa);
    List<Student> getStudentsByEnrollmentYear(Integer year);
    Student updateStudent(Long id, Student student);
    void deleteStudent(Long id);
} 