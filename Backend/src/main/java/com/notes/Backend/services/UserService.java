package com.notes.Backend.services;

import com.notes.Backend.domain.entities.User;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public interface UserService {
    User getUserById(UUID id);
}
