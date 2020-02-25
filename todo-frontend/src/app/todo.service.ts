import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable()
export class TodoService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getTodos(): Promise<Todo[]> {
    return this.http.get(this.baseUrl + '/api/todos/')
      .toPromise()
      .then(response => {
        const res = response as Todo[];
        res.forEach(element => {
          element.timeOfEvent= this.formatTimeOfEvent(element.timeOfEvent);
        });
        return res;
      })
      .catch(this.handleError);
  }

  createTodo(todoData: Todo): Promise<Todo> {
    return this.http.post(this.baseUrl + '/api/todos/', todoData)
      .toPromise().then(response => 
        {
          const res = response as Todo;
          res.timeOfEvent = this.formatTimeOfEvent(res.timeOfEvent);
          return res;
      })
      .catch(this.handleError);
  }

  updateTodo(todoData: Todo): Promise<Todo> {
    return this.http.put(this.baseUrl + '/api/todos/' + todoData.id, todoData)
      .toPromise()
      .then(response => response as Todo)
      .catch(this.handleError);
  }

  deleteTodo(id: string): Promise<any> {
    return this.http.delete(this.baseUrl + '/api/todos/' + id)
      .toPromise()
      .catch(this.handleError);
  }

  private formatTimeOfEvent(data: string): string {
    return moment(data).format('MM/DD/YYYY HH:mm');;
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}