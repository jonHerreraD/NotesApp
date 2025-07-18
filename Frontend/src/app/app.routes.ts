import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {AddNoteComponent} from './components/add-note/add-note.component';
import {NewNoteComponent} from './components/new-note/new-note.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'notes',
    component: MainPageComponent
  },
  {
    path: 'notes/add',
    component: AddNoteComponent
  },
  {
    path: 'notes/add/new',
    component: NewNoteComponent
  }
];
