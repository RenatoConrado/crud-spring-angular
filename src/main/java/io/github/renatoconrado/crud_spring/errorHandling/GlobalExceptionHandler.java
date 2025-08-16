package io.github.renatoconrado.crud_spring.errorHandling;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
        log.error(ex.getMessage());
        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("Error: " + ex.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException ex) {
        log.error(ex.getMessage());
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body("Invalid input: " + ex.getMessage());
    }
}
