import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './users/register/register.component';
import {LoginComponent} from './users/login/login.component';
import {UnitListComponent} from './unit-list/unit-list.component';
import {UsersComponent} from './admin/users/users.component';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {AuthGuardService} from './services/auth-guard.service';
import {AuthorizationGuardGuard} from './authorization-guard.guard';
import {LessonListComponent} from './lesson-list/lesson-list.component';
import {LessonContentComponent} from './lesson-list/lesson-content/lesson-content.component';
import {PracticeDetailUserComponent} from './practice-detail-user/practice-detail-user.component';
import {ResultPracticeComponent} from './practice-detail-user/result-practice/result-practice.component';
import {OverviewComponent} from './admin/overview/overview.component';
import {QuestionComponent} from './admin/question/question.component';
import {ForbidenComponent} from './forbiden/forbiden.component';
import {NotfoundComponent} from './notfound/notfound.component';
import {QuestionDetailsComponent} from './admin/question/question-details/question-details.component';
import {QuestionEditComponent} from './admin/question/question-edit/question-edit.component';
import {CreateQuestionComponent} from './admin/question/create-question/create-question.component';
import {UnitsComponent} from './admin/units/units.component';
import {CreateUnitComponent} from './admin/units/create-unit/create-unit.component';
import {EditUnitComponent} from './admin/units/edit-unit/edit-unit.component';
import {UserDetailComponent} from './admin/users/user-detail/user-detail.component';
import {UserStatisticComponent} from './admin/users/user-statistic/user-statistic.component';
import {UserStatisticFilterComponent} from './admin/users/user-statistic-filter/user-statistic-filter.component';
import {UserStatisticFilterByTimeComponent} from './admin/users/user-statistic-filter-by-time/user-statistic-filter-by-time.component';
import {EditUserComponent} from './admin/users/edit-user/edit-user.component';
import {ContactComponent} from './contact/contact.component';
import {PracticesComponent} from './admin/practices/practices.component';
import {CreatePracticeComponent} from './admin/practices/create-practice/create-practice.component';
import {EditPracticeComponent} from './admin/practices/edit-practice/edit-practice.component';
import {CreateLessonComponent} from './admin/lessons/create-lesson/create-lesson.component';
import {EditLessonComponent} from './admin/lessons/edit-lesson/edit-lesson.component';
import {LessonsComponent} from './admin/lessons/lessons.component';
import {UserProfileComponent} from './users/user-profile/user-profile.component';
import {UserInfoComponent} from './users/user-info/user-info.component';
import {UserResultPracticesComponent} from './users/user-result-practices/user-result-practices.component';
import {UserEditComponent} from './users/user-edit/user-edit.component';
import {UserChangePasswordComponent} from './users/user-change-password/user-change-password.component';
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
import {PracticeStatisticComponent} from "./admin/practice-statistic/practice-statistic.component";
import {PracticeDetailStComponent} from "./admin/practice-statistic/practice-detail-st/practice-detail-st.component";
import {PracticeListComponent} from "./practice-list/practice-list.component";



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'practices', component: PracticeListComponent},
  {path: 'practices/:id', component: PracticeDetailUserComponent},
  {path: 'units', component: UnitListComponent},
  {path: 'units/:id', component: LessonListComponent},
  {path: 'lessons/detail/:id', component: LessonContentComponent},
  {
    path: 'practice', children: [
      {path: ':id', component: PracticeDetailUserComponent},
      {path: ':id/result', component: ResultPracticeComponent}]
  },
  {path: 'forbidden', component: ForbidenComponent},
  {path: 'contact', component: ContactComponent},
  {
    path: 'user', component: UserProfileComponent, children: [
      {path: '', component: UserInfoComponent},
      {path: 'result', component: UserResultPracticesComponent},
      {path: 'edit', component: UserEditComponent},
      {path: 'change-password', component: UserChangePasswordComponent}
    ], canActivateChild: [AuthGuardService]
  },
  {
    path: 'admin/dashboard', component: DashboardComponent,
    canActivateChild: [AuthGuardService, AuthorizationGuardGuard],
    children: [
      {path: 'overview', component: OverviewComponent},
      {path: '', redirectTo: 'overview', pathMatch: 'full'},
      {path: 'question', component: QuestionComponent},
      {path: 'question/details/:id', component: QuestionDetailsComponent},
      {path: 'question/edit/:id', component: QuestionEditComponent},
      {path: 'question/create', component: CreateQuestionComponent},
      {path: 'practices', component: PracticesComponent},
      {path: 'practices/create', component: CreatePracticeComponent},
      {path: 'practices/:id/edit', component: EditPracticeComponent},
      {path: 'lessons', component: LessonsComponent},
      {path: 'lessons/create', component: CreateLessonComponent},
      {path: 'lessons/:id/edit', component: EditLessonComponent},
      {path: 'units', component: UnitsComponent},
      {path: 'units/create', component: CreateUnitComponent},
      {path: 'units/:id/edit', component: EditUnitComponent},
      {path: 'users', component: UsersComponent},
      {
        path: 'users/:id', component: UserDetailComponent, children: [
          {path: '', redirectTo: 'statistic', pathMatch: 'full'},
          {path: 'statistic', component: UserStatisticComponent},
          {path: 'statistic-filter', component: UserStatisticFilterComponent},
          {path: 'statistic-time', component: UserStatisticFilterByTimeComponent}
        ]
      },
      {path: 'users/:id/edit', component: EditUserComponent},
      {path: 'catestory', component: CateStoryComponent},
      {path: 'catestory/create', component: CreateCateStoryComponent},
      {path: 'catestory/:id/edit', component: EditCateStoryComponent},
      {path: 'story', component: StoryComponent},
      {path: 'story/create', component: CreateStoryComponent},
      {path: 'story/:id/edit', component: EditStoryComponent},
      {path: 'catevideo', component: CateVideoComponent},
      {path: 'catevideo/create', component: CreateCateVideoComponent},
      {path: 'catevideo/:id/edit', component: EditCateVideoComponent},
      {path: 'video', component: VideoComponent},
      {path: 'video/create', component: CreateVideoComponent},
      {path: 'video/:id/edit', component: EditVideoComponent},
      {path: 'practice-statistic', component: PracticeStatisticComponent},
      {path: 'practice-statistic/:id', component: PracticeDetailStComponent},
    ]
  },
  {path: '**', component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
