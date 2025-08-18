package io.github.renatoconrado.crud_spring.commons;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public interface JPAService<T> {
    Optional<T> findById(UUID id);

    T save(T foo);

    List<T> findAll();
}
