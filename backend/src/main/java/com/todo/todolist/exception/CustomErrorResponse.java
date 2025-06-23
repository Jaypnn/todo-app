package com.todo.todolist.exception;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

@Schema(description = "Modelo de resposta para erros da API")
public class CustomErrorResponse {
    // Variáveis

    @Schema(description = "Momento em que o erro ocorreu", example = "2025-06-20T12:32:12")
    private LocalDateTime timestamp;

    @Schema(description = "Código do erro", example = "404")
    private int status;

    @Schema(description = "Tipo do erro", example = "Not Found")
    private String error;

    @Schema(description = "Mensagem detalhada do erro", example = "Task com id 10 não encontrada")
    private String message;

    @Schema(description = "Caminho da requisição que gerou o erro", example = "/api/tasks/10")
    private String path;

    // Construtores
    public CustomErrorResponse() {}

    public CustomErrorResponse(int status, String error, String message, String path) {
        this.timestamp = LocalDateTime.now();
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
    }

    // Getters e Setters
    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
