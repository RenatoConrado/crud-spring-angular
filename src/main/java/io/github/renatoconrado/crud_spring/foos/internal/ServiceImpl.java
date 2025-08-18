package io.github.renatoconrado.crud_spring.foos.internal;

import io.github.renatoconrado.crud_spring.foos.Foo;
import io.github.renatoconrado.crud_spring.foos.FooService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
class ServiceImpl implements FooService {

    private final FooRepository repository;

    @Override
    public Optional<Foo> findById(UUID id) {
        return this.repository.findById(id);
    }

    @Override
    public Foo save(Foo foo) {
        return this.repository.save(foo);
    }

    @Override
    public List<Foo> findAll() {
        return this.repository.findAll();
    }
}
