package com.todo.todolist.controller;

//Import de classes internas do projeto
import com.todo.todolist.dto.TaskDTO;
import com.todo.todolist.mapper.TaskMapper;
import com.todo.todolist.exception.ResourceNotFoundException;
import com.todo.todolist.model.Task;
import com.todo.todolist.repository.TaskRepository;
//Import da anotação @Autowired
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
    @PostMapping
    public ResponseEntity<TaskDTO> createTask(@Valid @RequestBody TaskDTO taskDTO) {
        Task task = TaskMapper.toEntity(taskDTO);
        Task savedTask = taskRepository.save(task);
        return ResponseEntity.ok(TaskMapper.toDTO(savedTask));
    }

    // Lista todas as tasks
    @GetMapping
    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAll()
                .stream()
                .map(TaskMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Busca uma task por id
    @GetMapping("/{id}")
    public ResponseEntity<TaskDTO> getTaskById(@PathVariable Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task with id " + id + " not found"));
        return ResponseEntity.ok(TaskMapper.toDTO(task));
    }

    // Atualiza a task
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
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task with id " + id + " not found"));

        taskRepository.delete(task);
        return ResponseEntity.noContent().build();
    }
}
