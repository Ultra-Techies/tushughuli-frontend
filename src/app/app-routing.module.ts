import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { Component } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { TodoComponent } from './todo/todo.component';
import { ProfileComponent } from './profile/profile.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'addtask', component: AddtaskComponent },
  { path: 'todo', component: TodoComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
