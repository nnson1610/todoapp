package com.todoapp.TodoApp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.todoapp.TodoApp.models.Todo;
import com.todoapp.TodoApp.repositories.TodoRepository;

@Service
public class TodoService {
    @Autowired
    TodoRepository todoRepository;
    
    public List<Todo> getAll() {  
    	Sort sortByCreatedAtDesc = new Sort(Sort.Direction.DESC, "createdAt");
    	return todoRepository.findAll(sortByCreatedAtDesc);
    }  

    public Optional<Todo> findById(String id) {
        return todoRepository.findById(id);
    }
    
    public Todo create(Todo todo) {  
        return todoRepository.save(todo);
    }  
    
    public Optional<Todo> update(String id, Todo todo) {  
        return todoRepository.findById(id)
                .map(todoData -> {
                    todoData.setTitle(todo.getTitle());
                    todoData.setDescription(todo.getDescription());
                    todoData.setTimeOfEvent(todo.getTimeOfEvent());
                    return todoRepository.save(todoData);
                });
    }  

    public void delete(String id) {  
    	todoRepository.deleteById(id);            
    }  
}
