import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './users/register/register.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './users/login/login.component';
import { CategoryComponent } from './category/category.component';
import { FooterComponent } from './footer/footer.component';
import { UsersComponent } from './admin/users/users.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LessonComponent } from './lesson/lesson.component';
import { PracticeListComponent } from './practice-list/practice-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    RegisterComponent,
    LoginComponent,
    CategoryComponent,
    FooterComponent,
    UsersComponent,
    DashboardComponent,
    LessonComponent,
    PracticeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
