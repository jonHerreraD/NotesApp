package com.notes.Backend.mappers;

import com.notes.Backend.domain.NoteStatus;
import com.notes.Backend.domain.dtos.TagResponse;
import com.notes.Backend.domain.entities.Note;
import com.notes.Backend.domain.entities.Tag;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import java.util.Set;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TagMapper {

    @Mapping(target = "noteCount", source = "notes", qualifiedByName = "calculateNoteCount")
    TagResponse toTagResponse(Tag tag);

    @Named("calculateNoteCount")
    default Integer calculateNoteCount(Set<Note> notes){
        if (notes == null){
            return 0;
        }

        return (int) notes.stream()
                .filter(note -> NoteStatus.ACTIVE.equals(note.getStatus()))
                .count();
    }

}
