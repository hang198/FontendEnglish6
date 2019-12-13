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


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'units', component: UnitListComponent},
  {path: 'units/:id', component: LessonListComponent},
  {path: 'lessons/detail/:id', component: LessonContentComponent},
  {
    path: 'practice', children: [
      {path: ':id', component: PracticeDetailUserComponent},
      {path: ':id/result', component: ResultPracticeComponent}]
  },
  {path: 'forbidden', component: ForbidenComponent},
  // {
  //   path: 'user', component: UserProfileComponent, children: [
  //     {path: '', component: UserInfoComponent},
  //     {path: 'result', component: UserResultTestsComponent},
  //     {path: 'edit', component: UseEditComponent},
  //     {path: 'change-password', component: UseChangePasswordComponent}
  //   ], canActivateChild: [AuthGuardService]
  // },
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
      // {path: 'practices', component: PracticeComponent},
      // {path: 'practices/create', component: CreatePracticeComponent},
      // {path: 'practice/:id/edit', component: EditPracticeComponent},
      // {path: 'lessons', component: LessonListComponent},
      // {path: 'lesson-list/create', component: CreateLessonComponent},
      // {path: 'lesson-list/:id/edit', component: EditLessonComponent},
      {path: 'units', component: UnitsComponent},
      {path: 'units/create', component: CreateUnitComponent},
      {path: 'units/:id/edit', component: EditUnitComponent},
      // {path: 'users', component: UsersComponent},
      // {
      //   path: 'users/:id', component: UserDetailComponent, children: [
      //     {path: '', redirectTo: 'statistic', pathMatch: 'full'},
      //     {path: 'statistic', component: UserStatisticComponent},
      //     {path: 'statistic-filter', component: UserStatisticFilterComponent},
      //     {path: 'statistic-time', component: UserStatisticFilterByTimeComponent}
      //   ]
      // },
      // {path: 'users/:id/edit', component: EditUserComponent},
      // {path: 'practice-statistic', component: PracticeStatisticComponent},
      // {path: 'practice-statistic/:id', component: PracticeDetailStComponent},
    ]
  },
  {path: '**', component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
