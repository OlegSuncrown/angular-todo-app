import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Todo } from '../models/Todo';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json; charset=UTF-8',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todosUrl: string = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit: string = '?_limit=5';
  constructor(private http: HttpClient) {}

  // Get todos
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl + this.todosLimit);
  }

  // Toggle Completed
  toggleCompleted(item: Todo): Observable<any> {
    const url = `${this.todosUrl}/${item.id}`;
    return this.http.put(url, item, httpOptions);
  }

  // Delete todo
  deleteTodos(item: Todo): Observable<Todo> {
    const url = `${this.todosUrl}/${item.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  // Add todo
  addTodo(item: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, item, httpOptions);
  }
}
