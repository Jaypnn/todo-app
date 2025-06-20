package com.todo.todolist.controller;

//Import de classes internas do projeto
import com.todo.todolist.model.Task;
import com.todo.todolist.repository.TaskRepository;
//Import da anotação @Autowired
import org.springframework.beans.factory.annotation.Autowired;
//Import de anotações da API REST
import org.springframework.web.bind.annotation.*;

//Import de classes Java
import java.util.List;
import java.util.Optional;

@RestController // Marca essa classe como um controller REST, respondendo requisições HTTP
@RequestMapping("/api/tasks") // Define a rota da API
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    // Cria uma task
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }

    // Lista todas as tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // Busca uma task por id
    @GetMapping("/{id}")
    public Optional<Task> getTaskById(@PathVariable Long id) {
        return taskRepository.findById(id);
    }
}
