package com.notes.Backend.mappers;

import com.notes.Backend.domain.CreateNoteRequest;
import com.notes.Backend.domain.UpdateNoteRequest;
import com.notes.Backend.domain.dtos.CreateNoteRequestDto;
import com.notes.Backend.domain.dtos.NoteDto;
import com.notes.Backend.domain.dtos.UpdateNoteRequestDto;
import com.notes.Backend.domain.entities.Note;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface NoteMapper {

    @Mapping(target = "author", source = "author")
    @Mapping(target = "category", source = "category")
    @Mapping(target = "tags", source = "tags")
    NoteDto toDto(Note note);

    CreateNoteRequest toCreateNoteRequest(CreateNoteRequestDto dto);

    UpdateNoteRequest toUpdateNoteRequest(UpdateNoteRequestDto dto);
}
