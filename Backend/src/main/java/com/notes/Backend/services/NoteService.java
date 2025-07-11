package com.notes.Backend.services;

import com.notes.Backend.domain.CreateNoteRequest;
import com.notes.Backend.domain.UpdateNoteRequest;
import com.notes.Backend.domain.entities.Note;
import com.notes.Backend.domain.entities.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public interface NoteService {
    Note getNote(UUID id);
    List<Note> getAllNotes(UUID categoryId, UUID tagId);
    List<Note> getArchivedNotes(User user);
    Note createNote(User user, CreateNoteRequest createNoteRequest);
    Note updateNote(UUID id, UpdateNoteRequest updateNoteRequest);

    void deleteNote(UUID id);
}
