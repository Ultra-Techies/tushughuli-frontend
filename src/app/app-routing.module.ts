import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { Component } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
// import { TodoComponent } from './todo/todo.component';
import { ProfileComponent } from './profile/profile.component';
const routes: Routes = [
  {path:'', redirectTo:'signup', pathMatch:'full'},
  { path: 'profile', component:ProfileComponent},
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
