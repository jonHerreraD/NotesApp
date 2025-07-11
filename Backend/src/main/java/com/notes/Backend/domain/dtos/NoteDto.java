package com.notes.Backend.domain.dtos;

import com.notes.Backend.domain.NoteStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoteDto {
    private UUID id;
    private String title;
    private String content;

    private AuthorDto author;
    private CategoryDto category;
    private Set<TagResponse> tags;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private NoteStatus status;
}
