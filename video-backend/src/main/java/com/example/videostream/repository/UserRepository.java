package com.example.videostream.repository;

import com.example.videostream.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);

    // ✅ NEW: check if email already exists
    boolean existsByEmail(String email);

    // (optional: if you ever want to login using email)
    Optional<User> findByEmail(String email);
}
