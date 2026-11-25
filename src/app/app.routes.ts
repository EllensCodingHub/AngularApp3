
import { Routes } from '@angular/router';

import { BooksComponent } from './books/books.component';
import { AddbooksComponent } from './addbooks/addbooks.component';
import { UpdatebooksComponent } from './updatebooks/updatebooks.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { authGuard } from './guards/auth.guards';

export const routes: Routes = [
  { path: 'list', component: BooksComponent, canActivate: [authGuard] },
  { path: 'add', component: AddbooksComponent, canActivate: [authGuard] },
  { path: 'update/:id', component: UpdatebooksComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: "/books", pathMatch: "full" }

];
