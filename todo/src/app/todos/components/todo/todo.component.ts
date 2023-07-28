import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TodoInterface } from 'src/app/todos/types';
import { HandleIDEventInterface } from 'src/app/todos/types';
import { HandleIDTypes } from 'src/app/todos/types';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  showUpdateInput: boolean = false;
  initialTitle: string;

  @Input('todo') todoProps: TodoInterface | null;

  @Output('handleID') handleIDEvent =
    new EventEmitter<HandleIDEventInterface>();

  constructor() {}

  ngOnInit(): void {
    this.setClassName();
    this.initialTitle = this.todoProps.title;
  }

  handleID(id: number, handleIDType: HandleIDTypes) {
    this.handleIDEvent.emit({ id, handleIDType });
    this.setClassName();
  }

  setClassName(): string {
    if (this.todoProps.updated && this.todoProps.completed) return 'completed';
    if (!this.todoProps.updated && this.todoProps.completed) return 'completed';
    if (this.todoProps.updated) return 'updated';
    else return '';
  }

  checkToroTitle() {
    if (this.todoProps.title && this.initialTitle === this.todoProps.title) {
      this.showUpdateInput = false;
    } else {
      this.showUpdateInput = false;
      this.handleID(this.todoProps.id, 'update');
    }

    if (!this.todoProps.title) this.showUpdateInput = true;
  }
}
