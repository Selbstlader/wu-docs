package com.example.data.service.impl;

import com.example.data.entity.Student;
import com.example.data.repository.StudentRepository;
import com.example.data.service.StudentService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

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

    @Override
    public Student getStudentByStudentNumber(String studentNumber) {
        return studentRepository.findByStudentNumber(studentNumber)
                .orElseThrow(() -> new EntityNotFoundException("Student not found with student number: " + studentNumber));
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public List<Student> searchStudentsByName(String name) {
        return studentRepository.findByNameContaining(name);
    }

    @Override
    public List<Student> getStudentsByMajor(String major) {
        return studentRepository.findByMajor(major);
    }

    @Override
    public List<Student> getStudentsByGpaRange(Double minGpa, Double maxGpa) {
        return studentRepository.findByGradePointAverageBetween(minGpa, maxGpa);
    }

    @Override
    public List<Student> getStudentsByEnrollmentDateAfter(LocalDate date) {
        return studentRepository.findByEnrollmentDateAfter(date);
    }

    @Override
    public List<Student> getStudentsByMajorAndMinGpa(String major, Double minGpa) {
        return studentRepository.findByMajorAndMinGpa(major, minGpa);
    }

    @Override
    public List<Student> getStudentsByEnrollmentYear(Integer year) {
        return studentRepository.findByEnrollmentYear(year);
    }

    @Override
    @Transactional
    public Student updateStudent(Long id, Student studentDetails) {
        Student student = getStudentById(id);
        
        student.setName(studentDetails.getName());
        student.setStudentNumber(studentDetails.getStudentNumber());
        student.setEmail(studentDetails.getEmail());
        student.setPhoneNumber(studentDetails.getPhoneNumber());
        student.setBirthDate(studentDetails.getBirthDate());
        student.setEnrollmentDate(studentDetails.getEnrollmentDate());
        student.setMajor(studentDetails.getMajor());
        student.setGradePointAverage(studentDetails.getGradePointAverage());
        
        return studentRepository.save(student);
    }

    @Override
    @Transactional
    public void deleteStudent(Long id) {
        Student student = getStudentById(id);
        studentRepository.delete(student);
    }
} 