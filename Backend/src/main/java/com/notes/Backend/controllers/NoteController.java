package com.notes.Backend.controllers;

import com.notes.Backend.domain.CreateNoteRequest;
import com.notes.Backend.domain.UpdateNoteRequest;
import com.notes.Backend.domain.dtos.CreateNoteRequestDto;
import com.notes.Backend.domain.dtos.NoteDto;
import com.notes.Backend.domain.dtos.UpdateNoteRequestDto;
import com.notes.Backend.domain.entities.Note;
import com.notes.Backend.domain.entities.User;
import com.notes.Backend.mappers.NoteMapper;
import com.notes.Backend.services.NoteService;
import com.notes.Backend.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/v1/notes")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;
    private final NoteMapper noteMapper;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<NoteDto>> getAllNotes(
            @RequestParam(required = false)UUID categoryId,
            @RequestParam(required = false)UUID tagId){
        List<Note> notes = noteService.getAllNotes(categoryId, tagId);
        List<NoteDto> noteDtos = notes.stream().map(noteMapper::toDto).toList();

        return ResponseEntity.ok(noteDtos);
    }

    @GetMapping(path = "/archived")
    public ResponseEntity<List<NoteDto>> getDrafts(@RequestAttribute UUID userId){
        User loggedInUser = userService.getUserById(userId);
        List<Note> draftPosts = noteService.getArchivedNotes(loggedInUser);
        List<NoteDto> noteDtos = draftPosts.stream().map(noteMapper::toDto).toList();
        return ResponseEntity.ok(noteDtos);
    }

    @PostMapping
    public ResponseEntity<NoteDto> createNote(
            @Valid @RequestBody CreateNoteRequestDto createNoteRequestDto,
            @RequestAttribute UUID userId){



        User loggedInUser = userService.getUserById(userId);
         CreateNoteRequest createNoteRequest =
                noteMapper.toCreateNoteRequest(createNoteRequestDto);
        Note createdNote = noteService.createNote(loggedInUser, createNoteRequest);
        System.out.println(createdNote.getCategory().getId());
        NoteDto createdNoteDto = noteMapper.toDto(createdNote);
        return  new ResponseEntity<>(createdNoteDto, HttpStatus.CREATED);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<NoteDto> updateNote(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateNoteRequestDto updateNoteRequestDto){
        UpdateNoteRequest updateNoteRequest = noteMapper.toUpdateNoteRequest(updateNoteRequestDto);
        Note updatedNote = noteService.updateNote(id, updateNoteRequest);
        NoteDto updatedNoteDto = noteMapper.toDto(updatedNote);
        return ResponseEntity.ok(updatedNoteDto);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<NoteDto> getNote(
            @PathVariable UUID id
    ){
        Note note = noteService.getNote(id);
        NoteDto noteDto = noteMapper.toDto(note);
        return ResponseEntity.ok(noteDto);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable UUID id){
        noteService.deleteNote(id);
        return ResponseEntity.noContent().build();
    }


}
