import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './users/register/register.component';
import {LoginComponent} from './users/login/login.component';
import {CategoryComponent} from './category/category.component';
import {UsersComponent} from './admin/users/users.component';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {AuthGuardService} from './services/auth-guard.service';
import {LessonComponent} from './lesson/lesson.component';
import {PracticeListComponent} from './practice-list/practice-list.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'units', component: CategoryComponent},
  {path: 'units/:id', component: LessonComponent},
  {path: 'lessons', component: LessonComponent},
  {path: 'lessons/:id', component: PracticeListComponent},
  {path: 'users', component: UsersComponent},
  {path: 'admin/dashboard', component: DashboardComponent,
  canActivateChild: [AuthGuardService, AuthGuardService],
  children: [
    {path: 'users', component: UsersComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
