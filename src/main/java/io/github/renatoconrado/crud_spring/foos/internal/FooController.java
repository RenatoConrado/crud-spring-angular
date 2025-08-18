package io.github.renatoconrado.crud_spring.foos.internal;

import io.github.renatoconrado.crud_spring.foos.FooService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RequestMapping("/foos")
@RestController
public class FooController {

    private final FooService fooService;

    @GetMapping("/{id}")
    public FooDto findOne(@PathVariable UUID id) {
        return this.fooService
            .findById(id)
            .map(FooDto::toDto)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @GetMapping
    public List<FooDto> findAll() {
        return List.of(new FooDto(UUID.randomUUID(), "DTO 1"));

        /*return this.fooService
            .findAll()
            .stream()
            .map(FooDto::toDto)
            .toList();*/
    }
}
