package com.notes.Backend.services.impl;

import com.notes.Backend.domain.CreateNoteRequest;
import com.notes.Backend.domain.NoteStatus;
import com.notes.Backend.domain.UpdateNoteRequest;
import com.notes.Backend.domain.entities.Category;
import com.notes.Backend.domain.entities.Note;
import com.notes.Backend.domain.entities.Tag;
import com.notes.Backend.domain.entities.User;
import com.notes.Backend.repositories.NoteRepository;
import com.notes.Backend.services.CategoryService;
import com.notes.Backend.services.NoteService;
import com.notes.Backend.services.TagService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoteServiceImpl implements NoteService {

    private final NoteRepository noteRepository;
    private final CategoryService categoryService;
    private final TagService tagService;

    @Override
    public Note getNote(UUID id) {
        return noteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Note does not exist with ID " + id));
    }

    @Transactional(readOnly = true)
    @Override
    public List<Note> getAllNotes(UUID categoryId, UUID tagId) {
        if (categoryId != null && tagId != null){
            Category category = categoryService.getCategoryById(categoryId);
            Tag tag = tagService.findTagById(tagId);

            return noteRepository.findAllByStatusAndCategoryAndTagsContaining(
                    NoteStatus.ACTIVE,
                    category,
                    tag
            );
        }

        if (categoryId != null){
            Category category = categoryService.getCategoryById(categoryId);
            return noteRepository.findAllByStatusAndCategory(
                    NoteStatus.ACTIVE,
                    category
            );

        }

        if (tagId != null){
            Tag tag = tagService.findTagById(tagId);
            return noteRepository.findAllByStatusAndTagsContaining(
                    NoteStatus.ACTIVE,
                    tag
            );
        }

        return noteRepository.findAllByStatus(NoteStatus.ACTIVE);
    }

    @Override
    public List<Note> getArchivedNotes(User user) {
        return noteRepository.findAllByAuthorAndStatus(user, NoteStatus.ARCHIVED);
    }

    @Override
    @Transactional
    public Note createNote(User user, CreateNoteRequest createNoteRequest) {
        Note newNote = new Note();
        newNote.setTitle(createNoteRequest.getTitle());
        newNote.setContent(createNoteRequest.getContent());
        newNote.setStatus(createNoteRequest.getNoteStatus());
        newNote.setAuthor(user);

        Category category =
                categoryService.getCategoryById(createNoteRequest.getCategoryId());
        newNote.setCategory(category);

        Set<UUID> tagIds = createNoteRequest.getTagIds();
        List<Tag> tags = tagService.getTagByIds(tagIds);
        newNote.setTags(new HashSet<>());


        return noteRepository.save(newNote);
    }

    @Override
    @Transactional
    public Note updateNote(UUID id, UpdateNoteRequest updateNoteRequest) {
        Note existingNote = noteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Note does not exist with id " + id));

        existingNote.setTitle(updateNoteRequest.getTitle());
        String noteContent = updateNoteRequest.getContent();
        existingNote.setContent(noteContent);
        existingNote.setStatus(updateNoteRequest.getStatus());

        UUID updateNoteRequestCategoryId = updateNoteRequest.getCategoryId();
        if (!existingNote.getCategory().getId().equals(updateNoteRequestCategoryId)){
            Category newCategory = categoryService.getCategoryById(updateNoteRequestCategoryId);
            existingNote.setCategory(newCategory);
        }

        Set<UUID> existingTagIds = existingNote.getTags().stream().map(Tag::getId).collect(Collectors.toSet());
        Set<UUID> updateNoteRequestTagIds = updateNoteRequest.getTagIds();
        if (!existingTagIds.equals(updateNoteRequestTagIds)){
            List<Tag> newTags = tagService.getTagByIds(updateNoteRequestTagIds);
            existingNote.setTags(new HashSet<>(newTags));
        }

        return noteRepository.save(existingNote);
    }

    @Override
    public void deleteNote(UUID id) {
        Note note = getNote(id);
        noteRepository.delete(note);
    }
}
