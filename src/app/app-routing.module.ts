import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import {
  UserAuthenticationService
} from './providers/index';

import {
  LoginComponent,
  DashboardComponent,
  HeroDetailComponent,
  HeroesComponent,
  ShellComponent
}
from './components/index';

export const routes: Routes = [{
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    canActivate: [UserAuthenticationService],
    component: ShellComponent,
    children: [{
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'heroes',
        component: HeroesComponent
      },
      {
        path: 'details/:id',
        component: HeroDetailComponent
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
