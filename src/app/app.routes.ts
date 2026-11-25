
import { Routes } from '@angular/router';

import { BooksComponent } from './books/books.component';
import { AddbooksComponent } from './addbooks/addbooks.component';
import { UpdatebooksComponent } from './updatebooks/updatebooks.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'list', component: BooksComponent },
  { path: 'add', component: AddbooksComponent },
  { path: 'update/:id', component: UpdatebooksComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: "/books", pathMatch: "full" }

];
