import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosFooterComponent } from './components/footer/footer.component';

import { TodosHeaderComponent } from './components/header/header.component';
import { TodosMainComponent } from './components/main/main.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodosComponent } from './components/todos/todos.component';
import { TodosService } from './services/todos.service';

const routes: Routes = [
  {
    path: '',
    component: TodosComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [
    TodosComponent,
    TodosHeaderComponent,
    TodosFooterComponent,
    TodosMainComponent,
    TodoComponent,
  ],
  providers: [TodosService],
})
export class TodosModule {}
