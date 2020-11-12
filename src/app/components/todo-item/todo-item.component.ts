import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { TodoService } from '../../servises/todo.service';

import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() item: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();
  checked =  true;
  
  
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}
  
  // Set dynamic classes
  setClasses() {
    let classes = {
      todo: true,
      'is-completed': this.item.completed,
    };

    return classes;
  }

  onToggle(item) {
    //console.log(event.target.checked);
    // Toggle in UI
    item.completed = !item.completed;

    // Toggle on Server
    this.todoService.toggleCompleted(item).subscribe();
    //.subscribe((item) => console.log(item));
  }

  onDelete(item) {
    this.deleteTodo.emit(item);
  }
}
