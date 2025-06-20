package com.todo.todolist.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class TaskDTO {

    // Regras para titulo, descrição e status.
    private Long id;

    @NotBlank(message = "A title is required")
    @Size(max = 100, message = "The title must be no longer than 100 letters")
    private String title;

    @Size(max = 255, message = "The description can have a maximum of 255 letters")
    private String description;

    @NotBlank(message = "A status is required")
    private String status;

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
