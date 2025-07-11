package com.notes.Backend.mappers;

import com.notes.Backend.domain.NoteStatus;
import com.notes.Backend.domain.dtos.CategoryDto;
import com.notes.Backend.domain.dtos.CreateCategoryRequest;
import com.notes.Backend.domain.entities.Category;
import com.notes.Backend.domain.entities.Note;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CategoryMapper {

    @Mapping(target = "noteCount", source = "notes", qualifiedByName = "calculateNoteCount")
    CategoryDto toDto(Category category);

    Category toEntity(CreateCategoryRequest createCategoryRequest);

    @Named("calculateNoteCount")
    default long calculateNoteCount(List<Note> notes){
        if (null == notes){
            return 0;
        }
        return notes.stream()
                .filter(note -> NoteStatus.ACTIVE.equals(note.getStatus()))
                .count();
    }
}
