package com.example.data.service;

import com.example.data.entity.Product;
import java.math.BigDecimal;
import java.util.List;

public interface ProductService {
    Product createProduct(Product product);
    Product getProductById(Long id);
    List<Product> getAllProducts();
    List<Product> searchProducts(String name);
    List<Product> findProductsByPriceRange(BigDecimal minPrice, BigDecimal maxPrice);
    Product updateProduct(Long id, Product product);
    void deleteProduct(Long id);
} 