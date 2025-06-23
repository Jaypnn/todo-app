package com.todo.todolist.controller;

//Import de classes internas do projeto
import com.todo.todolist.dto.TaskDTO;
import com.todo.todolist.exception.CustomErrorResponse;
import com.todo.todolist.mapper.TaskMapper;
import com.todo.todolist.exception.ResourceNotFoundException;
import com.todo.todolist.model.Task;
import com.todo.todolist.repository.TaskRepository;
//Import da anotação @Autowired
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
//Import de anotações da API REST
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//Import de classes Java
import java.util.List;
import java.util.stream.Collectors;

import jakarta.validation.Valid;

@RestController // Marca essa classe como um controller REST, respondendo requisições HTTP
@RequestMapping("/api/tasks") // Define a rota da API
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    // Cria uma task
    @Operation(
            summary = "Cadastra uma task no sistema",
            description = "Cadastra uma task no sistema, atribuindo um ID a ela."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "Tarefa criada com sucesso.",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = TaskDTO.class))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Dados Inválidos.",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = CustomErrorResponse.class),
                            examples = @ExampleObject(
                                    value = """
                                            {
                                            "timestamp": "2025-06-20T12:00:00",
                                            "status": 400,
                                            "error": "Validation Error",
                                            "message": "title: não pode ser vazio; status: não pode ser vazio",
                                            "path": "/api/tasks"
                                            }
                                            """
                            )

                    )
            ),
            @ApiResponse(responseCode = "500", description = "Erro interno.")
    })
    @PostMapping
    public ResponseEntity<TaskDTO> createTask(@Valid @RequestBody TaskDTO taskDTO) {
        Task task = TaskMapper.toEntity(taskDTO);
        Task savedTask = taskRepository.save(task);
        return ResponseEntity.ok(TaskMapper.toDTO(savedTask));
    }

    // Lista todas as tasks

    @Operation(
            summary = "Lista todas as tasks",
            description = "Retorna uma lista com todas as tasks que foram cadastradas no sistema."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Requisição de tasks bem sucedida."),
            @ApiResponse(responseCode = "500", description = "Erro interno.")
    })
    @GetMapping
    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAll()
                .stream()
                .map(TaskMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Busca uma task por id

    @Operation(
            summary = "Busca task por ID",
            description = "Busca, entre as tasks cadastradas no sistema, uma task por ID."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Resquisição de task bem sucedida."),
            @ApiResponse(responseCode = "500", description = "Erro interno.")
    })
    @GetMapping("/{id}")
    public ResponseEntity<TaskDTO> getTaskById(@PathVariable Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task with id " + id + " not found"));
        return ResponseEntity.ok(TaskMapper.toDTO(task));
    }

    // Atualiza a task
    @Operation(
            summary = "Atualiza task por ID",
            description = "Atualiza uma task selecionada através do ID"
    )
    @PutMapping("/{id}")
    public ResponseEntity<TaskDTO> updateTask(@PathVariable Long id, @Valid @RequestBody TaskDTO taskDTO) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task with id " + id + " not found"));

        task.setTitle(taskDTO.getTitle());
        task.setDescription(taskDTO.getDescription());
        task.setStatus(taskDTO.getStatus());

        Task updated = taskRepository.save(task);
        return ResponseEntity.ok(TaskMapper.toDTO(updated));
    }

    // Deleta a task
    @Operation(
            summary = "Deleta task por ID",
            description = "Deleta uma task cadastrada no sistema por ID"
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task with id " + id + " not found"));

        taskRepository.delete(task);
        return ResponseEntity.noContent().build();
    }
}
