import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'medical-form',
    loadChildren: () => import('./medical-form/medical-form.module').then( m => m.MedicalFormPageModule)
  },
  {
    path: 'patient-list',
    loadChildren: () => import('./patient-list/patient-list.module').then( m => m.PatientListPageModule)
  },
  {
    path: 'patient-details',
    loadChildren: () => import('./patient-details/patient-details.module').then( m => m.PatientDetailsPageModule)
  },
  {
    path: 'schedule-visits',
    loadChildren: () => import('./schedule-visits/schedule-visits.module').then( m => m.ScheduleVisitsPageModule)
  },
  {
    path: 'user-account',
    loadChildren: () => import('./user-account/user-account.module').then( m => m.UserAccountPageModule)
  },
  {
    path: 'user-data',
    loadChildren: () => import('./user-data/user-data.module').then( m => m.UserDataPageModule)
  },
  {
    path: 'exercise-list',
    loadChildren: () => import('./exercise-list/exercise-list.module').then( m => m.ExerciseListPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
