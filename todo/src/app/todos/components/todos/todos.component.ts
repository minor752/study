import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { TodosService } from 'src/app/todos/services/todos.service';
import { TodoInterface } from 'src/app/todos/types';
import { HandleIDEventInterface } from 'src/app/todos/types';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: TodoInterface[] | null = [];
  todoTitle: string = '';
  showDanger: boolean = false;
  disableButton = false;

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    this.todosService.getTodos().subscribe((todos) => (this.todos = todos));
  }

  handleID(handleIDEvent: HandleIDEventInterface) {
    if (handleIDEvent.handleIDType === 'complete')
      this.completeTodo(handleIDEvent.id);

    if (handleIDEvent.handleIDType === 'update')
      this.updateTodo(handleIDEvent.id);

    if (handleIDEvent.handleIDType === 'remove')
      this.removeTodo(handleIDEvent.id);
  }

  removeTodo(id: number): void {
    this.todosService.removeTodo(id).subscribe(() => {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    });
  }

  completeTodo(id: number) {
    const completedTodo: TodoInterface = this.todos.filter(
      (todo) => todo.id === id
    )[0];

    this.todosService
      .completeTodo(id, {
        ...completedTodo,
        completed: !completedTodo.completed,
      })
      .subscribe((todo) => (completedTodo.completed = todo.completed));
  }

  updateTodo(id: number) {
    const updatedTodo: TodoInterface = this.todos.filter(
      (todo) => todo.id === id
    )[0];

    if (!updatedTodo.title) return;

    this.todosService
      .updateTodo(id, {
        ...updatedTodo,
        title: updatedTodo.title,
        updated: true,
      })
      .subscribe((todo) => (updatedTodo.updated = todo.updated));
  }

  typeTitle() {
    this.showDanger = false;
    this.todoTitle ? (this.disableButton = false) : (this.disableButton = true);
  }

  addTodo() {
    this.disableButton = true;

    if (!this.todoTitle) {
      this.showDanger = true;
      this.disableButton = false;
      return;
    }

    const todo: TodoInterface = {
      id: Math.floor(Math.random() * 100),
      title: this.todoTitle,
      completed: false,
      updated: false,
    };

    setTimeout(() => {
      this.todosService.createTodo(todo).subscribe(() => {
        this.todos.unshift(todo);
        this.todoTitle = '';
        this.showDanger = false;
        this.disableButton = false;
      });
    }, 200);
  }
}
