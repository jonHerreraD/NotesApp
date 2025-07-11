package com.notes.Backend.services;

import com.notes.Backend.domain.entities.Tag;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public interface TagService {
    List<Tag> getTags();
    List<Tag> createTags(Set<String> tagNames);
    void deleteTag(UUID id);
    Tag findTagById(UUID id);
    List<Tag> getTagByIds(Set<UUID> ids);
}
