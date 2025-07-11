package com.notes.Backend.repositories;

import com.notes.Backend.domain.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID> {

    @Query("SELECT c FROM Category c LEFT JOIN FETCH c.notes")
    List<Category> findAllWithNoteCount();

    boolean existsByNameIgnoreCase(String name);
}
