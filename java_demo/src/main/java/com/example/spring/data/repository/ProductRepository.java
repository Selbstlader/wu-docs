package com.example.spring.data.repository;

import com.example.spring.data.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // 根据名称查找产品
    List<Product> findByNameContaining(String name);
    
    // 根据价格范围查找产品
    List<Product> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);
    
    // 自定义查询：查找最近创建的产品
    @Query("SELECT p FROM Product p WHERE p.createdAt >= :date")
    List<Product> findRecentProducts(@Param("date") LocalDateTime date);
} 