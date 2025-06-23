package com.todo.todolist.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import com.todo.todolist.model.Status;

/**
 * O DTO, um padrão de projeto, é responsável por transferir os dados de Task entre diferentes camadas, ocultando dados
 * sensíveis, enviando apenas os dados necessários.
 *
 * Tratando os dados da task de certa maneira:
 *  - @NotBlank: define o campo como obrigatório;
 *  - @Size: limita o número de caracteres que o campo pode possuir;
 *  - @Schema: descreve os modelos de dados para a documentação Swagger;
 *
 *  TaskDTO possui uma lista de Getters e Setters com os dados necessários.
 */


public class TaskDTO {

    @Schema(title = "ID de cada task", example = "1")
    private Long id;

    @Schema(title = "Título da task", example = "Estudar Spring")
    @NotBlank(message = "A title is required")
    @Size(max = 100, message = "The title must be no longer than 100 letters")
    private String title;

    @Schema(title = "Descrição da task", example = "Objetivo: estar mais alinhado com a equipe de dev.")
    @Size(max = 255, message = "The description can have a maximum of 255 letters")
    private String description;

    @Schema(title = "Status de cada task", example = "Concluído" )
    @NotBlank(message = "A status is required")
    private Status status;

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

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}