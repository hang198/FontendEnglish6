import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import * as $ from 'jquery';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './users/register/register.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './users/login/login.component';
import { UnitListComponent } from './unit-list/unit-list.component';
import { FooterComponent } from './footer/footer.component';
import { UsersComponent } from './admin/users/users.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import {LessonListComponent} from './lesson-list/lesson-list.component';
import { LessonContentComponent } from './lesson-list/lesson-content/lesson-content.component';
import { ResultPracticeComponent } from './practice-detail-user/result-practice/result-practice.component';
import {PracticeDetailUserComponent} from './practice-detail-user/practice-detail-user.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatOptionModule} from '@angular/material/core';
import { OverviewComponent } from './admin/overview/overview.component';
import { QuestionComponent } from './admin/question/question.component';
import { ForbidenComponent } from './forbiden/forbiden.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { QuestionDetailsComponent } from './admin/question/question-details/question-details.component';
import { QuestionEditComponent } from './admin/question/question-edit/question-edit.component';
import { CreateQuestionComponent } from './admin/question/create-question/create-question.component';
import { UnitsComponent } from './admin/units/units.component';
import { CreateUnitComponent } from './admin/units/create-unit/create-unit.component';
import { EditUnitComponent } from './admin/units/edit-unit/edit-unit.component';
import { EditUserComponent } from './admin/users/edit-user/edit-user.component';
import { UserDetailComponent } from './admin/users/user-detail/user-detail.component';
import { UserStatisticComponent } from './admin/users/user-statistic/user-statistic.component';
import { UserStatisticFilterComponent } from './admin/users/user-statistic-filter/user-statistic-filter.component';
import { UserStatisticFilterByTimeComponent } from './admin/users/user-statistic-filter-by-time/user-statistic-filter-by-time.component';
import { ContactComponent } from './contact/contact.component';
import { LessonsComponent } from './admin/lessons/lessons.component';
import { CreateLessonComponent } from './admin/lessons/create-lesson/create-lesson.component';
import { EditLessonComponent } from './admin/lessons/edit-lesson/edit-lesson.component';
import { PracticesComponent } from './admin/practices/practices.component';
import { CreatePracticeComponent } from './admin/practices/create-practice/create-practice.component';
import { EditPracticeComponent } from './admin/practices/edit-practice/edit-practice.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { UserInfoComponent } from './users/user-info/user-info.component';
import { UserResultPracticesComponent } from './users/user-result-practices/user-result-practices.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import {UserChangePasswordComponent} from "./users/user-change-password/user-change-password.component";
import { CateStoryComponent } from './admin/catestory/catestory.component';
import { CreateCateStoryComponent } from './admin/catestory/create-catestory/create-catestory.component';
import { EditCateStoryComponent } from './admin/catestory/edit-catestory/edit-catestory.component';
import { StoryComponent } from './admin/story/story.component';
import { CreateStoryComponent } from './admin/story/create-story/create-story.component';
import { EditStoryComponent } from './admin/story/edit-story/edit-story.component';
import { CateVideoComponent } from './admin/catevideo/catevideo.component';
import { CreateCateVideoComponent } from './admin/catevideo/create-catevideo/create-catevideo.component';
import { EditCateVideoComponent } from './admin/catevideo/edit-catevideo/edit-catevideo.component';
import { VideoComponent } from './admin/video/video.component';
import { CreateVideoComponent} from './admin/video/create-video/create-video.component';
import { EditVideoComponent } from './admin/video/edit-video/edit-video.component';
import { UserChangePasswordComponent } from './users/user-change-password/user-change-password.component';
import { PracticeStatisticComponent } from './admin/practice-statistic/practice-statistic.component';
import { PracticeDetailStComponent } from './admin/practice-statistic/practice-detail-st/practice-detail-st.component';
import {MatSelectModule} from "@angular/material/select";
import { PracticeListComponent } from './practice-list/practice-list.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    RegisterComponent,
    LoginComponent,
    UnitListComponent,
    FooterComponent,
    UsersComponent,
    DashboardComponent,
    LessonListComponent,
    LessonContentComponent,
    PracticeDetailUserComponent,
    ResultPracticeComponent,
    OverviewComponent,
    QuestionComponent,
    ForbidenComponent,
    NotfoundComponent,
    QuestionDetailsComponent,
    QuestionEditComponent,
    CreateQuestionComponent,
    UnitsComponent,
    CreateUnitComponent,
    EditUnitComponent,
    EditUserComponent,
    UserDetailComponent,
    UserStatisticComponent,
    UserStatisticFilterComponent,
    UserStatisticFilterByTimeComponent,
    ContactComponent,
    LessonsComponent,
    CreateLessonComponent,
    EditLessonComponent,
    PracticesComponent,
    CreatePracticeComponent,
    EditPracticeComponent,
    UserProfileComponent,
    UserInfoComponent,
    UserResultPracticesComponent,
    UserEditComponent,
    UserChangePasswordComponent,
    CateStoryComponent,
    CreateCateStoryComponent,
    EditCateStoryComponent,
    StoryComponent,
    CreateStoryComponent,
    EditStoryComponent,
    CateVideoComponent,
    CreateCateVideoComponent,
    EditCateVideoComponent,
    VideoComponent,
    CreateVideoComponent,
    EditVideoComponent,
    PracticeStatisticComponent,
    PracticeDetailStComponent,
    PracticeListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatOptionModule,
    FormsModule,
    MatSelectModule,
    AngularEditorModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
