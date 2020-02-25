import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { Todo } from './todo';
import {NgForm} from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html'
})

export class TodoListComponent implements OnInit {
  todos: Todo[];
  newTodo: Todo = new Todo();
  editing: boolean = false;
  editingTodo: Todo = new Todo();
  selection = new SelectionModel<Element>(true, []);

  // Min moment, to validate min date
  public min = new Date();

  constructor(
    private todoService: TodoService,
  ) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos()
      .then(todos => this.todos = todos );    
  }

  createTodo(todoForm: NgForm): void {
    this.todoService.createTodo(this.newTodo)
      .then(createTodo => {        
        todoForm.reset();
        this.newTodo = new Todo();
        this.todos.unshift(createTodo)
      });
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id)
    .then(() => {
      this.todos = this.todos.filter(todo => todo.id != id);
    });
  }

  updateTodo(todoData: Todo): void {
    
    todoData.timeOfEvent = new Date(todoData.timeOfEvent)
    console.log(todoData);
    this.todoService.updateTodo(todoData)
    .then(updatedTodo => {
      let existingTodo = this.todos.find(todo => todo.id === updatedTodo.id);
      Object.assign(existingTodo, updatedTodo);
      this.clearEditing();
    });
  }

  editTodo(todoData: Todo): void {
    this.editing = true;
    todoData.timeOfEvent = new Date(todoData.timeOfEvent);
    Object.assign(this.editingTodo, todoData);
  }

  clearEditing(): void {
    this.editingTodo = new Todo();
    this.editing = false;
  }

  deleteSelectedRows() {
    let promiseArr = [];
    this.selection.selected.forEach(item => {
      promiseArr.push(this.todoService.deleteTodo(item.id));
    });
    Promise.all(promiseArr).then(() => {
      this.todoService.getTodos().then(todos => this.todos = todos );    
    });
    this.selection = new SelectionModel<Element>(true, []);
  }
}