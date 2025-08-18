package io.github.renatoconrado.crud_spring.foos.internal;

import io.github.renatoconrado.crud_spring.foos.Foo;

import java.util.UUID;

public record FooDto(UUID id, String name) {

    static FooDto toDto(Foo entity) {
        return new FooDto(entity.getId(), entity.getName());
    }

}
