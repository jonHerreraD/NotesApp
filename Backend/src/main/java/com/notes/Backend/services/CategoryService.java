package com.notes.Backend.services;

import com.notes.Backend.domain.entities.Category;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public interface CategoryService {
    List<Category> listCategories();
    Category createCategory(Category category);
    void deleteCategory(UUID id);

    Category getCategoryById(UUID id);
}
