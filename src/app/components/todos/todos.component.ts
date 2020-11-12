import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../servises/todo.service';

import { Todo } from '../../models/Todo';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  data: Todo[];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    //this.data = this.todoService.getTodos();
    this.todoService.getTodos().subscribe((todos) => {
      this.data = todos;
    });
  }

  deleteTodo(item: Todo) {
    // Remove from UI
    this.data = this.data.filter((t) => t.id !== item.id);

    // Remove from server
    this.todoService.deleteTodos(item).subscribe();
  }

  addTodo(item: Todo) {
    this.todoService.addTodo(item).subscribe((item) => {
      this.data.push(item);
    });
  }
}
