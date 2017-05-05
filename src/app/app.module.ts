import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import {AppRoutingModule} from './app-routing.module';

import {
  AppComponent, HeroesComponent, HeroDetailComponent, DashboardComponent,
  HeroSearchComponent, LoadingComponent,
  LoginComponent,ShellComponent
} from './components';

import {
  HeroService, HeroSearchService, LoadingStatusService, UserAuthenticationService,
  InMemoryDataService
} from './providers';

const COMPONENTS=[
  AppComponent,
  DashboardComponent,
  HeroesComponent,
  HeroDetailComponent,
  HeroSearchComponent,
  LoadingComponent,
  LoginComponent,
  ShellComponent
];

const PROVIDERS=[
  LoadingStatusService, UserAuthenticationService, HeroService, HeroSearchService
];

@NgModule({
  declarations: [
    COMPONENTS
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  providers: [PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
