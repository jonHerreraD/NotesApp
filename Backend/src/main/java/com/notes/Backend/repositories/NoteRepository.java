package com.notes.Backend.repositories;

import com.notes.Backend.domain.NoteStatus;
import com.notes.Backend.domain.entities.Category;
import com.notes.Backend.domain.entities.Note;
import com.notes.Backend.domain.entities.Tag;
import com.notes.Backend.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface NoteRepository extends JpaRepository<Note, UUID> {

    List<Note> findAllByStatusAndCategoryAndTagsContaining(NoteStatus status, Category category, Tag tag);
    List<Note> findAllByStatusAndCategory(NoteStatus status, Category category);
    List<Note> findAllByStatusAndTagsContaining(NoteStatus status, Tag tag);
    List<Note> findAllByStatus(NoteStatus status);
    List<Note> findAllByAuthorAndStatus(User author, NoteStatus status);
}
