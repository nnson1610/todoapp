package com.todoapp.TodoApp.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.todoapp.TodoApp.models.Todo;

@Repository
public interface TodoRepository extends MongoRepository<Todo, String> {

}
