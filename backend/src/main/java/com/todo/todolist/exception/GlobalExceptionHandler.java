package com.todo.todolist.exception;

// Import das bibliotecas do Spring
import jakarta.servlet.http.HttpServletRequest; // Interface para requisição HTTP
import org.springframework.dao.DataIntegrityViolationException; // Exceção para violação de integridade no banco
import org.springframework.web.HttpRequestMethodNotSupportedException; // Exceção para metodo HTTP não suportado
import org.springframework.http.HttpStatus; // Contém todos os códigos HTTP
import org.springframework.http.ResponseEntity; // Representa a resposta HTTP
import org.springframework.web.bind.MethodArgumentNotValidException; // Exceção para falha de validação de argumentos
import org.springframework.web.bind.annotation.ExceptionHandler; // Marca um metodo para tratar exceções especificas
import org.springframework.web.bind.annotation.RestControllerAdvice; // Define uma classe para tratar exceções
import org.springframework.web.servlet.NoHandlerFoundException; // Exceção quando nenhuma rota corresponde a requisição

import java.util.stream.Collectors; // Coleta os resultados de operações streams

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Para erros de validação
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<CustomErrorResponse> handleValidationException(MethodArgumentNotValidException ex,
                                                                         HttpServletRequest request) {

        String errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .collect(Collectors.joining("; "));

        CustomErrorResponse error = new CustomErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                "Validation Error",
                errors,
                request.getRequestURI()
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    // Para erros de integridade no banco
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<CustomErrorResponse> handleDataIntegrityException(DataIntegrityViolationException ex,
                                                                            HttpServletRequest request) {

        CustomErrorResponse error = new CustomErrorResponse(
                HttpStatus.CONFLICT.value(),
                "Database Error",
                "Integrity constraint violation",
                request.getRequestURI()
        );

        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    // Para métodos HTTP inválidos
    @ExceptionHandler(org.springframework.web.HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<CustomErrorResponse> handleMethodNotSupported(
            HttpRequestMethodNotSupportedException ex, HttpServletRequest request) {

        CustomErrorResponse error = new CustomErrorResponse(
                HttpStatus.METHOD_NOT_ALLOWED.value(),
                "Method not allowed",
                ex.getMessage(),
                request.getRequestURI()
        );

        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(error);
    }

    // Para recursos não encontrados
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<CustomErrorResponse> handleResponseNotFound(
            ResourceNotFoundException ex, HttpServletRequest request) {

        CustomErrorResponse error = new CustomErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                "Not Found",
                ex.getMessage(),
                request.getRequestURI()
        );

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    // Para erro de rota não encontrada
    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<CustomErrorResponse> handlerNotFound(
            NoHandlerFoundException ex, HttpServletRequest request) {

        CustomErrorResponse error = new CustomErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                "Route Not Found",
                ex.getMessage(),
                request.getRequestURI()
        );

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }


    // Para erros genéricos
    @ExceptionHandler(Exception.class)
    public ResponseEntity<CustomErrorResponse> handleGeneral(
            Exception ex, HttpServletRequest request) {

        CustomErrorResponse error = new CustomErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Internal Server Error",
                ex.getMessage(),
                request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
