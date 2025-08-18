package io.github.renatoconrado.crud_spring.foos.internal;

import io.github.renatoconrado.crud_spring.foos.Foo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;
import java.util.UUID;

interface FooRepository extends JpaRepository<Foo, UUID> {
}
