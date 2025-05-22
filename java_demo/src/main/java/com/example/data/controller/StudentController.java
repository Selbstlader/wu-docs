package com.example.data.controller;

import com.example.data.entity.Student;
import com.example.data.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        return ResponseEntity.ok(studentService.createStudent(student));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudent(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.getStudentById(id));
    }

    @GetMapping("/number/{studentNumber}")
    public ResponseEntity<Student> getStudentByNumber(@PathVariable String studentNumber) {
        return ResponseEntity.ok(studentService.getStudentByStudentNumber(studentNumber));
    }

    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Student>> searchStudents(@RequestParam String name) {
        return ResponseEntity.ok(studentService.searchStudentsByName(name));
    }

    @GetMapping("/major/{major}")
    public ResponseEntity<List<Student>> getStudentsByMajor(@PathVariable String major) {
        return ResponseEntity.ok(studentService.getStudentsByMajor(major));
    }

    @GetMapping("/gpa-range")
    public ResponseEntity<List<Student>> getStudentsByGpaRange(
            @RequestParam Double minGpa,
            @RequestParam Double maxGpa) {
        return ResponseEntity.ok(studentService.getStudentsByGpaRange(minGpa, maxGpa));
    }

    @GetMapping("/enrolled-after")
    public ResponseEntity<List<Student>> getStudentsEnrolledAfter(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(studentService.getStudentsByEnrollmentDateAfter(date));
    }

    @GetMapping("/major-min-gpa")
    public ResponseEntity<List<Student>> getStudentsByMajorAndMinGpa(
            @RequestParam String major,
            @RequestParam Double minGpa) {
        return ResponseEntity.ok(studentService.getStudentsByMajorAndMinGpa(major, minGpa));
    }

    @GetMapping("/enrollment-year/{year}")
    public ResponseEntity<List<Student>> getStudentsByEnrollmentYear(@PathVariable Integer year) {
        return ResponseEntity.ok(studentService.getStudentsByEnrollmentYear(year));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student student) {
        return ResponseEntity.ok(studentService.updateStudent(id, student));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok().build();
    }
} 